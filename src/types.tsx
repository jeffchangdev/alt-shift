export interface ColumnType {
  id: string;
  text: string;
  contentids: string[];
}

export interface ColumnsType {
  [key: string]: ColumnType;
}

export interface ItemType {
  id: string;
  parentid: string;
  text: string;
  contentids: string[];
}

export interface ItemsType {
  [key: string]: ItemType;
}

export interface StoreType {
  [key: string]: {
    id: string;
    text: string;
    value: string;
  };
}
