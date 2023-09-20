/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { LiaWindowMinimize } from 'react-icons/lia';
import { ColumnDiv, ColumnTitle, FlexTitleDiv } from './styledComponents';

const Adjust = styled.div`
  margin-left: 2px;
  margin-top: 8px;
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
  console.log(`${text} rendered!`);
  const displayValue = display[columnid].displayed ? 'flex' : 'none';
  const columnId = text.split(' ').join('%20');

  const handleClick = () => {
    const updatedDisplay = { ...display };
    updatedDisplay[columnid].displayed = false;
    setDisplay(updatedDisplay);
  };

  return (
    <div style={{ display: displayValue, flexDirection: 'column' }}>
      <FlexTitleDiv>
        <ColumnTitle>
          <a href={`/qrcode/${columnId}`}> {text} </a>
        </ColumnTitle>
        <div
          style={{ marginRight: '2px', marginTop: '4px' }}
          onClick={handleClick}
        >
          <LiaWindowMinimize />
        </div>
      </FlexTitleDiv>
      <ColumnDiv>
        <Adjust> {children} </Adjust>
        <div
          onDragEnd={onDragEnd}
          onDrop={(e) => onDrop(e, columnid)}
          onDragOver={onDragOver}
          style={{
            flexGrow: 1,
            // border: '1px dashed gray',
            // color: 'gray',
            backgroundColor: 'white',
          }}
        />
      </ColumnDiv>
    </div>
  );
}
