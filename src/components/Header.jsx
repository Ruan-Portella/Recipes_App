import React, { useEffect, useState } from 'react';
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';

function Header({ title, icons }) {
  console.log(icons);
  return (
    <header>
      {icons ? (
        <i data-testid="search-top-btn" src='searchIcon'><AiOutlineSearch /></i>
      ) : null}
      <i data-testid="profile-top-btn" src='profileIcon'><AiOutlineUser /></i>
      <h1 data-testid="page-title">{ title }</h1>
    </header>
  );
}

export default Header;
