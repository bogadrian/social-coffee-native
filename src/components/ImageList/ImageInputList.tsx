import React, { useRef } from 'react';

import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import ImageInput from './ImageInput';

export const { width, height } = Dimensions.get('window');

interface Props {
  imageUris: any;
  onRemoveImage: (uri: string) => void;
  onAddImage: (uri: string) => void;
  numberPhoto?: number;
}

const ImageInputList: React.FC<Props> = ({
  imageUris = [],
  onRemoveImage,
  onAddImage,
  numberPhoto
}) => {
  const scrollView: any = useRef();

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.slice(0, 10).map((uri: string) => (
            <View
              key={uri}
              style={numberPhoto === 0 ? styles.imageCenter : styles.image}
            >
              <ImageInput
                imageUri={uri}
                onChangeImage={() => onRemoveImage(uri)}
              />
            </View>
          ))}

          {imageUris.length <= numberPhoto! ? (
            <ImageInput onChangeImage={(uri: string) => onAddImage(uri)} />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  image: {
    marginRight: 10
  },
  imageCenter: {
    marginLeft: (width * 0.7) / 2,
    borderRadius: 10,
    overflow: 'hidden'
  }
});

export default ImageInputList;
