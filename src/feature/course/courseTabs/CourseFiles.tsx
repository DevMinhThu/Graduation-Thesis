/* eslint-disable consistent-return */
import AlertMessage from 'components/base/AlertMessage';
import { APP_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React from 'react';
import { Image, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import RNFetchBlob from 'rn-fetch-blob';
import { getFileExtension, isIos } from 'utilities/helper';
import { checkPermissionDownloadFile } from 'utilities/permissions';
import { IconButton, TextButton } from '../../../components/common';
import { COLORS, FONTS, icons, SIZES } from '../../../constants';

const CourseFiles = (props: any) => {
    const { selectedCourse } = props;

    const renderStudents = () => {
        let students = [];

        if (selectedCourse?.students.length > 3) {
            students = selectedCourse?.students.slice(0, 3);
        } else {
            students = selectedCourse?.students;
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
                                {/* <Image source={item?.thumbnail} style={styles.imgStudent} /> */}
                                <Image source={{ uri: item?.thumbnail }} style={styles.imgStudent} />
                            </View>
                        );
                    })}
                    {selectedCourse?.students.length > 3 && (
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
        // const fileUrl = 'url_file_download';

        const handleDownloadFile = async (paramLink: any) => {
            if (await checkPermissionDownloadFile()) {
                downloadFile(paramLink);
            }
        };

        const downloadFile = (paramLink: any) => {
            const date = new Date();
            // const FILE_URL = fileUrl;
            const FILE_URL = paramLink;
            let fileExt: any = getFileExtension(FILE_URL);
            fileExt = `.${fileExt[0]}`;

            const { config, fs, ios } = RNFetchBlob;
            const RootDir = isIos ? fs.dirs.DocumentDir : fs.dirs.PictureDir;

            const configOptions: any = Platform.select({
                ios: {
                    fileCache: true,
                    path: `${RootDir}/file_${Math.floor(date.getTime() + date.getSeconds() / 2)}${fileExt}`,
                },
                android: {
                    addAndroidDownloads: {
                        fileCache: true,
                        useDownloadManager: true,
                        notification: true,
                        path: `${RootDir}/file_${Math.floor(date.getTime() + date.getSeconds() / 2)}${fileExt}`,
                    },
                },
            });

            config(configOptions)
                .fetch('GET', FILE_URL)
                .then((res) => {
                    ios.openDocument(res?.data);
                    AlertMessage(
                        `Downloaded Successfully file_${Math.floor(date.getTime() + date.getSeconds() / 2)}${fileExt}`,
                    );
                })
                .catch((err: any) => {
                    console.log(err);
                });
        };

        return (
            <View style={styles.containerFile}>
                {/* Title */}
                <Text style={styles.title}>Files</Text>
                {/* File */}
                {selectedCourse?.files.map(
                    (item: any, index: any) =>
                        (item?.link || item?.obj) && (
                            <TouchableOpacity
                                key={`Files-${index}`}
                                style={styles.containerItemFiles}
                                onPress={() => {
                                    if (item?.type === 'OBJ') {
                                        return navigate(APP_ROUTE.VIRO_AR, { item });
                                    }
                                    handleDownloadFile(item?.link);
                                }}
                            >
                                {/* Thumbnail */}
                                {/* <Image source={item?.thumbnail} resizeMode="cover" style={styles.imgStudent} /> */}
                                <Image source={{ uri: item?.thumbnail }} resizeMode="cover" style={styles.imgStudent} />
                                {/* Name, author & date */}
                                <View style={styles.infoFile}>
                                    <Text numberOfLines={1} style={styles.nameFile}>
                                        {item?.name}
                                    </Text>
                                    <Text style={styles.nameAuthor}>{item?.author}</Text>
                                    <Text style={styles.uploadDate}>{item?.upload_date}</Text>
                                </View>
                                {/* Menu */}
                                <IconButton
                                    icon={icons.menu}
                                    iconStyle={styles.styleIcon}
                                    containerStyle={styles.containerIcon}
                                />
                            </TouchableOpacity>
                        ),
                )}
            </View>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.containerScrollView} style={styles.container}>
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
    containerScrollView: {
        paddingBottom: '50@vs',
    },
    // student
    title: {
        ...FONTS.h2,
        fontSize: '25@ms',
        color: COLORS.black,
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
        borderRadius: 20,
    },
    labelViewAll: {
        color: COLORS.DEFAULT_GREEN,
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
        alignItems: 'center',
    },
    infoFile: {
        flex: 1,
        marginLeft: SIZES.radius,
    },
    nameFile: {
        ...FONTS.h2,
        color: COLORS.black,
    },
    nameAuthor: {
        color: COLORS.gray30,
        ...FONTS.body3,
    },
    uploadDate: {
        ...FONTS.body4,
        color: COLORS.black,
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
