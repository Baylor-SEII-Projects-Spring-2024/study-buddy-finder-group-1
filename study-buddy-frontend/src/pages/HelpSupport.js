import React from 'react';
import { Box, Container, Typography, Button, Divider } from '@mui/material';
import Navbar from "@/components/Navbar";

const HelpAndSupport = () => {
    //Our custom style for the text
    const textStyle = {
        fontFamily: "'Roboto', sans-serif",
    };

    return (
        <div>
            <Navbar showLinks={false} />
            <Container maxWidth="md" style={{ marginTop: '250px' }}> {/* Adjusted margin top */}
                <Box mt={5}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Help and Support
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ textAlign: 'center' }}>
                        Welcome to our help and support page. If you have any questions or need assistance, please feel free to contact us.
                    </Typography>
                    <Box mt={3}>
                        <Divider />
                    </Box>
                    <Box mt={3} display="flex" justifyContent="center">
                        <Button variant="contained" color="primary">
                            Contact Support
                        </Button>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default HelpAndSupport;
