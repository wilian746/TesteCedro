<template>
  <v-layout column>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Cedro Tech
           {{this.$store.getters.getToken}}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog persistent max-width="500px">
            <v-btn dark slot="activator">CADASTRAR PRODUTO</v-btn>
            <v-card color="grey lighten-4">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 >
                    <v-form>
                      <v-text-field label="Nome" v-model="nomeProduto" required></v-text-field>
                      <v-text-field label="Descricao" v-model="descricaoProduto" required></v-text-field>
                      <v-text-field label="Preco" v-model="precoProduto" required></v-text-field>
                    </v-form>
                    <v-btn color="primary" @click="cadastrarProduto()">Cadastrar</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-dialog>
        <v-spacer></v-spacer>
        <v-btn @click="sairParaPaginaPrincipal()">
          SAIR
        </v-btn>
      </v-toolbar>
      <v-container fluid grid-list-md class="grey lighten-4">
        <v-layout row wrap>
          <v-flex xs4
            v-bind="{ [`xs${produto.flex}`]: true }"
            v-for="produto in produtos"
            :key="produto._id" 
          >
            <v-card>
              <v-card-media :src="produto.src" height="200px">
                <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span color="black" v-text="produto.nome"></span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
              <v-card-actions class="white">
                <span color="black" v-text="produto.preco"></span>
                <v-spacer></v-spacer>
                <v-speed-dial :direction="direction" >
                        <v-btn open-on-hover offset-x slot="activator" color="blue darken-2" dark fab hover v-model="fab" >
                            <v-icon>account_circle</v-icon>
                        </v-btn>
                        <v-btn fab dark small color="green">
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn fab dark small color="red" @click="deletarProdutoDoBanco()">
                            <v-icon>delete</v-icon>
                        </v-btn>
                </v-speed-dial>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
  </v-layout>
</template>


<script src="./homeAdmin.js"></script>

<style scoped src="./homeAdmin.scss"></style>
