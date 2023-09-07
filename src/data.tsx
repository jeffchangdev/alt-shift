import { ColumnType, ItemType } from './types';

export const columnData: { [key: string]: ColumnType } = {
  col1: {
    id: 'col1',
    text: 'futurama',
    contentids: ['item1', 'item10'],
  },
  col2: {
    id: 'col2',
    text: 'disenchantment',
    contentids: ['item15'],
  },
};

export const itemData: { [key: string]: ItemType } = {
  item1: {
    id: 'item1',
    parentid: 'col1',
    text: 'planet express',
    contentids: ['item2', 'item3', 'item4', 'item6', 'item7', 'item9'],
  },
  item2: {
    id: 'item2',
    parentid: 'item1',
    text: 'phillip j fry',
    contentids: [],
  },
  item3: {
    id: 'item3',
    parentid: 'item1',
    text: 'bender',
    contentids: [],
  },
  item4: {
    id: 'item4',
    parentid: 'item1',
    text: 'leela',
    contentids: ['item5'],
  },
  item5: {
    id: 'item5',
    parentid: 'item4',
    text: 'nibbler',
    contentids: [],
  },
  item6: {
    id: 'item6',
    parentid: 'item1',
    text: 'zoidberg',
    contentids: [],
  },
  item7: {
    id: 'item7',
    parentid: 'item1',
    text: 'amy wong',
    contentids: [],
  },
  item8: {
    id: 'item8',
    parentid: 'item1',
    text: 'professor farnsworth',
    contentids: [],
  },
  item9: {
    id: 'item9',
    parentid: 'item1',
    text: 'hermes conrad',
    contentids: [],
  },
  item10: {
    id: 'item10',
    parentid: 'col1',
    text: 'momcorp',
    contentids: ['item11'],
  },
  item11: {
    id: 'item11',
    parentid: 'item10',
    text: 'mom',
    contentids: ['item12', 'item13', 'item14'],
  },
  item12: {
    id: 'item12',
    parentid: 'item11',
    text: 'walt',
    contentids: [],
  },
  item13: {
    id: 'item13',
    parentid: 'item11',
    text: 'larry',
    contentids: [],
  },
  item14: {
    id: 'item14',
    parentid: 'item11',
    text: 'igner',
    contentids: [],
  },
  item15: {
    id: 'item15',
    parentid: 'col2',
    text: 'dreamland',
    contentids: ['item16', 'item19', 'item20'],
  },
  item16: {
    id: 'item16',
    parentid: 'item15',
    text: 'bean',
    contentids: ['item17', 'item18'],
  },
  item17: {
    id: 'item17',
    parentid: 'item16',
    text: 'elfo',
    contentids: [],
  },
  item18: {
    id: 'item18',
    parentid: 'item16',
    text: 'luci',
    contentids: [],
  },
  item19: {
    id: 'item19',
    parentid: 'item15',
    text: 'king zog',
    contentids: [],
  },
  item20: {
    id: 'item20',
    parentid: 'item15',
    text: 'king oona',
    contentids: [],
  },
};
