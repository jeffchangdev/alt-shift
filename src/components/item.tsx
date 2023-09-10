/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { ItemType } from '../types';

const ItemDiv = styled.div`
  display: flex;
  background-color: #fcfcfc;
`;

const Icon = styled.p`
  display: inline;
  color: gray;
  margin-left: 2px;
  font-size: 9px;
  margin-top: 2.5px;
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

function DropIcon() {
  return (
    <Icon>
      &nbsp;<b>:</b>&nbsp;
    </Icon>
  );
}

export default function Item({
  itemid,
  items,
  level,
  ...eventHandlers
}: ItemProps) {
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
          {spaces + text}
        </div>
        <div
          onDragEnd={eventHandlers.onDragEnd}
          onDrop={(e) => eventHandlers.onNestedDrop(e, itemid)}
          onDragOver={eventHandlers.onDragOver}
          style={{ marginTop: '-.5px' }}
        >
          <DropIcon />
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
