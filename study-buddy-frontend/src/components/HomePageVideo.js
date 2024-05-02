import React from "react";

export default function HomePageVideo() {
    return (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}>
            <video
                autoPlay
                loop
                muted
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            >
                <source src="/Videos/Guy and Girl.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}