import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Images from 'assets/images';
import AccountView from 'feature/account/AccountView';
// Screen
import HomeScreen from 'feature/home/HomeScreen';
import ScheduleScreen from 'feature/schedule/ScheduleScreen';
import SearchScreen from 'feature/search/SearchScreen';
import TodoScreen from 'feature/todo/TodoScreen';
import StyledTabBar from 'navigation/components/StyledTabBar';
import navigationConfigs from 'navigation/config/options';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { isIos } from 'utilities/helper';

const MainStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

const HomeStack = () => (
    <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs} keyboardHandlingEnabled={isIos}>
        <MainStack.Screen name={TAB_NAVIGATION_ROOT.HOME_ROUTE.HOME} component={HomeScreen} />
    </MainStack.Navigator>
);

const MainTabContainer = () => {
    const { t } = useTranslation();
    const ArrayTabs = [
        {
            name: TAB_NAVIGATION_ROOT.HOME_ROUTE.ROOT,
            title: t('tab.home'),
            component: HomeStack,
            icon: Images.icons.tab.home,
        },
        {
            name: TAB_NAVIGATION_ROOT.SEARCH_ROUTE.ROOT,
            title: t('tab.search'),
            component: SearchScreen,
            icon: Images.icons.tab.search,
        },
        {
            name: TAB_NAVIGATION_ROOT.TODO_ROUTE.ROOT,
            title: t('tab.todo'),
            component: TodoScreen,
            icon: Images.icons.tab.todo,
        },
        {
            name: TAB_NAVIGATION_ROOT.SCHEDULE_ROUTE.ROOT,
            title: t('tab.schedule'),
            component: ScheduleScreen,
            icon: Images.icons.tab.schedule,
        },
        {
            name: TAB_NAVIGATION_ROOT.ACCOUNT_ROUTE.ROOT,
            title: t('tab.account'),
            component: AccountView,
            icon: Images.icons.tab.account,
        },
    ];
    return (
        <MainTab.Navigator tabBar={(props: BottomTabBarProps) => <StyledTabBar {...props} />}>
            {ArrayTabs.map((item, index) => (
                <MainTab.Screen key={`${index}`} options={{ ...item }} {...item} />
            ))}
        </MainTab.Navigator>
    );
};

export default MainTabContainer;
