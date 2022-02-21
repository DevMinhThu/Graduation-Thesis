import { StyledText } from 'components/base';
import React, { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { isIos } from 'utilities/helper';
import { IconButton, LineDivider, ProfileRadioButton, ProfileValue, ProgressBar } from '../../components/common';
import { COLORS, FONTS, icons, SIZES } from '../../constants';

const AccountView = () => {
    const [newCourseNotification, setNewCourseNotification] = useState(false);
    const [studyReminder, setStudyReminder] = useState(false);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <StyledText i18nText={'Profile'} customStyle={styles.titleHeader} />
                <IconButton icon={icons.sun} iconStyle={styles.iconSun} />
            </View>

            {/* Detail */}
            <ScrollView contentContainerStyle={styles.containerScrollView}>
                {/* Profile Card */}
                <View style={styles.containerProfileCard}>
                    {/* Profile Image */}
                    <TouchableOpacity style={styles.buttonProfile}>
                        <Image source={icons.profileUser} style={styles.imgProfile} />
                        <View style={styles.positionCamera}>
                            <View style={styles.viewIconCamera}>
                                <Image source={icons.camera} style={styles.iconCamera} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {/* Info User */}
                    <View style={styles.containerInfoUser}>
                        <StyledText i18nText={'Vu Minh Thu'} customStyle={styles.nameUser} />
                        <StyledText i18nText={'Mobile Develop'} customStyle={styles.descriptionUser} />
                        {/* Progress */}
                        <ProgressBar progress="68%" containerStyle={styles.progressBar} />
                        <View style={styles.descriptionProgress}>
                            <StyledText i18nText={'Overall Progress'} customStyle={styles.titleDescriptionProgress} />
                            <StyledText i18nText={'68%'} customStyle={styles.percentProgress} />
                        </View>
                    </View>
                </View>

                {/* Profile Section 1 */}
                <View style={styles.profileSectionContainer}>
                    <ProfileValue icon={icons.profile} label="Name" value="Vu Minh Thu" />
                    <LineDivider />
                    <ProfileValue icon={icons.email} label="Email" value="vuminhthu@gmail.com" />
                    <LineDivider />
                    <ProfileValue icon={icons.password} label="Password" value="Updated 2 week ago" />
                    <LineDivider />
                    <ProfileValue icon={icons.call} label="Contact Number" value="+8486123567" />
                </View>

                {/* Profile Section 2 */}
                <View style={styles.profileSectionContainer}>
                    <ProfileValue icon={icons.star_1} value="Pages" />
                    <LineDivider />
                    <ProfileRadioButton
                        icon={icons.new_icon}
                        label="New Courses Notifications"
                        isSelected={newCourseNotification}
                        onPress={() => setNewCourseNotification(!newCourseNotification)}
                    />
                    <LineDivider />
                    <ProfileRadioButton
                        icon={icons.reminder}
                        label="Study Reminder"
                        isSelected={studyReminder}
                        onPress={() => setStudyReminder(!studyReminder)}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    // header
    header: {
        flexDirection: 'row',
        marginTop: isIos ? '50@vs' : '25@vs',
        paddingHorizontal: SIZES.padding,
        justifyContent: 'space-between',
    },
    titleHeader: {
        ...FONTS.h1,
    },
    iconSun: {
        tintColor: COLORS.black,
    },
    // Detail
    containerScrollView: {
        paddingHorizontal: SIZES.padding,
        paddingBottom: '150@vs',
    },
    containerProfileCard: {
        flexDirection: 'row',
        marginTop: SIZES.padding,
        paddingHorizontal: SIZES.radius,
        paddingVertical: '20@vs',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary3,
    },
    buttonProfile: {
        width: '80@s',
        height: '80@vs',
    },
    imgProfile: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: COLORS.white,
    },
    positionCamera: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    viewIconCamera: {
        width: '30@s',
        height: '30@vs',
        marginBottom: '-15@vs',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: COLORS.DEFAULT_GREEN,
    },
    iconCamera: {
        width: '17@s',
        height: '17@vs',
    },
    containerInfoUser: {
        flex: 1,
        marginLeft: SIZES.radius,
        alignItems: 'flex-start',
    },
    nameUser: {
        color: COLORS.white,
        ...FONTS.h2,
    },
    descriptionUser: {
        color: COLORS.white,
        ...FONTS.body4,
    },
    progressBar: {
        marginTop: SIZES.radius,
    },
    descriptionProgress: {
        flexDirection: 'row',
    },
    titleDescriptionProgress: {
        flex: 1,
        color: COLORS.white,
        ...FONTS.body4,
    },
    percentProgress: {
        color: COLORS.white,
        ...FONTS.body4,
    },
    /* Profile Section */
    profileSectionContainer: {
        marginTop: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        borderWidth: 1,
        borderRadius: SIZES.radius,
        borderColor: COLORS.gray20,
    },
});

export default AccountView;
