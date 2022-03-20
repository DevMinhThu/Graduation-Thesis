import React, { useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { isIos } from 'utilities/helper';
import { COLORS } from '../../constants';
import Task from './components/Task';

const TodoScreen = () => {
    const [task, setTask] = useState<any>('');
    const [taskItems, setTaskItems] = useState<any>([]);

    const handleAddTask = () => {
        Keyboard.dismiss();
        setTaskItems([...taskItems, task]);
        setTask(null);
    };

    const completeTask = (paramIndex: any) => {
        const taskCopy = [...taskItems];
        taskCopy.splice(paramIndex, 1);
        setTaskItems(taskCopy);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.tasksWrapper}>
                    <Text style={styles.sectionTitle}>Todo List</Text>
                    <View style={styles.items}>
                        {taskItems.map((item: any, index: any) => {
                            return <Task key={index} text={item} onPress={() => completeTask(index)} index={index} />;
                        })}
                    </View>
                </View>
            </ScrollView>

            {/* Write a task */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.writeTaskWrapper}
            >
                <TextInput
                    style={styles.input}
                    placeholder={'Write a task ...'}
                    value={task}
                    onChangeText={(text) => setTask(text)}
                />
                <TouchableOpacity onPress={() => handleAddTask()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    tasksWrapper: {
        marginTop: isIos ? '60@vs' : '25@vs',
        paddingHorizontal: '20@s',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.black,
    },
    items: {
        marginTop: '30@vs',
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: '30@vs',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    input: {
        paddingVertical: isIos ? '15@vs' : '10@vs',
        paddingHorizontal: '15@s',
        backgroundColor: COLORS.white,
        borderRadius: 60,
        borderColor: COLORS.DEFAULT_GREEN,
        borderWidth: 1,
        width: '250@s',
    },
    addWrapper: {
        width: '50@s',
        height: '50@vs',
        backgroundColor: COLORS.white,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.DEFAULT_GREEN,
        borderWidth: 1,
    },
    addText: {
        color: COLORS.DEFAULT_GREEN,
    },
});

export default TodoScreen;
