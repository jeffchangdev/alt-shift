/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-continue */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
import { ColumnType, ItemType, StoreType } from '../types';
import { countLeadingSpaces, createItem, createColumn } from './utility';

// stack based approach for generating item state from text
function createColumnState(
  colid: string,
  value: string,
  counter: { current: number }
) {
  const itemidprefix = 'item';
  const arr = value.split('\n');

  const stack: [number, ItemType][] = [];
  const items: { [key: string]: ItemType } = {};
  const contentids: string[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (value.length === 0) return { items: [], contentids: [] };

    const str = arr[i];
    const spaces = countLeadingSpaces(str);
    // eslint-disable-next-line no-param-reassign
    const itemid = String(itemidprefix + counter.current++);
    const item = createItem(itemid, str.substring(spaces));
    items[itemid] = item;

    while (stack.length > 0 && spaces <= stack[stack.length - 1][0]) {
      stack.pop();
    }

    if (stack.length === 0) {
      item.parentid = colid;
      contentids.push(item.id);
    } else {
      const parent = stack[stack.length - 1][1];
      item.parentid = parent.id;
      parent.contentids.push(item.id);
    }

    stack.push([spaces, item]);
  }

  return { items, contentids };
}

// create item state across application
export default function createItems(store: StoreType) {
  const appcolumns: { [key: string]: ColumnType } = {};
  const appitems: { [key: string]: ItemType } = {};
  const counter = { current: 0 };

  for (const { db_id, id, text, value } of Object.values(store)) {
    const { items, contentids } = createColumnState(id, value, counter);
    appcolumns[id] = createColumn(db_id, id, text, contentids);
    Object.assign(appitems, items);
  }

  return { appcolumns, appitems };
}
