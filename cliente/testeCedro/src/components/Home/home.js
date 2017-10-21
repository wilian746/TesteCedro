const API = "http://localhost:9000/api/v1/";
const API_Produto = API + "produto/";
const API_Login = API + "auth/login";

export default {
    name: 'Home',
    data: () => ({
        email:null,
        password:null,
        produtos:[]
    }),
    methods:{
        getProduto(){
            this.axios.get(API_Produto).then((response) => {
                this.produtos = response.data;
              })
        },
        login(){
            let credentials = {email: this.email, password: this.password}
            this.axios.post(API_Login, credentials).then((response) => {
                console.log(response.data);
              })
        }
    },
    created(){
      
    }
}