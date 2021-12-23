import React, { useState } from "react";
import { View, Button, Text, StyleSheet, Image, Alert } from "react-native";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";

const ImgPicker = (props) => {
  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    const result = await ImagePicker.getCameraPermissionsAsync();
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions",
        "You need to grant camera permissions to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.uri);
    props.onImageTaken(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {pickedImage ? (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        ) : (
          <Text>No image picked yet</Text>
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImgPicker;
