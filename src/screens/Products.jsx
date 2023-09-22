import { View, Text, FlatList, ScrollView } from "react-native";
import Slider from "../components/Slider";
import SafeArea from "../components/common/SafeArea";
import Title from "../components/Title";
import Card from "../components/Card";
import { useGetProductsQuery } from "../features/store/storeApiSlice";
const Products = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetProductsQuery();

  const products = data?.ids?.map((item) => data?.entities[item]);

  return (
    <SafeArea>
      <View className="flex-1 mt-5">
        <FlatList
          data={products}
          renderItem={(product) => <Card product={product.item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeArea>
  );
};

export default Products;
