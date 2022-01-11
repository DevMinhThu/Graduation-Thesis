import React from 'react';
import { Image, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { COLORS, FONTS } from '../../constants';

const IconLabel = (props: any) => {
    const { containerStyle, icon, iconStyle, label, labelStyle } = props;
    return (
        <View style={[styles.container, containerStyle]}>
            <Image source={icon} style={[styles.styleIcon, iconStyle]} />
            <Text style={[styles.label, labelStyle]}>{label}</Text>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    styleIcon: {
        width: '20@s',
        height: '20@vs',
        tintColor: COLORS.gray30,
    },
    label: {
        marginLeft: '5@s',
        color: COLORS.gray30,
        ...FONTS.body3,
    },
});

export default IconLabel;
