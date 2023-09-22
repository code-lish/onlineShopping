import { View, Text, Image, Button, ScrollView } from "react-native";

const SingleProductCart = ({ productInfo }) => {
  return (
    <View className="items-center bg-gray-950 pt-3 flex-1">
      <Image
        source={{ uri: productInfo?.image }}
        className="w-[90%] h-[500px] rounded-lg"
      />
      <ScrollView className="flex-1">
        <Text className="self-start pl-4 text-2xl rounded-md text-teal-500">
          {productInfo?.category}
        </Text>
        <Text className="text-white self-start pl-4 text-2xl rounded-md">
          {productInfo?.title}
        </Text>
        <Text className="text-white self-start pl-4 rounded-md mt-2">
          {productInfo?.description}
        </Text>
        <Text className="text-white self-start pl-4 text-2xl rounded-md my-2">
          ${productInfo?.price}
        </Text>
      </ScrollView>
    </View>
  );
};

export default SingleProductCart;
