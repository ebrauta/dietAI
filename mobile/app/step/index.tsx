import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { colors } from "@/constants/colors";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { router } from "expo-router";
import { userDataStore } from "@/store/data";

const schema = z.object({
    name: z.string({ required_error: "O nome é obrigatório" }),
    weight: z.string({ required_error: "O peso é obrigatório" }),
    height: z.string({ required_error: "A altura é obrigatória" }),
    age: z.string({ required_error: "A idade é obrigatória" }),
})

type FormData = z.infer<typeof schema>

export default function Step() {

    const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const setPageOne = userDataStore(state => state.setPageOne)

    function handleCreate(data: FormData) {
        setPageOne({ name: data.name, weight: data.weight, height: data.height, age: data.age })
        router.push('/create')
    }
    return (
        <View style={styles.container}>
            <Header step="Passo 1" title="Vamos Começar" />
            <ScrollView style={styles.content}>
                <Text style={styles.label}>Nome: </Text>
                <Input name="name" control={control} placeholder="Digite seu nome..." error={errors.name?.message} keyboardType="default" />

                <Text style={styles.label}>Seu peso atual: </Text>
                <Input name="weight" control={control} placeholder="Ex: 75" error={errors.weight?.message} keyboardType="numeric" />

                <Text style={styles.label}>Sua altura atual: </Text>
                <Input name="height" control={control} placeholder="Ex: 1.90" error={errors.height?.message} keyboardType="numeric" />

                <Text style={styles.label}>Sua idade atual: </Text>
                <Input name="age" control={control} placeholder="Ex: 35" error={errors.age?.message} keyboardType="numeric" />

                <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    content: {
        paddingLeft: 16,
        paddingRight: 16
    },
    label: {
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
        marginBottom: 8
    },
    button: {
        backgroundColor: colors.blue,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    }
})