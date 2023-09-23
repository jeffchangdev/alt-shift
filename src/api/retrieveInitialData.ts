/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import supabase from '../supabaseClient';
import { StoreType, DisplayedColumns } from '../types';

const intro = `this is alt shift!
  use two spaces to indent
  press alt shift for drag and drop
    press alt shift again to type
  add and delete columns in the menu
  save after editing
  click column title for QR code

storage box (drag me to closet)
  4x AA batteries
  2x pilot v5 pens
  small ikea hex wrenches
  measuring tape
  screwdriver
  container

bundle of wires (drag next to container)
  iphone charger
  kindle charger
  usb to usb c`;

export default async function retrieveInitialData(
  setStore: React.Dispatch<React.SetStateAction<StoreType>>,
  setDisplayedColumns: React.Dispatch<React.SetStateAction<DisplayedColumns>>,
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>,
  userId: string
) {
  interface Row {
    column_id: string;
    created_at: string;
    db_id: number;
    user_id: string;
    value: string;
  }
  // NEED TO ADD ERROR HANDLING LATER
  const { data } = await supabase.from('column').select('*');

  if (data && data.length === 0) {
    await supabase.from('column').insert([
      { user_id: userId, column_id: 'welcome', value: intro },
      { user_id: userId, column_id: 'closet', value: '' },
    ]);
  }

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
  setLoaded(true);
}
