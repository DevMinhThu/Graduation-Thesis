import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Keyboard, Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { LineDivider } from '../../../components/common';
import { COLORS, constants, FONTS, SIZES } from '../../../constants';
import CourseChapters from '../courseTabs/CourseChapters';
import CourseDiscussions from '../courseTabs/CourseDiscussions';
import CourseFiles from '../courseTabs/CourseFiles';
import VideoDetailsScreen from '../video/VideoDetailsScreen';
import TabIndicator, { courseDetailTabs } from './TabIndicator';

// Tabs
const Tabs = ({ scrollX, onTabPress }: any) => {
    const [measureLayout, setMeasureLayout] = useState([]);
    const containerRef = useRef();

    useEffect(() => {
        const ml: any[] = [];
        courseDetailTabs.forEach((courseDetailTab) => {
            courseDetailTab?.ref?.current?.measureLayout(
                containerRef.current,
                (x: any, y: any, width: any, height: any) => {
                    ml.push({
                        x,
                        y,
                        width,
                        height,
                    });
                    if (ml.length === courseDetailTabs.length) {
                        setMeasureLayout(ml);
                    }
                },
            );
        });
    }, [containerRef.current]);

    return (
        <View ref={containerRef} style={styles.containerTabs}>
            {/* Tab Indicator */}
            {measureLayout.length > 0 && <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />}
            {/* Tabs */}
            {courseDetailTabs.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={`Tab-${index}`}
                        ref={item.ref}
                        style={styles.itemTab}
                        onPress={() => {
                            Keyboard.dismiss();
                            onTabPress(index);
                        }}
                    >
                        <Text style={styles.labelTab}>{item.label}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const CourseDetails = ({ route }: any) => {
    const { selectedCourse } = route.params;
    const [playVideo] = useState(false);

    // tab-horizontal
    const flatListRef = useRef();
    const scrollX = useRef(new Animated.Value(0)).current;

    const onTabPress = useCallback((tabIndex) => {
        flatListRef?.current?.scrollToOffset({
            offset: tabIndex * SIZES.width,
        });
    }, []);

    const renderContent = () => {
        return (
            <View style={{ flex: 1 }}>
                {/* Tabs */}
                <View style={{ height: 60 }}>
                    <Tabs scrollX={scrollX} onTabPress={onTabPress} />
                </View>
                {/* Line Divider */}
                <LineDivider
                    lineStyle={{
                        backgroundColor: COLORS.gray20,
                    }}
                />
                {/* Content */}
                <Animated.FlatList
                    ref={flatListRef}
                    horizontal
                    pagingEnabled
                    snapToAlignment="center"
                    snapToInterval={SIZES.width}
                    decelerationRate="fast"
                    keyboardDismissMode="on-drag"
                    showsHorizontalScrollIndicator={false}
                    data={constants.course_details_tabs}
                    keyExtractor={(item) => `CourseDetailTabs-${item.id}`}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                    })}
                    renderItem={({ index }) => {
                        return (
                            <View style={{ width: SIZES.width }}>
                                {index === 0 && <CourseChapters selectedCourse={selectedCourse} />}
                                {index === 1 && <CourseFiles selectedCourse={selectedCourse} />}
                                {index === 2 && <CourseDiscussions selectedCourse={selectedCourse} />}
                            </View>
                        );
                    }}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Video */}
            <VideoDetailsScreen
                playVideo={playVideo}
                selectedCourse={selectedCourse}
                // onPress={() => setPlayVideo(true)}
            />
            {/* Content */}
            {renderContent()}
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    // tab
    containerTabs: {
        flex: 1,
        flexDirection: 'row',
    },
    itemTab: {
        flex: 1,
        paddingHorizontal: '15@s',
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelTab: {
        ...FONTS.h3,
        fontSize: SIZES.height > 800 ? 17 : 16,
    },
});

export default CourseDetails;
