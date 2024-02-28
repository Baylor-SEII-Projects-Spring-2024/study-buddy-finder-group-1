import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
    AppBar,
    Toolbar,
    IconButton,
    Avatar,
    Button,
    Typography,
    Box,
    Container,
    Grid,
    Paper,
    Link as MuiLink,
    Menu,
    MenuItem
} from '@mui/material';
import styles from '@/styles/Home.module.css';
import Navbar from "@/components/Navbar";
import HomePageVideo from "@/components/HomePageVideo";
import HomePageText from "@/components/HomePageText";
import Footer from "@/components/Footer";

// Constants
const MAIN_FONT = 'Roboto, sans-serif';
const WHITE_TEXT = 'white';

const HomePage = () => {


    return (
        <>
            <Head>
                <title>Study Buddies</title>
                <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
            </Head>

           <HomePageVideo />
            <Navbar />

            <Box display="flex" flexDirection="column" minHeight="75vh" justifyContent="flex-start" sx={{ mt: '30vh' }}>
                <HomePageText mainFont={MAIN_FONT} whiteText={WHITE_TEXT} />

            </Box>
        </>
    );
};

export default HomePage;