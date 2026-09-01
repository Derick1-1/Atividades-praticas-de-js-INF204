import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

import JogoDaVelha from "./JogoDaVelha";

export default function App() {
  const [nome, setNome] = useState("Joao Vitor");
  const [seguindo, setSeguindo] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cartao}>
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/men/32.jpg",
          }}
          style={styles.avatar}
        />

        <Text style={styles.nomeUsuario}>{nome}</Text>

        <Text style={styles.profissao}>
          Engenheiro de Software
        </Text>

        <TouchableOpacity
          style={[
            styles.botao,
            seguindo && styles.botaoDesativado,
          ]}
          onPress={() => {
            setSeguindo(!seguindo);
            alert(
              seguindo
                ? "Deixou de seguir " + nome
                : "Seguindo " + nome
            );
          }}
        >
          <Text style={styles.textoBotao}>
            {seguindo ? "Já Seguindo" : "Seguir"}
          </Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={(texto) => setNome(texto)}
        />
      </View>

      <View style={styles.cartao}>
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/women/44.jpg",
          }}
          style={styles.avatar}
        />

        <Text style={styles.nomeUsuario}>Maria</Text>

        <Text style={styles.profissao}>
          Desenvolvedora
        </Text>

        <TouchableOpacity style={styles.botao}>
          <Text style={styles.textoBotao}>Seguir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cartao}>
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/men/75.jpg",
          }}
          style={styles.avatar}
        />

        <Text style={styles.nomeUsuario}>Carlos</Text>

        <Text style={styles.profissao}>
          Analista de Sistemas
        </Text>

        <TouchableOpacity style={styles.botao}>
          <Text style={styles.textoBotao}>Seguir</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.tituloJogo}>Jogo da Velha</Text>

      <JogoDaVelha />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    paddingVertical: 30,
  },

  cartao: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: "80%",
    marginBottom: 20,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },

  nomeUsuario: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#14325A",
  },

  profissao: {
    fontSize: 16,
    color: "#505050",
    marginBottom: 20,
  },

  botao: {
    backgroundColor: "#0064A0",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },

  botaoDesativado: {
    backgroundColor: "#808080",
  },

  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    textAlign: "center",
  },

  tituloJogo: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
    color: "#14325A",
  },
});