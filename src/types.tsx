export interface ColumnType {
  db_id: number;
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
    db_id: number;
    id: string;
    text: string;
    value: string;
  };
}

export interface DisplayedColumns {
  [key: string]: {
    displayed: boolean;
  };
}
