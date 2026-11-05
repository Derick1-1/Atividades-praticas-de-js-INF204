import React, { useContext } from "react";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  View,
  Text,
  Button,
  ActivityIndicator,
} from "react-native";

import { useAuth } from "../hooks/useAuth";
import { TemaContext } from "../contexts/TemaContext";

const Stack = createNativeStackNavigator();

// --- TELA DE LOGIN ---

function TelaLogin() {
  const { signIn } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Área Restrita
      </Text>

      <Button
        title="Entrar no Sistema"
        onPress={() =>
          signIn("teste@email.com", "123")
        }
      />
    </View>
  );
}

// --- TELA DASHBOARD ---

function TelaDashboard() {
  const { usuario, signOut } = useAuth();

  const { tema, alternarTema } = useContext(TemaContext);

  // Define as cores de acordo com o tema
  const cores = tema === "claro"
    ? {
        fundo: "#ffffff",
        texto: "#000000",
      }
    : {
        fundo: "#222222",
        texto: "#ffffff",
      };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: cores.fundo,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          marginBottom: 20,
          color: cores.texto,
        }}
      >
        Bem-vindo, {usuario?.nome}
      </Text>

      <Text
        style={{
          fontSize: 16,
          marginBottom: 20,
          color: cores.texto,
        }}
      >
        Tema atual: {tema}
      </Text>

      <Button
        title="Alternar Tema"
        onPress={alternarTema}
      />

      <View style={{ height: 20 }} />

      <Button
        title="Sair da Conta"
        color="red"
        onPress={signOut}
      />
    </View>
  );
}

// --- ROTEADOR PRINCIPAL ---

export default function Rotas() {
  const { logado, carregando } = useAuth();

  // Aguarda verificar a sessão salva
  if (carregando) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {logado ? (
          <Stack.Screen
            name="Dashboard"
            component={TelaDashboard}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={TelaLogin}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}