/* eslint-disable no-underscore-dangle */
import { yupResolver } from '@hookform/resolvers/yup';
import { Themes } from 'assets/themes';
import { StyledButton, StyledText } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import StyledInputForm from 'components/base/StyledInputForm';
import StyledOverlayLoading from 'components/base/StyledOverlayLoading';
import StyledHeader from 'components/common/StyledHeader';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScaledSheet } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { isIos } from 'utilities/helper';
import yupValidate from 'utilities/yupValidate';
import * as yup from 'yup';
import { COLORS, icons, images } from '../../constants';
import { authentication } from '../../firebase/firebase-config';

const RegisterScreen: FunctionComponent = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const passwordRef = useRef<any>(null);
    const passwordConfirmRef = useRef<any>(null);
    const [isSecureEntry, setIsSecureEntry] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const registerSchema = yup.object().shape({
        email: yupValidate.email(),
        password: yupValidate.password(),
    });

    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(registerSchema),
    });
    const {
        formState: { isValid },
        getValues,
        handleSubmit,
    } = form;

    const handleTogglePassword = () => {
        setIsSecureEntry(!isSecureEntry);
    };

    const handleRegister = async () => {
        try {
            setIsLoading(true);
            const res = await createUserWithEmailAndPassword(authentication, getValues('email'), getValues('password'));
            const { idToken } = res?._tokenResponse;
            dispatch({ type: 'USER_FETCH_REQUESTED', payload: { idToken } });
        } catch (error: any) {
            AlertMessage(JSON.stringify(error?.code));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
        >
            <StyledHeader title={'Sign Up'} customStyle={styles.header} />
            <StyledOverlayLoading visible={isLoading} />
            <SafeAreaView style={styles.body}>
                <StyledText i18nText="authen.register.title" customStyle={styles.title} />
                <Text style={styles.description}>Enter your Email address and Password for sign up.</Text>
                <FormProvider {...form}>
                    <StyledInputForm
                        name={'email'}
                        placeholder={t('authen.sendEmail.title')}
                        keyboardType="email-address"
                        returnKeyType={'next'}
                        onSubmitEditing={() => passwordRef.current.focus()}
                        iconLeft={icons.email}
                    />
                    <StyledInputForm
                        name={'password'}
                        placeholder={t('authen.login.placeholderPassword')}
                        ref={passwordRef}
                        returnKeyType={'next'}
                        maxLength={32}
                        secureTextEntry={isSecureEntry}
                        handleTogglePassword={handleTogglePassword}
                        onSubmitEditing={() => passwordConfirmRef.current.focus()}
                        iconLeft={icons.lock_pass}
                    />
                </FormProvider>
                <StyledButton
                    onPress={handleSubmit(handleRegister)}
                    title="Create Account"
                    disabled={!isValid}
                    customStyle={[
                        styles.registerButton,
                        isValid ? { backgroundColor: COLORS.DEFAULT_GREEN } : { backgroundColor: COLORS.DEFAULT_GREY },
                    ]}
                    customStyleText={styles.labelBtnRegister}
                />
                <TouchableOpacity style={styles.redirectLogin} onPress={() => navigate(AUTHENTICATE_ROUTE.LOGIN)}>
                    <Text style={styles.titleSignUp}> Already have account?</Text>
                </TouchableOpacity>
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
    body: {
        flex: 1,
        alignItems: 'center',
    },
    registerButton: {
        marginTop: 20,
        borderWidth: 0,
        width: '345@s',
        paddingVertical: '13@vs',
    },
    header: {
        marginTop: isIos ? '50@vs' : '25@vs',
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
        paddingHorizontal: '15@s',
    },
    titleSignUp: {
        color: COLORS.DEFAULT_GREEN,
    },
    labelBtnRegister: {
        color: Themes.COLORS.white,
        fontWeight: 'bold',
        fontSize: '16@ms',
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
    redirectLogin: {
        marginTop: '20@vs',
    },
});
export default RegisterScreen;
