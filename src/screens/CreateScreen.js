import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Image, Button, ScrollView, Pressable, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';

import { THEME } from '../theme';
import { addPost } from '../store/actions/actions';
import { PhotoPicker } from '../components/PhotoPicker';

export const CreateScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const clearForm = () => {
    setText('');
    setImage(null);
  };

  const saveHandler = () => {
    const newPost = {
      img: image,
      text,
      date: new Date().toJSON(),
      booked: false,
    };

    dispatch(addPost(newPost));
    navigation.navigate('Main');
    clearForm();
  };

  const photoPickHandler = uri => {
    setImage(uri);
  };

  return (
    <ScrollView>
      <Pressable onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Create new post</Text>

          <TextInput
            style={styles.textarea}
            placeholder="Enter post's text"
            value={text}
            onChangeText={setText}
            multiline
          />

          <PhotoPicker onPick={photoPickHandler} image={image} />

          <Button title="Create post" color={THEME.MAIN_COLOR} onPress={saveHandler} disabled={!text || !image} />
        </View>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'openRegular',
    marginVertical: 10,
  },
  textarea: {
    padding: 10,
    marginBottom: 10,
  },
});
