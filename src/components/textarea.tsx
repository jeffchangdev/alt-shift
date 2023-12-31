/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import { useState } from 'react';
import { ColumnType, ItemType } from '../types';

function generateText(
  obj: ColumnType | ItemType,
  items: { [key: string]: ItemType }
) {
  let text = '';
  const indent = '  ';
  const recurse = (obj: ColumnType | ItemType, level: number) => {
    for (const itemid of obj.contentids) {
      text = text.concat(`${indent.repeat(level)}${items[itemid].text}\n`);
      recurse(items[itemid], level + 1);
    }
  };
  recurse(obj, 0);
  return text.substring(0, text.length - 1);
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
    console.log(JSON.stringify(value));
  };

  const forceUpdate = () => {
    setValue(generateText(columns.col1, items));
  };

  return (
    <>
      <textarea value={value} onChange={handleUpdate} spellCheck="false" />
      <button type="button" onClick={handleClick}>
        log to console
      </button>
      <button type="button" onClick={forceUpdate}>
        update
      </button>
    </>
  );
}
