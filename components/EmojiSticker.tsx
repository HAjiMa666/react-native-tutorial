import { FC } from 'react';
import { View, Image } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from "react-native-gesture-handler"

interface EmojiStickerProps {
  imageSize: number;
  stickerSource: any;
}
const EmojiSticker: FC<EmojiStickerProps> = ({ imageSize, stickerSource }) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scaleImage = useSharedValue(imageSize);
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2
      }
    })
  const drag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX
    translateY.value += event.changeY
  })
  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value)
    }
  })
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value
        },
        {
          translateY: translateY.value
        }
      ]
    }
  })
  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>

  );
}

export default EmojiSticker
