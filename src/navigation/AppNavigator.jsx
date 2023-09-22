import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import About from "../screens/About";
import Products from "../screens/Products";
import Contact from "../screens/Contact";

import { AntDesign, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import SingleProduct from "../components/SingleProduct";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="homeScreen" component={HomeScreen} />
      <Stack.Screen
        name="singleProduct"
        options={{ title: "Product Information" }}
        component={SingleProduct}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#030712" },
        headerShown: false,
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#030712",
          paddingBottom: 2,
          height: 50,
          borderTopColor: "#14b8a6",
        },
        tabBarActiveTintColor: "#14b8a6",
        // tabBarActiveBackgroundColor: "#ccc",
        // tabBarItemStyle: {
        //   // position: "absolute",
        //   bottom: 10,
        //   marginLeft: 10,
        // },
      }}
    >
      <Tab.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
        component={HomeStack}
      />

      <Tab.Screen
        name="products"
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="reproduction"
              size={size}
              color={color}
            />
          ),
        }}
        component={Products}
      />

      <Tab.Screen
        name="contact"
        component={Contact}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="contacts" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="about"
        component={About}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="info" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
