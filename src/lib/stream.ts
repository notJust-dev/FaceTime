import { StreamVideoClient, User } from '@stream-io/video-react-native-sdk';

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY || '';
const userId = 'vadim';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidmFkaW0ifQ.NV_QYM9kLATmjB21QX3_ZkhHj21d8sKOil3703tBrZQ';
const user: User = { id: userId };

export const client = new StreamVideoClient({ apiKey, user, token });
