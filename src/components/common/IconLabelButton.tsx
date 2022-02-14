import React from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { SIZES, FONTS } from '../../constants';

const IconLabelButton = (props: any) => {
    const { containerStyle, icon, iconStyle, label, labelStyle, onPress } = props;
    return (
        <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
            <Image source={icon} style={[styles.styleIcon, iconStyle]} resizeMode="contain" />
            <Text style={[styles.styleLabel, labelStyle]}>{label}</Text>
        </TouchableOpacity>
    );
};

export default IconLabelButton;

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    styleIcon: {
        width: '20@s',
        height: '20@vs',
    },
    styleLabel: {
        marginLeft: SIZES.base,
        ...FONTS.body3,
    },
});
