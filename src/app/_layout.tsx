import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useFonts,
  Jost_200ExtraLight,
  Jost_400Regular,
  Jost_600SemiBold,
  Jost_700Bold,
} from "@expo-google-fonts/jost";
import { Loading } from "@/components/loading";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Jost_200ExtraLight,
    Jost_400Regular,
    Jost_600SemiBold,
    Jost_700Bold,
  });

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <SafeAreaView className="bg-slate-900 flex-1">
      <Slot />
    </SafeAreaView>
  );
}
