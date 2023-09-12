import { Auth } from '@supabase/auth-ui-react';
import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared';
import supabase from '../supabaseClient';

export default function Login() {
  return (
    <div style={{ width: '300px' }}>
      <Auth
        supabaseClient={supabase}
        providers={[]}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: 'blue',
                brandAccent: 'darkblue',
              },
            },
          },
        }}
      />
    </div>
  );
}
