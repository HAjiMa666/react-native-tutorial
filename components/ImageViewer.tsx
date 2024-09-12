import { FC } from "react"
import { Image, StyleSheet, ImageSourcePropType } from "react-native"

interface ImageViewerProps {
  placeholderImage: ImageSourcePropType | undefined
  selectedImage?: string
}
const ImageViewer: FC<ImageViewerProps> = ({ placeholderImage, selectedImage }) => {
  const imgSource = selectedImage ? { uri: selectedImage } : placeholderImage
  return <Image source={imgSource} style={style.image} />
}

export default ImageViewer

const style = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  }
})