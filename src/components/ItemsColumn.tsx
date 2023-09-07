/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDiv, ColumnTitle } from './styledComponents';

type ItemsColumnProps = {
  columnid: string;
  text: string;
  children: any;
  onDragEnd: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, droppedId: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
};

export default function ItemsColumn({
  columnid,
  text,
  children,
  onDragEnd,
  onDrop,
  onDragOver,
}: ItemsColumnProps) {
  return (
    <ColumnDiv key={columnid}>
      <ColumnTitle>{text}</ColumnTitle>
      {children}
      <div
        onDragEnd={onDragEnd}
        onDrop={(e) => onDrop(e, columnid)}
        onDragOver={onDragOver}
        style={{
          flexGrow: 9999,
          border: '1px dashed gray',
          color: 'gray',
        }}
      >
        column drop zone
      </div>
    </ColumnDiv>
  );
}
