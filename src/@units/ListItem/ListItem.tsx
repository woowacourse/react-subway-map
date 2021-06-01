import React from 'react';
import delImg from 'assets/images/trash.png';

interface ListItemProps {
  id: number;
  title: string;
  editImg?: string | null;
  itemColor?: string | null;
  onDelete: (id: number, title: string) => void;
}

const ListItem = ({ id, onDelete, title, editImg, itemColor }: ListItemProps) => {
  const handleDelete = () => {
    onDelete(id, title);
  };

  return (
    <li className="flex items-center justify-between p-3 border-b border-gray-200">
      <div className="flex items-center">
        {itemColor && <div className={`rounded-full w-3 h-3  mr-2.5 ${itemColor}`} />}
        <span>{title}</span>
      </div>
      <div className="flex items-center">
        {editImg && (
          <button className="flex items-center mr-2 focus:outline-none hover:opacity-100 opacity-30" type="button">
            <img alt="editImg" src={editImg} />
          </button>
        )}
        <button
          className="flex items-center focus:outline-none hover:opacity-100 opacity-30"
          type="button"
          onClick={handleDelete}
        >
          <img alt="deleteImg" src={delImg} />
        </button>
      </div>
    </li>
  );
};

ListItem.defaultProps = {
  editImg: null,
  itemColor: null,
};

export default ListItem;
