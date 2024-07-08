import { Text, View } from "react-native";
import IntroAnimation from '../components/IntroAnimation'
import Bottomauth from "@/components/Bottomauth";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        
      }}
    >
      <IntroAnimation />
      <Bottomauth />
    </View>
  );
}
