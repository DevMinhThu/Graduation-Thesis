const AUTHENTICATE_ROUTE = {
    WELCOME: '@AUTHENTICATE_ROUTE/WELCOME',
    LOGIN: '@AUTHENTICATE_ROUTE/LOGIN',
    REGISTER: '@AUTHENTICATE_ROUTE/REGISTER',
    FORGOT_PASS: '@AUTHENTICATE_ROUTE/FORGOT_PASS',
    SEND_OTP: '@AUTHENTICATE_ROUTE/SEND_OTP',
    CHANGE_PASS: '@AUTHENTICATE_ROUTE/CHANGE_PASS',
};

const APP_ROUTE = {
    MAIN_TAB: 'MAIN_TAB',
    COURSE_DETAIL: 'COURSE_DETAIL',
};

const HOME_ROUTE = {
    ROOT: 'HOME_ROOT',
    HOME: 'HOME',
    COURSE_LIST: 'COURSE_LIST',
};

const SETTING_ROUTE = {
    ROOT: 'SETTING_ROOT',
};

const NOTIFICATION_ROUTE = {
    ROOT: 'NOTIFICATION_ROOT',
};

const ACCOUNT_ROUTE = {
    ROOT: 'ACCOUNT_ROUTE',
};

const SEARCH_ROUTE = {
    ROOT: 'SEARCH_ROUTE',
    SEARCH: 'SEARCH',
};

const TAB_NAVIGATION_ROOT = {
    HOME_ROUTE,
    SETTING_ROUTE,
    NOTIFICATION_ROUTE,
    ACCOUNT_ROUTE,
    SEARCH_ROUTE,
};

export { APP_ROUTE, TAB_NAVIGATION_ROOT, AUTHENTICATE_ROUTE };
