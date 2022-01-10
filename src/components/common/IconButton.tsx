import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { COLORS } from '../../constants';

const IconButton = (props: any) => {
    const { containerStyle, icon, iconStyle, onPress } = props;
    return (
        <TouchableOpacity style={[containerStyle]} onPress={onPress}>
            <Image source={icon} resizeMode="contain" style={[styles.styleIcon, iconStyle]} />
        </TouchableOpacity>
    );
};

const styles = ScaledSheet.create({
    styleIcon: {
        width: '30@s',
        height: '30@vs',
        tintColor: COLORS.white,
    },
});

export default IconButton;
