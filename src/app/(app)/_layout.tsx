import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../context/AuthProvider';
import { ActivityIndicator } from 'react-native';

const AppLayout = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 100 }} />;
  }

  if (!session) {
    return <Redirect href={'/auth'} />;
  }

  return <Stack />;
};

export default AppLayout;
