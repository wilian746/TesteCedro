const API = "http://localhost:9000/api/v1/";
const API_Produto = API + "produto/";
const API_Login = API + "auth/login";

export default {
    name: 'home',
    drawer: true,
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
        email: null,
        password: null,
        produtos: []
    }),
    methods: {
        getProduto() {
            this.axios.get(API_Produto).then((response) => {
                this.produtos = response.data;
            })
        },
        login() {
            let credentials = { email: this.email, password: this.password }
            this.axios.post(API_Login, credentials).then((response) => {
                console.log(response.data);
            })
        }
    },
    created() {
        this.methods.getProduto()
    }
    
}