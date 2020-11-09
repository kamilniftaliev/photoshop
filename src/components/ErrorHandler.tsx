import React from 'react';
import styled from 'styled-components';

const Message = styled.h1`
  text-align: center;
  margin: 100px;
`;

export default class ErrorHandler extends React.Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return <Message>Sorry, we're going to fix it soon :/</Message>;
    }

    return children;
  }
}
