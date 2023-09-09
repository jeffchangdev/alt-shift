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
    <ColumnDiv>
      <ColumnTitle>{col.text}</ColumnTitle>
      <textarea value={value} onChange={handleUpdate} spellCheck="false" />
    </ColumnDiv>
  );
}
