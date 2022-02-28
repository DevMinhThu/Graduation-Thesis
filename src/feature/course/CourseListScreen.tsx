/* eslint-disable consistent-return */
/* eslint-disable react-hooks/rules-of-hooks */
import { APP_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useRef } from 'react';
import { FlatList, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { LineDivider, VerticalCourseCard } from '../../components/common';
import { COLORS, FONTS, SIZES } from '../../constants';
import HeaderCourseListScreen from './components/HeaderCourseListScreen';
import ListCourseHeader from './components/ListCourseHeader';

const CourseListScreen = ({ route }: any) => {
    const { category, sharedElementPrefix } = route?.params;
    const flatListRef = useRef();

    const renderListCourse = () => {
        return (
            <FlatList
                ref={flatListRef}
                data={category?.listCourses}
                keyExtractor={(item: any) => `ListCourse-${item.id}`}
                contentContainerStyle={styles.containerListCourse}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                keyboardDismissMode="on-drag"
                ListHeaderComponent={<ListCourseHeader category={category} />}
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
                ItemSeparatorComponent={() => <LineDivider lineStyle={styles.lineDivider} />}
            />
        );
    };

    return (
        <View style={styles.container}>
            {/* List Course */}
            {renderListCourse()}

            {/* Header */}
            <HeaderCourseListScreen sharedElementPrefix={sharedElementPrefix} category={category} />
        </View>
    );
};

CourseListScreen.sharedElements = (route: { params: { category: any; sharedElementPrefix: any } }, otherRoute: any) => {
    if (otherRoute.name === 'Dashboard') {
        const { category, sharedElementPrefix } = route?.params;
        return [
            {
                id: `${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`,
            },
            {
                id: `${sharedElementPrefix}-CategoryCard-Title-${category?.id}`,
            },
        ];
    }
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    containerHeaderListCourse: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '270@vs',
        marginBottom: SIZES.base,
    },
    numberResult: {
        flex: 1,
        ...FONTS.body3,
    },
    // FlatList Course
    containerListCourse: {
        paddingHorizontal: SIZES.padding,
    },
    lineDivider: {
        backgroundColor: COLORS.gray20,
    },
    // Icon filter
    iconFilter: {
        width: '40@s',
        height: '40@vs',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: COLORS.primary,
    },
});

export default CourseListScreen;
