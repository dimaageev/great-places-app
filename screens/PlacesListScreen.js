import React, { useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import HeaderButton from "../components/HeaderButton";
import PlaceItem from "../components/PlaceItem";
import * as placesActions from "../store/places-actions";

const PlacesListScreen = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      title: "All Places",
      headerRight: () => (
        <HeaderButton
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          iconSize={25}
          iconColor="white"
          onPress={() => {
            props.navigation.navigate("NewPlace");
          }}
        />
      ),
    });
  }, [props.navigation]);

  const places = useSelector((state) => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={itemData.item.address}
          onSelect={() => {
            props.navigation.navigate("PlaceDetail", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id,
            });
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
