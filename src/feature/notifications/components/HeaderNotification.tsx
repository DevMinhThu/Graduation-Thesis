import { IconButton } from 'components/common';
import { goBack } from 'navigation/NavigationService';
import React, { FunctionComponent } from 'react';
import { View, Image, Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { isIos } from 'utilities/helper';
import { COLORS, icons, images } from '../../../constants';

const HeaderNotification: FunctionComponent = () => {
    return (
        <View style={styles.container}>
            <Image source={images.bg} resizeMode="cover" style={styles.headerBg} />
            <IconButton
                icon={icons.ic_back}
                iconStyle={styles.iconBack}
                containerStyle={styles.containerIconBack}
                onPress={() => {
                    goBack();
                }}
            />
            <Text style={styles.textNotifications}>Notifications</Text>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: isIos ? '250@vs' : '220@vs',
    },
    containerIconBack: {
        position: 'absolute',
        top: isIos ? '50@vs' : '25@vs',
        left: '20@s',
        width: '45@s',
        height: '45@vs',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: COLORS.white,
    },
    iconBack: {
        tintColor: COLORS.black,
    },
    headerBg: {
        height: '100%',
        width: '100%',
    },
    title: {
        marginTop: isIos ? '80@vs' : '90@vs',
        left: '20@s',
    },
    textNotifications: {
        fontSize: '24@ms',
        fontWeight: 'bold',
        position: 'absolute',
        top: isIos ? '120@vs' : '95@vs',
        left: '20@s',
    },
});

export default HeaderNotification;
