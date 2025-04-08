import React from 'react';
import '../styles/Navbar.css';
function Navbar() {

  return (
    <nav className="navbar">
      <ul className="navbar__links">
        <li className="navli"><a href="/">Home</a></li>
        <li className="navli"><a href="/create-strands">Create Strands</a></li>
        <li className="navli"><a href="/play-strands">Play Strands</a></li>
        <li className="navli"><a href="/about">About</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
