import React from 'react';
import { logEvent } from '../cache/dataStorage';

const withButtonTracking = (WrappedComponent) => {
  return ({ eventName = 'UnnamedButton', onPress, ...props }) => {
    const handlePress = (...args) => {
      logEvent({
        type: 'button_press',
        eventName,
      });

      if (onPress) {
        onPress(...args);
      }
    };

    return <WrappedComponent {...props} onPress={handlePress} />;
  };
};

export default withButtonTracking;
