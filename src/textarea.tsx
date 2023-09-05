/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import { useState } from 'react';
import { ColumnType, ItemType } from './types';

function generateText(
  obj: ColumnType | ItemType,
  items: { [key: string]: ItemType }
) {
  let text = '';
  const indent = '  ';
  const recurse = (obj: ColumnType | ItemType, level: number) => {
    for (const itemid of obj.contentids) {
      text = text.concat(`\n${indent.repeat(level)}${items[itemid].text}`);
      recurse(items[itemid], level + 1);
    }
  };
  recurse(obj, 0);
  return text;
}

type TextAreaProps = {
  columns: { [key: string]: ColumnType };
  items: { [key: string]: ItemType };
};

export default function TextArea({ columns, items }: TextAreaProps) {
  // const initialText = 'enter\n  text\n    here';
  const columnText = generateText(columns.col1, items);
  const [value, setValue] = useState(columnText);

  const handleUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    // console.log(JSON.stringify(value));
    console.log(value);
  };

  return (
    <>
      <textarea value={value} onChange={handleUpdate} spellCheck="false" />
      <button type="button" onClick={handleClick}>
        log to console
      </button>
    </>
  );
}
