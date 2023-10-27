import { StreamChat } from 'stream-chat';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? '';
const STREAM_API_KEY = process.env.STREAM_API_KEY ?? '';
const STREAM_API_SECRET = process.env.STREAM_API_SECRET ?? '';

// Initialize a Server Client
const serverClient = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET);

export const handler = async (event) => {
  const authToken = event.queryStringParameters?.token;

  if (!authToken) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Auth token not provided' }),
    };
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user.
    const supabaseClient = createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY,
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      { global: { headers: { Authorization: `Bearer ${authToken}` } } }
    );

    // Now we can get the session or user object
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'User not found' }),
      };
    }

    // Create User Token
    const token = serverClient.createToken(user.id);

    // TODO implement
    const response = {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
    return response;
  } catch (e) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unexpected Errro' }),
    };
  }
};
