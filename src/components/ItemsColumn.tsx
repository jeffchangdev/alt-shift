/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { ColumnDiv, ColumnTitle } from './styledComponents';

const Adjust = styled.div`
  margin-left: 2px;
  margin-top: 2px;
`;

const ColumnDropZoneDiv = styled.div`
  font-size: 10px;
`;

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
      <Adjust>{children}</Adjust>
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
        <ColumnDropZoneDiv> column drop zone </ColumnDropZoneDiv>
      </div>
    </ColumnDiv>
  );
}
