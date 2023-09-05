/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-useless-return */
import { useState } from 'react';
import styled from 'styled-components';
import initialData from './data';
import { ItemType } from './types';
import TextArea from './textarea';

const AppDiv = styled.div``;

const ColumnsArea = styled.div`
  height: 95vh;
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 10px;
`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  border: 1px solid lightgrey;
  align-items: stretch;
`;

const ColumnTitle = styled.div`
  margin-bottom: 8px;
`;

type ColumnProps = {
  columnid: string;
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

function Column({ columnid, text, children }: ColumnProps) {
  return (
    <ColumnDiv key={columnid}>
      <ColumnTitle>{text}</ColumnTitle>
      {children}
    </ColumnDiv>
  );
}

type ItemProps = {
  itemid: string;
  items: { [key: string]: ItemType };
  level: number;
  onDragEnd: any;
  onDragStart: any;
  onDrop: any;
  onDragOver: any;
};

function Item({ itemid, items, level, ...eventHandlers }: ItemProps) {
  const { text, contentids } = items[itemid];
  const spaces = '\u00A0\u00A0\u00A0\u00A0'.repeat(level);

  return (
    <>
      <div
        draggable
        onDragEnd={eventHandlers.onDragEnd}
        onDragStart={(e) => eventHandlers.onDragStart(e, itemid)}
        onDrop={(e) => eventHandlers.onDrop(e, itemid)}
        onDragOver={eventHandlers.onDragOver}
      >
        {' '}
        {spaces + text}{' '}
      </div>
      {contentids.map((itemid) => {
        return (
          <Item
            itemid={itemid}
            items={items}
            key={itemid}
            level={level + 1}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...eventHandlers}
          />
        );
      })}
    </>
  );
}

function App() {
  const [state, setState] = useState(initialData);
  const [draggedId, setDraggedId] = useState<string>('n/a');

  const { columns, items } = state;

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

    const newState = { ...state };
    setState(newState);
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

    const newState = { ...state };
    setState(newState);
  };

  return (
    <AppDiv>
      <ColumnsArea>
        {Object.values(columns).map(({ id, text, contentids }) => {
          return (
            <Column key={id} columnid={id} text={text}>
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
              <div
                onDragEnd={handleDragEnd}
                onDrop={(e) => handleColumnDrop(e, id)}
                onDragOver={handleDragOver}
                style={{
                  flexGrow: 9999,
                  border: '1px dashed gray',
                  color: 'gray',
                }}
              >
                column drop zone
              </div>
            </Column>
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

export default App;
