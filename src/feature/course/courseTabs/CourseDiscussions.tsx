/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Keyboard, Text, TextInput, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { IconButton, IconLabelButton } from '../../../components/common';
import { COLORS, FONTS, icons, SIZES } from '../../../constants';

const CommentSection = ({ commentItem, commentOption, replies }: any) => {
    return (
        <View style={styles.containerCommentSection}>
            {/* Profile */}
            {/* <Image source={commentItem?.profile} style={styles.imgProfile} /> */}
            <Image source={{ uri: commentItem?.profile }} style={styles.imgProfile} />
            {/* Name & comment */}
            <View style={styles.containerContent}>
                {/* Name */}
                <Text style={{ ...FONTS.h3, color: COLORS.black }}>{commentItem?.name}</Text>
                {/* Comment */}
                <Text style={{ ...FONTS.body4, color: COLORS.black }}>{commentItem?.comment}</Text>
                {/* Comment Options */}
                {commentOption}
                {/* Replies */}
                {replies}
            </View>
        </View>
    );
};

const CourseDiscussions = (props: any) => {
    const { selectedCourse } = props;
    const [footerPosition, setFooterPosition] = useState(0);
    const [footerHeight, setFooterHeight] = useState(60);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardWillShow', (e) => {
            setFooterPosition(e.endCoordinates.height);
        });
        const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
            setFooterPosition(0);
        });
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const renderDiscussions = () => {
        return (
            <View style={styles.containerDiscussions}>
                <FlatList
                    data={selectedCourse?.discussions}
                    keyExtractor={(item) => `Discussions-main-${item.id}`}
                    contentContainerStyle={styles.containerItemDiscussion}
                    renderItem={({ item }) => (
                        <CommentSection
                            commentItem={item}
                            commentOption={
                                <View style={styles.viewCmtOption}>
                                    {/* Comment */}
                                    <IconLabelButton
                                        icon={icons.comment}
                                        label={item?.no_of_comments}
                                        iconStyle={styles.iconComment}
                                        labelStyle={styles.labelCmt}
                                    />
                                    {/* Like */}
                                    <IconLabelButton
                                        icon={icons.heart}
                                        label="Like"
                                        containerStyle={styles.iconLike}
                                        labelStyle={styles.labelLike}
                                    />
                                    {/* Date */}
                                    <Text style={styles.datePosted}>{item?.posted_on}</Text>
                                </View>
                            }
                            replies={
                                <FlatList
                                    data={item?.replies}
                                    scrollEnabled={false}
                                    keyExtractor={(item) => `Discussions-replies-${item.id}`}
                                    renderItem={({ item }) => (
                                        <CommentSection
                                            commentItem={item}
                                            commentOption={
                                                <View style={styles.viewCmtOptionReplies}>
                                                    {/* Comment */}
                                                    <IconLabelButton
                                                        icon={icons.reply}
                                                        label="Reply"
                                                        labelStyle={styles.labelReply}
                                                    />
                                                    {/* Like */}
                                                    <IconLabelButton
                                                        icon={icons.heart_off}
                                                        label="Like"
                                                        containerStyle={{
                                                            marginLeft: SIZES.radius,
                                                        }}
                                                        labelStyle={styles.labelLike}
                                                    />
                                                    {/* Date */}
                                                    <Text style={styles.datePosted}>{item?.posted_on}</Text>
                                                </View>
                                            }
                                        />
                                    )}
                                />
                            }
                        />
                    )}
                />
            </View>
        );
    };

    const renderFooterTextInput = () => {
        return (
            <View style={[styles.containerFooter, { bottom: footerPosition, height: footerHeight }]}>
                <TextInput
                    style={styles.styleTextInput}
                    multiline
                    placeholder="Type Something ..."
                    placeholderTextColor={COLORS.gray80}
                    onContentSizeChange={(event) => {
                        const { height } = event.nativeEvent.contentSize;
                        if (height <= 60) {
                            setFooterHeight(60);
                        } else if (height > 60 && height <= 100) {
                            setFooterHeight(height);
                        } else if (height > 100) {
                            setFooterHeight(100);
                        }
                    }}
                />
                <View style={styles.containerIconSend}>
                    <IconButton icon={icons.send} iconStyle={styles.iconSend} />
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Discussions */}
            {renderDiscussions()}
            {/* Footer */}
            {renderFooterTextInput()}
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    containerDiscussions: {
        flex: 1,
    },
    containerItemDiscussion: {
        paddingHorizontal: SIZES.padding,
        paddingBottom: 70,
    },
    iconComment: {
        tintColor: COLORS.black,
    },
    labelCmt: {
        marginLeft: '3@s',
        color: COLORS.black,
        ...FONTS.h4,
    },
    datePosted: {
        flex: 1,
        textAlign: 'right',
        ...FONTS.h4,
    },
    // footer
    containerFooter: {
        flexDirection: 'row',
        position: 'absolute',
        left: 0,
        right: 0,
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.radius,
        backgroundColor: COLORS.gray10,
    },
    styleTextInput: {
        flex: 1,
        marginRight: SIZES.base,
        ...FONTS.body3,
        paddingTop: '5@vs',
    },
    iconSend: {
        height: '25@vs',
        width: '25@s',
        tintColor: COLORS.DEFAULT_GREEN,
    },
    containerIconSend: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    // CommentSection
    containerCommentSection: {
        flexDirection: 'row',
        marginTop: SIZES.padding,
    },
    imgProfile: {
        width: '40@s',
        height: '40@vs',
        borderRadius: 20,
    },
    containerContent: {
        flex: 1,
        marginTop: 3,
        marginLeft: SIZES.radius,
    },
    // CommentOption
    viewCmtOption: {
        flexDirection: 'row',
        marginTop: SIZES.radius,
        paddingVertical: SIZES.base,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.gray20,
    },
    iconLike: {
        marginLeft: SIZES.radius,
    },
    labelLike: {
        marginLeft: 3,
        color: COLORS.black,
        ...FONTS.h4,
    },
    // CommentOption replies
    viewCmtOptionReplies: {
        flexDirection: 'row',
        marginTop: SIZES.radius,
        paddingVertical: SIZES.base,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: COLORS.gray20,
    },
    labelReply: {
        marginLeft: '5@s',
        color: COLORS.black,
        ...FONTS.h4,
    },
});

export default CourseDiscussions;
