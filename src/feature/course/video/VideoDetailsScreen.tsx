import React from 'react';
import { ImageBackground, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Video from 'react-native-video';
import { IconButton } from '../../../components/common';
import { COLORS, icons, SIZES } from '../../../constants';

const VideoDetailsScreen = (props: any) => {
    const { playVideo, selectedCourse, onPress } = props;
    return (
        <View style={styles.containerVideo}>
            {/* Thumbnail */}
            <ImageBackground source={selectedCourse?.thumbnail} style={styles.styleThumbnailVideo}>
                {/* play button */}
                <IconButton
                    icon={icons.play}
                    iconStyle={styles.sizeIcon}
                    containerStyle={styles.backgroundColorIcon}
                    onPress={onPress}
                />
            </ImageBackground>
            {playVideo && (
                <Video
                    source={{ uri: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4' }}
                    controls
                    style={styles.bgVideo}
                />
            )}
        </View>
    );
};

const styles = ScaledSheet.create({
    // video
    containerVideo: {
        height: SIZES.height > 800 ? 220 : 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.gray90,
    },
    bgVideo: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: COLORS.black,
    },
    // thumbnail
    styleThumbnailVideo: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sizeIcon: {
        width: '25@s',
        height: '25@vs',
        tintColor: COLORS.white,
    },
    backgroundColorIcon: {
        width: '55@s',
        height: '55@vs',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SIZES.padding,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
    },
});

export default VideoDetailsScreen;
