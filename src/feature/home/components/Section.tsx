import React from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { TextButton } from '../../../components/common';
import { COLORS, FONTS, SIZES } from '../../../constants';

const Section = (props: any) => {
    const { containerStyle, title, onPress, children } = props;
    return (
        <View style={containerStyle}>
            <View style={styles.containerSection}>
                <Text style={styles.title}>{title}</Text>
                <TextButton contentContainerStyle={styles.button} label="See All" onPress={onPress} />
            </View>
            {children}
        </View>
    );
};

const styles = ScaledSheet.create({
    containerSection: {
        flexDirection: 'row',
        paddingHorizontal: SIZES.padding,
    },
    title: {
        flex: 1,
        ...FONTS.h2,
    },
    button: {
        width: '80@s',
        borderRadius: 30,
        backgroundColor: COLORS.DEFAULT_GREEN,
    },
});

export default Section;
