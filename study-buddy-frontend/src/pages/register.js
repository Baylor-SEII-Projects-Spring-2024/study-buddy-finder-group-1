import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Grid } from '@mui/material';
import Navbar from "@/components/Navbar";
import RegisterForm from "@/components/RegisterForm";

export default function Register() {
    const router = useRouter();
    const [registrationSuccess, setRegistrationSuccess] = useState(false); // State to track registration success

    // Function to handle successful registration
    const handleRegistrationSuccess = () => {
        setRegistrationSuccess(true); // Set registration success state to true
    };
    console.log('Debug message: Register component is rendering.');
    // Use useEffect to run code only on the client-side
    useEffect(() => {
        // Check if window object is defined
        if (typeof window !== 'undefined') {
            // Access window.location only if window object is available
            console.log('Debug message: window.location',window.location);
        }
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar showLinks={false} />
            <Grid container style={{ flex: 1 }}>
                <Grid item xs={12} style={{ height: '0.1vh' }}></Grid>
            </Grid>
            {/* Conditional rendering for success message */}
            {registrationSuccess ? (
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h3>Registration Successful!</h3>
                    <p>You can now login with your credentials.</p>
                </div>
            ) : (
                <RegisterForm onRegistrationSuccess={handleRegistrationSuccess} /> // Pass callback function to RegisterForm
            )}
        </div>
    );
}