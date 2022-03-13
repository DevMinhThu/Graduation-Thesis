import { collection, getDocs } from 'firebase/firestore/lite';
import { APP_ROUTE, TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ScaledSheet } from 'react-native-size-matters';
import { CategoryCard, HorizontalCourseCard, LineDivider, VerticalCourseCard } from '../../components/common';
import { COLORS, SIZES } from '../../constants';
import { DataBase } from '../../firebase/firebase-config';
import Header from './components/Header';
import Section from './components/Section';
import StartLearning from './components/StartLearning';

const HomeScreen = () => {
    const [coursesListHorizontal, setCoursesListHorizontal] = useState<any>();
    const [coursesListVertical, setCoursesListVertical] = useState<any>();
    const [categories, setCategories] = useState<any>();

    useEffect(() => {
        getCoursesListHorizontal();
        getCoursesListVertical();
        getCategories();
    }, []);

    const getCoursesListHorizontal = async () => {
        const coursesListHorizontalCollection = collection(DataBase, 'coursesListHorizontal');
        const coursesListHorizontalSnapshot = await getDocs(coursesListHorizontalCollection);
        const coursesListHorizontalList = coursesListHorizontalSnapshot.docs.map((doc) => doc.data());
        setCoursesListHorizontal(coursesListHorizontalList);
    };

    const getCoursesListVertical = async () => {
        const coursesListVerticalCollection = collection(DataBase, 'coursesListVertical');
        const coursesListVerticalSnapshot = await getDocs(coursesListVerticalCollection);
        const coursesListVerticalList = coursesListVerticalSnapshot.docs.map((doc) => doc.data());
        setCoursesListVertical(coursesListVerticalList);
    };

    const getCategories = async () => {
        const categoriesCollection = collection(DataBase, 'categories');
        const categoriesSnapshot = await getDocs(categoriesCollection);
        const categoriesList = categoriesSnapshot.docs.map((doc) => doc.data());
        setCategories(categoriesList);
    };

    const renderCourses = () => {
        return (
            <FlatList
                horizontal
                data={coursesListHorizontal}
                // data={dummyData.courses_list_horizontal}
                listKey="Courses"
                keyExtractor={(item) => `Courses-${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.containerCourse}
                renderItem={({ item, index }) => (
                    <HorizontalCourseCard
                        containerStyle={{
                            marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
                            marginRight: index === coursesListHorizontal.length - 1 ? SIZES.padding : 0,
                        }}
                        course={item}
                        onPress={() => navigate(APP_ROUTE.COURSE_DETAIL, { selectedCourse: item })}
                    />
                )}
            />
        );
    };

    const renderCategories = () => {
        return (
            <Section title="Categories">
                <FlatList
                    horizontal
                    // data={dummyData.categories}
                    data={categories}
                    listKey="Categories"
                    keyExtractor={(item) => `Categories-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.containerCategories}
                    renderItem={({ item, index }) => (
                        <CategoryCard
                            sharedElementPrefix={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME}
                            category={item}
                            containerStyle={{
                                marginLeft: index === 0 ? SIZES.padding : SIZES.base,
                                marginRight: index === categories.length - 1 ? SIZES.padding : 0,
                            }}
                            onPress={() =>
                                navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.COURSE_LIST, {
                                    category: item,
                                    sharedElementPrefix: TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME,
                                })
                            }
                        />
                    )}
                />
            </Section>
        );
    };

    const renderPopularCourses = () => {
        return (
            <Section title="Popular Course" containerStyle={styles.containerPopularCourses}>
                <FlatList
                    data={coursesListVertical}
                    // data={dummyData.courses_list_vertical}
                    listKey="PopularCourses"
                    scrollEnabled={false}
                    keyExtractor={(item) => `PopularCourses-${item.id}`}
                    contentContainerStyle={styles.containerListPopularCourses}
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
            </Section>
        );
    };

    return (
        <View style={styles.container}>
            <Header
                nameUser="Hello, Vu Minh Thu!"
                dateTime="Friday, 9th Sept 2021"
                onPress={() => navigate(APP_ROUTE.NOTIFICATION)}
            />
            {/* === Content === */}
            <ScrollView contentContainerStyle={styles.viewScrollView} showsVerticalScrollIndicator={false}>
                <StartLearning />
                {renderCourses()}
                <LineDivider lineStyle={{ marginVertical: SIZES.padding }} />
                {renderCategories()}
                {renderPopularCourses()}
            </ScrollView>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        // flex: 1,
        backgroundColor: COLORS.white,
    },
    viewScrollView: {
        paddingBottom: '90@vs',
    },
    // Courses
    containerCourse: {
        marginTop: SIZES.padding,
    },
    // Categories
    containerCategories: {
        marginTop: SIZES.radius,
    },
    // PopularCourses
    containerPopularCourses: {
        marginTop: '30@vs',
    },
    containerListPopularCourses: {
        marginTop: SIZES.radius,
        paddingHorizontal: SIZES.padding,
    },
    lineDivider: {
        backgroundColor: COLORS.gray20,
    },
});

export default HomeScreen;
