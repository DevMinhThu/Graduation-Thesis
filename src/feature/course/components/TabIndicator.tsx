import React from 'react';
import { Animated } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { COLORS, constants, SIZES } from '../../../constants';

export const courseDetailTabs = constants.course_details_tabs.map((courseDetailTab) => ({
    ...courseDetailTab,
    ref: React.createRef(),
}));

const TabIndicator = ({ measureLayout, scrollX }: any) => {
    const inputRange = courseDetailTabs.map((_, i) => i * SIZES.width);

    const tabIndicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map((measure: any) => measure.width),
    });

    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map((measure: any) => measure.x),
    });

    return <Animated.View style={[styles.container, { width: tabIndicatorWidth, transform: [{ translateX }] }]} />;
};

const styles = ScaledSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        height: 4,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.DEFAULT_GREEN,
    },
});

export default TabIndicator;
