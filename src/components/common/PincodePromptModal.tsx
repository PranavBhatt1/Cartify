import { useState } from 'react';
import { MapPin, X } from 'lucide-react';
import { usePincode } from '../../contexts/PincodeContext';
import { normalizePincodeInput } from '../../utils/pincode';

interface PincodePromptModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const PincodePromptModal = ({ onClose, onSuccess }: PincodePromptModalProps) => {
  const { pincode, setPincode } = usePincode();
  const [input, setInput] = useState(() => pincode);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = setPincode(input);
    if (!result.success) {
      setError(result.error || 'Please enter a valid pincode');
      return;
    }
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 p-4 animate-fade-in">
      <div className="w-full max-w-md rounded-2xl bg-white border border-gray-100 shadow-2xl p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary-50">
              <MapPin className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Set Delivery Pincode</h3>
              <p className="text-sm text-gray-500">Enter pincode to continue this action.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Close">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(normalizePincodeInput(e.target.value));
              setError('');
            }}
            placeholder="Enter 6-digit pincode"
            maxLength={6}
            className={`w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-primary-500 ${
              error ? 'border-red-400' : 'border-gray-300'
            }`}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors">
              Save & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
