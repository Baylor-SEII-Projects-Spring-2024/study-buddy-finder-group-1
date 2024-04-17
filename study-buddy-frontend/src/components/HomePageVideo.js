import React from "react";
import {Box} from "@mui/material";
import Image from "next/image";

export default function HomePageVideo() {
    return (
        // <Box position="fixed" top={0} left={0} width="100%" height="100%" zIndex={-1}>
        //     {/*<video autoPlay loop muted playsInline style={{*/}
        //     {/*    position: "absolute",*/}
        //     {/*    width: "100%",*/}
        //     {/*    height: "100%",*/}
        //     {/*    objectFit: "cover",*/}
        //     {/*    left: "50%",*/}
        //     {/*    top: "50%",*/}
        //     {/*    transform: "translate(-50%, -50%)"*/}
        //     {/*}}>*/}
        //     {/*    <source src="/videos/Guy and Girl.mp4" type="video/mp4" />*/}
        //     {/*</video>*/}
        // </Box>

        // Using an Image instead
        <Box position="fixed" top={0} left={0} width="100%" height="100%" zIndex={-1}>
            <Image
                src="/Images/Study Buddies Home Image.png"
                alt="Study Buddies Home Image"
                layout="fill" // This uses the size of the parent container
                objectFit="cover" // This will cover the area without distorting aspect ratio
            />
        </Box>
    );
}