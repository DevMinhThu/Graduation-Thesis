import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import { isIos } from 'utilities/helper';
import { COLORS, SIZES } from '../../constants';

const ScheduleScreen = () => {
    const [items] = useState<any>({
        '2022-03-23': [
            { time: '08:45AM - 09:00AM', name: 'Daily Meeting Project. 📋' },
            { time: '09:15AM - 11:45AM', name: 'Time Coding. 💻' },
            { time: '14:00PM - 14:30PM', name: 'Công chứng giấy tờ. 🏪' },
        ],
        '2022-03-24': [
            { time: '08:45AM - 09:00AM', name: 'Daily Meeting Project' },
            { time: '09:15AM - 11:45AM', name: 'Time Coding. 💻' },
            { time: '12:00AM - 13:30PM', name: 'Học tiếng anh. 📒' },
            { time: '17:00AM - 18:30PM', name: 'Nộp bằng tốt nghiệp THPT. 🛵' },
        ],
        '2022-03-25': [
            { time: '08:00AM - 12:00PM', name: '💯 Báo cáo KLTN' },
            { time: '13:30PM - 14:30PM', name: 'Họp khách. 🎧' },
        ],
    });

    const renderItem = (item: any) => {
        return (
            <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
                <Card>
                    <Card.Content>
                        <View
                            style={{
                                justifyContent: 'space-between',
                            }}
                        >
                            <Text style={{ marginBottom: 10, color: COLORS.black }}>{item.time}</Text>
                            <Text style={{ color: COLORS.black, fontWeight: 'bold' }}>{item.name}</Text>
                        </View>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titleSchedule}>Schedule</Text>
            <View style={{ flex: 1 }}>
                <Agenda
                    items={items}
                    selected={'2022-03-23'}
                    renderItem={renderItem}
                    renderEmptyData={() => (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: COLORS.black }}>No plans today!</Text>
                        </View>
                    )}
                    theme={{ agendaKnobColor: '#61c8f9' }}
                    showOnlySelectedDayItems={true}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    titleSchedule: {
        textAlign: 'center',
        color: COLORS.black,
        fontSize: SIZES.body2,
        paddingTop: isIos ? 5 : 10,
        paddingBottom: 5,
        fontWeight: 'bold',
    },
});

export default ScheduleScreen;
