import { View, Text, Button } from "react-native";

const About = ({ navigation }) => {
  return (
    <View className="flex-1 items-center justify-center bg-gray-900">
      <Text className="text-white text-3xl">
        This is a simple mobile app integrated with fakeStore API.
      </Text>
    </View>
  );
};

export default About;
