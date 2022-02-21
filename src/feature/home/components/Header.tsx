import React from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { isIos } from 'utilities/helper';
import { IconButton } from '../../../components/common';
import { COLORS, FONTS, icons, SIZES } from '../../../constants';

interface IHeader {
    nameUser: string;
    dateTime: string;
}

const Header = (props: IHeader) => {
    const { nameUser, dateTime } = props;
    return (
        <View style={styles.header}>
            {/* Greeting */}
            <View style={styles.greeting}>
                <Text style={styles.nameUser}>{nameUser}</Text>
                <Text style={styles.day}>{dateTime}</Text>
            </View>

            {/* Notification */}
            <IconButton icon={icons.notification} iconStyle={styles.notification} />
        </View>
    );
};

const styles = ScaledSheet.create({
    header: {
        flexDirection: 'row',
        marginTop: isIos ? '50@vs' : '25@vs',
        marginBottom: '10@vs',
        paddingHorizontal: SIZES.padding,
        alignItems: 'center',
    },
    greeting: {
        flex: 1,
    },
    nameUser: {
        ...FONTS.h2,
    },
    day: {
        color: COLORS.gray50,
        ...FONTS.body3,
    },
    notification: {
        tintColor: COLORS.black,
    },
});

export default Header;
