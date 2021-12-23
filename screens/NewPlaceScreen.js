import React, { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import * as placesActions from "../store/places-actions";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";
import MapPreview from "../components/MapPreview";

const NewPlaceScreen = (props) => {
  const [titleValue, setTitleValue] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    setTitleValue(text);
  };

  const imageTakenHandler = (imagePath) => {
    setSelectedImage(imagePath);
  };

  const locationPickedHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  const savePlaceHandler = () => {
    dispatch(
      placesActions.addPlace(titleValue, selectedImage, selectedLocation)
    );
    props.navigation.goBack();
  };

  useEffect(() => {
    props.navigation.setOptions({
      title: "Add Place",
    });
  }, [props.navigation]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={titleValue}
          onChangeText={titleChangeHandler}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={props.navigation}
          route={props.route}
          onLocationPicked={locationPickedHandler}
        />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
