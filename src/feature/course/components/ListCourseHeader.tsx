/* eslint-disable react-hooks/rules-of-hooks */
import ModalizeAction from 'components/common/ModalizeAction';
import React from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { COLORS, FONTS, SIZES, icons } from '../../../constants';
import { IconButton } from '../../../components/common';

const ListCourseHeader = (props: any) => {
    const { category } = props;
    const modalizeAction = ModalizeAction();

    const openModalFilterModal = () => {
        modalizeAction.popupFilterModal();
    };

    return (
        <View style={styles.containerHeaderListCourse}>
            {/* Result number */}
            <Text style={styles.numberResult}>{`${category?.numberResult} Results`}</Text>
            {/* Filter Btn */}
            <IconButton icon={icons.filter} containerStyle={styles.iconFilter} onPress={openModalFilterModal} />
        </View>
    );
};

const styles = ScaledSheet.create({
    containerHeaderListCourse: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '270@vs',
        marginBottom: SIZES.base,
    },
    numberResult: {
        flex: 1,
        ...FONTS.body3,
        color: COLORS.black,
    },
    iconFilter: {
        width: '40@s',
        height: '40@vs',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: COLORS.DEFAULT_GREEN,
    },
});

export default ListCourseHeader;
