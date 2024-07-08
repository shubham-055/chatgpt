import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

const Layout=()=>{
    return (
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: Colors.selected },
          }}>
          <Stack.Screen name='(drawer)' options={{ headerShown: false }} />
          </Stack>
    )
}

export default Layout;