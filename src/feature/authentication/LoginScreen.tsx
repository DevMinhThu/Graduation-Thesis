/* eslint-disable react/no-unescaped-entities */
import { yupResolver } from '@hookform/resolvers/yup';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledInputForm, StyledText, StyledTouchable } from 'components/base';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import StyledHeader from 'components/common/StyledHeader';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScaledSheet } from 'react-native-size-matters';
import { useLogin } from 'utilities/authenticate/AuthenticateService';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';
import { icons, COLORS, images } from '../../constants';

const DEFAULT_FORM: any = {
    email: '',
    password: '',
};

const LoginScreen: FunctionComponent = () => {
    const passwordRef = useRef<any>(null);
    const [isSecureEntry, setIsSecureEntry] = useState(true);
    const { requestLogin, loading } = useLogin();

    const yupSchema = yup.object().shape({
        email: yupValidate.email(),
        password: yupValidate.password(),
    });
    const form = useForm({
        mode: 'onChange', // validate form onChange
        defaultValues: DEFAULT_FORM,
        resolver: yupResolver(yupSchema),
        reValidateMode: 'onChange',
        criteriaMode: 'firstError', // first error from each field will be gathered.
    });
    const {
        formState: { isValid },
        handleSubmit,
    } = form;

    const doRegister = () => {
        navigate(AUTHENTICATE_ROUTE.REGISTER);
    };
    const goToForgotPassword = () => {
        navigate(AUTHENTICATE_ROUTE.FORGOT_PASS);
    };

    const handleTogglePassword = () => {
        setIsSecureEntry(!isSecureEntry);
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
            enableResetScrollToCoords={false}
        >
            <StyledOverlayLoading visible={loading} />
            <StyledHeader title={'Sign In'} customStyle={styles.header} />
            <SafeAreaView style={styles.body}>
                <StyledText i18nText="authen.login.title" customStyle={styles.title} />
                <StyledText i18nText="authen.login.description" customStyle={styles.description} />
                <FormProvider {...form}>
                    <StyledInputForm
                        name="email"
                        customPlaceHolder="authen.login.placeholderEmail"
                        keyboardType="email-address"
                        maxLength={32}
                        onSubmitEditing={() => passwordRef.current.focus()}
                        iconLeft={icons.profile}
                    />
                    <StyledInputForm
                        name="password"
                        customPlaceHolder="authen.login.placeholderPassword"
                        ref={passwordRef}
                        returnKeyType="done"
                        maxLength={20}
                        secureTextEntry={isSecureEntry}
                        handleTogglePassword={handleTogglePassword}
                        iconLeft={icons.lock_pass}
                    />
                </FormProvider>
                <View style={styles.viewForgotPasswordButton}>
                    <StyledTouchable onPress={goToForgotPassword}>
                        <StyledText
                            customStyle={styles.forgotPasswordText}
                            i18nText="authen.login.forgotPasswordText"
                        />
                    </StyledTouchable>
                </View>

                <StyledButton
                    onPress={handleSubmit(requestLogin)}
                    title="authen.login.buttonLogin"
                    disabled={!isValid}
                    customStyle={styles.loginButton}
                    customStyleText={styles.labelBtnLogin}
                />

                <StyledTouchable onPress={doRegister} customStyle={styles.registerButton}>
                    <Text>
                        Don't have an account?
                        <Text style={styles.titleSignUp}> Signup</Text>
                    </Text>
                </StyledTouchable>
                <StyledText i18nText="OR" customStyle={styles.labelOr} />

                {/* Social */}
                <TouchableOpacity style={styles.facebookButton}>
                    <View style={styles.socialButtonsContainer}>
                        <View style={styles.signinButtonLogoContainer}>
                            <Image source={images.FACEBOOK} style={styles.signinButtonLogo} />
                        </View>
                        <Text style={styles.socialSigninButtonText}>Connect With Facebook</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.googleButton}>
                    <View style={styles.socialButtonsContainer}>
                        <View style={styles.signinButtonLogoContainer}>
                            <Image source={images.GOOGLE} style={styles.signinButtonLogo} />
                        </View>
                        <Text style={styles.socialSigninButtonText}>Connect With Google</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    header: {
        marginTop: '50@vs',
    },
    body: {
        flex: 1,
        alignItems: 'center',
    },
    loginButton: {
        marginTop: 20,
        borderWidth: 0,
        width: '345@s',
        paddingVertical: '13@vs',
        backgroundColor: COLORS.DEFAULT_GREEN,
    },
    registerButton: {
        marginTop: 20,
    },
    errorMessage: {
        color: Themes.COLORS.borderInputError,
    },
    title: {
        fontSize: 22,
        lineHeight: 20 * 1.4,
        marginTop: 50,
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    description: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'center',
    },
    forgotPasswordText: {
        textAlign: 'center',
        lineHeight: '20.27@vs',
        marginBottom: '-1.5@vs',
    },
    viewForgotPasswordButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: Metrics.screenWidth,
        paddingHorizontal: '15@s',
    },
    labelBtnLogin: {
        color: Themes.COLORS.white,
        fontWeight: 'bold',
        fontSize: '16@ms',
    },
    titleSignUp: {
        color: COLORS.DEFAULT_GREEN,
    },
    labelOr: {
        marginTop: '15@vs',
        color: COLORS.gray60,
    },
    // social
    socialButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    facebookButton: {
        backgroundColor: COLORS.FACEBOOK_BLUE,
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 8,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '345@s',
    },
    signinButtonLogo: {
        height: 18,
        width: 18,
    },
    signinButtonLogoContainer: {
        backgroundColor: COLORS.DEFAULT_WHITE,
        padding: 2,
        borderRadius: 3,
        position: 'absolute',
        left: 25,
    },
    socialSigninButtonText: {
        color: COLORS.DEFAULT_WHITE,
        fontSize: 13,
        lineHeight: 13 * 1.4,
    },
    googleButton: {
        backgroundColor: COLORS.GOOGLE_BLUE,
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: '345@s',
    },
});

export default LoginScreen;
