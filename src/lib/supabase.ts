import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zpxroahxcmviesjrujot.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpweHJvYWh4Y212aWVzanJ1am90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc4MTc4NTgsImV4cCI6MjAxMzM5Mzg1OH0.RPg48z_wAOo6xvHzwnhsYsqqHBeItpsKHPEEmppdWaw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
