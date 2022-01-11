import { Themes } from 'assets/themes';
import { Resource } from 'i18next';
import React, { forwardRef, useRef, useState } from 'react';
import { Normalize, useTranslation } from 'react-i18next';
import {
    ColorValue,
    ReturnKeyTypeOptions,
    StyleProp,
    TextInput,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { autoCompleteType, textContentType } from 'utilities/CommonInterface';
import { isIos } from 'utilities/helper';
import { COLORS, icons } from '../../constants';
import StyledIcon from './StyledIcon';
import StyledText from './StyledText';
import StyledTouchable from './StyledTouchable';

export interface StyledInputProps extends TextInputProps {
    containerStyle?: StyleProp<ViewStyle>;
    customStyle?: StyleProp<TextStyle>;
    customLabelStyle?: StyleProp<TextStyle>;
    customErrorStyle?: StyleProp<TextStyle>;
    customPlaceHolder?: Normalize<Resource>;
    placeholderTextColor?: ColorValue;
    customUnderlineColor?: ColorValue;
    customReturnKeyType?: ReturnKeyTypeOptions;
    ref?: any;
    errorMessage?: Normalize<Resource>;
    label?: string;
    textContentType?: textContentType;
    autoCompleteType?: autoCompleteType;
    handleTogglePassword?(): void;
    secureTextEntry?: boolean;
    isRightIconShown?: boolean;
    iconLeft?: any;
}

const StyledInput = (props: StyledInputProps, ref: any) => {
    const { isRightIconShown = true } = props;
    const [isFocused, setIsFocused] = useState(false);
    const input = useRef<TextInput>(null);
    const { t } = useTranslation();
    return (
        <View style={[styles.container, props.containerStyle]}>
            {!!props.label && (
                <StyledText customStyle={[styles.label, props.customLabelStyle]} i18nText={props.label} />
            )}
            <View style={styles.viewIconLeft}>
                <StyledIcon customStyle={styles.styleIconLeft} source={props?.iconLeft} size={16} />
            </View>
            <TextInput
                ref={ref || input}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                style={[
                    styles.textInput,
                    props.customStyle,
                    !isFocused && !!props?.errorMessage && { borderColor: Themes.COLORS.borderInputError },
                ]}
                placeholderTextColor={props.placeholderTextColor || Themes.COLORS.grey}
                placeholder={props.customPlaceHolder ? t(props.customPlaceHolder) : ''}
                underlineColorAndroid={props.customUnderlineColor || 'transparent'}
                autoCompleteType={props.autoCompleteType || 'off'}
                textContentType={props.textContentType || 'none'}
                importantForAutofill="yes"
                autoCorrect={false}
                returnKeyType={props.customReturnKeyType || 'next'}
                blurOnSubmit={!!props.customReturnKeyType}
                {...props}
            />
            {!!props?.errorMessage && !isFocused && (
                <StyledText i18nText={props.errorMessage} customStyle={[styles.errorMessage, props.customErrorStyle]} />
            )}
            {isRightIconShown && (props?.secureTextEntry || props?.handleTogglePassword) ? (
                <StyledTouchable customStyle={styles.viewIcon} onPress={props?.handleTogglePassword}>
                    <StyledIcon
                        customStyle={styles.styleIcon}
                        source={props?.secureTextEntry ? icons.eye : icons.eye_close}
                        size={16}
                    />
                </StyledTouchable>
            ) : null}
            {/* {!!props?.errorMessage && !isFocused && (
                <StyledText i18nText={props.errorMessage} customStyle={[styles.errorMessage, props.customErrorStyle]} />
            )} */}
        </View>
    );
};
const styles: any = ScaledSheet.create({
    textInput: {
        flex: 1,
        borderRadius: '15@s',
        backgroundColor: Themes.COLORS.secondary,
        paddingHorizontal: '13@s',
        paddingVertical: isIos ? '13@vs' : '10@vs',
    },
    errorMessage: {
        fontSize: '12@ms',
        color: Themes.COLORS.borderInputError,
        marginTop: '5@vs',
    },
    container: {
        marginVertical: '8@vs',
        marginBottom: '15@vs',
        width: '345@s',
        flexDirection: 'row',
        backgroundColor: Themes.COLORS.secondary,
        borderRadius: '10@s',
    },
    viewIcon: {
        justifyContent: 'center',
    },
    viewIconLeft: {
        marginLeft: '20@s',
        justifyContent: 'center',
    },
    styleIcon: {
        padding: '10@s',
        marginRight: '13@s',
    },
    styleIconLeft: {
        padding: '10@s',
        tintColor: COLORS.gray30,
    },
});
export default forwardRef(StyledInput);
