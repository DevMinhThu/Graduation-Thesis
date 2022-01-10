import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { COLORS } from '../../constants';

const LineDivider = (props: any) => {
    const { lineStyle } = props;
    return <View style={[styles.container, lineStyle]} />;
};

const styles = ScaledSheet.create({
    container: {
        height: '2@vs',
        width: '100%',
        backgroundColor: COLORS.gray20,
    },
});

export default LineDivider;
