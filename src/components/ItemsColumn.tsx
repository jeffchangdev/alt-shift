/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { ColumnDiv, ColumnTitle } from './styledComponents';

const Adjust = styled.div`
  margin-left: 2px;
  margin-top: 2px;
`;

const FlexTitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

type ItemsColumnProps = {
  columnid: string;
  text: string;
  display: any;
  setDisplay: any;
  children: any;
  onDragEnd: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, droppedId: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
};

export default function ItemsColumn({
  columnid,
  text,
  display,
  setDisplay,
  children,
  onDragEnd,
  onDrop,
  onDragOver,
}: ItemsColumnProps) {
  const displayValue = display[columnid].displayed ? 'inherit' : 'none';

  const handleClick = () => {
    const updatedDisplay = { ...display };
    updatedDisplay[columnid].displayed = false;
    setDisplay(updatedDisplay);
  };

  return (
    <ColumnDiv display={displayValue}>
      <FlexTitleDiv>
        <ColumnTitle>{text}</ColumnTitle>
        <div style={{ marginRight: '4px' }} onClick={handleClick}>
          HIDE
        </div>
      </FlexTitleDiv>
      <Adjust>{children}</Adjust>
      <div
        onDragEnd={onDragEnd}
        onDrop={(e) => onDrop(e, columnid)}
        onDragOver={onDragOver}
        style={{
          flexGrow: 1,
          border: '1px dashed gray',
          color: 'gray',
        }}
      >
        column drop zone
      </div>
    </ColumnDiv>
  );
}
