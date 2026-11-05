import React, {
  createContext,
  useState,
  useEffect,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Criação do contexto de autenticação
export const AuthContext = createContext(null);

// Provider que envolve a aplicação
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Verifica se existe um usuário salvo ao iniciar o aplicativo
  useEffect(() => {
    async function carregarUsuario() {
      try {
        const dadosSalvos = await AsyncStorage.getItem("usuario");

        if (dadosSalvos) {
          const usuarioSalvo = JSON.parse(dadosSalvos);

          setUsuario(usuarioSalvo);
        }
      } catch (error) {
        console.log("Erro ao carregar usuário:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregarUsuario();
  }, []);

  // Simulação de Login
  async function signIn(email, senha) {
    try {
      // Simulação de resposta da API
      const respostaAPI = {
        id: "123",
        nome: "Turma INF204",
        email: email,
      };

      // Salva os dados no AsyncStorage
      await AsyncStorage.setItem(
        "usuario",
        JSON.stringify(respostaAPI)
      );

      setUsuario(respostaAPI);
    } catch (error) {
      console.log("Erro ao realizar login:", error);
    }
  }

  // Logout
  async function signOut() {
    try {
      await AsyncStorage.removeItem("usuario");

      setUsuario(null);
    } catch (error) {
      console.log("Erro ao sair da conta:", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        logado: !!usuario,
        usuario,
        carregando,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}