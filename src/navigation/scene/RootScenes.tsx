import { useAppSelector } from 'app-redux/hooks';
import CourseListScreen from 'feature/course/CourseListScreen';
import React from 'react';
import { Easing } from 'react-native';
import { Host } from 'react-native-portalize';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { isIos } from 'utilities/helper';
import navigationConfigs from '../config/options';
import { APP_ROUTE, TAB_NAVIGATION_ROOT } from '../config/routes';
import AuthStack from './AuthScenes';
import MainTabContainer from './TabScenes';

const MainStack = createSharedElementStackNavigator();
const options = {
    gestureEnabled: false,
    transitionSpec: {
        open: {
            animation: 'timing',
            config: {
                duration: 400,
                easing: Easing.inOut(Easing.ease),
            },
        },
        close: {
            animation: 'timing',
            config: {
                duration: 400,
                easing: Easing.inOut(Easing.ease),
            },
        },
    },
    cardStyleInterpolator: ({ current: { progress } }: any) => {
        return {
            cardStyle: {
                opacity: progress,
            },
        };
    },
};

const AppStack = () => (
    <Host>
        <MainStack.Navigator
            keyboardHandlingEnabled={isIos}
            headerMode={'none'}
            screenOptions={{ ...navigationConfigs, useNativeDriver: true }}
            detachInactiveScreens={false}
        >
            <MainStack.Screen name={APP_ROUTE.MAIN_TAB} component={MainTabContainer} />
            <MainStack.Screen
                name={TAB_NAVIGATION_ROOT.HOME_ROUTE.COURSE_LIST}
                component={CourseListScreen}
                options={() => options}
            />
        </MainStack.Navigator>
    </Host>
);

const Navigation: React.FunctionComponent = () => {
    const { token } = useAppSelector((state) => state.userInfo);
    if (!token) {
        return <AppStack />;
    }
    return <AuthStack />;
};

export default Navigation;
