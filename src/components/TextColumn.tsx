/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { useState } from 'react';
import { LiaWindowMinimize } from 'react-icons/lia';
import { ColumnDiv, ColumnTitle, FlexTitleDiv } from './styledComponents';

const Adjust = styled.div`
  margin-left: 2px;
  margin-top: 6px;
  height: 90%;
`;

type TextColumnProps = {
  col: {
    text: string;
    value: string;
  };
  update: any;
  display: any;
  setDisplay: any;
};

export default function TextColumn({
  col,
  update,
  display,
  setDisplay,
}: TextColumnProps) {
  const [value, setValue] = useState(col.value);
  const displayValue = display[col.text].displayed ? 'inherit' : 'none';
  const columnid = col.text.split(' ').join('%20');

  const handleClick = () => {
    const updatedDisplay = { ...display };
    updatedDisplay[col.text].displayed = false;
    setDisplay(updatedDisplay);
  };

  /* FAIL on dismount returns the last textarea value which is one character behind
  useEffect(() => {
    return () => {
      console.log(`dismounted with value ${value}`);
      setStore((store) => ({
        ...store,
        [col.id]: { id: col.id, text: col.text, value },
      }));
    };
  }, [value]);
  */

  const handleUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    update(e.target.value); // mutating app state here
  };

  return (
    <ColumnDiv display={displayValue}>
      <FlexTitleDiv>
        <ColumnTitle>
          <a href={`/qrcode/${columnid}`}> {col.text} </a>
        </ColumnTitle>
        <div
          style={{ marginRight: '2px', marginTop: '4px' }}
          onClick={handleClick}
        >
          <LiaWindowMinimize />
        </div>
      </FlexTitleDiv>
      <Adjust>
        <textarea value={value} onChange={handleUpdate} spellCheck="false" />
      </Adjust>
    </ColumnDiv>
  );
}
