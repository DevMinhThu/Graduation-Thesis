import { IconButton } from 'components/common';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, icons } from '../../../constants';

interface ITask {
    text: string;
    onPress(): void;
    index: number;
}

const Task = (props: ITask) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <Text style={styles.indexItem}>{`${props?.index}.`}</Text>
                <Text style={styles.itemText}>{props?.text}</Text>
            </View>
            <IconButton icon={icons.trash} iconStyle={styles.iconSun} onPress={props?.onPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#E8EAED',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    itemText: {
        maxWidth: '80%',
        color: COLORS.black,
        fontSize: 16,
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: COLORS.DEFAULT_GREEN,
        borderWidth: 2,
        borderRadius: 5,
    },
    iconSun: {
        tintColor: COLORS.DEFAULT_GREEN,
    },
    input: {
        backgroundColor: 'red',
        paddingHorizontal: 10,
    },
    indexItem: {
        marginRight: 10,
        fontWeight: 'bold',
        color: COLORS.black,
        fontSize: 16,
    },
});

export default Task;
