import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Interface que define o formato de uma Tarefa
export interface Tarefa {
  id: number;
  descricao: string;
  concluida: boolean;
}

// Tipando as Props do componente: ele recebe uma "tarefa" do tipo Tarefa
interface ItemTarefaProps {
  tarefa: Tarefa;
}

export default function ItemTarefa({ tarefa }: ItemTarefaProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.textoTarefa}>
        {tarefa.concluida ? "[OK] " : "[PENDENTE] "}
        {tarefa.descricao}
      </Text>
    </View>
  );
}

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
