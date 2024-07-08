import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Slot, SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store"
import { useFonts } from "expo-font";
import { useEffect } from "react";
import IntroAnimation from "@/components/IntroAnimation";

const CLERK_PUBLISHABLE_KEY=process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

SplashScreen.preventAutoHideAsync();

 const InitialLayout=()=> {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  }); 

  const {isLoaded,isSignedIn}=useAuth();
const segments=useSegments();
  const router=useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (isSignedIn && !inAuthGroup) {
      router.replace('/(auth)/(drawer)/(chat)/new');
    } else if (!isSignedIn) {
      router.replace('/');
    }
  }, [isSignedIn]);


  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      console.log("----->",loaded);
      
      SplashScreen.hideAsync();
    }
  }, [loaded]);


  if (!loaded || !isLoaded) {
    return <IntroAnimation />;
  }
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="login"
        options={{
          presentation: 'modal',
          title: '',
          headerTitleStyle: {
            fontFamily: 'mon-sb',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="(auth)" options={{headerShown:false}} />
    </Stack>
  );
}
const RootLayout=()=>{
  return(
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <GestureHandlerRootView style={{flex:1}}>
        <InitialLayout />
      </GestureHandlerRootView>
    </ClerkProvider>
  )
}

export default RootLayout