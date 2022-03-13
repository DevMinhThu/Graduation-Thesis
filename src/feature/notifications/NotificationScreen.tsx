import { LineDivider } from 'components/common';
import { collection, getDocs } from 'firebase/firestore/lite';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { isIos } from 'utilities/helper';
import { COLORS, SIZES } from '../../constants';
import { DataBase } from '../../firebase/firebase-config';
import HeaderNotification from './components/HeaderNotification';

const NotificationScreen: FunctionComponent = () => {
    const [notifications, setNotifications] = useState<any>();

    useEffect(() => {
        getListNotifications();
    }, []);

    const getListNotifications = async () => {
        const notificationsCollection = collection(DataBase, 'notifications');
        const notificationsSnapshot = await getDocs(notificationsCollection);
        const notificationsList = notificationsSnapshot.docs.map((doc) => doc.data());
        setNotifications(notificationsList);
    };

    const renderListNotifications = () => {
        return (
            <FlatList
                data={notifications}
                keyExtractor={(item: any) => `ListCourse-${item.id}`}
                contentContainerStyle={styles.containerListCourse}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                keyboardDismissMode="on-drag"
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemNotification} key={item.id}>
                        <Image source={{ uri: item.avatar }} resizeMode="contain" style={styles.avatar} />
                        <View style={styles.viewContentNotification}>
                            <View style={styles.viewInfo}>
                                <Text style={styles.nameUser}>{item?.name}</Text>
                                <Text style={styles.createdAt}>{item.created_at}</Text>
                            </View>
                            <Text style={styles.content}>{item?.message}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <LineDivider lineStyle={styles.lineDivider} />}
            />
        );
    };

    return (
        <View style={styles.container}>
            {renderListNotifications()}
            <HeaderNotification />
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    lineDivider: {
        backgroundColor: COLORS.gray20,
    },
    containerListCourse: {
        paddingHorizontal: SIZES.padding,
        flex: 1,
        marginTop: isIos ? '180@vs' : '160@vs',
    },
    // item notification
    itemNotification: {
        flexDirection: 'row',
        paddingVertical: '20@vs',
    },
    avatar: {
        width: '70@s',
        height: '70@vs',
        borderRadius: 100,
        marginRight: '15@s',
    },
    viewContentNotification: {
        justifyContent: 'center',
        flex: 1,
    },
    viewInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    nameUser: {
        fontWeight: 'bold',
        fontSize: SIZES.body3,
        marginRight: 10,
    },
    createdAt: {
        color: COLORS.gray50,
    },
    content: {
        fontSize: SIZES.body4,
    },
});

export default NotificationScreen;
