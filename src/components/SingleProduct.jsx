import { View, Text } from "react-native";
import { useGetSingleProductQuery } from "../features/store/storeApiSlice";
import SingleProductCart from "./SingleProductCart";

const SingleProduct = ({ route }) => {
  const productId = route.params.productId;

  const {
    data: singleProduct,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSingleProductQuery(productId);

  console.log({ singleProduct });

  return (
    <View className="flex-1">
      <SingleProductCart productInfo={singleProduct} />
    </View>
  );
};

export default SingleProduct;
