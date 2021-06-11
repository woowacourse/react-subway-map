import { createContext, ReactNode, useEffect, useState } from 'react';

import SnackBar, { MAX_STACK_NUM } from './SnackBar';

const SNACKBAR_DURATION = 4000;

interface SnackBarProviderProps {
  children: ReactNode;
}

interface SnackBar {
  pushMessage: (message: string) => void;
}

const SnackBarContext = createContext<SnackBar | null>(null);

const keyGenerator = (() => {
  let id = 0;

  return () => id++;
})();

const SnackBarProvider = ({ children }: SnackBarProviderProps) => {
  const [messages, setMessages] = useState<{ id: number; text: string }[]>([]);

  const pushMessage = (message: string): void =>
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
    <SnackBarContext.Provider value={{ pushMessage }}>
      {children}
      {messages.map((message, index, arr) => (
        <SnackBar key={message.id} order={arr.length - index}>
          {message.text}
        </SnackBar>
      ))}
    </SnackBarContext.Provider>
  );
};

export default SnackBarProvider;
export { SnackBarContext };
