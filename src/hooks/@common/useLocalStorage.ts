import { useState, useRef, useLayoutEffect, SetStateAction, Dispatch, useCallback } from "react";

type parseOption<Item> =
  | {
      isRawItem: true;
    }
  | {
      isRawItem: false;
      stringifier: (value: Item) => string;
      parser: (value: string) => Item;
    };

const useLocalStorage = <Item extends string>(key: string, defaultItem: Item, parserOption?: parseOption<Item>) => {
  if (!key) {
    throw Error("키가 런타임에서 올바르게 제공되지 않았습니다!");
  }

  const getParser = (parserOption?: parseOption<Item>) => {
    if (!parserOption) {
      return JSON.parse;
    }

    if (parserOption.isRawItem) {
      return (value: string) => value;
    }

    return parserOption.parser;
  };

  const parser = getParser(parserOption);

  const initializer = useRef((key: string) => {
    try {
      const localStorageValue = localStorage.getItem(key);

      if (!localStorageValue) {
        localStorage.setItem(key, defaultItem);
        return defaultItem;
      }

      return parser(localStorageValue);
    } catch (error) {
      /** 이용자의 브라우저가 시크릿 모드에서 localStorage 접근이 불가한 경우를 위함 */
      return defaultItem;
    }
  });

  const [item, setItem] = useState<Item>(() => initializer.current(key));

  useLayoutEffect(() => setItem(initializer.current(key)), [key]);

  const getValue = (newState: Item, parserOption?: parseOption<Item>) => {
    if (!parserOption) {
      return JSON.stringify(newState);
    }

    if (parserOption.isRawItem && typeof newState === "string") {
      return newState;
    }

    return JSON.stringify(newState);
  };

  const set: Dispatch<SetStateAction<Item>> = useCallback(
    (valueOrFunction) => {
      const newState = typeof valueOrFunction === "function" ? valueOrFunction(item) : valueOrFunction;
      const value = getValue(newState, parserOption);
      try {
        localStorage.setItem(key, value);

        setItem(parser(value));
      } catch (error) {
        /** 이용자의 브라우저가 시크릿 모드에서 localStorage 접근이 불가한 경우를 위함 */
        return;
      }

      if (newState === undefined) {
        return;
      }
    },
    [key, setItem]
  );

  return { item, set };
};

export default useLocalStorage;
