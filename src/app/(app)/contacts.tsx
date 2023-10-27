import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthProvider';
import { useStreamVideoClient } from '@stream-io/video-react-native-sdk';
import { genRandomString } from '../../utils';
import { router } from 'expo-router';

const ContactsScreen = () => {
  const [profiles, setProfiles] = useState([]);
  const { session } = useAuth();
  const client = useStreamVideoClient();

  useEffect(() => {
    const fetchProfiles = async () => {
      let { data: profiles, error } = await supabase
        .from('profiles')
        .select('*');
      setProfiles(profiles?.filter((p) => p.id !== session?.user.id));
    };
    fetchProfiles();
  }, []);

  const onUserPressed = (user) => {
    if (!client) {
      return;
    }
    const callId = genRandomString(5);
    console.log('Creating a call with id: ', callId);

    client.call('default', callId).getOrCreate({
      ring: true,
      data: {
        members: [{ user_id: session?.user.id }, { user_id: user.id }],
      },
    });

    router.push('/call');
  };

  return (
    <FlatList
      data={profiles}
      renderItem={({ item }) => (
        <Text
          onPress={() => onUserPressed(item)}
          style={{
            padding: 10,
            margin: 5,
            backgroundColor: 'white',
            fontSize: 16,
          }}
        >
          {item.id}
        </Text>
      )}
      ListHeaderComponent={() => (
        <Text style={{ margin: 15, fontWeight: 'bold' }}>
          My id: {session?.user?.id}
        </Text>
      )}
    />
  );
};

export default ContactsScreen;
