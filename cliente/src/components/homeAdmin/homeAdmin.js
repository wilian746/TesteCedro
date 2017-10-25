const API = 'http://localhost:9000/api/v1/'
const API_Produto = API + 'produto/'
const API_Login = API + 'auth/login'
const API_CadastroProduto = API_Produto + 'registroDeProduto/'

export default {
  name: 'home',
  data: () => ({
    transition: 'slide-y-reverse-transition',
    email: '',
    password: '',
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
    descricaoProdutoSelecionado: '',
    resultadoParcelado: 0
  }),
  props: ['imageSrc'],
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
      })
    },

    getProduto () {
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
      let novoProduto = JSON.stringify({
        'nome': this.nomeProduto,
        'descricao': this.descricaoProduto,
        'preco': parseFloat(this.precoProduto),
        'foto': this.linkImage
      })

      this.axios.post(API_CadastroProduto, novoProduto, config).then((response) => {
        this.getProduto()
      }).catch(function (error) {
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
        this.getProduto()
      })
    },

    updateProdutoDoBanco () {
      let config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.getters.getToken
        }
      }
      let produtoAtualizado = JSON.stringify({
        'nome': this.nomeProdutoNovo,
        'descricao': this.descricaoProdutoNovo,
        'preco': parseFloat(this.precoProdutoNovo),
        'foto': this.linkImageNovo
      })
      this.axios.put(API_Produto + this.produtoSelecionadoID, produtoAtualizado, config).then((response) => {
        this.getProduto()
      })
    },

    previewThumbnail (event) {
      var input = event.target

      if (input.files && input.files[0]) {
        var reader = new FileReader()
        var vm = this

        reader.onload = function (e) {
          vm.imageSrc = e.target.result
        }

        reader.readAsDataURL(input.files[0])
      }
    }
  },
  mounted () {
    this.getProduto()
  }
}
