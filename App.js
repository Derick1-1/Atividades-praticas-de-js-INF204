
import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Platform
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  SQLiteProvider,
  useSQLiteContext
} from "expo-sqlite";

// Inicialização do banco de dados
const iniciarBanco = async (db) => {
  await db.execAsync("PRAGMA journal_mode = WAL;");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      concluida INTEGER DEFAULT 0
    );
  `);

  console.log("Banco de dados inicializado!");
};

// Componente principal do aplicativo
export default function App() {
  return (
    <SQLiteProvider
      databaseName="app-database.db"
      onInit={iniciarBanco}
    >
      <EcraPrincipal />
    </SQLiteProvider>
  );
}

// Tela principal
function EcraPrincipal() {
  const db = useSQLiteContext();

  // Estado do usuário como objeto
  const [usuario, setUsuario] = useState({
    nome: "Visitante",
    logado: true
  });

  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  // Carrega o usuário e as tarefas ao abrir a tela
  useEffect(() => {
    carregarPreferencias();
    carregarTarefas();
  }, []);

  // Recupera o objeto do usuário do AsyncStorage
  const carregarPreferencias = async () => {
    try {
      const usuarioSalvo = await AsyncStorage.getItem(
        "@AppTarefas:Usuario"
      );

      if (usuarioSalvo !== null) {
        const objetoUsuario = JSON.parse(usuarioSalvo);
        setUsuario(objetoUsuario);
      }
    } catch (erro) {
      console.error("Erro ao carregar usuário:", erro);
    }
  };

  // Salva o objeto do usuário no AsyncStorage
  const salvarNome = async () => {
    try {
      const novoUsuario = {
        nome: "Estudante INF204",
        logado: true
      };

      await AsyncStorage.setItem(
        "@AppTarefas:Usuario",
        JSON.stringify(novoUsuario)
      );

      setUsuario(novoUsuario);

      Alert.alert("Sucesso", "Nome salvo com sucesso!");
    } catch (erro) {
      console.error("Erro ao salvar usuário:", erro);
      Alert.alert("Erro", "Não foi possível salvar o nome.");
    }
  };

  // Consulta as tarefas no SQLite
  const carregarTarefas = async () => {
    try {
      const resultados = await db.getAllAsync(
        "SELECT * FROM tarefas ORDER BY id DESC;"
      );

      setTarefas(resultados);
    } catch (erro) {
      console.error("Falha ao ler tarefas:", erro);
    }
  };

  // Adiciona uma tarefa ao banco
  const adicionarTarefa = async () => {
    if (novaTarefa.trim() === "") {
      Alert.alert("Atenção", "Digite uma tarefa primeiro!");
      return;
    }

    try {
      await db.runAsync(
        "INSERT INTO tarefas (descricao, concluida) VALUES (?, ?);",
        [novaTarefa.trim(), 0]
      );

      setNovaTarefa("");
      await carregarTarefas();
    } catch (erro) {
      console.error("Erro ao adicionar tarefa:", erro);
      Alert.alert("Erro", "Não foi possível adicionar a tarefa.");
    }
  };

  // Alterna entre tarefa concluída e pendente
  const alternarStatus = async (id, statusAtual) => {
    try {
      const novoStatus = statusAtual === 1 ? 0 : 1;

      await db.runAsync(
        "UPDATE tarefas SET concluida = ? WHERE id = ?;",
        [novoStatus, id]
      );

      await carregarTarefas();
    } catch (erro) {
      console.error("Erro ao atualizar tarefa:", erro);
    }
  };

  // Exclui uma tarefa do SQLite
  const excluirTarefa = async (id) => {
    try {
      await db.runAsync(
        "DELETE FROM tarefas WHERE id = ?;",
        [id]
      );

      await carregarTarefas();
    } catch (erro) {
      console.error("Erro ao excluir tarefa:", erro);
      Alert.alert("Erro", "Não foi possível excluir a tarefa.");
    }
  };

  // Solicita confirmação antes de excluir
  const confirmarExclusao = (id) => {
    if (Platform.OS === "web") {
      excluirTarefa(id);
      return;
    }

    Alert.alert(
      "Excluir tarefa",
      "Deseja realmente excluir esta tarefa?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => excluirTarefa(id)
        }
      ]
    );
  };

  // Interface da tela
  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <View style={styles.infoUsuario}>
          <Text style={styles.titulo}>
            Olá, {usuario.nome}!
          </Text>

          <Text style={styles.subtitulo}>
            {usuario.logado ? "Usuário conectado" : "Usuário desconectado"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.botaoAcao}
          onPress={salvarNome}
        >
          <Text style={styles.textoBotao}>Mudar Nome</Text>
        </TouchableOpacity>
      </View>

      {/* Campo para adicionar tarefa */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nova tarefa..."
          value={novaTarefa}
          onChangeText={setNovaTarefa}
          onSubmitEditing={adicionarTarefa}
          returnKeyType="done"
        />

        <TouchableOpacity
          style={styles.botaoAdd}
          onPress={adicionarTarefa}
        >
          <Text style={styles.textoBotao}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de tarefas */}
      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.listaVazia}>
            Nenhuma tarefa cadastrada.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.linhaTarefa}>
            {/* Tocar na tarefa altera seu status */}
            <TouchableOpacity
              style={styles.cartao}
              onPress={() =>
                alternarStatus(item.id, item.concluida)
              }
            >
              <Text
                style={[
                  styles.textoTarefa,
                  item.concluida === 1 &&
                  styles.textoConcluido
                ]}
              >
                {item.descricao}
              </Text>

              <Text style={styles.statusTarefa}>
                {item.concluida === 1
                  ? "Concluída"
                  : "Pendente"}
              </Text>
            </TouchableOpacity>

            {/* Botão para excluir */}
            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={() => confirmarExclusao(item.id)}
              accessibilityLabel={`Excluir tarefa ${item.descricao}`}
            >
              <Text style={styles.textoExcluir}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

// Estilos da aplicação
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
    paddingHorizontal: 20
  },

  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },

  infoUsuario: {
    flex: 1,
    marginRight: 8
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#14325A"
  },

  subtitulo: {
    fontSize: 12,
    color: "#666",
    marginTop: 4
  },

  botaoAcao: {
    backgroundColor: "#808080",
    padding: 10,
    borderRadius: 8
  },

  inputContainer: {
    flexDirection: "row",
    marginBottom: 20
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#FFF"
  },

  botaoAdd: {
    backgroundColor: "#0064A0",
    paddingHorizontal: 18,
    borderRadius: 8,
    marginLeft: 10,
    justifyContent: "center"
  },

  textoBotao: {
    color: "#FFF",
    fontWeight: "bold"
  },

  linhaTarefa: {
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 10
  },

  cartao: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    elevation: 2
  },

  textoTarefa: {
    fontSize: 18,
    color: "#333"
  },

  textoConcluido: {
    textDecorationLine: "line-through",
    color: "#999"
  },

  statusTarefa: {
    fontSize: 12,
    color: "#777",
    marginTop: 5
  },

  botaoExcluir: {
    backgroundColor: "#D32F2F",
    width: 45,
    marginLeft: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center"
  },

  textoExcluir: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold"
  },

  listaVazia: {
    textAlign: "center",
    color: "#777",
    marginTop: 25,
    fontSize: 16
  }
});
