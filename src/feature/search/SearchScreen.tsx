/* eslint-disable react-hooks/rules-of-hooks */
import { CategoryCard, TextButton } from 'components/common';
import { TAB_NAVIGATION_ROOT } from 'navigation/config/routes';
import { navigate } from 'navigation/NavigationService';
import React, { FunctionComponent, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ScaledSheet } from 'react-native-size-matters';
import { COLORS, dummyData, FONTS, SIZES } from '../../constants';
import SearchBar from './components/SearchBar';

const SearchScreen: FunctionComponent = () => {
    const [keyword, setKeyword] = useState('');

    const renderTopSearches = () => {
        return (
            <View style={styles.containerSearch}>
                <Text style={styles.titleSearchBar}>Top Searches</Text>
                <FlatList
                    horizontal
                    data={dummyData.top_searches}
                    listKey="TopSearches"
                    keyExtractor={(item) => `TopSearches-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.containerFlatList}
                    renderItem={({ item, index }) => (
                        <TextButton
                            label={item?.label}
                            contentContainerStyle={[
                                styles.styleOptionSearches,
                                {
                                    marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
                                    marginRight: index === dummyData.top_searches.length - 1 ? SIZES.padding : 0,
                                },
                            ]}
                            labelStyle={styles.labelOption}
                        />
                    )}
                />
            </View>
        );
    };

    const renderBrowseCategories = () => {
        return (
            <View style={styles.containerSearch}>
                <Text style={styles.titleSearchBar}>Browse Categories</Text>
                <FlatList
                    data={dummyData.categories}
                    numColumns={2}
                    scrollEnabled={false}
                    listKey="BrowseCategories"
                    keyExtractor={(item) => `BrowseCategories-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.containerFlatList}
                    renderItem={({ item, index }) => (
                        <CategoryCard
                            sharedElementPrefix={TAB_NAVIGATION_ROOT.SEARCH_ROUTE.SEARCH}
                            category={item}
                            containerStyle={[
                                styles.itemBrowseCategories,
                                { marginLeft: (index + 1) / 2 === 0 ? SIZES.radius : SIZES.padding },
                            ]}
                            labelStyle={styles.labelOption}
                            onPress={() =>
                                navigate(TAB_NAVIGATION_ROOT.HOME_ROUTE.COURSE_LIST, {
                                    category: item,
                                    sharedElementPrefix: TAB_NAVIGATION_ROOT.SEARCH_ROUTE.SEARCH,
                                })
                            }
                        />
                    )}
                />
            </View>
        );
    };

    const renderSearchBar = () => {
        return (
            <View style={styles.positionSearchBar}>
                <SearchBar
                    onResetSearchBar={() => setKeyword('')}
                    customPlaceHolder={'Search for Topics, Course ...'}
                    keyword={keyword}
                    onSearch={setKeyword}
                    containerStyle={styles.styleSearchBar}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {renderSearchBar()}
            <ScrollView contentContainerStyle={styles.viewScrollView} showsVerticalScrollIndicator={false}>
                {renderTopSearches()}
                {renderBrowseCategories()}
            </ScrollView>
        </View>
    );
};
const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    viewScrollView: {
        paddingBottom: '90@vs',
    },
    containerSearch: {
        marginTop: SIZES.padding,
    },
    titleSearchBar: {
        marginHorizontal: SIZES.padding,
        ...FONTS.h2,
    },
    containerFlatList: {
        marginTop: SIZES.radius,
    },
    labelOption: {
        color: COLORS.gray50,
        ...FONTS.h3,
    },
    styleOptionSearches: {
        paddingVertical: SIZES.radius,
        paddingHorizontal: SIZES.padding,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.gray10,
    },
    itemBrowseCategories: {
        height: '130@vs',
        width: (SIZES.width - SIZES.padding * 2 - SIZES.radius) / 2,
        marginTop: SIZES.radius,
    },
    // SearchBar
    positionSearchBar: {
        paddingHorizontal: SIZES.padding,
        height: '50@vs',
        marginTop: '50@vs',
    },
    styleSearchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: SIZES.width - SIZES.padding * 2,
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white,
        shadowColor: COLORS.gray90,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
export default SearchScreen;
