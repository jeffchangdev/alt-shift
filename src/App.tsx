/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-useless-return */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ColumnsType, ItemsType, StoreType, DisplayedColumns } from './types';
import ItemsColumn from './components/ItemsColumn';
import TextColumn from './components/TextColumn';
import Item from './components/Item';
import createItems from './utils/createItems';
import createValues from './utils/createValues';
import { checkIsValidDrop } from './utils/utility';
import retrieveInitialData from './api/retrieveInitialData';
import Nav from './components/Nav';

const AppDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const ColumnsArea = styled.div`
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 10px;
`;

interface AppProps {
  userId: string;
}

export default function App({ userId }: AppProps) {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [store, setStore] = useState<StoreType>({});
  const [columns, setColumns] = useState<ColumnsType>({});
  const [items, setItems] = useState<ItemsType>({});
  const [draggedId, setDraggedId] = useState<string>('');
  const [mode, setMode] = useState<'text' | 'items'>('text');
  // eslint-disable-next-line prettier/prettier
  const [displayedColumns, setDisplayedColumns] = useState<DisplayedColumns>({});

  console.log('app refreshed!');
  // window.session = currentSession;
  /*
  window.store = store;
  window.columns = columns;
  window.items = items;
  window.mode = mode;
  window.displayedColumns = displayedColumns;
  */

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey) {
        console.log('alt+shift!');
        console.log(store);
        if (mode === 'text') {
          const { appcolumns, appitems } = createItems(store);
          setColumns(appcolumns);
          setItems(appitems);
          setMode('items');
        } else {
          // mode ==="items"
          const newstore = createValues(columns, items);
          setStore(newstore);
          setMode('text');
        }
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [mode, store, columns, items]);

  if (!loaded) {
    retrieveInitialData(setStore, setDisplayedColumns, setLoaded);
    return <div> </div>;
  }

  // mutating state directly in updateStore
  // store value is not used for rendering while mode is text
  const updateStore = (colid: string, value: string) => {
    store[colid].value = value;
  };

  const handleDragEnd = () => {
    setDraggedId('n/a');
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    dragid: string
  ) => {
    setDraggedId(dragid);
    e.dataTransfer.setData('text/plain', JSON.stringify(items[dragid]));
    console.log(`drag started on item ${items[dragid].text}`);
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    droppedId: string
  ) => {
    e.preventDefault();
    const dropped = e.dataTransfer.getData('text/plain');
    console.log(`dataTansfer getData was: ${dropped}`);
    console.log(`item dropped on was ${items[droppedId].text}`);
    if (checkIsValidDrop(droppedId, draggedId, items) === false) return;

    const oldParentId = items[draggedId].parentid;
    const newParentId = items[droppedId].parentid;

    const oldContentIds =
      items[oldParentId] !== undefined
        ? items[oldParentId].contentids
        : columns[oldParentId].contentids;

    const newContentids =
      items[newParentId] !== undefined
        ? items[newParentId].contentids
        : columns[newParentId].contentids;

    const oldIndex = oldContentIds.indexOf(draggedId);
    const newIndex = newContentids.indexOf(droppedId);

    // remove old item, add new item
    oldContentIds.splice(oldIndex, 1);
    newContentids.splice(newIndex, 0, draggedId);
    items[draggedId].parentid = newParentId;

    setColumns({ ...columns });
    setItems({ ...items });
  };

  const handleNestedDrop = (
    e: React.DragEvent<HTMLDivElement>,
    droppedId: string
  ) => {
    e.preventDefault();
    if (checkIsValidDrop(droppedId, draggedId, items) === false) return;

    const draggedObject = items[draggedId];
    const oldParentId = draggedObject.parentid;
    const oldParent =
      items[oldParentId] !== undefined
        ? items[oldParentId]
        : columns[oldParentId];
    const newParent = items[droppedId];

    if (newParent.id === oldParent.id) return;

    newParent.contentids.unshift(draggedId);
    oldParent.contentids = oldParent.contentids.filter(
      (id) => id !== draggedId
    );
    draggedObject.parentid = newParent.id;
    setItems({ ...items });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleColumnDrop = (
    e: React.DragEvent<HTMLDivElement>,
    droppedId: string
  ) => {
    if (!columns || !items) return;
    e.preventDefault();
    console.log(`item dropped on was ${columns[droppedId].text}`);
    const oldParentId = items[draggedId].parentid;
    const newParentId = droppedId;

    const oldContentIds =
      items[oldParentId] !== undefined
        ? items[oldParentId].contentids
        : columns[oldParentId].contentids;

    const oldIndex = oldContentIds.indexOf(draggedId);

    oldContentIds.splice(oldIndex, 1);
    columns[newParentId].contentids.push(draggedId);
    items[draggedId].parentid = newParentId;

    setColumns({ ...columns });
    setItems({ ...items });
  };

  if (loaded) {
    return (
      <AppDiv>
        <Nav
          store={store}
          setStore={setStore}
          columns={columns}
          setColumns={setColumns}
          display={displayedColumns}
          setDisplay={setDisplayedColumns}
          items={items}
          userid={userId}
          mode={mode}
        />
        {mode === 'text' && (
          <ColumnsArea>
            {Object.values(store).map((col) => {
              return (
                <TextColumn
                  key={col.id}
                  col={col}
                  update={(value: string) => updateStore(col.id, value)}
                  display={displayedColumns}
                  setDisplay={setDisplayedColumns}
                />
              );
            })}
          </ColumnsArea>
        )}
        {mode === 'items' && (
          <ColumnsArea>
            {Object.values(columns).map((col) => {
              return (
                <ItemsColumn
                  key={col.id}
                  columnid={col.id}
                  text={col.text}
                  display={displayedColumns}
                  setDisplay={setDisplayedColumns}
                  onDragEnd={handleDragEnd}
                  onDrop={handleColumnDrop}
                  onDragOver={handleDragOver}
                >
                  {col.contentids.map((itemid) => {
                    return (
                      <Item
                        key={itemid}
                        itemid={itemid}
                        items={items}
                        level={0}
                        onDragEnd={handleDragEnd}
                        onDragStart={handleDragStart}
                        onDrop={handleDrop}
                        onNestedDrop={handleNestedDrop}
                        onDragOver={handleDragOver}
                      />
                    );
                  })}
                </ItemsColumn>
              );
            })}
          </ColumnsArea>
        )}
      </AppDiv>
    );
  }
}
