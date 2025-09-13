import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useStore } from '../lib/store';
import Layout from '../components/Layout';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const loadFromDb = useStore((s) => s.loadFromDb);
  const setUser = useStore((s) => s.setUser);

  useEffect(() => {
    // load data and restore session (client-only)
    loadFromDb();
    const user = typeof window !== 'undefined' ? localStorage.getItem('cms_user') : null;
    if (user) setUser(user);
  }, [loadFromDb, setUser]);

  const isLoginPage = router.pathname === '/';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isLoginPage ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </ThemeProvider>
  );
}
