/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-syntax */
import { ColumnType, ItemType, StoreType } from '../types';

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

export default function createValues(
  columns: { [key: string]: ColumnType },
  items: { [key: string]: ItemType }
) {
  const newstore: StoreType = {};
  for (const column of Object.values(columns)) {
    newstore[column.id] = {
      id: column.id,
      text: column.text,
      value: generateText(column, items),
    };
  }
  return newstore;
}
