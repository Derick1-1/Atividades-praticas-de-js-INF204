import React, { useState } from "react"; // ADICIONADO: useState
import { StyleSheet, Text, View, Button } from "react-native";
import ItemTarefa from "./ItemTarefa"; // ADICIONADO: importando o componente

export default function App() {

  // ALTERADO: agora tarefas é um estado
  const [tarefas, setTarefas] = useState([
    { id: 1, descricao: "Estudar ES6+", concluida: true },
    { id: 2, descricao: "Configurar ambiente Expo", concluida: true },
    { id: 3, descricao: "Entender o funcionamento do JSX", concluida: false },
    { id: 4, descricao: "Finalizar Roteiro de Pratica 02", concluida: false },
  ]);

  // ADICIONADO: filtro para pegar somente as tarefas pendentes
  const tarefasPendentes = tarefas.filter(
    (tarefa) => tarefa.concluida === false
  );

  // ADICIONADO: função para adicionar uma nova tarefa
  const adicionarTarefa = () => {
    const novaTarefa = {
      id: tarefas.length + 1,
      descricao: "Nova tarefa",
      concluida: false,
    };

    // ADICIONADO: Spread Operator (...)
    // Cria um novo array mantendo as tarefas antigas
    // e adicionando a nova tarefa no final
    setTarefas([...tarefas, novaTarefa]);
  };

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Lista de Tarefas
      </Text>

      {/* ADICIONADO: botão para adicionar uma nova tarefa */}
      <Button
        title="Adicionar nova tarefa"
        onPress={adicionarTarefa}
      />

      {/* ALTERADO:
          O JSX do card foi colocado no componente ItemTarefa
          e os dados são enviados através de Props.
      */}
      {tarefas.map((tarefa) => (
        <ItemTarefa
          key={tarefa.id}
          tarefa={tarefa}
        />
      ))}

      {/* ADICIONADO: lista somente com tarefas pendentes */}
      <Text style={styles.subtitulo}>
        Tarefas Pendentes
      </Text>

      {tarefasPendentes.map((tarefa) => (
        <ItemTarefa
          key={tarefa.id}
          tarefa={tarefa}
        />
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

  // ADICIONADO
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#20325a",
  },
});