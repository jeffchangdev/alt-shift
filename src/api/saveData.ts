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
  userid: string,
  setState?: any
) {
  const records = [];
  const currentStore = mode === 'text' ? store : createValues(columns, items);
  console.log(currentStore);
  const columnObjects = Object.values(currentStore);

  for (const { db_id, id, value } of columnObjects) {
    records.push({ db_id, user_id: userid, column_id: id, value });
  }

  console.log('saving records...');
  console.log(records);

  setState('...');
  const { data, error } = await supabase
    .from('column')
    .upsert(records)
    .select();
  if (error) {
    console.log('error during batch upsert:', error.message);
    setState('x');
  } else {
    console.log('batch upsert completed successfully:', data);
    setState('✔');
    setTimeout(() => {
      setState('Save');
    }, 2000);
  }
  // if save successufl -> setstate of loading to stop
}
