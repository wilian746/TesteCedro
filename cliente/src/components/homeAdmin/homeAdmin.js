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
    transition: 'slide-y-reverse-transition',
    email: '',
    password: '',
    nomeProduto: '',
    descricaoProduto: '',
    precoProduto: 0,
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
    produtos: [],
    valorPagamento: '',
    tipoPagamento: '',
    formaDePagamento:'',
    parcelas:'',
    resultado:''

  }),
  props: ['imageSrc'],
  methods: {

    guardarValoresPagamento (){
      this.proximoRequisito = true

      let valores = {
        valorPagamento : this.valorPagamento,
        tipoPagamento: this.tipoPagamento,
        formaDePagamento: this.formaDePagamento,
        parcelas: parseFloat(this.parcelas)
      }
      console.log(valores + 'proximo',proximoRequisito)
    },

    guardarValoresPagamentoDeNovo (){
      this.proximoRequisitoDeNovo = true
      let valores = {
        valorPagamento : this.valorPagamento,
        tipoPagamento: this.tipoPagamento,
        formaDePagamento: this.formaDePagamento,
        parcelas: parseFloat(this.parcelas)
      }
    },

    comprarProdutoAprazo (){ 
      let valores = {
        valorPagamento : this.valorPagamento,
        tipoPagamento: this.tipoPagamento,
        formaDePagamento: this.formaDePagamento,
        parcelas: parseFloat(this.parcelas)
      }
      this.produtos.preco += this.produtos.preco + (this.produtos.preco * 0.02)
      this.resultado = this.produtos.preco
      this.resultado = this.resultado / this.parcelas
      return this.resultado
    },

    comprarProdutoAvista (){ 
      let valores = {
        valorPagamento : this.valorPagamento,
        tipoPagamento: this.tipoPagamento,
        formaDePagamento: this.formaDePagamento,
        parcelas: parseFloat(this.parcelas)
      }
      this.resultado = (this.valorPagamento - this.produtos.preco)
      return this.resultado
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
        console.log('respostea', response.data)
      })
    },

    getProduto () {
      this.axios.get(API_Produto).then((response) => {
        this.produtos = response.data
        console.log('produtos:',JSON.stringify(this.produtos))
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
      let credentials = JSON.stringify({
        'nome': this.nomeProduto,
        'descricao': this.descricaoProduto,
        'preco': parseFloat(this.precoProduto)
      })

      this.axios.post(API_CadastroProduto, credentials, config).then((response) => {
        console.log(response.data)
        this.$router.push('/')
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
        window.location.reload();
        this.$router.push('/')
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
        this.$router.push('/')
      })
    },

    previewThumbnail: function(event) {
      var input = event.target;

      if (input.files && input.files[0]) {
        var reader = new FileReader();

        var vm = this;

        reader.onload = function(e) {
          vm.imageSrc = e.target.result;
        }

        reader.readAsDataURL(input.files[0]);
      }
    }
  }
}
