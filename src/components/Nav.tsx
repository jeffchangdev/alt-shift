/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */
import { useState } from 'react';
import styled from 'styled-components';
import { RiMenuLine, RiMenuFoldLine, RiLogoutBoxRLine } from 'react-icons/ri';
import supabase from '../supabaseClient';
import { StoreType, ColumnsType, ItemsType, DisplayedColumns } from '../types';
import ColumnList from './ColumnList';
import SaveButton from './SaveButton';

type NavProps = {
  mode: string;
  store: StoreType;
  setStore: any;
  columns: ColumnsType;
  setColumns: any;
  display: DisplayedColumns;
  setDisplay: any;
  items: ItemsType;
  userid: any;
};

const NavDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow:
    0px 12px 16px -10px rgba(0, 0, 0, 0.24),
    0px 0px 10px 0px rgba(0, 0, 0, 0.22);
`;

const LogoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
  display,
  setDisplay,
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
      <div style={{ width: '83%' }}>
        <IconDiv>
          {isExpanded ? (
            <RiMenuFoldLine onClick={toggleSidebar} />
          ) : (
            <RiMenuLine onClick={toggleSidebar} />
          )}
        </IconDiv>
        {isExpanded && (
          <ColumnList
            store={store}
            setStore={setStore}
            columns={columns}
            setColumns={setColumns}
            display={display}
            setDisplay={setDisplay}
            userid={userid}
          />
        )}
        {isExpanded && (
          <SaveButton
            mode={mode}
            store={store}
            columns={columns}
            items={items}
            userid={userid}
          />
        )}
      </div>
      {isExpanded && (
        <LogoutWrapper style={{ width: '83%' }}>
          <div
            className="buttondiv"
            onClick={handleLogout}
            style={{ marginBottom: '35px', cursor: 'pointer', width: '100%' }}
          >
            <RiLogoutBoxRLine /> Logout
          </div>
        </LogoutWrapper>
      )}
    </NavDiv>
  );
}
