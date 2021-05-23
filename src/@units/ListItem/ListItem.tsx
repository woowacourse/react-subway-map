import React from 'react';
import delImg from 'assets/images/trash.png';

interface ListItemProps {
  title: string;
  editImg?: string | null;
}

const ListItem = ({ title, editImg }: ListItemProps) => {
  return (
    <li className="flex items-center justify-between p-3 border-b border-gray-200">
      <span>{title}</span>
      <div>
        {editImg && (
          <button className="flex items-center mr-4 focus:outline-none hover:opacity-100 opacity-30" type="button">
            <img src={editImg} alt="editImg" />
          </button>
        )}
        <button className="flex items-center focus:outline-none hover:opacity-100 opacity-30" type="button">
          <img src={delImg} alt="deleteImg" />
        </button>
      </div>
    </li>
  );
};

ListItem.defaultProps = {
  editImg: null,
};

export default ListItem;
