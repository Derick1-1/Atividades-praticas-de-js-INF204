import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import api from "./api";

export default function App() {
  const [utilizadores, setUtilizadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [atualizando, setAtualizando] = useState(false);

  const [tela, setTela] = useState("lista");

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Buscar utilizadores na API
  const buscarDados = async (pullToRefresh = false) => {
    if (pullToRefresh) {
      setAtualizando(true);
    } else {
      setLoading(true);
    }

    try {
      const resposta = await api.get("/users");
      setUtilizadores(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar utilizadores:", erro.message);

      Alert.alert(
        "Erro",
        "Não foi possível carregar os utilizadores."
      );
    } finally {
      setLoading(false);
      setAtualizando(false);
    }
  };

  // Executar a busca ao abrir o aplicativo
  useEffect(() => {
    buscarDados();
  }, []);

  // Cadastrar utilizador através do método POST
  const cadastrarUtilizador = async () => {
    if (!nome.trim() || !email.trim()) {
      Alert.alert(
        "Atenção",
        "Preencha o nome e o email."
      );
      return;
    }

    try {
      setEnviando(true);

      const resposta = await api.post("/users", {
        name: nome.trim(),
        email: email.trim(),
      });

      console.log("Utilizador cadastrado:", resposta.data);

      Alert.alert(
        "Sucesso",
        "Utilizador cadastrado com sucesso!"
      );

      setNome("");
      setEmail("");
    } catch (erro) {
      console.error(
        "Erro ao cadastrar utilizador:",
        erro.response?.data || erro.message
      );

      Alert.alert(
        "Erro",
        "Não foi possível cadastrar o utilizador."
      );
    } finally {
      setEnviando(false);
    }
  };

  // Indicador de carregamento inicial da lista
  if (loading && tela === "lista") {
    return (
      <View style={styles.centro}>
        <ActivityIndicator
          size="large"
          color="#14325A"
        />

        <Text>A carregar utilizadores...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {tela === "lista" ? (
        <>
          <Text style={styles.titulo}>
            Lista de Utilizadores
          </Text>

          <FlatList
            data={utilizadores}
            keyExtractor={(item, index) =>
              String(item.id ?? index)
            }
            renderItem={({ item }) => (
              <View style={styles.cartao}>
                <Text style={styles.nome}>
                  {item.name}
                </Text>

                <Text style={styles.email}>
                  {item.email}
                </Text>
              </View>
            )}
            refreshing={atualizando}
            onRefresh={() => buscarDados(true)}
            ListEmptyComponent={
              <Text style={styles.vazio}>
                Nenhum utilizador encontrado.
              </Text>
            }
          />
        </>
      ) : (
        <>
          <Text style={styles.titulo}>
            Cadastrar Utilizador
          </Text>

          <Text style={styles.rotulo}>
            Nome
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o seu nome"
            value={nome}
            onChangeText={setNome}
            editable={!enviando}
          />

          <Text style={styles.rotulo}>
            Email
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o seu email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!enviando}
          />

          <TouchableOpacity
            style={[
              styles.botao,
              enviando && styles.botaoDesativado,
            ]}
            onPress={cadastrarUtilizador}
            disabled={enviando}
          >
            <Text style={styles.textoBotao}>
              {enviando ? "A enviar..." : "Cadastrar"}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {/* Navegação entre as duas telas */}
      <View style={styles.navegacao}>
        <TouchableOpacity
          style={[
            styles.botaoNav,
            tela === "lista" && styles.botaoAtivo,
          ]}
          onPress={() => setTela("lista")}
        >
          <Text style={styles.textoBotao}>
            Utilizadores
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.botaoNav,
            tela === "formulario" && styles.botaoAtivo,
          ]}
          onPress={() => setTela("formulario")}
        >
          <Text style={styles.textoBotao}>
            Cadastrar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#14325A",
  },

  cartao: {
    backgroundColor: "#FFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },

  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },

  email: {
    color: "#666",
    marginTop: 5,
  },

  vazio: {
    textAlign: "center",
    marginTop: 30,
    color: "#666",
  },

  rotulo: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#14325A",
  },

  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },

  botao: {
    backgroundColor: "#14325A",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },

  botaoDesativado: {
    opacity: 0.6,
  },

  navegacao: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 15,
  },

  botaoNav: {
    flex: 1,
    backgroundColor: "#777",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  botaoAtivo: {
    backgroundColor: "#14325A",
  },

  textoBotao: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});