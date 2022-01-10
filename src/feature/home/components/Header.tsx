import React from 'react';
import { Text, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { IconButton } from '../../../components/common';
import { COLORS, FONTS, icons, SIZES } from '../../../constants';

const Header = () => {
    return (
        <View style={styles.header}>
            {/* Greeting */}
            <View style={styles.greeting}>
                <Text style={styles.nameUser}>Hello, MinhThu!</Text>
                <Text style={styles.day}>Thursday, 9th Sept 2021</Text>
            </View>

            {/* Notification */}
            <IconButton icon={icons.notification} iconStyle={styles.notification} />
        </View>
    );
};

const styles = ScaledSheet.create({
    header: {
        flexDirection: 'row',
        marginTop: '50@vs',
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
