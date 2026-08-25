import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import ItemTarefa, { Tarefa } from "./ItemTarefa";

export default function App() {
  // Estado tipado como um array de Tarefa
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    { id: 1, descricao: "Estudar ES6+", concluida: true },
    { id: 2, descricao: "Configurar ambiente Expo", concluida: true },
    { id: 3, descricao: "Entender o funcionamento do JSX", concluida: false },
    { id: 4, descricao: "Finalizar Roteiro de Pratica 02", concluida: false },
  ]);

  // Função que adiciona uma nova tarefa usando o Spread Operator
  function adicionarTarefa() {
    const novaTarefa: Tarefa = {
      id: tarefas.length + 1,
      descricao: `Nova tarefa ${tarefas.length + 1}`,
      concluida: false,
    };

    setTarefas([...tarefas, novaTarefa]);
  }

  // Filtro dinâmico: somente as tarefas pendentes
  const tarefasPendentes = tarefas.filter((tarefa) => !tarefa.concluida);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Tarefas</Text>

      {tarefas.map((tarefa) => (
        <ItemTarefa key={tarefa.id} tarefa={tarefa} />
      ))}

      <Button title="Adicionar Tarefa" onPress={adicionarTarefa} />

      <Text style={styles.subtitulo}>Tarefas Pendentes</Text>
      {tarefasPendentes.map((tarefa) => (
        <ItemTarefa key={tarefa.id} tarefa={tarefa} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#20325a",
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#20325a",
  },
});
