/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-useless-return */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import initialData from './data';
import { ItemType } from './types';

const AppDiv = styled.div`
  font-size: 13px;
`;

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
  id: string;
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
};

function Column({ id, text, children }: ColumnProps) {
  return (
    <ColumnDiv key={id}>
      <ColumnTitle>{text}</ColumnTitle>
      {children}
    </ColumnDiv>
  );
}

type ItemProps = {
  onDragEnd: any;
  onDragStart: any;
  onDrop: any;
  onDragOver: any;
  itemid: string;
  items: { [key: string]: ItemType };
  level: number;
};

function Item({
  onDragEnd,
  onDragStart,
  onDrop,
  onDragOver,
  itemid,
  items,
  level,
}: ItemProps) {
  const { text, contentids } = items[itemid];
  const spaces = '\u00A0\u00A0\u00A0\u00A0'.repeat(level);
  return (
    <>
      <div
        draggable
        onDragEnd={onDragEnd}
        onDragStart={(e) => onDragStart(e, itemid)}
        onDrop={(e) => onDrop(e, itemid)}
        onDragOver={onDragOver}
      >
        {' '}
        {spaces + text}{' '}
      </div>
      {contentids.map((itemid) => {
        return (
          <Item
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onDragOver={onDragOver}
            itemid={itemid}
            items={items}
            key={itemid}
            level={level + 1}
          />
        );
      })}
    </>
  );
}

function App() {
  const [state] = useState(initialData);
  const { columns, items } = state;
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  const handleDragEnd = () => {
    setDraggedItemId(null);
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    dragid: string
  ) => {
    setDraggedItemId(dragid);
    e.dataTransfer.setData('text/plain', JSON.stringify(items[dragid]));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropid: string) => {
    e.preventDefault();
    const dropped = e.dataTransfer.getData('text/plain');
    console.log(`dataTansfer getData was: ${dropped}`);
    console.log(`item dropped on was ${items[dropid].text}`);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (draggedItemId !== null) {
      console.log(`drag started on item ${items[draggedItemId].text}`);
    }
  }, [draggedItemId, items]);

  return (
    <AppDiv>
      <ColumnsArea>
        {Object.values(columns).map(({ id, text, contentids }) => {
          return (
            <Column key={id} id={id} text={text}>
              {contentids.map((itemid) => {
                return (
                  <Item
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    itemid={itemid}
                    items={items}
                    key={itemid}
                    level={0}
                  />
                );
              })}
            </Column>
          );
        })}
      </ColumnsArea>
    </AppDiv>
  );
}

export default App;
