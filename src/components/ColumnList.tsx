/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import styled from 'styled-components';
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

const ColumnListDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

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
    setDisplay({
      ...display,
      [text]: { displayed: true },
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
    const newdisplay = { ...display };
    delete newstore[id];
    delete newcolumns[id];
    delete newdisplay[id];
    setStore(newstore);
    setColumns(newcolumns);
    setDisplay(newdisplay);
  };

  const handleShowHide = (colid: string) => {
    const updatedDisplay = { ...display };
    updatedDisplay[colid].displayed = !display[colid].displayed;
    setDisplay(updatedDisplay);
  };

  return (
    <ColumnListDiv>
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <input
          type="text"
          placeholder="new column name..."
          value={text}
          onChange={handleChange}
          style={{ width: '75%' }}
        />
        <div
          className="buttondiv"
          onClick={handleAdd}
          style={{ cursor: 'pointer', width: '20%' }}
        >
          +
        </div>
      </div>
      <div
        className="buttondiv"
        onClick={handleEdit}
        style={{ marginTop: '8px' }}
      >
        Edit
      </div>
      <div style={{ marginTop: '8px' }}>
        {Object.values(store).map((col) => {
          return (
            <div key={col.id} style={{ display: 'flex' }}>
              <div
                onClick={() => handleShowHide(col.id)}
                style={{
                  color: display[col.id].displayed ? 'white' : 'gray',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {col.text}
              </div>
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
    </ColumnListDiv>
  );
}
