import HeaderDropDown from "@/components/HeaderDropdown";
import MessageInput from "@/components/MessageInput";
import { defaultStyles } from "@/constants/Styles";
import { useAuth } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { useState } from "react";
import { Button, Text, View } from "react-native"

const Page=()=>{
    const {signOut}=useAuth();
    const [gptVersion, setGptVersion] = useState('3.5');

    const onGptVersionChange = (version: string) => {
        setGptVersion(version);
      };
    return(
        <View style={defaultStyles.pageContainer}>
            <Stack.Screen
        options={{
          headerTitle: () => (
            <HeaderDropDown
              title="ChatGPT"
              items={[
                { key: '3.5', title: 'GPT-3.5', icon: 'bolt' },
                { key: '4', title: 'GPT-4', icon: 'sparkles' },
              ]}
              onSelect={onGptVersionChange}
              selected={gptVersion}
            />
          ),
        }}
      />
            <Button onPress={()=>signOut()} title="Signout"/>
              <MessageInput onShouldSend={()=>{}} />
        </View>
    )
}

export default Page;