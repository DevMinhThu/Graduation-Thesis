import React, { useEffect, useRef } from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { COLORS, FONTS, SIZES } from '../../constants';

const ProfileRadioButton = (props: any) => {
    const { icon, label, isSelected, onPress } = props;
    const radioAnimated = useRef(new Animated.Value(0)).current;

    const circleColorAnimated = radioAnimated.interpolate({
        inputRange: [0, 17],
        outputRange: [COLORS.gray40, COLORS.DEFAULT_GREEN],
    });

    const lineColorAnimated = radioAnimated.interpolate({
        inputRange: [0, 17],
        outputRange: [COLORS.additionalColor4, COLORS.additionalColor13],
    });

    useEffect(() => {
        if (isSelected) {
            Animated.timing(radioAnimated, {
                toValue: 17,
                duration: 300,
                useNativeDriver: false,
            }).start();
        } else {
            Animated.timing(radioAnimated, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    }, [isSelected]);

    return (
        <View style={styles.container}>
            {/* icon */}
            <View style={styles.viewIcon}>
                <Image source={icon} resizeMode="contain" style={styles.imgIcon} />
            </View>

            {/* label */}
            <View style={styles.viewLabel}>
                <Text style={styles.label}>{label}</Text>
            </View>

            {/* radio button */}
            <TouchableOpacity style={styles.radioBtn} onPress={onPress}>
                <Animated.View style={[styles.line, { backgroundColor: lineColorAnimated }]} />
                <Animated.View style={[styles.circle, { left: radioAnimated, borderColor: circleColorAnimated }]} />
            </TouchableOpacity>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        height: '80@vs',
        alignItems: 'center',
    },
    viewIcon: {
        width: '40@s',
        height: '40@vs',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: COLORS.additionalColor11,
    },
    imgIcon: {
        width: '25@s',
        height: '25@vs',
        tintColor: COLORS.DEFAULT_GREEN,
    },
    // label
    viewLabel: {
        flex: 1,
        marginLeft: SIZES.radius,
    },
    label: {
        ...FONTS.h3,
        color: COLORS.black,
    },
    radioBtn: {
        width: '40@s',
        height: '40@vs',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconRightArrow: {
        width: '15@s',
        height: '15@vs',
    },
    line: {
        width: '100%',
        height: '5@vs',
        borderRadius: 3,
    },
    circle: {
        position: 'absolute',
        width: '25@s',
        height: '25@vs',
        borderRadius: 15,
        borderWidth: 5,
        backgroundColor: COLORS.white,
    },
});

export default ProfileRadioButton;
