import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import YoutubePlayer from 'react-native-youtube-iframe';
import { isIos } from 'utilities/helper';
import { SIZES } from '../../../constants';

const VideoDetailsScreen = (props: any) => {
    const { playVideo, selectedCourse } = props;

    return (
        <View style={styles.container}>
            <YoutubePlayer
                play={playVideo}
                videoId={selectedCourse?.videoID}
                height={isIos ? 220 : SIZES.height > 800 ? 230 : 220}
            />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        paddingTop: isIos ? '50@vs' : undefined,
    },
});

export default VideoDetailsScreen;
