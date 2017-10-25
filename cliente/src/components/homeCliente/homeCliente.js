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
    nome: null,
    email: null,
    senha: null,
    autorizacao: null,
    users: [],
    cardCadastrar: false,
    cardLogin: false,



    
    nomeProduto: '',
    descricaoProduto: '',
    precoProduto: 0,
    linkImage: '',
    dialog: false,
    alert: true,
    alertCompra: true,
    alertCompraDnv: true,
    alertNomeProduto: true,
    alertDescricaoProduto: true,
    alertPrecoProduto: true,
    proximoRequisito: false,
    proximoRequisitoDeNovo: false,
    cardDialog: false,
    cardCadastroDeProduto: false,
    cardInfo: false,





    nomeProdutoNovo: '',
    descricaoProdutoNovo: '',
    precoProdutoNovo: 0,
    linkImageNovo: '',
    produtos: [],
    valorPagamento: '',
    tipoPagamento: '',
    formaDePagamento: '',
    parcelas: 0,
    resultado: 0,
    produtoSelecionadoID: '',
    resultadoParcelado: 0
  }),
  methods: {
    guardarValoresPagamento () {
      this.proximoRequisito = true

      let valores = {
        valorPagamento: this.valorPagamento,
        tipoPagamento: this.tipoPagamento,
        formaDePagamento: this.formaDePagamento,
        parcelas: parseFloat(this.parcelas)
      }
    },

    guardarValoresPagamentoDeNovo () {
      this.proximoRequisitoDeNovo = true
      let valores = {
        valorPagamento: this.valorPagamento,
        tipoPagamento: this.tipoPagamento,
        formaDePagamento: this.formaDePagamento,
        parcelas: parseFloat(this.parcelas)
      }
    },
    getProdutoID (produtoID) {
      this.produtoSelecionadoID = produtoID
      this.trazerApenasUmProdutoDoBanco(produtoID)
    },
    comprarProdutoAprazo () {
      let precoTotal = parseFloat(this.precoProdutoNovo)
      let valorParcela = 0
      let valorFinal = 0
      
      for(let i = this.parcelas ; i > 0; i--) {
        valorParcela += precoTotal * 0.02
      }

      valorFinal = precoTotal + valorParcela

      this.resultado = valorFinal.toFixed(2)
      this.resultadoParcelado = (resultado / this.parcelas)
    },

    comprarProdutoAvista () {
      this.resultado = (this.valorPagamento - this.precoProdutoNovo)
    },
    comprarProdutoAvistaComDesconto () {
      this.resultado = (parseFloat(this.precoProdutoNovo) - (this.precoProdutoNovo * 0.10))
    },

    trazerApenasUmProdutoDoBanco (produtoID) {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.getters.getToken
        }
      }
      this.axios.get(API_Produto + produtoID, config).then((response) => {
        this.descricaoProdutoNovo = response.data.descricao
        this.nomeProdutoNovo = response.data.nome
        this.precoProdutoNovo = response.data.preco
        this.linkImageNovo = response.data.foto
      })
    },
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
