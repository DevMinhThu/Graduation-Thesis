import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { COLORS, FONTS } from '../../constants';

const TextButton = (props: any) => {
    const { contentContainerStyle, disabled, label, labelStyle, onPress } = props;
    return (
        <TouchableOpacity style={[styles.container, contentContainerStyle]} disabled={disabled} onPress={onPress}>
            <Text style={[styles.label, labelStyle]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = ScaledSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.DEFAULT_GREEN,
    },
    label: {
        color: COLORS.white,
        ...FONTS.h3,
    },
});

export default TextButton;
