import { useState } from "react";

export const useToggle = (initialValue) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return [isOpen, open, close];
};
