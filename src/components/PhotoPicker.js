import React, {useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {View, StyleSheet, Button, Image, Alert} from "react-native";

async function askPermissions() {
    const {status} = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL
    );

    if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!')
        return false
    }
    return true
}

export const PhotoPicker = ({onPick}) => {
    const [image, setImage] = useState(null);

    const takePhoto = async () => {
        const hasPermissions = await askPermissions();
        if (!hasPermissions) {
            return
        }

        const image = await ImagePicker.launchCameraAsync({
            quality: 0.7,
            allowsEditing: false,
            aspect: [16, 9]

        });

        setImage(image.uri);
        onPick(image.uri);
    };

    return (
        <View style={styles.wrapper}>
            <Button title='Add a photo' onPress={takePhoto}/>
            {image && <Image style={styles.image} source={{uri: image}}/>}
        </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10
    },
    image: {
        width: '100%',
        marginTop: 10,
        height: 200
    }
});
