/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import supabase from '../supabaseClient';
import { StoreType } from '../types';

export default async function retrieveInitialData(
  setStore: React.Dispatch<React.SetStateAction<StoreType>>,
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
  const newstore: StoreType = {};
  for (const { db_id, column_id, value } of columndata) {
    newstore[column_id] = { db_id, id: column_id, text: column_id, value };
  }
  setStore(newstore);
  setInitialRetrieve(true);
}
