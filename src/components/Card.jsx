import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Card = ({ product }) => {
  const navigation = useNavigation();

  const onPressHandler = () => {
    navigation.navigate("singleProduct", { productId: product?.id });
  };
  return (
    <TouchableOpacity onPress={onPressHandler}>
      <View className="my-3 pb-4 bg-gray-950">
        <View className="items-center bg-gray-950 overflow-hidden">
          <Image
            source={{ uri: product?.image }}
            className="w-full h-[250px] rounded-lg"
          />

          <Text className="text-white self-start pl-4 text-2xl rounded-md">
            {product?.title.substring(0, 25) + "..."}
          </Text>
          <Text className="text-white self-start pl-4 text-2xl rounded-md">
            ${product?.price}
          </Text>
          <View className="mt-3 mx-1 w-full">
            <Button title="Buy" onPress={onPressHandler} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
