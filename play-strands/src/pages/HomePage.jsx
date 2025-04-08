import React, { useState, useEffect } from "react";
import Navbar from '../components/Navbar';
import PlayStrands from '../components/PlayStrands';
import { useNavigate } from "react-router-dom";
function HomePage() {
    const navigate = useNavigate();
    useEffect(() => {
        const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    
        if (isMobile) {
          navigate("/mobile");
        }
      }, [navigate]);
    return (
        <>
            <Navbar />
            <PlayStrands />
        </>
    );
}

export default HomePage;