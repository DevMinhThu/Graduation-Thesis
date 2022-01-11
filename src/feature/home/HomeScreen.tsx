import React from 'react';
import { ScrollView, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ScaledSheet } from 'react-native-size-matters';
import { CategoryCard, HorizontalCourseCard, LineDivider, VerticalCourseCard } from '../../components/common';
import { COLORS, dummyData, SIZES } from '../../constants';
import Header from './components/Header';
import Section from './components/Section';
import StartLearning from './components/StartLearning';

const HomeScreen = () => {
    const renderCourses = () => {
        return (
            <FlatList
                horizontal
                data={dummyData.courses_list_1}
                listKey="Courses"
                keyExtractor={(item) => `Courses-${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.containerCourse}
                renderItem={({ item, index }) => (
                    <HorizontalCourseCard
                        containerStyle={{
                            marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
                            marginRight: index === dummyData.courses_list_1.length - 1 ? SIZES.padding : 0,
                        }}
                        course={item}
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
                    data={dummyData.categories}
                    listKey="Categories"
                    keyExtractor={(item) => `Categories-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.containerCategories}
                    renderItem={({ item, index }) => (
                        <CategoryCard
                            category={item}
                            containerStyle={{
                                marginLeft: index === 0 ? SIZES.padding : SIZES.base,
                                marginRight: index === dummyData.categories.length - 1 ? SIZES.padding : 0,
                            }}
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
                    data={dummyData.courses_list_2}
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
                        />
                    )}
                    ItemSeparatorComponent={() => <LineDivider lineStyle={styles.lineDivider} />}
                />
            </Section>
        );
    };

    return (
        <View style={styles.container}>
            <Header nameUser="Hello, Vu Minh Thu!" dateTime="Friday, 9th Sept 2021" />
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
