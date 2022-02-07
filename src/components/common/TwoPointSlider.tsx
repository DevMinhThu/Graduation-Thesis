import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { COLORS, FONTS, SIZES } from '../../constants';

const TwoPointSlider = (props: any) => {
    const { values, min, max, prefix, postfix, onValuesChange } = props;
    return (
        <MultiSlider
            values={values}
            sliderLength={SIZES.width - SIZES.padding * 2 - 30}
            min={min}
            max={max}
            step={1}
            markerOffsetY={15}
            selectedStyle={styles.lineSelected}
            trackStyle={{
                height: 1,
                borderRadius: 10,
                backgroundColor: COLORS.gray30,
            }}
            customMarker={(e) => {
                return (
                    <View style={styles.containerMaker}>
                        <View style={styles.pointSlider} />
                        <Text style={styles.labelInfo}>
                            {prefix}
                            {e.currentValue}
                            {postfix}
                        </Text>
                    </View>
                );
            }}
            onValuesChange={(value) => onValuesChange(value)}
        />
    );
};

const styles = ScaledSheet.create({
    containerMaker: {
        height: '60@vs',
        width: '60@s',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lineSelected: {
        height: '2@vs',
        backgroundColor: COLORS.DEFAULT_GREEN,
    },
    pointSlider: {
        height: '15@vs',
        width: '15@s',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.DEFAULT_GREEN,
        backgroundColor: COLORS.white,
    },
    labelInfo: {
        marginTop: '5@vs',
        color: COLORS.gray80,
        ...FONTS.body3,
    },
});

export default TwoPointSlider;
