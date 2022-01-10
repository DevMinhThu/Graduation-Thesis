import Size from 'assets/sizes';
import { Themes } from 'assets/themes';
import { StyledText, StyledTouchable } from 'components/base';
import React from 'react';
import { Image, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const StyledTabBar = ({ state, descriptors, navigation }: any) => {
    return (
        <View style={styles.tabContainer}>
            {state.routes.map((route: any, index: any) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <StyledTouchable
                        accessibilityRole="button"
                        // accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        key={route.key}
                        customStyle={[styles.tabButton]}
                    >
                        <View style={[styles.contImgIcon, { borderTopWidth: isFocused ? 2 : 0 }]}>
                            <Image
                                source={options?.icon}
                                style={[
                                    styles.tabIcon,
                                    { tintColor: isFocused ? Themes.COLORS.primary : Themes.COLORS.textPrimary },
                                ]}
                            />
                        </View>
                        <StyledText
                            customStyle={[
                                styles.tabLabel,
                                { color: isFocused ? Themes.COLORS.primary : Themes.COLORS.textPrimary },
                            ]}
                            i18nText={options?.title || ''}
                        />
                    </StyledTouchable>
                );
            })}
        </View>
    );
};

const styles = ScaledSheet.create({
    tabContainer: {
        flexDirection: 'row',
        borderTopColor: '#DEE2E6',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        alignItems: 'center',
        shadowColor: Themes.COLORS.black,
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
        backgroundColor: Themes.COLORS.white,
    },
    tabButton: {
        alignItems: 'center',
        width: '25%',
    },
    contImgIcon: {
        width: '28@s',
        paddingTop: '10@vs',
        paddingBottom: '3@vs',
        borderColor: Themes.COLORS.primary,
    },
    tabIcon: {
        width: '28@s',
        height: '28@vs',
        resizeMode: 'contain',
    },
    tabLabel: {
        paddingLeft: Size.PADDING.defaultTextPadding,
        textAlign: 'center',
        paddingBottom: '25@vs',
        fontWeight: '500',
    },
});

export default StyledTabBar;
