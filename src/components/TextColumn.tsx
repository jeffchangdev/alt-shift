/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import { useState } from 'react';
import { ColumnDiv, ColumnTitle } from './styledComponents';

const FlexTitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
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
        <div style={{ marginRight: '4px' }} onClick={handleClick}>
          HIDE
        </div>
      </FlexTitleDiv>
      <textarea value={value} onChange={handleUpdate} spellCheck="false" />
    </ColumnDiv>
  );
}
