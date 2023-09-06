/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';

export const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  border: 1px solid lightgrey;
  align-items: stretch;
`;

export const ColumnTitle = styled.div`
  margin-bottom: 8px;
`;

type ColumnProps = {
  columnid: string;
  text: string;
  children: any;
  onDragEnd: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, droppedId: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
};

export function Column({
  columnid,
  text,
  children,
  onDragEnd,
  onDrop,
  onDragOver,
}: ColumnProps) {
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
