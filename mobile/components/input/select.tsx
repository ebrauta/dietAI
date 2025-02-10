import { colors } from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface OptionsProps {
    label: string;
    value: string | number;
}

interface SelectProps {
    name: string;
    control: any;
    placeholder?: string;
    error?: string;
    options: OptionsProps[]
}

export function Select({ name, control, placeholder, error, options }: SelectProps) {
    const [visible, setVisible] = useState<boolean>(false)
    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <TouchableOpacity style={styles.select} onPress={() => setVisible(true)}>
                            <Text>{value ? options.find((option) => option.value == value)?.label : placeholder}</Text>
                            <Feather name="arrow-down" size={16} color="#000" />
                        </TouchableOpacity>
                        <Modal
                            visible={visible}
                            transparent={true}
                            animationType="fade"
                            onRequestClose={() => setVisible(false)}>
                            <TouchableOpacity style={styles.modalContainer} activeOpacity={1}
                                onPress={() => setVisible(false)}>
                                <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
                                    <FlatList
                                        contentContainerStyle={{ gap: 4 }}
                                        data={options}
                                        keyExtractor={(item) => item.value.toString()}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={styles.option}
                                                onPress={() => {
                                                    onChange(item.value)
                                                    setVisible(false)
                                                }}>
                                                <Text>{item.label}</Text>
                                            </TouchableOpacity>
                                        )}></FlatList>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </Modal>
                    </>
                )}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16
    },
    errorText: {
        color: 'red',
        marginTop: 4
    },
    select: {
        flexDirection: 'row',
        height: 44,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 4
    },
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: 'center'
    },
    modalContent: {
        backgroundColor: colors.white,
        marginHorizontal: 10,
        borderRadius: 8,
        padding: 20
    },
    option: {
        paddingVertical: 14,
        backgroundColor: 'rgba(208,208,208,0.40)',
        borderRadius: 4,
        paddingHorizontal: 8
    }
})