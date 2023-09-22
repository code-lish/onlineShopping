import { View, Text } from "react-native";

const Title = ({ children }) => {
  return (
    <View>
      <Text className="text-white text-2xl">{children}</Text>
    </View>
  );
};

export default Title;
