import React from "react";
import { StyleSheet, Text, View } from "react-native";

// ADICIONADO:
// O componente recebe "tarefa" através das Props
export default function ItemTarefa({ tarefa }) {
    return (
        <View style={styles.card}>
            <Text style={styles.textoTarefa}>

                {/* ALTERADO:
            Agora os dados vêm da Prop "tarefa"
        */}
                {tarefa.concluida ? "[OK] " : "[PENDENTE] "}

                {tarefa.descricao}

            </Text>
        </View>
    );
}

// ADICIONADO:
// Os estilos do card foram movidos para este componente
const styles = StyleSheet.create({
    card: {
        backgroundColor: "#ffffff",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    textoTarefa: {
        fontSize: 16,
        color: "#333",
    },
});