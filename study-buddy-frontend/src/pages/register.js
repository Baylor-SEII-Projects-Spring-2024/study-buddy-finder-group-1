import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Grid, Snackbar, Alert } from '@mui/material';
import Navbar from "@/components/Navbar";
import RegisterForm from "@/components/RegisterForm";
import axios from "axios";

const axiosInstance = axios.create({
    //baseURL: 'http://localhost:8080', // Replace this with your backend server URL
    baseURL: 'http://34.125.60.1:8080', // Replace this with backend server URL
    timeout: 5000, // Optional: Set a timeout for requests (in milliseconds)
});

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
    );
}
export default Register;