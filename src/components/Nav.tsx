/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
import { useState } from 'react';
import styled from 'styled-components';
import {
  RiLogoutBoxLine,
  RiMenuLine,
  RiMenuFoldLine,
  RiSave2Line,
} from 'react-icons/ri';
import supabase from '../supabaseClient';
import { StoreType, ColumnsType, ItemsType } from '../types';
import saveData from '../api/saveData';
import ColumnsDisplay from './ColumnsDisplay';

type NavProps = {
  mode: string;
  store: StoreType;
  setStore: any;
  columns: ColumnsType;
  setColumns: any;
  items: ItemsType;
  userid: any;
};

const NavDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const IconDiv = styled.div`
  font-size: 25px;
  display: flex;
  justify-content: center;
`;

export default function Nav({
  store,
  setStore,
  columns,
  setColumns,
  items,
  userid,
  mode,
}: NavProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  console.log('nav refreshed!');
  console.log(items);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  };

  return (
    <NavDiv className={`sidebar ${isExpanded ? 'expanded' : ''}`}>
      <div>
        <IconDiv>
          {isExpanded ? (
            <RiMenuFoldLine onClick={toggleSidebar} />
          ) : (
            <RiMenuLine onClick={toggleSidebar} />
          )}
        </IconDiv>
        <IconDiv>
          <RiSave2Line
            onClick={() => saveData(mode, store, columns, items, userid)}
          />
        </IconDiv>
        {isExpanded && (
          <ColumnsDisplay
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
          fontSize: '25px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <RiLogoutBoxLine onClick={handleLogout} style={{ cursor: 'pointer' }} />
      </div>
    </NavDiv>
  );
}
