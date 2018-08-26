import React from 'react';
import { Subscribe } from 'unstated';
import sessionState from '../../states/session';

const SessionProvider = WrappedComponent => {
  return class extends React.Component {
    render() {
      return (
        <Subscribe to={[sessionState]}>
          {session => {
            return <WrappedComponent session={session} {...this.props} />;
          }}
        </Subscribe>
      );
    }
  };
};

export { SessionProvider };
