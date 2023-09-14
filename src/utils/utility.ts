/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
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

export function createColumn(
  db_id: number,
  id: string,
  text: string,
  contentids: string[]
) {
  return {
    db_id,
    id,
    text,
    contentids,
  };
}

export function createStoreObj(
  db_id: number,
  id: string,
  text: string,
  value: string
) {
  return {
    db_id,
    id,
    text,
    value,
  };
}
