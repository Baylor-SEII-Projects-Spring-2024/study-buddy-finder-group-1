import React, { useState } from "react";
import { useRouter } from "next/router";
import { AppBar, Avatar, Box, Button, Container, Grid, IconButton, Menu, MenuItem, Paper, TextField, Toolbar, Typography } from '@mui/material';
import Navbar from "@/components/Navbar";
import RegisterForm from "@/components/RegisterForm";

// Constants
const MAIN_FONT = 'Roboto, sans-serif';
const WHITE_TEXT = 'white';

export default function Register() {
    const router = useRouter();

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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

            <Navbar showLinks={false} /> {/* Inserting navbar */}

            {/* Spacer element to push down the main content */}
            {/* Grid item will act as a flexible spacer */}
            <Grid container style={{ flex: 1 }}>
                <Grid item xs={12} style={{ height: '0.1vh' }}></Grid> {/* This creates the dynamic space */}
            </Grid>

            {/* Main content area with registration form */}
            <RegisterForm />
        </div>
    );
}