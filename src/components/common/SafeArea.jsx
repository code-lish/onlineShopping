import { View, SafeAreaView, Platform, StatusBar, Text } from "react-native";

const SafeArea = ({ children }) => {
  const currentStatusbarHeight =
    Platform?.OS === "android" && StatusBar?.currentHeight;

  return (
    <SafeAreaView
      className={`flex-1 justify-start bg-gray-900`}
      style={{ marginTop: currentStatusbarHeight }}
    >
      {children}
    </SafeAreaView>
  );
};

export default SafeArea;
