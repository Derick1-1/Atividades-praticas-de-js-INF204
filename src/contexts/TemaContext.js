import React, { createContext, useState } from "react";

// Criação do contexto de tema
export const TemaContext = createContext(null);

// Provider responsável pelo tema
export function ThemeProvider({ children }) {
  const [tema, setTema] = useState("claro");

  // Função para alternar entre claro e escuro
  function alternarTema() {
    setTema((temaAtual) =>
      temaAtual === "claro" ? "escuro" : "claro"
    );
  }

  return (
    <TemaContext.Provider
      value={{
        tema,
        alternarTema,
      }}
    >
      {children}
    </TemaContext.Provider>
  );
}