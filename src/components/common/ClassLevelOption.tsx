import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { LineDivider } from '.';
import { FONTS, icons } from '../../constants';

const ClassLevelOption = (props: any) => {
    const { containerStyle, classLevel, isLastItem, isSelected, onPress } = props;

    return (
        <>
            <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
                <Text style={[styles.label]}>{classLevel?.label}</Text>
                <Image source={isSelected ? icons.checkbox_on : icons.checkbox_off} style={[styles.checkBoxIcon]} />
            </TouchableOpacity>
            {!isLastItem && <LineDivider lineStyle={styles.lineDivider} />}
        </>
    );
};

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        height: '50@vs',
        alignItems: 'center',
    },
    label: {
        flex: 1,
        ...FONTS.body3,
    },
    checkBoxIcon: {
        width: '20@s',
        height: '20@vs',
    },
    lineDivider: {
        height: '1@vs',
    },
});

export default ClassLevelOption;
