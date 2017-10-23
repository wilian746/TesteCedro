const API = 'http://localhost:9000/api/v1/'
const API_Produto = API + 'produto/'
const API_Login = API + 'auth/login'
const API_CadastroProduto = API_Produto + 'registroDeProduto/'

export default {
  name: 'home',
  drawer: true,
  mounted: function () {
    this.getProduto(),
    console.log(this.$store.getters.getToken)
  },
  data: () => ({
    menus: [
        { item: 'Click Me' },
        { item: 'Click Me' },
        { item: 'Click Me' },
        { item: 'Click Me 2' }
    ],
    items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' }
    ],
    direction: 'left',
    right: true,
    bottom: true,
    transition: 'slide-y-reverse-transition',
    nomeProduto: '',
    descricaoProduto: '',
    precoProduto: 0,
    nomeProdutoNovo: '',
    descricaoProdutoNovo: '',
    precoProdutoNovo: 0,
    produtos: [],
    dialog: false
  }),
  methods: {
    getProduto () {
      this.axios.get(API_Produto).then((response) => {
        this.produtos = response.data
      })
    },
    sairParaPaginaPrincipal () {
      this.$router.push('/')
    },
    cadastrarProduto () {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.getters.getToken
        }
      }
      let credentials = JSON.stringify({
        'nome': this.nomeProduto,
        'descricao': this.descricaoProduto,
        'preco': parseFloat(this.precoProduto)
      })

      this.axios.post(API_CadastroProduto, credentials, config).then((response) => {
        console.log(response.data)
        this.$router.push('/home')
      }).catch(function (error) {
        console.log(error)
      })
    },
    deletarProdutoDoBanco (produtoID) {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.getters.getToken
        }
      }
      this.axios.delete(API_Produto + produtoID, config).then((response) => {
        console.log(response.data.nomeProduto)
        this.$router.push('/home')
      })
    },
    updateProdutoDoBanco (produtoID) {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.getters.getToken
        }
      }
      let credentials = JSON.stringify({
        'nome': this.nomeProdutoNovo,
        'descricao': this.descricaoProdutoNovo,
        'preco': parseFloat(this.precoProdutoNovo)
      })
      this.axios.put(API_Produto + produtoID, credentials,config).then((response) => {
        console.log('Credentials:',credentials)
        console.log( response.data)
      })
    }
  }
}
