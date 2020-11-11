import React from 'react';
import styled from 'styled-components';

// Icons
import { DrawIcon, StatisticsIcon } from 'icons';

// Components
import NavItem from './NavItem';

const Container = styled.header`
  display: grid;
  justify-items: center;

  background-color: var(--header-color);
  color: var(--text-color);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Navigation = styled.nav`
  display: flex;
  column-gap: 30px;
  justify-content: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-weight: 400;
`;

/**
 * Header of the app with navigation
 */
export default function Header(): React.ReactElement {
  return (
    <Container>
      <Title>Online Photoshop</Title>
      <Navigation>
        <NavItem to="/" Icon={DrawIcon} label="Draw" />
        <NavItem to="/statistics" Icon={StatisticsIcon} label="Statistics" />
      </Navigation>
    </Container>
  );
}
