import React from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import YoutubePlayer from 'react-native-youtube-iframe';
import { SIZES } from '../../../constants';

const VideoDetailsScreen = (props: any) => {
    const { playVideo, selectedCourse } = props;

    return (
        <View style={styles.container}>
            <YoutubePlayer play={playVideo} videoId={selectedCourse?.videoID} height={SIZES.height > 800 ? 220 : 200} />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        paddingTop: 50,
    },
});

export default VideoDetailsScreen;
