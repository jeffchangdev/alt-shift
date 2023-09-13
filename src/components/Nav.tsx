/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
import { useState } from 'react';
import styled from 'styled-components';
import { RiLogoutBoxLine, RiMenuLine } from 'react-icons/ri';
import supabase from '../supabaseClient';
import { StoreType, ColumnsType } from '../types';

type NavProps = {
  store: StoreType;
  setStore: any;
  columns: ColumnsType;
  setColumns: any;
  userid: any;
};

function Columns({ store, setStore, columns, setColumns, userid }: NavProps) {
  const [isEditable, setIsEditable] = useState(false);
  const [text, setText] = useState<string>('');

  const cols = Object.values(store);

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleAddClick = async () => {
    if (text === '') return;
    if (store[text] !== undefined) return;
    const testvalue =
      'dreamland\n  bean\n    elfo\n    luci\n  king zog\n  king oona';
    await supabase
      .from('column')
      .insert([{ user_id: userid, column_id: text, value: testvalue }]);
    setStore({ ...store, [text]: { id: text, text, value: '' } });
    setColumns({ ...columns, [text]: { id: text, text, contentids: [] } });
    setText('');
  };

  const handleDelete = (id: string) => {
    const newstore = { ...store };
    const newcolumns = { ...columns };
    delete newstore[id];
    delete newcolumns[id];
    setStore(newstore);
    setColumns(newcolumns);
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
      <button type="button" onClick={handleAddClick}>
        + column
      </button>
      <div>
        {cols.map((col) => {
          return (
            <div key={col.id} style={{ display: 'flex' }}>
              <div> {col.text} </div>
              {isEditable && (
                <div
                  onClick={() => handleDelete(col.id)}
                  style={{ marginLeft: '6px', cursor: 'pointer' }}
                >
                  x
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button type="button" onClick={handleEditClick}>
        edit
      </button>
    </div>
  );
}

const NavDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function Nav({
  store,
  setStore,
  columns,
  setColumns,
  userid,
}: NavProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  };

  /*
  const upsertData = async () => {
    const updates = [];
    for (const key in store) {
      const { db_id, id, value } = store[key];
      update.push({ db_id, column_id: id, value });
    }
    await supabase.from('column').upsert(updates);
  };
  */

  return (
    <NavDiv className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
      <div>
        <div
          style={{
            fontSize: '30px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <RiMenuLine onClick={toggleSidebar} className="toggle-button" />
        </div>
        {isExpanded && (
          <Columns
            store={store}
            setStore={setStore}
            columns={columns}
            setColumns={setColumns}
            userid={userid}
          />
        )}
      </div>
      <div
        style={{
          marginBottom: '30px',
          fontSize: '20px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <RiLogoutBoxLine onClick={handleLogout} style={{ cursor: 'pointer' }} />
      </div>
    </NavDiv>
  );
}
