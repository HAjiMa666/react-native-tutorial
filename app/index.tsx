import { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker"
import * as MediaLibrary from "expo-media-library"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { captureRef } from "react-native-view-shot"
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 5000);



import ImageViewer from "../components/ImageViewer"
import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";

const PlaceholderImage = require("../assets/images/background-image.png")
export default function Index() {
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<any>();
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true)
    } else {
      alert("You did not select any image.")
    }
  }

  const onReset = () => {
    setShowAppOptions(false)
  }

  const onAddSticker = () => {
    setIsModalVisible(true)
  }

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1
      })

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved")
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (status === null) {
    requestPermission();
  }

  return (
    <GestureHandlerRootView style={styles.container}>

      <View style={styles.imgContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer placeholderImage={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
      </View>
      {
        showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
            </View>
          </View>

        ) : (
          <View style={styles.footerContainer}>
            <Button label="Choose a photo" theme="primary" onPress={pickImageAsync} />
            <Button label="Use this photo" onPress={() => { setShowAppOptions(true) }} />
          </View>
        )
      }
      <EmojiPicker isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={() => setIsModalVisible(false)} />
      </EmojiPicker>
      <StatusBar style="dark" />
    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    overflow: "scroll"
  },
  imgContainer: {
    marginTop: 48,
    marginBottom: 48
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})