/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ItemType } from '../types';

type ItemProps = {
  itemid: string;
  items: { [key: string]: ItemType };
  level: number;
  onDragEnd: any;
  onDragStart: any;
  onDrop: any;
  onDragOver: any;
};

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
      <div
        draggable
        onDragEnd={eventHandlers.onDragEnd}
        onDragStart={(e) => eventHandlers.onDragStart(e, itemid)}
        onDrop={(e) => eventHandlers.onDrop(e, itemid)}
        onDragOver={eventHandlers.onDragOver}
      >
        {spaces + text}
      </div>
      {contentids.map((itemid: string) => {
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
