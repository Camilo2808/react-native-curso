import React from "react";
import * as Sharing from "expo-sharing";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import uploadToAnonymousFilesAsync from "anonymous-files";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
// import image from './assets/diamante.png'

const App = () => {
  const [selectImage, setSelectImage] = useState(null);

  const openImagePickerAsync = async () => {
    const resultadoPermisos =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (resultadoPermisos.granted === false) {
      alert("permiso para acceder a la camara son requeridos");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    if (Platform.OS === "web") {

     const remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri)
     console.log(remoteUri)
    } else {
      setSelectImage({ localUri: pickerResult.uri });
    }
  };

  const openDialog = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert("Compratir no esta disponble para esta plataforma ");
      return;
    }

    await Sharing.shareAsync(selectImage.localUri);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona una Imagen !!</Text>
      <TouchableOpacity onPress={openImagePickerAsync}>
        <Image
          source={{
            uri:
              selectImage !== null
                ? selectImage.localUri
                : "https://picsum.photos/180/180 ",
          }}
          style={styles.image}
        />
      </TouchableOpacity>

      {selectImage ? (
        <TouchableOpacity onPress={openDialog} style={styles.button}>
          <Text style={styles.buttonText}>Compartir</Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#292929",
  },
  title: { fontSize: 30, color: "white", marginBottom: 25 },
  image: { height: 180, width: 180, borderRadius: 90, resizeMode: "contain" },
  button: {
    backgroundColor: "deepskyblue",
    padding: 7,
    marginTop: 25,
  },
  buttonText: { color: "white", fontSize: 20 },
});

export default App;
