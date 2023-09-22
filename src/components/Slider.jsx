import * as React from "react";
import { Dimensions, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import SliderItem from "./SliderItem";
import data from "../utils/sliderData";

function Slider() {
  const width = Dimensions.get("window").width;
  return (
    <View className="mt-4">
      <Carousel
        loop
        // mode="parallax"
        width={width}
        height={width / 2}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={1000}
        // onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ item }) => <SliderItem item={item} />}
      />
    </View>
  );
}

export default Slider;
