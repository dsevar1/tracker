import { useFocusEffect } from '@react-navigation/native';
import { useRef } from 'react';
import { logEvent } from '../cache/dataStorage';

const useScreenTimer = (screenName = 'UnnamedScreen') => {
  const startRef = useRef(null);

  useFocusEffect(() => {
    startRef.current = Date.now();

    return () => {
      const duration = ((Date.now() - startRef.current) / 1000).toFixed(2);
      logEvent({ type: 'screen_time', screen: screenName, duration });
    };
  });
};
export default useScreenTimer;
