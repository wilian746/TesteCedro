const API = "http://localhost:9000/api/v1/";
const API_Produto = API + "produto/";
const API_Login = API + "auth/login";
const API_CadastroProduto = API_Produto + "registroDeProduto/";

export default {
    name: 'home',
    drawer: true,
    mounted:function(){
        this.getProduto()
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
        direction: "left",
        right: true,
        bottom: true,
        transition: 'slide-y-reverse-transition',
        nomeProduto: null,
        descricaoProduto: null,
        precoProduto: null,
        produtos: []
    }),
    methods: {
        getProduto() {
            this.axios.get(API_Produto).then((response) => {
                this.produtos = response.data;
            })
        },
        sairParaPaginaPrincipal(){
            this.$router.push('/')
        },
        cadastrarProduto() {
            let config = JSON.stringify({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization':  this.$store.getters.getToken
                }
            })
            let credentials =  JSON.stringify({ 
                'nomeProduto': this.nomeProduto, 
                'descricaoProduto': this.descricaoProduto, 
                'precoProduto': parseFloat(this.precoProduto) 
            })
            console.log('\nheader',JSON.stringify(config) + '\ncredentials',JSON.stringify(credentials))

            this.axios.post(API_CadastroProduto, credentials, config).then((response) => {
                console.log(response.data);
            })
        },
        deletarProdutoDoBanco(){
            this.axios.delete(API_Produto).then((response) => {
                this.produtos = response.data._id;
            })
        },
    },
    created(){

    }
    
}