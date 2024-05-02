import React from "react";
import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import { useAuth } from "@/components/AuthContext";

export default function HomePageText({ mainFont, whiteText }) {
    const { isLoggedIn } = useAuth();

    return (
        <Container component="main" sx={{
            flexGrow: 1,
            mt: '64px', // Margin at the top for some spacing from the navbar or page top
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingY: 2, // Adding padding at the top and bottom to reduce space
        }}>
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom sx={{
                fontFamily: mainFont,
                color: whiteText,
                width: '100%',
                textAlign: 'center',
                marginY: 2, // Reducing the margin around the title to tighten spacing
            }}>
                Together, We Achieve More
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" component="p" sx={{
                fontFamily: mainFont,
                color: whiteText,
                width: '100%',
                textAlign: 'center',
                marginBottom: 3, // Only bottom margin to space text from button
            }}>
                Embark on a personalized learning experience where your goals are our priority.
            </Typography>
            <Link href={isLoggedIn ? "/SearchPage" : "/register"} passHref>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                        width: 'auto', // Button width adjusts to content
                        minWidth: '150px', // Minimum width to ensure the button is not too small
                        maxWidth: '360px',
                        fontFamily: mainFont,
                        color: whiteText,
                        whiteSpace: 'nowrap', // Prevents text wrapping
                        padding: '10px 20px', // Adding padding to ensure text fits
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