import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledText, StyledTouchable } from 'components/base';
import { goBack } from 'navigation/NavigationService';
import React from 'react';
import { Normalize } from 'react-i18next';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { logger } from 'utilities/helper';
import { Resource } from 'utilities/i18next';

interface HeaderProps extends ViewProps {
    isBack?: boolean;
    title?: Normalize<Resource>;
    iconAction?: any;
    customStyle?: StyleProp<ViewStyle>;
    onPressAction?(): void;
    isShadow?: boolean;
    customHandleBackPress?(): void;
}

const StyledHeader = (props: HeaderProps) => {
    const {
        isBack = true,
        title,
        iconAction,
        customStyle,
        onPressAction,
        isShadow = false,
        customHandleBackPress,
        style,
    } = props;
    const onBack = () => {
        if (customHandleBackPress) {
            customHandleBackPress();
            return;
        }
        goBack();
    };

    if (style) {
        logger('You should use customStyle to implement this component to avoid conflict', true);
    }

    return (
        <View style={[styles.container, customStyle, isShadow && styles.shadow]}>
            <View style={styles.viewHeader}>
                {isBack ? (
                    <StyledTouchable onPress={onBack} customStyle={styles.buttonBack}>
                        <StyledIcon source={Images.icons.back} size={24} />
                    </StyledTouchable>
                ) : (
                    <View style={styles.buttonBack}>
                        <View style={{ height: 24, width: 24 }} />
                    </View>
                )}
                <StyledText i18nText={title || ' '} customStyle={styles.title} numberOfLines={1} />
                {iconAction ? (
                    <StyledTouchable onPress={onPressAction} customStyle={styles.buttonAction}>
                        <StyledIcon source={iconAction} size={24} customStyle={styles.iconAction} />
                    </StyledTouchable>
                ) : (
                    <View style={styles.buttonAction} />
                )}
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        backgroundColor: Themes.COLORS.white,
        justifyContent: 'flex-end',
        paddingTop: '20@vs',
    },
    viewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: '14@vs',
        paddingHorizontal: '20@s',
    },
    buttonBack: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5@ms',
    },
    title: {
        fontSize: '18@ms',
        fontWeight: 'bold',
        maxWidth: '80%',
        color: Themes.COLORS.black,
    },
    buttonAction: {
        width: '29@vs',
        height: '29@vs',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconAction: {},
    shadow: {
        shadowColor: Themes.COLORS.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 5.49,
        elevation: 5,
    },
});

export default React.memo(StyledHeader);
