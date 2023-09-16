/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import supabase from './supabaseClient';
import SupabaseLogin from './components/SupabaseLogin';
import App from './App';
import Contents from './components/Contents';

const AppDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export default function AppRouter() {
  const [currentSession, setCurrentSession] = useState<any>();
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (currentSession !== session) setCurrentSession(session);
      setLoaded(true);
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loaded === false) {
    return <div />;
  }
  if (loaded && !currentSession) {
    return (
      <AppDiv>
        <SupabaseLogin />
      </AppDiv>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:columnId" element={<Contents />} />
      </Routes>
    </BrowserRouter>
  );
}
