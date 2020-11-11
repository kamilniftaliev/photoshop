import React, { SVGProps } from 'react';
import styled from 'styled-components';
import { NavLink, NavLinkProps } from 'react-router-dom';

interface NavItemProps {
  /** Name of the navigation */
  label?: string;
  /** Actual Icon component from 'icons' folder */
  Icon: React.FC<SVGProps<SVGElement>>;
  to: NavLinkProps['to'];
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

/**
 * Navigation item in the header of the app
 */
export default function NavItem({
  to,
  Icon,
  label,
}: NavItemProps): React.ReactElement {
  return (
    <Container to={to}>
      <Icon width={24} height={24} />
      <Label>{label}</Label>
    </Container>
  );
}
