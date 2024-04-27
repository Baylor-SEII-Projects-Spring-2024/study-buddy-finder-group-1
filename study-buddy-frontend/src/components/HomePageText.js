import React from "react";
import { Button, Container, Typography } from "@mui/material";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";

export default function HomePageText({ mainFont, whiteText }) {
    const { isLoggedIn } = useAuth();  // Using the useAuth hook to determine login status

    return (
        <Container component="main" sx={{ flexGrow: 1, mt: '64px' }}>
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom sx={{ fontFamily: mainFont, color: whiteText }}>
                Together, We Achieve More
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" component="p" sx={{ fontFamily: mainFont, color: whiteText }}>
                Embark on a personalized learning experience where your goals are our priority.
            </Typography>
            <Link href={isLoggedIn ? "/SearchPage" : "/register"} passHref>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                        my: 5,
                        mx: 55,
                        fontFamily: mainFont,
                        color: whiteText,
                        whiteSpace: 'nowrap',
                        transition: 'transform 0.2s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.8)',
                        }
                    }}
                >
                    {isLoggedIn ? "Start Searching for Study Meetups!" : "Get Started Today"}
                </Button>
            </Link>
        </Container>
    );
}