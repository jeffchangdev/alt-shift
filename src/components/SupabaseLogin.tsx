import { Auth } from '@supabase/auth-ui-react';
import {
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-shared';
import supabase from '../supabaseClient';

export default function SupabaseLogin() {
  const primaryColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue('--primary-color');

  // eslint-disable-next-line no-console
  console.log('login component rendered');
  return (
    <div style={{ width: '300px' }}>
      <Auth
        supabaseClient={supabase}
        providers={[]}
        localization={{
          variables: {
            sign_in: {
              email_label: 'Email address',
              password_label: 'Password',
            },
          },
        }}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: primaryColor,
                brandAccent: primaryColor,
              },
            },
          },
        }}
      />
    </div>
  );
}
