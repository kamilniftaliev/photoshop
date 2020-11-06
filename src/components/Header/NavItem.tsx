import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

interface Props {
  label?: string;
  icon: string;
  to: string;
  active?: boolean;
}

interface IContainerProps {
  active: Props['active'];
}

const Container = styled(NavLink)<IContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #fff;
  cursor: pointer;
  min-width: 100px;
  transition: opacity 0.2s;
  color: #fff;
  text-decoration: none;

  ${({ active }) =>
    !active &&
    `
    opacity: .7;
  `}

  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.img`
  width: 20px;
`;

const Label = styled.p`
  font-weight: bold;
  margin: 7px 0;
`;

export default function NavItem({ to, icon, label, active }: Props) {
  return (
    <Container to={to} active={active}>
      <Icon src={icon} />
      <Label>{label}</Label>
    </Container>
  );
}
