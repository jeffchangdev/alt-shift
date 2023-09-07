/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-useless-return */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { columnData, itemData } from './data';
import { ColumnDiv, ColumnTitle } from './components/styledComponents';
import ItemsColumn from './components/ItemsColumn';
import TextColumn from './components/TextColumn';
import Item from './components/Item';
import TextArea from './components/TextArea';

const AppDiv = styled.div``;

const ColumnsArea = styled.div`
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 10px;
`;

function App() {
  const [columns, setColumns] = useState(columnData);
  const [items, setItems] = useState(itemData);
  const [draggedId, setDraggedId] = useState<string>('n/a');
  const [mode, setMode] = useState('items');

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey) {
        console.log('alt+shift!');
        setMode(mode === 'items' ? 'text' : 'items');
        console.log(`new mode,${mode}`);
      }
    };
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [mode]);

  if (mode === 'text') {
    return (
      <AppDiv>
        <ColumnsArea>
          {Object.values(columns).map((column) => {
            return <TextColumn key={column.id} obj={column} items={items} />;
          })}
          <ColumnDiv>
            <ColumnTitle>test column</ColumnTitle>
            <TextArea columns={columns} items={items} />
          </ColumnDiv>
        </ColumnsArea>
      </AppDiv>
    );
  }

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

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleColumnDrop = (
    e: React.DragEvent<HTMLDivElement>,
    droppedId: string
  ) => {
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

  if (mode === 'items') {
    return (
      <AppDiv>
        <ColumnsArea>
          {Object.values(columns).map(({ id, text, contentids }) => {
            return (
              <ItemsColumn
                key={id}
                columnid={id}
                text={text}
                onDragEnd={handleDragEnd}
                onDrop={handleColumnDrop}
                onDragOver={handleDragOver}
              >
                {contentids.map((itemid) => {
                  return (
                    <Item
                      key={itemid}
                      itemid={itemid}
                      items={items}
                      level={0}
                      onDragEnd={handleDragEnd}
                      onDragStart={handleDragStart}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                    />
                  );
                })}
              </ItemsColumn>
            );
          })}
          <ColumnDiv>
            <ColumnTitle>test column</ColumnTitle>
            <TextArea columns={columns} items={items} />
          </ColumnDiv>
        </ColumnsArea>
      </AppDiv>
    );
  }
}

export default App;
