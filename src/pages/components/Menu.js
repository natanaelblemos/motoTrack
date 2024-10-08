import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
  background: #333;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2vw;
`;

const NavLink = styled(Link)`
  color: white;
  margin: 0 15px;
  text-decoration: none;
  font-size: 4vw;

  &:hover {
    text-decoration: underline;
  }
`;

const Menu = () => {
  return (
    <Nav>
      <NavLink to="/mototrack/home">Home</NavLink>
      <NavLink to="/mototrack/cadastro">Cadastros</NavLink>
    </Nav>
  );
};

export default Menu;
