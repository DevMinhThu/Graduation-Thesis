import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { setHeight, setWidth } from '../../../utilities/Display';
import { ThumbnailWelcome } from '../../../constants';

const WelcomeCard = ({ title, content, image }: any) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={ThumbnailWelcome[image]} resizeMode="contain" />
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.contentText}>{content}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: setWidth(100),
    },
    image: {
        height: setHeight(30),
        width: setWidth(60),
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    contentText: {
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 20,
    },
});

export default WelcomeCard;
