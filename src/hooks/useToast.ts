import { useEffect, useState } from 'react';

export const useToast = (duration = 1800) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(''), duration);
    return () => clearTimeout(timer);
  }, [duration, message]);

  return { message, setMessage };
};
