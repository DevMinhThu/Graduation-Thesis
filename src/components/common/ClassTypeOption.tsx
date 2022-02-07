import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { COLORS, FONTS, SIZES } from '../../constants';

const ClassTypeOption = (props: any) => {
    const { containerStyle, classType, isSelected, onPress } = props;

    return (
        <TouchableOpacity
            style={[
                styles.container,
                { backgroundColor: isSelected ? COLORS.primary3 : COLORS.additionalColor9 },
                containerStyle,
            ]}
            onPress={onPress}
        >
            <Image
                source={classType.icon}
                resizeMode="contain"
                style={[styles.styleImage, { tintColor: isSelected ? COLORS.white : COLORS.gray80 }]}
            />
            <Text style={[styles.labelBtn, { color: isSelected ? COLORS.white : COLORS.gray80 }]}>
                {classType.label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        height: '100@vs',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
    },
    styleImage: {
        width: '40@s',
        height: '40@vs',
    },
    labelBtn: {
        marginTop: SIZES.base,
        ...FONTS.h3,
    },
});

export default ClassTypeOption;
