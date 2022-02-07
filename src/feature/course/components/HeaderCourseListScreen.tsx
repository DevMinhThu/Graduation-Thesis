/* eslint-disable react-hooks/rules-of-hooks */
import { goBack } from 'navigation/NavigationService';
import React from 'react';
import { Animated, Image, StyleSheet, Text } from 'react-native';
import { interpolate, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { ScaledSheet } from 'react-native-size-matters';
import { SharedElement } from 'react-navigation-shared-element';
import { IconButton } from '../../../components/common';
import { COLORS, FONTS, icons, images } from '../../../constants';

const HeaderCourseListScreen = (props: any) => {
    const { sharedElementPrefix, category } = props;

    const headerSharedValue = useSharedValue(80);

    headerSharedValue.value = withDelay(500, withTiming(0, { duration: 500 }));

    const headerFadeAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(headerSharedValue.value, [80, 0], [0, 1]),
        };
    });

    const headerTranslateAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: headerSharedValue.value,
                },
            ],
        };
    });

    return (
        <Animated.View style={styles.containerHeader}>
            <SharedElement
                id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
                style={[StyleSheet.absoluteFillObject]}
            >
                <Image source={category?.thumbnail} resizeMode="cover" style={styles.imageBackgroundHeader} />
            </SharedElement>
            {/* Title */}
            <Animated.View style={[styles.viewTitle]}>
                <SharedElement
                    id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
                    style={[StyleSheet.absoluteFillObject]}
                >
                    <Text style={styles.titleText}>{category?.title}</Text>
                </SharedElement>
            </Animated.View>
            {/* Back */}
            <Animated.View style={headerFadeAnimatedStyle}>
                <IconButton
                    icon={icons.ic_back}
                    iconStyle={styles.iconBack}
                    containerStyle={styles.containerIconBack}
                    onPress={() => {
                        goBack();
                    }}
                />
            </Animated.View>
            {/* Category Image */}
            <Animated.Image
                source={images.mobile_image}
                resizeMode="contain"
                style={[styles.categoryImage, headerFadeAnimatedStyle, headerTranslateAnimatedStyle]}
            />
        </Animated.View>
    );
};

const styles = ScaledSheet.create({
    // header
    containerHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '250@vs',
        overflow: 'hidden',
    },
    imageBackgroundHeader: {
        height: '100%',
        width: '100%',
        borderBottomLeftRadius: 60,
    },
    viewTitle: {
        position: 'absolute',
        bottom: '70@vs',
        left: '30@s',
    },
    titleText: {
        position: 'absolute',
        color: COLORS.white,
        ...FONTS.h1,
    },
    // btn back
    iconBack: {
        tintColor: COLORS.black,
    },
    containerIconBack: {
        position: 'absolute',
        top: '50@vs',
        left: '20@s',
        width: '45@s',
        height: '45@vs',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: COLORS.white,
    },
    // category image
    categoryImage: {
        position: 'absolute',
        right: '40@s',
        bottom: '-40@vs',
        width: '100@s',
        height: '200@vs',
    },
});

export default HeaderCourseListScreen;
