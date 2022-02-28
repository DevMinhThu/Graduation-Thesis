import React from 'react';
import { Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { SharedElement } from 'react-navigation-shared-element';
import { COLORS, FONTS, SIZES } from '../../constants';

const CategoryCard = (props: any) => {
    const { category, containerStyle, onPress, sharedElementPrefix } = props;
    return (
        <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
            <SharedElement
                style={[StyleSheet.absoluteFill]}
                id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
            >
                {/* Image Background */}
                <Image source={{ uri: category?.thumbnail }} resizeMode="contain" style={styles.styleImageBackground} />
                {/* Title */}
                <View style={styles.viewTitle}>
                    <SharedElement
                        id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
                        style={[StyleSheet.absoluteFillObject]}
                    >
                        <Text style={styles.title}>{category?.title}</Text>
                    </SharedElement>
                </View>
            </SharedElement>
        </TouchableOpacity>
    );
};

const styles = ScaledSheet.create({
    container: {
        height: '150@vs',
        width: '200@vs',
    },
    styleImageBackground: {
        width: '100%',
        height: '100%',
        paddingHorizontal: SIZES.radius,
    },
    title: {
        position: 'absolute',
        color: COLORS.white,
        ...FONTS.h2,
    },
    viewTitle: {
        position: 'absolute',
        bottom: '50@vs',
        left: '5@s',
    },
});

export default CategoryCard;
