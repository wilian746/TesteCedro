const API = 'http://localhost:9000/api/v1/'
const API_Produto = API + 'produto/'
const API_Login = API + 'auth/login/'

export default {
  name: 'homeCliente',
  data: () => ({
    alert: true,
    email: '',
    password: '',
    produtos: [],
    users: [],
    cardCadastrar: false,
    cardLogin: false
  }),
  methods: {
    trazerTodosProdutosDoBanco () {
      this.axios.get(API_Produto).then((response) => {
        this.produtos = response.data
      })
    },
    fazerLogin () {
      let credentials = {
        email: this.email,
        password: this.password
      }
      this.axios.post(API_Login, credentials).then((response) => {
        this.$store.commit('setToken', response.data.token)
        this.$router.push('/home')
        
      })
    },
    fazerCadastroDeUsuario () {
      let credentials = {
        nome: this.nome,
        email: this.email,
        senha: this.senha,
        autorizacao: this.autorizacao
      }
      this.axios.post(API_CadastroDeUsuario, credentials).then((response) => {
        this.users = response.data
      })
    }
  },
  mounted: function () {
    this.trazerTodosProdutosDoBanco()
  }
}
