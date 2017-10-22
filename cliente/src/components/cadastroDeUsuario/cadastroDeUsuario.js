const API = "http://localhost:9000/api/v1/";
const API_CadastroDeUsuario = API + "auth/registroDeUsuario";

export default {
    name: 'homeCliente',
    data: () => ({autorizacao: null},{
        nome: null,
        email: null,
        senha: null,
        autorizacao: null,
        users:[]
    }),
    methods: {
        fazerCadastroDeUsuario() {
            let credentials = {nome:this.nome, email: this.email, senha: this.senha, autorizacao: this.autorizacao}
            this.axios.post(API_CadastroDeUsuario, credentials).then((response) => {
            this.users = response.data;
            this.$router.push('/')
            })
        },
        voltarParaHomeCliente(){
            this.$router.push('/');
        }
        
    },
    created(){
        
    }
    
}