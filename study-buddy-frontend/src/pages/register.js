import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Grid, Snackbar, Alert } from '@mui/material';
import Navbar from "@/components/Navbar";
import RegisterForm from "@/components/RegisterForm";


/*export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request) {
    return new Response('Hello, Next.js!', {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    })
}*/
 const Register = () =>  {

     const [registrationSuccess, setRegistrationSuccess] = useState(false);
     const handleRegistrationSuccess = () => {
         setRegistrationSuccess(true); // Set registration success state to true
     };
     useEffect(() => {
         // Access window.location only if window object is available
         if (typeof window !== 'undefined') {
             console.log('Debug message: window.location', window.location);
         }
     }, [])
     return (

         <div>
             <Navbar showLinks={false} />
             <Grid container style={{ flex: 1 }}>
                 <Grid item xs={12} style={{ height: '0.1vh' }}></Grid>
             </Grid>


             <RegisterForm registrationSuccess={handleRegistrationSuccess} />


         </div>
/*        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar showLinks={false} />
            <Grid container style={{ flex: 1 }}>
                <Grid item xs={12} style={{ height: '0.1vh' }}></Grid>
            </Grid>
            {/!* Conditional rendering for success message *!/}
            {registrationSuccess ? (

                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h3>Registration Successful!</h3>
                    <p>You can now login with your credentials.</p>
                </div>
            ) : (
                <RegisterForm onRegistrationSuccess={handleRegistrationSuccess} /> // Pass callback function to RegisterForm
            )}
        </div>*/
    );
   /* } catch (error) {
        console.error("Error in register.js:", error);
        // Optionally, you can also log the stack trace
        console.error(error.stack);
        // Optionally, you can display a user-friendly error message on the page
        // This is particularly useful for client-side rendering errors
        // For example:
        // setError("An error occurred. Please try again later.");
    }*/
}
export default Register;