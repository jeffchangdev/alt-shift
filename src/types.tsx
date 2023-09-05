export interface ColumnType {
  id: string;
  text: string;
  contentids: string[];
}

export interface ItemType {
  id: string;
  parentid: string;
  text: string;
  contentids: string[];
}
