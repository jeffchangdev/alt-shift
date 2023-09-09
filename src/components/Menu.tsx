/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { useState } from 'react';
import styled from 'styled-components';
import { ColumnsType, StoreType } from '../types';

type MenuProps = {
  store: StoreType;
  setStore: any;
  columns: ColumnsType;
  setColumns: any;
};

const MenuDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Menu({
  store,
  setStore,
  columns,
  setColumns,
}: MenuProps) {
  console.log('menu refreshed');
  const [text, setText] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleClick = () => {
    if (text === '') return;

    let lastid = '';
    for (const colid in store) lastid = colid;

    const colid = `col${Number(lastid[lastid.length - 1]) + 1}`;
    setStore({
      ...store,
      [colid]: { id: colid, text, value: '' },
    });
    setColumns({
      ...columns,
      [colid]: { id: colid, text, contentids: [] },
    });

    setText('');
  };

  return (
    <MenuDiv>
      <div> currennt columns: </div>
      {Object.values(store).map(({ id, text }) => {
        return <div key={id}> {text} </div>;
      })}
      <input
        type="text"
        placeholder="new column name..."
        value={text}
        onChange={handleChange}
      />
      <button type="button" onClick={handleClick}>
        + column
      </button>
    </MenuDiv>
  );
}
