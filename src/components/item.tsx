/* eslint-disable no-console */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import styled from 'styled-components';
import { ItemType } from '../types';

const ItemDiv = styled.div`
  display: flex;
  background-color: #fff;
`;

type ItemProps = {
  itemid: string;
  items: { [key: string]: ItemType };
  level: number;
  onDragEnd: any;
  onDragStart: any;
  onDrop: any;
  onNestedDrop: any;
  onDragOver: any;
};

export default function Item({
  itemid,
  items,
  level,
  ...eventHandlers
}: ItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { text, contentids } = items[itemid];
  const spaces = '\u00A0\u00A0'.repeat(level);

  return (
    <>
      <ItemDiv>
        <div
          draggable
          onDragEnd={eventHandlers.onDragEnd}
          onDragStart={(e) => eventHandlers.onDragStart(e, itemid)}
          onDrop={(e) => eventHandlers.onDrop(e, itemid)}
          onDragOver={eventHandlers.onDragOver}
        >
          {`${spaces} : ${text}`}
        </div>
        <div
          style={{
            color: isHovered ? 'gray' : 'white',
            flexGrow: 1,
            textAlign: 'left',
            fontSize: '11px',
          }}
          onDragEnd={eventHandlers.onDragEnd}
          onDrop={(e) => {
            eventHandlers.onNestedDrop(e, itemid);
            setIsHovered(false);
          }}
          onDragOver={eventHandlers.onDragOver}
          onDragEnter={() => setIsHovered(true)}
          onDragLeave={() => setIsHovered(false)}
        >
          ↓
        </div>
      </ItemDiv>
      {contentids.map((itemid: string) => {
        return (
          <Item
            itemid={itemid}
            items={items}
            key={itemid}
            level={level + 1}
            {...eventHandlers}
          />
        );
      })}
    </>
  );
}
