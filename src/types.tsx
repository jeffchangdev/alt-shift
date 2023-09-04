export interface ColumnType {
  id: string;
  text: string;
  contentids: string[];
}

export interface ItemType {
  id: string;
  parentid: string | null;
  text: string;
  contentids: string[];
}
