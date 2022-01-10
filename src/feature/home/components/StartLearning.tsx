import React from 'react';
import { Image, ImageBackground, Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { TextButton } from '../../../components/common';
import { COLORS, FONTS, images, SIZES } from '../../../constants';

const StartLearning = () => {
    return (
        <ImageBackground
            source={images.featured_bg_image}
            style={styles.backgroundImage}
            imageStyle={styles.styleImage}
        >
            {/* Info */}
            <>
                <Text style={styles.titleStartLearning}>HOW TO</Text>
                <Text style={styles.contentStartLearning}>Make learning more effective and fun</Text>
                <Text style={styles.author}>By Scott Harris</Text>
            </>
            {/* Image */}
            <Image source={images.start_learning} resizeMode="contain" style={styles.imageDescription} />

            {/* Button */}
            <TextButton
                label="Start Learning"
                contentContainerStyle={styles.buttonStartLearning}
                labelStyle={styles.labelBtnStartLearning}
            />
        </ImageBackground>
    );
};

const styles = ScaledSheet.create({
    backgroundImage: {
        alignItems: 'flex-start',
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        padding: 15,
    },
    styleImage: {
        borderRadius: SIZES.radius,
    },
    titleStartLearning: {
        color: COLORS.white,
        ...FONTS.body2,
    },
    contentStartLearning: {
        color: COLORS.white,
        ...FONTS.h2,
    },
    author: {
        marginTop: SIZES.radius,
        color: COLORS.white,
        ...FONTS.body4,
    },
    imageDescription: {
        width: '100%',
        height: '110@vs',
        marginTop: SIZES.padding,
    },
    buttonStartLearning: {
        height: '40@vs',
        paddingHorizontal: SIZES.padding,
        borderRadius: 20,
        backgroundColor: COLORS.white,
    },
    labelBtnStartLearning: {
        color: COLORS.black,
    },
});

export default StartLearning;
