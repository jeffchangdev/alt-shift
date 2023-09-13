/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
import supabase from '../supabaseClient';
import { ItemType } from '../types';

// ensure that drop id is not child of drag id
export function checkIsValidDrop(
  dropid: string,
  dragid: string,
  items: { [key: string]: ItemType }
) {
  const ids = new Set();
  const recurse = (currentid: string) => {
    ids.add(currentid);
    for (const id of items[currentid].contentids) {
      recurse(id);
    }
  };
  recurse(dragid);
  return !ids.has(dropid);
}

export function countLeadingSpaces(str: string) {
  let count = 0;
  for (const char of str) {
    if (char === ' ') count++;
    else break;
  }
  return count;
}

export function createItem(id: string, text: string) {
  return {
    id,
    parentid: '',
    text,
    contentids: [],
  };
}

export function createColumn(id: string, text: string, contentids: string[]) {
  return {
    id,
    text,
    contentids,
  };
}

export async function retrieveInitialData(setStore, setInitialRetrieve) {
  interface Row {
    column_id: string;
    created_at: string;
    db_id: number;
    user_id: string;
    value: string;
  }
  // NEED TO ADD ERROR HANDLING LATER
  const { data: column } = await supabase.from('column').select('*');
  const columndata = column as Row[];
  console.log(column);
  const newstore: StoreType = {};
  for (const { db_id, column_id, value } of columndata) {
    newstore[column_id] = { db_id, id: column_id, text: column_id, value };
  }
  setStore(newstore);
  setInitialRetrieve(true);
}
