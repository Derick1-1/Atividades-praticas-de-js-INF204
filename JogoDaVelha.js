import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function JogoDaVelha() {
  const [tabuleiro, setTabuleiro] = useState([
    "", "", "",
    "", "", "",
    "", "", "",
  ]);

  const [jogador, setJogador] = useState("X");

  function jogar(posicao) {
    if (tabuleiro[posicao] !== "") {
      return;
    }

    const novoTabuleiro = [...tabuleiro];

    novoTabuleiro[posicao] = jogador;

    setTabuleiro(novoTabuleiro);

    setJogador(jogador === "X" ? "O" : "X");
  }

  return (
    <View style={styles.tabuleiro}>
      <Text style={styles.vez}>
        Vez do jogador: {jogador}
      </Text>

      <View style={styles.linha}>
        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(0)}
        >
          <Text style={styles.simbolo}>{tabuleiro[0]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(1)}
        >
          <Text style={styles.simbolo}>{tabuleiro[1]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(2)}
        >
          <Text style={styles.simbolo}>{tabuleiro[2]}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linha}>
        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(3)}
        >
          <Text style={styles.simbolo}>{tabuleiro[3]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(4)}
        >
          <Text style={styles.simbolo}>{tabuleiro[4]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(5)}
        >
          <Text style={styles.simbolo}>{tabuleiro[5]}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linha}>
        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(6)}
        >
          <Text style={styles.simbolo}>{tabuleiro[6]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(7)}
        >
          <Text style={styles.simbolo}>{tabuleiro[7]}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.celula}
          onPress={() => jogar(8)}
        >
          <Text style={styles.simbolo}>{tabuleiro[8]}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabuleiro: {
    alignItems: "center",
    marginBottom: 30,
  },

  vez: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },

  linha: {
    flexDirection: "row",
  },

  celula: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  simbolo: {
    fontSize: 30,
    fontWeight: "bold",
  },
});