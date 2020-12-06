import React from 'react';

const withChildFunction = (func) => (Wrapper) => {
  return (props) => {
    return <Wrapper {...props}>
      {func}
    </Wrapper>
  }
};

export default withChildFunction;
