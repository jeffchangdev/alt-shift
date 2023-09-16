/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import supabase from '../supabaseClient';
import { StoreType, DisplayedColumns } from '../types';

export default async function retrieveInitialData(
  setStore: React.Dispatch<React.SetStateAction<StoreType>>,
  setDisplayedColumns: React.Dispatch<React.SetStateAction<DisplayedColumns>>,
  setInitialRetrieve: React.Dispatch<React.SetStateAction<boolean>>
) {
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

  const store: StoreType = {};
  const displayedColumns: DisplayedColumns = {};

  for (const { db_id, column_id, value } of columndata) {
    store[column_id] = { db_id, id: column_id, text: column_id, value };
    displayedColumns[column_id] = { displayed: true };
  }
  setStore(store);
  setDisplayedColumns(displayedColumns);
  setInitialRetrieve(true);
}
