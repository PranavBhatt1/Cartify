const METRO_PREFIXES = new Set(['11', '12', '40', '41', '56', '60', '70']);

export const normalizePincodeInput = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 6);
};

export const isValidPincodeFormat = (pincode: string): boolean => {
  return /^[1-9][0-9]{5}$/.test(pincode);
};

export const isPincodeServiceable = (pincode: string): boolean => {
  if (!isValidPincodeFormat(pincode)) return false;
  return /^[1-8]/.test(pincode);
};

const addDays = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
};

const getDeliveryDays = (pincode: string): [number, number] => {
  const prefix = pincode.slice(0, 2);
  const firstDigit = Number(pincode[0]);

  if (METRO_PREFIXES.has(prefix)) return [1, 2];
  if (firstDigit >= 7) return [4, 6];
  return [2, 4];
};

export const getDeliveryEstimate = (pincode: string): { eta: string; duration: string } | null => {
  if (!isPincodeServiceable(pincode)) return null;

  const [minDays, maxDays] = getDeliveryDays(pincode);
  const earliest = addDays(minDays);
  const latest = addDays(maxDays);

  return {
    eta: `${formatDate(earliest)} - ${formatDate(latest)}`,
    duration: `${minDays}-${maxDays} business days`,
  };
};
