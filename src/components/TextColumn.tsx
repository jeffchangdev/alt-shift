/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { ColumnDiv, ColumnTitle } from './styledComponents';
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

type TextColumnProps = {
  obj: ColumnType;
  items: { [key: string]: ItemType };
};

export default function TextColumn({ obj, items }: TextColumnProps) {
  const columnText = generateText(obj, items);
  const [value, setValue] = useState(columnText);

  const handleUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <ColumnDiv key={obj.id}>
      <ColumnTitle>{obj.text}</ColumnTitle>
      <textarea value={value} onChange={handleUpdate} spellCheck="false" />
    </ColumnDiv>
  );
}
