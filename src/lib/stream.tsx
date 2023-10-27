import {
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-native-sdk';
import { PropsWithChildren, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY || '';
const lambdaUrl =
  'https://dnijkvm6qowc4iguteqite4vdy0gnkmk.lambda-url.us-east-1.on.aws';

const client = new StreamVideoClient({ apiKey });

export const StreamClientProvider = ({ children }: PropsWithChildren) => {
  const { session } = useAuth();

  useEffect(() => {
    if (!session?.access_token) {
      return;
    }

    const fetchToken = async () => {
      // fetch token from AWS Lambda
      const result = await fetch(`${lambdaUrl}/?token=${session.access_token}`);
      if (result.status === 200) {
        const { token } = await result.json();

        await client.disconnectUser();
        client.connectUser({ id: session.user.id }, token);
      }
    };

    fetchToken();
  }, [session?.access_token]);

  return <StreamVideo client={client}>{children}</StreamVideo>;
};
