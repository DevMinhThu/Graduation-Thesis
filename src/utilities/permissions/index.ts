/* eslint-disable consistent-return */
import AlertMessage from 'components/base/AlertMessage';
import i18next from 'i18next';
import { Alert, PermissionsAndroid } from 'react-native';
import Config from 'react-native-config';
import { check, PERMISSIONS, RESULTS, openSettings, request } from 'react-native-permissions';
import { isAndroid, isIos, logger } from '../helper';

export const checkCamera = async () => {
    try {
        const checkPermission = await check(isIos ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA);
        if (checkPermission === RESULTS.BLOCKED) {
            showRequestPermission('camera');
            return false;
        }
        if (checkPermission === RESULTS.DENIED) {
            const result = await request(isIos ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA);
            return result === RESULTS.GRANTED;
        }
        if (checkPermission === RESULTS.UNAVAILABLE) {
            showPermissionUnavailable('camera');
            return false;
        }
        return true;
    } catch (err) {
        logger(err);
        return false;
    }
};
export const checkPhoto = async () => {
    try {
        const checkPermission = await check(
            isIos ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
        if (checkPermission === RESULTS.BLOCKED) {
            showRequestPermission('photo');
            return false;
        }
        if (checkPermission === RESULTS.DENIED) {
            const result = await request(
                isIos ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            );
            return result === RESULTS.GRANTED;
        }
        if (checkPermission === RESULTS.UNAVAILABLE) {
            showPermissionUnavailable('photo');
            return false;
        }
        return true;
    } catch (err) {
        logger(err);
        return false;
    }
};

export const checkAudio = async () => {
    try {
        const checkPermission = await check(isIos ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO);
        if (checkPermission === RESULTS.BLOCKED) {
            showRequestPermission('audio');
            return false;
        }
        if (checkPermission === RESULTS.DENIED) {
            const result = await request(isIos ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO);
            return result === RESULTS.GRANTED;
        }
        if (checkPermission === RESULTS.UNAVAILABLE) {
            showPermissionUnavailable('audio');
            return false;
        }
        return true;
    } catch (err) {
        logger(err);
        return false;
    }
};

const messages: any = {
    camera: i18next.t('permissions.camera'),
    photo: i18next.t('permissions.photo'),
    audio: i18next.t('permissions.audio'),
};

const showRequestPermission = (type: string) => {
    Alert.alert(
        Config.APP_NAME,
        messages[type],
        [
            {
                text: i18next.t('common.cancel'),
                onPress: () => logger('Cancel Pressed'),
                style: 'default',
            },
            {
                text: i18next.t('common.confirm'),
                onPress: () => openSettings().catch(() => logger('cannot open settings', true)),
            },
        ],
        { cancelable: false },
    );
};

const messagesUnavailable: any = {
    camera: i18next.t('permissions.camera'),
    photo: i18next.t('permissions.photo'),
    audio: i18next.t('permissions.audio'),
};

const showPermissionUnavailable = (type: string) => {
    Alert.alert(Config.APP_NAME, messagesUnavailable[type]);
};

export const checkPermissionDownloadFile = async () => {
    const configAndroid: any = {
        title: 'Storage Permission Required',
        message: 'Application needs access to your storage to download File',
    };
    if (isIos) {
        return true;
    }
    if (isAndroid) {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                configAndroid,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            }
        } catch (err: any) {
            AlertMessage(err);
        }
    }
};
