import { useCallback, useState } from 'react';
import { usePincode } from '../contexts/PincodeContext';

export const usePincodeGuard = () => {
  const { pincode } = usePincode();
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const guardAction = useCallback((action: () => void) => {
    if (pincode) {
      action();
      return;
    }
    setPendingAction(() => action);
    setIsPromptOpen(true);
  }, [pincode]);

  const handlePromptClose = useCallback(() => {
    setPendingAction(null);
    setIsPromptOpen(false);
  }, []);

  const handlePromptSuccess = useCallback(() => {
    const action = pendingAction;
    setPendingAction(null);
    setIsPromptOpen(false);
    if (action) action();
  }, [pendingAction]);

  return { isPromptOpen, guardAction, handlePromptClose, handlePromptSuccess };
};
