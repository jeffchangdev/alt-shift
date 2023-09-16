/* eslint-disable no-console */
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import supabase from '../supabaseClient';

export default function Contents() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const { columnId } = useParams();

  const loadValue = async () => {
    const { data, error } = await supabase
      .from('column')
      .select('value')
      .eq('column_id', columnId);

    if (error) {
      console.log('Unable to retrieve text value');
      return;
    }
    console.log(data);
    setText(data[0].value);
    setLoaded(true);
  };

  loadValue();
  if (!loaded) return <div />;

  return <div style={{ whiteSpace: 'pre' }}> {text} </div>;
}
