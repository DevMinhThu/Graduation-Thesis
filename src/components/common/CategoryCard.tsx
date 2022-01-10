import React from 'react';
import { ImageBackground, Text, TouchableOpacity } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { COLORS, FONTS, SIZES } from '../../constants';

const CategoryCard = (props: any) => {
    const { category, containerStyle, onPress } = props;
    return (
        <TouchableOpacity onPress={onPress}>
            <ImageBackground
                source={category?.thumbnail}
                resizeMode="cover"
                style={[styles.styleImageBackground, containerStyle]}
            >
                <Text style={styles.title}>{category?.title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = ScaledSheet.create({
    styleImageBackground: {
        width: 200,
        height: 150,
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.radius,
        justifyContent: 'flex-end',
    },
    title: {
        color: COLORS.white,
        ...FONTS.h2,
    },
});

export default CategoryCard;
