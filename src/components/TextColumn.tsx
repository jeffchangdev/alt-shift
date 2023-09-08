/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { ColumnDiv, ColumnTitle } from './styledComponents';

type TextColumnProps = {
  col: {
    text: string;
    value: string;
  };
  update: any;
};

export default function TextColumn({ col, update }: TextColumnProps) {
  const [value, setValue] = useState(col.value);

  /* fail
  useEffect(() => {
    return () => {
      console.log(`dismounted with value ${value}`);
      update(value);
    };
  }, [value]);
  */

  const handleUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    update(e.target.value);
  };

  return (
    <ColumnDiv>
      <ColumnTitle>{col.text}</ColumnTitle>
      <textarea value={value} onChange={handleUpdate} spellCheck="false" />
    </ColumnDiv>
  );
}
