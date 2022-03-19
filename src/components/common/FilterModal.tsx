import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import { ClassLevelOption, ClassTypeOption, TextButton, TwoPointSlider } from '.';
import { COLORS, constants, FONTS, SIZES } from '../../constants';

const FilterModal = (props: any) => {
    const { closeModal } = props;
    const [selectedClassType, setSelectedClassType] = useState<any>('');
    const [selectedClassLevel, setSelectedClassLevel] = useState<any>('');
    const [selectedCreatedWithin, setSelectedCreatedWithin] = useState<any>('');

    const handleCloseModal = () => {
        closeModal();
    };

    return (
        <View style={[styles.contentContainer]}>
            {/* Header */}
            <View style={styles.containerHeader}>
                <View style={{ width: scale(60) }} />
                <Text style={styles.title}>Filter</Text>
                <TextButton
                    label="Cancel"
                    contentContainerStyle={styles.containerBtnCancel}
                    labelStyle={styles.labelCancel}
                    onPress={handleCloseModal}
                />
            </View>
            {/* Content filter */}
            <ScrollView contentContainerStyle={styles.containerContentFilter}>
                {/* Class Type */}
                <View style={{ marginTop: SIZES.radius }}>
                    <Text style={styles.titleClass}>Class Type</Text>
                    <View style={styles.viewItemClassType}>
                        {constants.class_types.map((item, index) => {
                            return (
                                <ClassTypeOption
                                    key={`ClassType-${index}`}
                                    classType={item}
                                    isSelected={selectedClassType === item?.id}
                                    containerStyle={{
                                        marginLeft: index === 0 ? 0 : SIZES.base,
                                    }}
                                    onPress={() => {
                                        setSelectedClassType(item.id);
                                    }}
                                />
                            );
                        })}
                    </View>
                </View>

                {/* Class Level */}
                <View style={{ marginTop: SIZES.padding }}>
                    <Text style={styles.titleClass}>Class Level</Text>
                    <View>
                        {constants.class_levels.map((item, index) => {
                            return (
                                <ClassLevelOption
                                    key={`ClassLevel-${index}`}
                                    classLevel={item}
                                    isLastItem={index === constants.class_levels.length - 1}
                                    isSelected={selectedClassLevel === item?.id}
                                    onPress={() => {
                                        setSelectedClassLevel(item?.id);
                                    }}
                                />
                            );
                        })}
                    </View>
                </View>

                {/* Created Within */}
                <View style={{ marginTop: SIZES.radius }}>
                    <Text style={styles.titleClass}>Created Within</Text>
                    <View style={styles.optionCreatedWithin}>
                        {constants.created_within.map((item, index) => {
                            return (
                                <TextButton
                                    key={`CreatedWithin-${index}`}
                                    label={item?.label}
                                    contentContainerStyle={[
                                        styles.itemCreatedWithin,
                                        {
                                            marginLeft: index % 3 === 0 ? 0 : SIZES.radius,
                                            backgroundColor:
                                                item?.id === selectedCreatedWithin ? COLORS.primary3 : null,
                                        },
                                    ]}
                                    labelStyle={[
                                        styles.label,
                                        {
                                            color: item?.id === selectedCreatedWithin ? COLORS.white : COLORS.black,
                                        },
                                    ]}
                                    onPress={() => {
                                        setSelectedCreatedWithin(item?.id);
                                    }}
                                />
                            );
                        })}
                    </View>
                </View>
                {/* Class Length */}
                <View style={{ marginTop: SIZES.padding }}>
                    <Text style={styles.titleClass}>Class Length</Text>
                    <View style={styles.viewPointSlider}>
                        <TwoPointSlider
                            values={[20, 50]}
                            min={15}
                            max={60}
                            postfix="min"
                            onValuesChange={(values: any) => console.log(values)}
                        />
                    </View>
                </View>
            </ScrollView>
            {/* Footer */}
            <View style={styles.containerFooter}>
                <TextButton label="Reset" contentContainerStyle={styles.btnReset} labelStyle={styles.labelReset} />
                <TextButton label="Apply" contentContainerStyle={styles.btnApply} labelStyle={styles.labelApply} />
            </View>
        </View>
    );
};

const styles = ScaledSheet.create({
    contentContainer: {
        height: SIZES.height * 0.9,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    // Header filter
    containerHeader: {
        marginVertical: '10@vs',
        flexDirection: 'row',
        paddingHorizontal: SIZES.padding,
    },
    title: {
        flex: 1,
        textAlign: 'center',
        ...FONTS.h1,
        color: COLORS.black,
    },
    optionCreatedWithin: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemCreatedWithin: {
        height: '45@vs',
        paddingHorizontal: SIZES.radius,
        marginTop: SIZES.radius,
        borderWidth: 1,
        borderRadius: SIZES.radius,
        borderColor: COLORS.gray20,
    },
    label: {
        ...FONTS.body3,
    },
    titleClass: {
        ...FONTS.h3,
        color: COLORS.black,
    },
    containerBtnCancel: {
        width: 60,
        backgroundColor: undefined,
    },
    labelCancel: {
        color: COLORS.black,
        ...FONTS.body3,
    },
    // Content filter
    containerContentFilter: {
        paddingHorizontal: SIZES.padding,
        paddingBottom: '50@vs',
    },
    viewItemClassType: {
        flexDirection: 'row',
        marginTop: SIZES.radius,
    },
    viewPointSlider: {
        alignItems: 'center',
    },
    // Footer
    containerFooter: {
        flexDirection: 'row',
        height: '50@vs',
        marginBottom: '30@vs',
        paddingHorizontal: SIZES.padding,
    },
    btnReset: {
        flex: 1,
        borderRadius: SIZES.radius,
        borderWidth: 1,
        backgroundColor: null,
    },
    labelReset: {
        color: COLORS.black,
        ...FONTS.h3,
    },
    btnApply: {
        flex: 1,
        borderRadius: SIZES.radius,
        borderWidth: '2@s',
        borderColor: COLORS.DEFAULT_GREEN,
        backgroundColor: COLORS.DEFAULT_GREEN,
        marginLeft: '20@s',
    },
    labelApply: {
        color: COLORS.white,
        ...FONTS.h3,
    },
});

export default FilterModal;
