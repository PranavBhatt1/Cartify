import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { storage } from '../utils/localStorage';
import { validatePincode } from '../utils/validation';
import { normalizePincodeInput } from '../utils/pincode';

interface SetPincodeResult {
  success: boolean;
  error?: string;
}

interface PincodeContextType {
  pincode: string;
  setPincode: (value: string) => SetPincodeResult;
  clearPincode: () => void;
}

const PincodeContext = createContext<PincodeContextType | undefined>(undefined);

export const usePincode = () => {
  const context = useContext(PincodeContext);
  if (!context) {
    throw new Error('usePincode must be used within a PincodeProvider');
  }
  return context;
};

interface PincodeProviderProps {
  children: ReactNode;
}

export const PincodeProvider = ({ children }: PincodeProviderProps) => {
  const [pincode, setPincodeState] = useState(() => storage.getPincode());

  const setPincode = (value: string): SetPincodeResult => {
    const normalized = normalizePincodeInput(value);
    const validationError = validatePincode(normalized);

    if (validationError) {
      return { success: false, error: validationError };
    }

    setPincodeState(normalized);
    storage.setPincode(normalized);
    return { success: true };
  };

  const clearPincode = () => {
    setPincodeState('');
    storage.setPincode('');
  };

  return (
    <PincodeContext.Provider value={{ pincode, setPincode, clearPincode }}>
      {children}
    </PincodeContext.Provider>
  );
};
