import Vue from 'vue'
import Router from 'vue-router'

import HomeAdmin from '@/components/homeAdmin/homeAdmin.vue'
import HomeCliente from '@/components/homeCliente/homeCliente.vue'
import CadastroDeUsuario from '@/components/cadastroDeUsuario/cadastroDeUsuario.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homeCliente',
      component: HomeCliente
    },
    {
      path: '/home',
      name: 'homeAdmin',
      component: HomeAdmin
    },
    {
      path: '/cadastroDeUsuario',
      name: 'cadastroDeUsuario',
      component: CadastroDeUsuario
    }
  ]
})
