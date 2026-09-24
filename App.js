

import React, { useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";

export default function Contador() {
     const [contagem, setContagem] = useState(0);

      return (
           <View style={styles.container}>
           <Text style={styles.titulo}>"Contagem Atual:"</Text>
           <Text style={styles.numero}>{contagem}</Text>

             <Button
                 title="Incrementar +1"
                 onPress={() => setContagem(contagem + 1)}
        /> 
             <Button
                 title="Descrementar -1"
                 onPress={() => setContagem(contagem - 1)}
                 disabled = {contagem ===0}
        />
            <Buttwon
                 title="Zerar "
                 onPress={() => setContagem(0)}
        />
      </View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "center",
alignItems: "center",
backgroundColor: "#ffffff",
gap: 8
},

titulo: {
fontSize: 20,
color: "#333333"
},

numero: {
fontSize: 48,
fontWeight: "bold",
color: "#4caf50",
marginBottom: 20
}
});