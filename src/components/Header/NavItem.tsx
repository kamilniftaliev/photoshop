import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

interface IProps {
  label?: string;
  Icon: React.FC;
  to: string;
}

const Container = styled(NavLink).attrs(() => ({
  exact: true,
  activeClassName: 'active',
}))`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid var(--text-color);
  cursor: pointer;
  min-width: 100px;
  transition: opacity 0.2s;
  color: var(--text-color);
  text-decoration: none;
  opacity: 0.4;

  &:hover,
  &.active {
    opacity: 1;
  }
`;

const Label = styled.p`
  margin: 7px 0;
`;

export default function NavItem({ to, Icon, label }: IProps) {
  return (
    <Container to={to}>
      <Icon width={24} height={24} />
      <Label>{label}</Label>
    </Container>
  );
}
