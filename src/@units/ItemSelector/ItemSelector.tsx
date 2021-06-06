import SelectInput from '@shared/SelectInput/SelectInput';
import React from 'react';
import { LineInterface, StationInterface } from 'types';

interface ItemSelectorPros {
  items: StationInterface[] | LineInterface[] | null;
  defaultOption: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ItemSelector = ({ items, defaultOption, onChange }: ItemSelectorPros) => {
  return (
    <SelectInput defaultValue="DEFAULT" onChange={onChange} title="노선 이름" className="mb-8 w-full">
      <option value="DEFAULT" disabled hidden>
        {defaultOption}
      </option>
      {items?.map((item: StationInterface | LineInterface) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </SelectInput>
  );
};

export default ItemSelector;
