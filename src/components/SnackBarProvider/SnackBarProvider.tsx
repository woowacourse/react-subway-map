import { createContext, ReactNode, useEffect, useState } from 'react';

import SnackBar, { MAX_STACK_NUM } from './SnackBar/SnackBar';

const SNACKBAR_DURATION = 1500;

interface SnackBarProviderProps {
  children: ReactNode;
}

const SnackBarContext = createContext({});

const keyGenerator = (() => {
  let id = 0;

  return () => id++;
})();

const SnackBarProvider = ({ children }: SnackBarProviderProps) => {
  const [messages, setMessages] = useState<{ id: number; text: string }[]>([]);

  const addMessage = (message: string): void =>
    setMessages((messages) => {
      const newMessages = [...messages, { id: keyGenerator(), text: message }];

      if (newMessages.length === MAX_STACK_NUM + 1) {
        return newMessages.slice(1);
      }

      return newMessages;
    });

  const messageIds = messages.join();

  useEffect(() => {
    if (messageIds.length > 0) {
      const timer = setTimeout(() => {
        setMessages((messages) => messages.slice(1));
      }, SNACKBAR_DURATION);

      return () => clearTimeout(timer);
    }
  }, [messageIds]);

  return (
    <SnackBarContext.Provider value={{ addMessage }}>
      {children}
      {messages.map((message, index, arr) => (
        <SnackBar key={message.id} duration={SNACKBAR_DURATION} order={arr.length - index}>
          {message.text}
        </SnackBar>
      ))}
    </SnackBarContext.Provider>
  );
};

export default SnackBarProvider;
export { SnackBarContext };
