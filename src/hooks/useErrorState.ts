import { useCallback, useState } from 'react';

export const useErrorState = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const clear = useCallback(() => {
    setVisible(false);
    setMessage('');
  }, []);

  return {
    visible,
    message,
    setVisible,
    setMessage,
    clear,
  };
};
