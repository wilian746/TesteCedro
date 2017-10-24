const API = 'http://localhost:9000/api/v1/'
const API_Produto = API + 'produto/'
const API_Login = API + 'auth/login/'

export default {
    name: 'visualizarProduto',
    drawer: true,
    mounted: function () {
      this.trazerApenasUmProdutoDoBanco(),
      console.log(this.$store.getters.getToken)
    },
    data: () => ({
      dialog: true,
      produtos: [],
    }),
    methods: {
      sairParaPaginaPrincipal () {
        this.$router.push('/')
      },
      fazerLogin () {
        let credentials = {
          email: this.email,
          password: this.password
        }
  
        this.axios.post(API_Login, credentials).then((response) => {
          this.$store.commit('setToken', response.data.token)
          this.$router.push('/visualizarProduto')
        })
      },
      trazerApenasUmProdutoDoBanco(produtoID) {
        let config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.$store.getters.getToken
          }
        }
        this.axios.get(API_Produto + produtoID, config).then((response) => {
          this.produtos = response.data
          console.log( response.data)
        })
      }
    }
}