import React from "react";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PlacesListScreen from "../screens/PlacesListScreen";
import PlacesDetailScreen from "../screens/PlacesDetailScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";
import Colors from "../constants/Colors";

const NativeStack = createNativeStackNavigator();

const PlacesNavigator = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : "",
        },
        headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
      }}
    >
      <NativeStack.Screen name="Places" component={PlacesListScreen} />
      <NativeStack.Screen name="PlaceDetail" component={PlacesDetailScreen} />
      <NativeStack.Screen name="NewPlace" component={NewPlaceScreen} />
      <NativeStack.Screen name="Map" component={MapScreen} />
    </NativeStack.Navigator>
  );
};

export default PlacesNavigator;
