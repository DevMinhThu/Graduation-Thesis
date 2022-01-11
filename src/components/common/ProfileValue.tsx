import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { COLORS, FONTS, SIZES, icons } from '../../constants';

const ProfileValue = (props: any) => {
    const { icon, label, value, onPress } = props;
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {/* icon */}
            <View style={styles.viewIcon}>
                <Image source={icon} resizeMode="contain" style={styles.imgIcon} />
            </View>

            {/* label & value */}
            <View style={styles.viewLabelValue}>
                {label && <Text style={styles.label}>{label}</Text>}
                <Text style={styles.value}>{value}</Text>
            </View>

            {/* icon */}
            <Image source={icons.right_arrow} style={styles.iconRightArrow} />
        </TouchableOpacity>
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
        tintColor: COLORS.primary,
    },
    // label & value
    viewLabelValue: {
        flex: 1,
        marginLeft: SIZES.radius,
    },
    label: {
        color: COLORS.gray30,
        ...FONTS.body3,
    },
    value: {
        ...FONTS.h3,
    },
    iconRightArrow: {
        width: '15@s',
        height: '15@vs',
    },
});

export default ProfileValue;
