const API = "http://localhost:9000/api/v1/";
const API_Produto = API + "produto/";
const API_Login = API + "auth/login/";

export default {
    name: 'homeCliente',
    drawer: true,
    mounted:function(){
        this.trazerTodosProdutosDoBanco()
    },
    data: () => ({
        email: null,
        password: null,
        produtos: []
    }),
    methods: {
        trazerTodosProdutosDoBanco() {
            this.axios.get(API_Produto).then((response) => {
                this.produtos = response.data;
            })
        },
        fazerLogin() {
            let credentials = { email: this.email, password: this.password }
            
            this.axios.post(API_Login, credentials).then((response) => {
                this.$store.commit('setToken', response.data.token)
                this.$router.push('/home'); 
            })
        },
        irParaPaginaDeCadastroDeUsuario(){
            this.$router.push('/cadastroDeUsuario');
        }
        
    },
    created(){
        
    }
    
}