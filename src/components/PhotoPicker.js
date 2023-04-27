import { View, StyleSheet, Image, Button, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const PhotoPicker = ({ onPick, image }) => {
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePhoto = async () => {
    const img = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: false,
      aspect: [16, 9],
    });

    onPick(img.assets[0].uri);
  };

  return (
    <View style={styles.wrapper}>
      <Button title="Take a picture" onPress={takePhoto} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
});
