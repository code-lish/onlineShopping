import { View, Text, FlatList, ScrollView } from "react-native";
import Slider from "../components/Slider";
import SafeArea from "../components/common/SafeArea";
import Title from "../components/Title";
import Card from "../components/Card";
import { useGetProductsQuery } from "../features/store/storeApiSlice";

const HomeScreen = ({ navigation }) => {
  const { data, isLoading, isSuccess, isError, error } = useGetProductsQuery();

  const products = data?.ids?.map((item) => data?.entities[item]);

  return (
    <SafeArea>
      <Slider />
      <View className="flex-1 mt-5">
        <Title>Latest Products</Title>
        <FlatList
          data={products}
          renderItem={(product) => <Card product={product.item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeArea>
  );
};

export default HomeScreen;
