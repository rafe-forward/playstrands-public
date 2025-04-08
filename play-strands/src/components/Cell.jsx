import React from 'react';
import '../styles/Cell.css';

function Cell({ letter, isSelected, locked, spanagram, onMouseDown, onMouseEnter }) {
    const getBackgroundColor = () => {
      if (spanagram) return "#FFD700";     
      if (locked) return "#aaffaa";        
      if (isSelected) return "#ccf";       
      return "#fff";
    };
  
    return (
      <div
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        style={{
          color: "black",
          backgroundColor: getBackgroundColor(),
          display: "flex",
          padding: "20px",
          margin: "4px",
          border: "2px solid #ccc",
          width: "50px",
          height: "50px",
          justifyContent: "center",
          alignItems: "center",
          userSelect: "none",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {letter}
      </div>
    );
  }
  

export default Cell;
