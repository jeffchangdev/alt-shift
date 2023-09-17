/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import saveData from '../api/saveData';
import { ColumnsType, ItemsType, StoreType } from '../types';

type SaveButtonProps = {
  mode: string;
  store: StoreType;
  columns: ColumnsType;
  items: ItemsType;
  userid: string;
};

export default function SaveButton({
  mode,
  store,
  columns,
  items,
  userid,
}: SaveButtonProps) {
  const [buttonText, setButtonText] = useState<string>('Save');

  return (
    <div
      className="buttondiv"
      style={{
        marginTop: '8px',
      }}
      onClick={() =>
        saveData(mode, store, columns, items, userid, setButtonText)
      }
    >
      {buttonText}
    </div>
  );
}
