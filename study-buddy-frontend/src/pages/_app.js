import React, { useEffect } from 'react';
import Head from 'next/head';
import { Provider as ReduxProvider } from 'react-redux';
import { NotificationProvider } from '../contexts/NotificationContext';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { CssBaseline } from '@mui/material';
import { StudyBuddyThemeProvider } from '@/utils/theme';
import { buildStore } from '@/utils/redux';
import Layout from '@/components/Layout';
import { AuthProvider } from '../components/AuthContext';
import '@/styles/globals.css'
import '../styles/globals.css';

// Initialize Redux
let initialState = {};
let reduxStore = buildStore(initialState);

export default function App({ Component, pageProps }) {

    useEffect(() => {
        const adjustForScrollbar = () => {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.documentElement.style.setProperty('--scrollbar-margin', `${scrollbarWidth}px`);
        };

        adjustForScrollbar(); // Adjust right away in case there's already a scrollbar
        window.addEventListener('resize', adjustForScrollbar); // Adjust on window resize

        return () => window.removeEventListener('resize', adjustForScrollbar); // Cleanup on component unmount
    }, []);

  return (
      <ReduxProvider store={reduxStore}>
        <AppCacheProvider>
          <Head>
            <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
            <link rel='icon' href='/Images/Study%20Buddy%20Logo.webp' />
          </Head>

          <StudyBuddyThemeProvider>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
              <Layout>
                  <AuthProvider>
                      <NotificationProvider> {/* Wrap the component with NotificationProvider */}
                          <Component {...pageProps} />
                      </NotificationProvider>
                  </AuthProvider>
              </Layout>
          </StudyBuddyThemeProvider>
        </AppCacheProvider>
      </ReduxProvider>
  );
}
