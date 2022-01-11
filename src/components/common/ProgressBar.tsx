import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { COLORS } from '../../constants';

const ProgressBar = (props: any) => {
    const { containerStyle, progress } = props;
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={[styles.progress, { width: progress }]} />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        width: '100%',
        height: '13@vs',
        borderRadius: 10,
        backgroundColor: COLORS.white,
    },
    progress: {
        position: 'absolute',
        left: 0,
        height: '100%',
        borderRadius: 10,
        backgroundColor: COLORS.DEFAULT_GREEN,
    },
});

export default ProgressBar;
