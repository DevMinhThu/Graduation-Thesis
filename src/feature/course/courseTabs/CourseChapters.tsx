import { APP_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { FlatList, Image, ScrollView, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { IconLabel, LineDivider, TextButton, VerticalCourseCard } from '../../../components/common';
import { COLORS, dummyData, FONTS, icons, SIZES } from '../../../constants';

const CourseChapters = (props: any) => {
    const { selectedCourse } = props;

    const renderHeader = () => {
        return (
            <View style={styles.containerHeader}>
                {/* Title */}
                <Text numberOfLines={2} style={styles.titleCourseDetail}>
                    {selectedCourse?.title}
                </Text>
                {/* Students & Duration */}
                <View style={styles.containerStudentsDuration}>
                    <Text style={styles.numberStudents}>{dummyData?.course_details?.number_of_students}</Text>
                    <IconLabel
                        icon={icons.time}
                        label={selectedCourse?.duration}
                        containerStyle={styles.containerStyleIcon}
                        iconStyle={styles.styleIcon}
                        labelStyle={styles.styleLabel}
                    />
                </View>
                {/* Instructor */}
                <View style={styles.containerInstructor}>
                    {/* Profile Photo */}
                    <Image source={{ uri: selectedCourse?.imageProfile }} style={styles.imgProfile} />
                    {/* Name & Title */}
                    <View style={styles.containerNameTitle}>
                        <Text style={styles.nameAuthor}>{selectedCourse?.instructor}</Text>
                        <Text style={styles.titleInstructor}>{selectedCourse?.subscriber}</Text>
                    </View>
                    {/* Text Button */}
                    <TextButton
                        label="🔔"
                        contentContainerStyle={styles.bgButtonFollow}
                        labelStyle={styles.titleFollow}
                    />
                </View>
            </View>
        );
    };

    const renderDescription = () => {
        return (
            <View style={styles.containerDescription}>
                <Text style={styles.titleDescription}>Description</Text>
                <Text style={styles.contentDescription}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima quas vero doloribus suscipit
                    voluptatem, laboriosam consequatur mollitia eaque in fugiat! Alias non, delectus hic esse mollitia
                    rem repellat deleniti fugit!
                </Text>
            </View>
        );
    };

    const renderPopularCourses = () => {
        return (
            <View style={styles.containerPopularCourses}>
                {/* Section Header */}
                <View style={styles.popularCourseHeader}>
                    <Text style={styles.titlePopularCourse}>Popular Courses</Text>
                    <TextButton contentContainerStyle={styles.btnSeeAll} label="See All" />
                </View>
                {/* Popular Courses List */}
                <FlatList
                    data={dummyData.courses_list_2}
                    listKey="PopularCourses"
                    scrollEnabled={false}
                    keyExtractor={(item: any) => `PopularCourses-${item.id}`}
                    contentContainerStyle={{
                        marginTop: SIZES.radius,
                        paddingHorizontal: SIZES.padding,
                    }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <VerticalCourseCard
                            course={item}
                            containerStyle={{
                                marginVertical: SIZES.padding,
                                marginTop: index === 0 ? SIZES.radius : SIZES.padding,
                            }}
                            onPress={() => navigate(APP_ROUTE.COURSE_DETAIL, { selectedCourse: item })}
                        />
                    )}
                    ItemSeparatorComponent={() => <LineDivider />}
                />
            </View>
        );
    };

    return (
        <ScrollView>
            {/* Header */}
            {renderHeader()}
            {/* Line Divider */}
            <LineDivider lineStyle={styles.lineDivider} />
            {/* Chapter */}
            {renderDescription()}
            {/* Popular Courses */}
            {renderPopularCourses()}
        </ScrollView>
    );
};

const styles = ScaledSheet.create({
    // header
    containerHeader: {
        marginTop: SIZES.padding,
        paddingHorizontal: SIZES.padding,
    },
    titleCourseDetail: {
        ...FONTS.h2,
    },
    containerStudentsDuration: {
        flexDirection: 'row',
        marginTop: SIZES.base,
    },
    numberStudents: {
        color: COLORS.gray30,
        ...FONTS.body4,
    },
    containerStyleIcon: {
        marginLeft: SIZES.radius,
    },
    styleIcon: {
        width: '15@s',
        height: '15@vs',
    },
    styleLabel: {
        ...FONTS.body4,
    },
    containerInstructor: {
        flexDirection: 'row',
        marginTop: SIZES.radius,
        alignItems: 'center',
    },
    imgProfile: {
        width: '50@s',
        height: '50@vs',
        borderRadius: 25,
    },
    containerNameTitle: {
        flex: 1,
        marginLeft: SIZES.base,
        justifyContent: 'center',
    },
    nameAuthor: {
        ...FONTS.h3,
        fontSize: 18,
    },
    titleInstructor: {
        ...FONTS.body3,
    },
    bgButtonFollow: {
        width: '35@s',
        height: '35@vs',
        borderRadius: 50,
    },
    titleFollow: {
        ...FONTS.h2,
    },
    // Line divider
    lineDivider: {
        height: '1@vs',
        marginVertical: SIZES.radius,
    },
    // Chapter
    containerChapter: {
        alignItems: 'center',
        height: '70@vs',
    },
    itemChapter: {
        flexDirection: 'row',
        paddingHorizontal: SIZES.padding,
        alignItems: 'center',
        height: '70@vs',
    },
    styleIconLeft: {
        width: '40@s',
        height: '40@vs',
    },
    containerContent: {
        flex: 1,
        marginLeft: SIZES.radius,
    },
    title: { ...FONTS.h3 },
    styleDuration: {
        color: COLORS.gray30,
        ...FONTS.body4,
    },
    sizeContent: {
        color: COLORS.gray30,
        ...FONTS.body4,
    },
    styleIconRight: {
        marginLeft: SIZES.base,
        width: '25@s',
        height: '25@vs',
    },
    // Popular courses
    containerPopularCourses: {
        marginTop: SIZES.padding,
    },
    popularCourseHeader: {
        flexDirection: 'row',
        paddingHorizontal: SIZES.padding,
    },
    titlePopularCourse: {
        flex: 1,
        ...FONTS.h2,
    },
    btnSeeAll: {
        width: '80@s',
        borderRadius: 30,
        backgroundColor: COLORS.primary,
    },
    // Description
    containerDescription: {
        paddingHorizontal: SIZES.padding,
    },
    titleDescription: {
        ...FONTS.h3,
        marginBottom: '10@vs',
    },
    contentDescription: {
        fontSize: '14@ms',
    },
});

export default CourseChapters;
