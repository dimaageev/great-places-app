import React, { useEffect, useState, useCallback } from "react";
import { Alert, StyleSheet, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import HeaderButton from "../components/HeaderButton";

const MapScreen = (props) => {
  const initialLocation = props.route.params?.initialLocation;
  const readonly = props.route.params?.readonly;
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("You haven't picked location", "Please, pick location", [
        { text: "Okay" },
      ]);
      return;
    }
    props.navigation.navigate("NewPlace", { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    if (readonly) {
      return {};
    }
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          iconName="ios-checkmark"
          iconSize={25}
          iconColor="white"
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [props.navigation, savePickedLocationHandler]);

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 41.7,
    longitude: initialLocation ? initialLocation.lng : 44.76,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectedLocationHandler = (event) => {
    if (readonly) {
      return;
    }
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectedLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default MapScreen;
