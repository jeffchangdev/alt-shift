/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-restricted-syntax */
import supabase from '../supabaseClient';
import { ColumnsType, ItemsType, StoreType } from '../types';
import createValues from '../utils/createValues';

export default async function saveData(
  mode: string,
  store: StoreType,
  columns: ColumnsType,
  items: ItemsType,
  userid: string
) {
  const records = [];
  const currentStore = mode === 'text' ? store : createValues(columns, items);
  console.log(currentStore);
  const columnObjects = Object.values(currentStore);

  for (const { db_id, id, value } of columnObjects) {
    records.push({ db_id, user_id: userid, column_id: id, value });
  }

  console.log(records);
  // start rendering notification component
  // loading...
  const { data, error } = await supabase
    .from('column')
    .upsert(records)
    .select();
  if (error) {
    console.log('error during batch upsert:', error.message);
  } else {
    console.log('batch upsert completed successfully:', data);
  }
  // if save successufl -> setstate of loading to stop
}
