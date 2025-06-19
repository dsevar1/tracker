import { ThemeContext } from "@/context/ThemeContext";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import Octicons from "@expo/vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useScreenTimer, withButtonTracking } from "../../beholder/beholderMain";



export default function EditScreen() {
    useScreenTimer("EditTodoScreen");

    const TrackedPressable = withButtonTracking(Pressable ); 

    const { id } = useLocalSearchParams();
    const [todo, setTodo] = useState({});
    const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
    const router = useRouter();

    const [loaded, error] = useFonts({
        Inter_500Medium,
    });

    useEffect(() => {
        const fetchData = async (id) => {
            try {
                const jsonValue = await AsyncStorage.getItem("TodoApp");
                const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;

                if (storageTodos && storageTodos.length) {
                    const myTodo = storageTodos.find(todo => todo.id.toString() === id);
                    setTodo(myTodo);
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchData(id);
    }, [id]);

    if (!loaded && !error) return null;

    const styles = createStyles(theme, colorScheme);

    const handleSave = async () => {
        try {
            const savedTodo = { ...todo, title: todo.title };

            const jsonValue = await AsyncStorage.getItem('TodoApp');
            const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;

            if (storageTodos && storageTodos.length) {
                const otherTodos = storageTodos.filter(todo => todo.id !== savedTodo.id);
                const allTodos = [...otherTodos, savedTodo];
                await AsyncStorage.setItem('TodoApp', JSON.stringify(allTodos));
            } else {
                await AsyncStorage.setItem('TodoApp', JSON.stringify([savedTodo]));
            }

            router.push('/');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    maxLength={30}
                    placeholder="Edit todo"
                    placeholderTextColor="gray"
                    value={todo?.title || ''}
                    onChangeText={(text) => setTodo(prev => ({ ...prev, title: text }))}
                />
                <TrackedPressable
                    onPress={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
                    eventName="ToggleTheme"
                    style={{ marginLeft: 10 }}
                >
                    <Octicons
                        name={colorScheme === 'dark' ? "moon" : "sun"}
                        size={36}
                        color={theme.text}
                        style={{ width: 36 }}
                    />
                </TrackedPressable>
            </View>
            <View style={styles.inputContainer}>
                <TrackedPressable
                    onPress={handleSave}
                    eventName="SaveTodo"
                    style={styles.saveButton}
                >
                    <Text style={styles.saveButtonText}>Save</Text>
                </TrackedPressable>
                <TrackedPressable
                    onPress={() => router.push('/')}
                    eventName="CancelEdit"
                    style={[styles.saveButton, { backgroundColor: 'red' }]}
                >
                    <Text style={[styles.saveButtonText, { color: 'white' }]}>Cancel</Text>
                </TrackedPressable>
                <TrackedPressable onPress={() => console.log('Pressed Test')} eventName="TestButton">
  <Text style={{ fontSize: 20, color: 'blue' }}>Test Button</Text>
</TrackedPressable>

            </View>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        </SafeAreaView>
    );
}

function createStyles(theme, colorScheme) {
    return StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            backgroundColor: theme.background,
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            gap: 6,
            width: '100%',
            maxWidth: 1024,
            marginHorizontal: 'auto',
            pointerEvents: 'auto',
        },
        input: {
            flex: 1,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginRight: 10,
            fontSize: 18,
            fontFamily: 'Inter_500Medium',
            minWidth: 0,
            color: theme.text,
        },
        saveButton: {
            backgroundColor: theme.button,
            borderRadius: 5,
            padding: 10,
        },
        saveButtonText: {
            fontSize: 18,
            color: colorScheme === 'dark' ? 'black' : 'white',
        },
    });
}
