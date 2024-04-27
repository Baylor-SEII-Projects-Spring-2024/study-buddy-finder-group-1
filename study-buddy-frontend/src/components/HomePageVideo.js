import React from "react";
import {Box} from "@mui/material";

export default function HomePageVideo() {
    return (
        <Box position="fixed" top={0} left={0} width="100%" height="100%" zIndex={-1}>
            <img src="/images/Study Buddies Home Image.png" alt="Study Buddies" style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)"
            }} />
        </Box>
    );
}