import Images from 'assets/images';
import { Themes } from 'assets/themes';
import { StyledIcon, StyledTouchable } from 'components/base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColorValue, StyleProp, TextInput, View, ViewStyle } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { icons } from '../../../constants';

interface ISearchBar {
    width?: number;
    keyword: string;
    onSearch: any;
    containerStyle?: StyleProp<ViewStyle>;
    customPlaceHolder?: string;
    placeholderTextColor?: ColorValue;
    onResetSearchBar(): void;
}

const SearchBar = (props: ISearchBar) => {
    const { t } = useTranslation();
    return (
        <View style={[styles.viewSearchBar, props?.containerStyle]}>
            <StyledIcon size={25} source={icons.search} customStyle={styles.iconSearch} />
            <TextInput
                placeholder={props?.customPlaceHolder ? t(props?.customPlaceHolder) : ''}
                value={props?.keyword}
                onChangeText={props?.onSearch}
                style={styles.inputSearch}
                placeholderTextColor={props?.placeholderTextColor || Themes.COLORS.grey}
            />
            {props?.keyword?.trim() ? (
                <StyledTouchable customStyle={{ paddingHorizontal: 10 }} onPress={props?.onResetSearchBar}>
                    <StyledIcon source={Images.icons.cancel} size={25} />
                </StyledTouchable>
            ) : null}
        </View>
    );
};

const styles = ScaledSheet.create({
    viewSearchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Themes.COLORS.white,
        borderRadius: '15@s',
    },
    iconSearch: {
        marginHorizontal: '10@s',
    },
    inputSearch: {
        flex: 1,
        borderBottomRightRadius: '15@s',
        borderTopRightRadius: '15@s',
        paddingVertical: '13@vs',
        fontSize: '16@ms',
        fontWeight: '400',
    },
});

export default SearchBar;
