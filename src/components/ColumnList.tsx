/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import supabase from '../supabaseClient';
import { StoreType, ColumnsType, DisplayedColumns } from '../types';
import { createColumn, createStoreObj } from '../utils/utility';

type ColumnsDisplayProps = {
  store: StoreType;
  setStore: any;
  columns: ColumnsType;
  setColumns: any;
  display: DisplayedColumns;
  setDisplay: any;
  userid: string;
};

export default function ColumnList({
  store,
  setStore,
  columns,
  setColumns,
  display,
  setDisplay,
  userid,
}: ColumnsDisplayProps) {
  const [isEditable, setIsEditable] = useState(false);
  const [text, setText] = useState<string>('');

  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleAdd = async () => {
    if (text === '') return;
    if (store[text] !== undefined) return;

    const { data, error } = await supabase
      .from('column')
      .insert([{ user_id: userid, column_id: text, value: '' }])
      .select();

    if (error) {
      console.log('database failed to add column');
      return;
    }

    setStore({
      ...store,
      [text]: createStoreObj(data[0].db_id, text, text, ''),
    });
    setColumns({
      ...columns,
      [text]: createColumn(data[0].db_id, text, text, []),
    });
    setText('');
  };

  const handleDelete = async (id: string, db_id: number) => {
    console.log(`delete invoked with ${db_id}`);
    const { error } = await supabase.from('column').delete().eq('db_id', db_id);

    if (error) {
      console.log('column could not be deleted');
      return;
    }

    const newstore = { ...store };
    const newcolumns = { ...columns };
    delete newstore[id];
    delete newcolumns[id];
    setStore(newstore);
    setColumns(newcolumns);
  };

  const handleShow = (colid: string) => {
    const updatedDisplay = { ...display };
    updatedDisplay[colid].displayed = true;
    setDisplay(updatedDisplay);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="new column name..."
        value={text}
        onChange={handleChange}
        style={{ width: '90%' }}
      />
      <button type="button" onClick={handleAdd}>
        + column
      </button>
      <div>
        {Object.values(store).map((col) => {
          return (
            <div key={col.id} style={{ display: 'flex' }}>
              <div onClick={() => handleShow(col.id)}>{col.text}</div>
              {isEditable && (
                <div
                  onClick={() => handleDelete(col.id, col.db_id)}
                  style={{ marginLeft: '6px', cursor: 'pointer' }}
                >
                  x
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button type="button" onClick={handleEdit}>
        edit
      </button>
    </div>
  );
}
