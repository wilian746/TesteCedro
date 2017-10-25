<template>
  <v-layout column>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Cedro Tech</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
          <v-dialog persistent max-width="500px" v-model="cardLogin">
            <v-btn dark slot="activator">ENTRAR</v-btn>
            <v-card color="grey lighten-4">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn fab dark small color="red" top right @click.native="cardLogin = false">
                        <v-icon>close</v-icon>
                      </v-btn>
                    </v-card-actions>
                    <v-form>
                      <v-text-field label="email" v-model="email" required></v-text-field>
                      <v-text-field label="senha"  type="password" v-model="password" required></v-text-field>
                    </v-form>
                    <v-btn block color="primary" @click="fazerLogin()">Login</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-dialog>
          <v-dialog persistent max-width="500px" v-model="cardCadastrar">
            <v-btn dark slot="activator">Cadastrar</v-btn>
            <v-card color="grey lighten-4">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn fab dark small color="red" top right @click.native="cardCadastrar = false">
                        <v-icon>close</v-icon>
                      </v-btn>
                    </v-card-actions>
                    <v-form>
                      <v-text-field label="Nome" v-model="nome" required></v-text-field>
                      <v-text-field label="E-mail" v-model="email" required></v-text-field>
                      <v-text-field label="Senha"  type="password" v-model="senha" required></v-text-field>
                      <v-text-field label="Tipo de Usuario" placeholder="digite (' user ' ou ' admin ') "v-model="autorizacao" required></v-text-field>
                    </v-form>
                    <v-btn color="primary" @click="fazerCadastroDeUsuario()">Cadastrar</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-dialog>
      </v-toolbar>
      <v-container fluid grid-list-md class="grey lighten-4">
        <div v-if="this.$store.getters.getToken === undefined">
          <v-alert color="info" icon="info" dismissible v-model="alert">
            <p>Usuário não está logado. Faça login e tenha muitas vantagens!</p>
          </v-alert>
        </div>
        <v-layout row wrap>
          <v-flex xs4
            v-bind="{ [`xs${produto.flex}`]: true }"
            v-for="produto in produtos"
            :key="produto._id">
            <v-card >
              <v-card-media :src="produto.foto" height="200px">
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
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
  </v-layout>
</template>


<script src="./homeCliente.js"></script>

<style scoped src="./homeCliente.scss"></style>
