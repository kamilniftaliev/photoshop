import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

interface IProps {
  label?: string;
  icon: string;
  to: string;
}

const Container = styled(NavLink).attrs(() => ({
  exact: true,
  activeClassName: 'active',
}))`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #fff;
  cursor: pointer;
  min-width: 100px;
  transition: opacity 0.2s;
  color: #fff;
  text-decoration: none;
  opacity: 0.4;

  &:hover,
  &.active {
    opacity: 1;
  }
`;

const Icon = styled.img`
  width: 20px;
`;

const Label = styled.p`
  margin: 7px 0;
`;

export default function NavItem({ to, icon, label }: IProps) {
  return (
    <Container to={to}>
      <Icon src={icon} />
      <Label>{label}</Label>
    </Container>
  );
}
