import { useCalls } from '@stream-io/video-react-native-sdk';
import { router } from 'expo-router';
import { PropsWithChildren, useEffect } from 'react';

export function CallsProvider({ children }: PropsWithChildren) {
  const calls = useCalls();

  useEffect(() => {
    if (calls.length > 0) {
      router.push('/call');
    }
  }, [calls]);

  console.log('Calls provider');
  return children;
}
