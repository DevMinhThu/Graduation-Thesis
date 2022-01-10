import React from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { IconLabel } from '.';
import { COLORS, FONTS, icons, SIZES } from '../../constants';

const VerticalCourseCard = (props: any) => {
    const { containerStyle, course, onPress } = props;
    return (
        <TouchableOpacity style={[styles.viewCourse, containerStyle]} onPress={onPress}>
            {/* thumbnail */}
            <ImageBackground
                source={course.thumbnail}
                resizeMode="cover"
                style={styles.styleImageBackground}
                imageStyle={{ borderRadius: SIZES.radius }}
            >
                <View style={styles.contentImage}>
                    <Image
                        source={icons.favourite}
                        resizeMode="contain"
                        style={[
                            styles.iconHeart,
                            { tintColor: course.is_favourite ? COLORS.secondary : COLORS.additionalColor4 },
                        ]}
                    />
                </View>
            </ImageBackground>

            {/* Details */}
            <View style={styles.containerDetail}>
                {/* Title */}
                <Text style={styles.title}>{course.title}</Text>

                {/* Instructor & Duration */}
                <View style={styles.viewCourseInfo}>
                    <Text style={styles.instructor}>By {course.instructor}</Text>
                    <IconLabel
                        icon={icons.time}
                        label={course.duration}
                        containerStyle={styles.containerIconTime}
                        iconStyle={styles.iconTime}
                        labelStyle={styles.labelTime}
                    />
                </View>

                {/* Price & Ratings */}
                <View style={styles.viewPriceRating}>
                    <Text style={styles.price}>${course.price.toFixed(2)}</Text>
                    <IconLabel
                        icon={icons.star}
                        label={course.ratings}
                        containerStyle={styles.containerIconStar}
                        iconStyle={styles.iconStar}
                        labelStyle={styles.labelRating}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = ScaledSheet.create({
    viewCourse: {
        flexDirection: 'row',
    },
    styleImageBackground: {
        width: '130@s',
        height: '130@vs',
        marginBottom: SIZES.radius,
    },
    contentImage: {
        position: 'absolute',
        top: '10@vs',
        right: '10@s',
        width: '30@s',
        height: '30@vs',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: COLORS.white,
    },
    iconHeart: {
        width: '20@s',
        height: '20@vs',
    },
    // Detail
    containerDetail: {
        flex: 1,
        marginLeft: SIZES.base,
    },
    title: {
        ...FONTS.h3,
        fontSize: 18,
    },
    viewCourseInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZES.base,
    },
    instructor: {
        ...FONTS.body4,
    },
    containerIconTime: {
        marginLeft: SIZES.base,
    },
    iconTime: {
        width: '15@s',
        height: '15@vs',
    },
    labelTime: {
        ...FONTS.body4,
    },
    // Price & Rating
    viewPriceRating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZES.base,
    },
    price: {
        ...FONTS.h2,
        color: COLORS.primary,
    },
    containerIconStar: {
        marginLeft: SIZES.base,
    },
    iconStar: {
        width: '15@s',
        height: '15@vs',
        tintColor: COLORS.primary2,
    },
    labelRating: {
        marginLeft: '5@s',
        color: COLORS.black,
        ...FONTS.h3,
    },
});

export default VerticalCourseCard;
