// components/Layout.js
import React from 'react';
import Footer from "./Footer";
import { Box, Container, CssBaseline } from '@mui/material';

const Layout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CssBaseline />
            <Container component="main" sx={{ flex: 1 }}>
                {children}
            </Container>
            <Footer />
        </Box>
    );
};

export default Layout;
