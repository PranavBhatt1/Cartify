import { useEffect, useRef, useState } from 'react';
import { MapPin, X } from 'lucide-react';
import { createPortal } from 'react-dom';
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
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    inputRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = setPincode(input);
    if (!result.success) {
      setError(result.error || 'Please enter a valid pincode');
      return;
    }
    onSuccess();
  };

  const modalContent = (
    <div className="fixed inset-0 z-[90] animate-fade-in">
      <button
        type="button"
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
        aria-label="Close pincode modal"
      />

      <div className="relative flex min-h-full items-end justify-center p-3 sm:items-center sm:p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pincode-modal-title"
          className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl sm:p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary-50 p-2">
                <MapPin className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <h3 id="pincode-modal-title" className="text-lg font-bold text-gray-900">Set Delivery Pincode</h3>
                <p className="text-sm text-gray-500">Enter pincode to continue this action.</p>
              </div>
            </div>
            <button onClick={onClose} className="rounded-lg p-1.5 transition-colors hover:bg-gray-100" aria-label="Close">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => {
                setInput(normalizePincodeInput(e.target.value));
                setError('');
              }}
              placeholder="Enter 6-digit pincode"
              maxLength={6}
              inputMode="numeric"
              autoComplete="postal-code"
              className={`w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary-500 ${
                error ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex gap-3 pt-1">
              <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-gray-300 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" className="flex-1 rounded-xl bg-primary-600 py-2.5 font-semibold text-white transition-colors hover:bg-primary-700">
                Save & Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
