// src/components/Header/Header.tsx
"use client";

import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <h1 style={logoStyle}>My Kitchen</h1>
        <nav>
          <ul style={navListStyle}>
            <li>
              <Link href="/">Tables</Link>
            </li>
            <li>
              <Link href="/menu">Menu</Link>
            </li>
            <li>
              <Link href="/orders">Orders</Link>
            </li>
            <li>
              <Link href="/bills">Bills</Link>
            </li>
            <li>
              <Link href="/revenue">Todays Revenue</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

// ----- Inline Styles -----
const headerStyle: React.CSSProperties = {
  backgroundColor: "#ff6b6b",
  padding: "10px 0",
  color: "#fff",
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 20px",
};

const logoStyle: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "bold",
};

const navListStyle: React.CSSProperties = {
  display: "flex",
  listStyle: "none",
  gap: "20px",
};

export default Header;
