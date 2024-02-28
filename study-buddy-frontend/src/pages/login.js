import React, { useState } from "react";
import {Avatar, IconButton, Menu, MenuItem, TextField} from '@mui/material';
import Head from "next/head";
import {AppBar, Box, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Constants
const MAIN_FONT = 'Roboto, sans-serif';
const WHITE_TEXT = 'white';

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    // State for the anchor element of the dropdown menu
    const [anchorEl, setAnchorEl] = useState(null);

    // Open the dropdown menu
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Close the dropdown menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });


    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);

        try {
            const response = await axios.post('http://localhost:8080/login', null, {
                params: {
                    email: formData.email,
                    password: formData.password
                }
            });

            console.log(response.data);
            if (response.status === 200 && response.data.userId) {

                const { userId } = response.data;

                router.push(`/user/${userId}`);
            } else {
                console.log("Login was successful but the status code is not 200.");

            }
        } catch (error) {
            console.error("Login failed:", error.response || error);

        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Head>
                <title>Register - Study Buddies</title>
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
            </Head>

            <Navbar showLinks={false} /> {/* Inserting navbar */}

            {/* Spacer element to push down the main content */}
            {/* This Grid item will act as a flexible spacer */}
            <Grid container style={{ flex: 1 }}>
                <Grid item xs={12} style={{ height: '0.1vh' }}></Grid> {/* This creates the dynamic space */}
            </Grid>

            {/* Main content area with log in form */}
            <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 4, flex: 1 }}>
                <Typography component="h1" variant="h5" align="center" sx={{ mb: 3 }}>
                    Log In
                </Typography>
                <form onSubmit={handleSubmit} noValidate>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                        sx={{ mb: 2 }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>

                    {/* Forgot Password Link */}
                    <Grid container justifyContent="center" style={{ margin: '8px 0' }}>
                        <Grid item>
                            <Link href="/forgot-password" variant="body2" style={{ textDecoration: 'none', color: 'blue' }}>
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>

                </form>
            </Container>
        </div>
    );
}