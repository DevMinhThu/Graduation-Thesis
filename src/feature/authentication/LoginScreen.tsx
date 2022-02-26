/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unescaped-entities */
import { yupResolver } from '@hookform/resolvers/yup';
import Metrics from 'assets/metrics';
import { Themes } from 'assets/themes';
import { StyledButton, StyledInputForm, StyledText, StyledTouchable } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import StyledHeader from 'components/common/StyledHeader';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Image, Keyboard, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { isIos } from 'utilities/helper';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';
import { COLORS, icons, images } from '../../constants';
import { authentication } from '../../firebase/firebase-config';

const DEFAULT_FORM: any = {
    email: '',
    password: '',
};

const LoginScreen: FunctionComponent = () => {
    const passwordRef = useRef<any>(null);
    const [isSecureEntry, setIsSecureEntry] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

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
        getValues,
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

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            const res = await signInWithEmailAndPassword(authentication, getValues('email'), getValues('password'));
            const { idToken } = res?._tokenResponse;
            dispatch({ type: 'USER_FETCH_REQUESTED', payload: { idToken } });
        } catch (error: any) {
            Keyboard.dismiss();
            AlertMessage(JSON.stringify(error?.code));
        } finally {
            setIsLoading(false);
        }
    };

    const signInFacebook = async () => {
        try {
            if (!isIos) {
                LoginManager.setLoginBehavior('web_only');
            }
            await LoginManager.logInWithPermissions(['public_profile', 'email']);
            const data: any = await AccessToken.getCurrentAccessToken();
            const { accessToken } = data;
            dispatch({ type: 'USER_FETCH_REQUESTED', payload: { accessToken } });
        } catch (error: any) {
            console.log(JSON.stringify(error));
        }
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
            enableResetScrollToCoords={false}
        >
            <StyledHeader title={'Sign In'} customStyle={styles.header} />
            <StyledOverlayLoading visible={isLoading} />
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
                        onSubmitEditing={handleSubmit(handleLogin)}
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
                    onPress={handleSubmit(handleLogin)}
                    title="authen.login.buttonLogin"
                    disabled={!isValid}
                    customStyle={[
                        styles.loginButton,
                        isValid ? { backgroundColor: COLORS.DEFAULT_GREEN } : { backgroundColor: COLORS.DEFAULT_GREY },
                    ]}
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
                <TouchableOpacity style={styles.facebookButton} onPress={signInFacebook}>
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
        marginTop: isIos ? '50@vs' : '25@vs',
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
        fontSize: '14@ms',
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
