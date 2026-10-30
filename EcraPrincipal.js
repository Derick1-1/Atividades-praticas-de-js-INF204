
function EcraPrincipal() {
    // Acesso à instância do banco de dados
    const db = useSQLiteContext();

    const [nomeUsuario, setNomeUsuario] = useState("Visitante");
    const [tarefas, setTarefas] = useState([]);
    const [novaTarefa, setNovaTarefa] = useState("");

    // Carrega os dados quando a tela abrir
    useEffect(() => {
        carregarPreferencias();
        carregarTarefas();
    }, []);

    // Leitura do nome salvo no AsyncStorage
    const carregarPreferencias = async () => {
        try {
            const nomeSalvo = await AsyncStorage.getItem(
                "@AppTarefas:Nome"
            );

            if (nomeSalvo) {
                setNomeUsuario(nomeSalvo);
            }
        } catch (erro) {
            console.error("Falha ao carregar nome:", erro);
        }
    };

    // Salva o nome do usuário
    const salvarNome = async () => {
        try {
            const novoNome = "Estudante INF204";

            await AsyncStorage.setItem(
                "@AppTarefas:Nome",
                novoNome
            );

            setNomeUsuario(novoNome);
        } catch (erro) {
            console.error("Falha ao salvar nome:", erro);
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
            console.error("Falha ao ler dados:", erro);
        }
    };

    // Insere uma nova tarefa
    const adicionarTarefa = async () => {
        if (novaTarefa.trim() === "") {
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
            console.error("Erro no INSERT:", erro);
        }
    };

    // Alterna o status da tarefa
    const alternarStatus = async (id, statusAtual) => {
        try {
            const novoStatus = statusAtual === 1 ? 0 : 1;

            await db.runAsync(
                "UPDATE tarefas SET concluida = ? WHERE id = ?;",
                [novoStatus, id]
            );

            await carregarTarefas();
        } catch (erro) {
            console.error("Erro no UPDATE:", erro);
        }
    };

    // Interface da tela
    return (
        <View style={styles.container}>
            <View style={styles.cabecalho}>
                <Text style={styles.titulo}>
                    Olá, {nomeUsuario}!
                </Text>

                <TouchableOpacity
                    style={styles.botaoAcao}
                    onPress={salvarNome}
                >
                    <Text style={styles.textoBotao}>Mudar Nome</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nova tarefa..."
                    value={novaTarefa}
                    onChangeText={setNovaTarefa}
                />

                <TouchableOpacity
                    style={styles.botaoAdd}
                    onPress={adicionarTarefa}
                >
                    <Text style={styles.textoBotao}>Add</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={tarefas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
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
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
