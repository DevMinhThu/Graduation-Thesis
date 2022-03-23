import { LineDivider } from 'components/common';
import { collection, getDocs } from 'firebase/firestore/lite';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { FlatList, Image, Linking, Text, TouchableOpacity, View } from 'react-native';
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
                showsVerticalScrollIndicator={true}
                scrollEventThrottle={16}
                keyboardDismissMode="on-drag"
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.itemNotification}
                        key={item.id}
                        onPress={() =>
                            Linking.openURL(
                                `http://daotao.vnua.edu.vn/default.aspx?page=chitietthongtin&id=${item?.id}`,
                            )
                        }
                    >
                        <Image source={{ uri: item.avatar }} resizeMode="contain" style={styles.avatar} />
                        <View style={styles.viewContentNotification}>
                            <View style={styles.viewInfo}>
                                <Text style={styles.nameUser}>{item?.name}</Text>
                            </View>
                            <Text numberOfLines={3} style={styles.content}>
                                {item?.message}
                            </Text>
                            <Text style={styles.createdAt}>{item.created_at}</Text>
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
        paddingVertical: '15@vs',
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
        marginBottom: '10@vs',
    },
    nameUser: {
        fontWeight: 'bold',
        fontSize: SIZES.body3,
        marginRight: 10,
        color: COLORS.black,
    },
    createdAt: {
        color: COLORS.gray50,
        marginTop: '5@vs',
    },
    content: {
        fontSize: SIZES.body4,
        color: COLORS.black,
    },
});

export default NotificationScreen;
