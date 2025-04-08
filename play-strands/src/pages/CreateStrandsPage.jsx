import React, { useState, useEffect } from "react";
import CreateStrands from '../components/CreateStrands';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
function CreateStrandsPage() {
    const navigate = useNavigate();
    useEffect(() => {
        const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    
        if (isMobile) {
          navigate("/mobile");
        }
      }, [navigate]);
    return (
        <>
            <Navbar/>
            <CreateStrands />
        
        
        </>
    );
}

export default CreateStrandsPage;