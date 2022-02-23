import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { IconLabel } from '.';
import { COLORS, FONTS, icons, SIZES } from '../../constants';

const HorizontalCourseCard = (props: any) => {
    const { containerStyle, course, onPress } = props;
    return (
        <TouchableOpacity style={[styles.viewCourse, containerStyle]} onPress={onPress}>
            {/* thumbnail */}
            <Image source={course.thumbnail} resizeMode="cover" style={styles.imageCourse} />
            {/* Detail */}
            <View style={styles.containerCourseInfo}>
                {/* play */}
                <View style={styles.viewIconPlay}>
                    <Image source={icons.play} resizeMode="contain" style={styles.iconPlay} />
                </View>
                {/* info */}
                <View style={styles.viewContent}>
                    <Text numberOfLines={2} style={styles.titleCourse}>
                        {course.title}
                    </Text>
                    <IconLabel icon={icons.time} label={course.duration} containerStyle={styles.iconTime} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = ScaledSheet.create({
    viewCourse: {
        width: '270@s',
    },
    imageCourse: {
        width: '100%',
        height: '150@vs',
        marginBottom: SIZES.radius,
        borderRadius: SIZES.radius,
    },
    containerCourseInfo: {
        flexDirection: 'row',
    },
    viewIconPlay: {
        width: '45@s',
        height: '45@vs',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: COLORS.DEFAULT_GREEN,
    },
    iconPlay: {
        width: '35@s',
        height: '35@vs',
    },
    viewContent: {
        flexShrink: 1,
        paddingHorizontal: SIZES.radius,
    },
    titleCourse: {
        flex: 1,
        ...FONTS.h3,
    },
    iconTime: {
        marginTop: SIZES.base,
    },
});

export default HorizontalCourseCard;
