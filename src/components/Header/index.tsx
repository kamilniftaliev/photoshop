import React from 'react';
import styled from 'styled-components';

// Icons
import DrawIcon from '../../img/draw.svg';
import StatisticsIcon from '../../img/statistics.svg';

// Components
import NavItem from './NavItem';

const Container = styled.header`
  display: grid;
  justify-items: center;

  background-color: #2d2f37;
  color: #fff;
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

export default function Header() {
  return (
    <Container>
      <Title>Online Photoshop</Title>
      <Navigation>
        <NavItem to="/" icon={DrawIcon} label="Draw" />
        <NavItem to="/statistics" icon={StatisticsIcon} label="Statistics" />
      </Navigation>
    </Container>
  );
}
