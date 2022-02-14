import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { IconButton, TextButton } from '../../../components/common';
import { COLORS, dummyData, FONTS, icons, SIZES } from '../../../constants';

const CourseFiles = () => {
    const renderStudents = () => {
        let students = [];

        if (dummyData?.course_details?.students.length > 3) {
            students = dummyData?.course_details?.students.slice(0, 3);
        } else {
            students = dummyData?.course_details?.students;
        }

        return (
            <View>
                {/* Title */}
                <Text style={styles.title}>Students</Text>
                {/* Students */}
                <View style={styles.containerListStudents}>
                    {students.map((item, index) => {
                        return (
                            <View
                                key={`Students-${index}`}
                                style={[styles.containerItemStudent, { marginLeft: index > 0 ? SIZES.radius : 0 }]}
                            >
                                <Image source={item?.thumbnail} style={styles.imgStudent} />
                            </View>
                        );
                    })}
                    {dummyData?.course_details?.students.length > 3 && (
                        <TextButton
                            label="View All"
                            labelStyle={styles.labelViewAll}
                            contentContainerStyle={styles.containerLabel}
                        />
                    )}
                </View>
            </View>
        );
    };

    const renderFiles = () => {
        return (
            <View style={styles.containerFile}>
                {/* Title */}
                <Text style={styles.title}>Files</Text>
                {/* File */}
                {dummyData?.course_details.files.map((item, index) => {
                    return (
                        <View key={`Files-${index}`} style={styles.containerItemFiles}>
                            {/* Thumbnail */}
                            <Image source={item?.thumbnail} style={styles.imgStudent} />
                            {/* Name, author & date */}
                            <View style={styles.infoFile}>
                                <Text style={styles.nameFile}>{item?.name}</Text>
                                <Text style={styles.nameAuthor}>{item?.author}</Text>
                                <Text style={styles.uploadDate}>{item?.upload_date}</Text>
                            </View>
                            {/* Menu */}
                            <IconButton
                                icon={icons.menu}
                                iconStyle={styles.styleIcon}
                                containerStyle={styles.containerIcon}
                            />
                        </View>
                    );
                })}
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            {/* Students */}
            {renderStudents()}
            {/* Files */}
            {renderFiles()}
        </ScrollView>
    );
};

const styles = ScaledSheet.create({
    container: {
        padding: SIZES.padding,
    },
    // student
    title: {
        ...FONTS.h2,
        fontSize: '25@ms',
    },
    containerListStudents: {
        flexDirection: 'row',
        marginTop: SIZES.radius,
        alignItems: 'center',
    },
    containerItemStudent: {},
    imgStudent: {
        width: '80@s',
        height: '80@vs',
    },
    labelViewAll: {
        color: COLORS.primary,
        ...FONTS.h3,
    },
    containerLabel: {
        marginLeft: SIZES.base,
        backgroundColor: undefined,
    },
    // file
    containerFile: {
        marginTop: SIZES.padding,
    },
    containerItemFiles: {
        flexDirection: 'row',
        marginTop: SIZES.radius,
    },
    infoFile: {
        flex: 1,
        marginLeft: SIZES.radius,
    },
    nameFile: {
        ...FONTS.h2,
    },
    nameAuthor: {
        color: COLORS.gray30,
        ...FONTS.body3,
    },
    uploadDate: {
        ...FONTS.body4,
    },
    styleIcon: {
        width: '25@s',
        height: '25@vs',
        tintColor: COLORS.black,
    },
    containerIcon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CourseFiles;
