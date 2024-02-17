import React from 'react';
import Head from 'next/head';
import Home from './home'; // Import the component directly from home.js

export default function IndexPage() {
  return (
      <>
        <Head>
          <title>Home Page</title>
        </Head>
        <Home /> {/* Render the Home component */}
      </>
  );
}
