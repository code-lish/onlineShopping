import { View, Text, Image } from "react-native";

const SliderItem = ({ item }) => {
  return (
    <View className="flex-1 bg-gray-950">
      {/* <Text className="text-white text-4xl">{item.body}</Text> */}
      <Image source={{ uri: item.img }} className="w-screen" height={200} />
    </View>
  );
};

export default SliderItem;
