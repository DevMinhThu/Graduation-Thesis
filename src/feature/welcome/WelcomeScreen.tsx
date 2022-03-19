import { AUTHENTICATE_ROUTE } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { useRef, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, dummyData } from '../../constants';
import { setHeight, setWidth } from '../../utilities/Display';
import Separator from './components/Separator';
import WelcomeCard from './components/WelcomeCard';

const pageStyle = (isActive: any) =>
    isActive ? styles.page : { ...styles.page, backgroundColor: COLORS.DEFAULT_GREY };

const Pagination = ({ index }: any) => {
    return (
        <View style={styles.pageContainer}>
            {[...Array(dummyData.WELCOME_CONTENTS.length).keys()].map((_, i) =>
                i === index ? <View style={pageStyle(true)} key={i} /> : <View style={pageStyle(false)} key={i} />,
            )}
        </View>
    );
};

const WelcomeScreen = () => {
    const [welcomeListIndex, setWelcomeListIndex] = useState(0);
    const welcomeList = useRef();
    const onViewRef = useRef(({ changed }: any) => {
        setWelcomeListIndex(changed[0].index);
    });
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const pageScroll = () => {
        welcomeList?.current?.scrollToIndex({
            index: welcomeListIndex < 2 ? welcomeListIndex + 1 : welcomeListIndex,
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.DEFAULT_WHITE} translucent />
            <Separator height={StatusBar.currentHeight} />
            <Separator height={setHeight(8)} />
            <View style={styles.welcomeListContainer}>
                <FlatList
                    ref={welcomeList}
                    data={dummyData.WELCOME_CONTENTS}
                    keyExtractor={(item) => item.title}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    overScrollMode="never"
                    viewabilityConfig={viewConfigRef.current}
                    onViewableItemsChanged={onViewRef.current}
                    renderItem={({ item }) => <WelcomeCard {...item} />}
                />
            </View>
            <Separator height={setHeight(8)} />
            <Pagination index={welcomeListIndex} />
            <Separator height={setHeight(8)} />
            {welcomeListIndex === 2 ? (
                <TouchableOpacity
                    style={styles.gettingStartedButton}
                    activeOpacity={0.8}
                    onPress={() => navigate(AUTHENTICATE_ROUTE.LOGIN)}
                >
                    <Text style={styles.gettingStartedButtonText}>Get Started</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{ marginLeft: 10 }}
                        onPress={() => welcomeList?.current?.scrollToEnd()}
                    >
                        <Text style={styles.buttonText}>SKIP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => pageScroll()}>
                        <Text style={styles.buttonText}>NEXT</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.DEFAULT_WHITE,
    },
    welcomeListContainer: {
        height: setHeight(60),
    },
    pageContainer: {
        flexDirection: 'row',
    },
    page: {
        height: 8,
        width: 15,
        backgroundColor: COLORS.DEFAULT_GREEN,
        borderRadius: 32,
        marginHorizontal: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: setWidth(90),
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 16 * 1.4,
        color: COLORS.black,
    },
    button: {
        backgroundColor: COLORS.LIGHT_GREEN,
        paddingVertical: 20,
        paddingHorizontal: 11,
        borderRadius: 32,
    },
    gettingStartedButton: {
        backgroundColor: COLORS.DEFAULT_GREEN,
        paddingVertical: 5,
        paddingHorizontal: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    gettingStartedButtonText: {
        fontSize: 20,
        color: COLORS.DEFAULT_WHITE,
        lineHeight: 20 * 1.4,
    },
});

export default WelcomeScreen;
