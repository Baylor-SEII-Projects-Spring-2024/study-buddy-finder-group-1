import React from 'react';
import Footer from "./Footer";
import { Box, Container, CssBaseline } from '@mui/material';

const Layout = ({ children }) => { //Automatically includes the footer in all pages
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <CssBaseline />
            <Container component="main" sx={{ flex: 1 }}>
                {children}
            </Container>
            <Footer sx={{ position: 'absolute', width: '100%', bottom: 0 }}/>
        </Box>
    );
};

export default Layout;