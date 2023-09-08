/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */

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
