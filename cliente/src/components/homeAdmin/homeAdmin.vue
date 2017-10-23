<template>
  <v-layout column>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Cedro Tech</v-toolbar-title>
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
                      <div class="Image-input">
                        <div class="Image-input__image-wrapper">
                          <i v-show="! imageSrc" class="icon fa fa-picture-o"></i>
                          <img v-show="imageSrc" class="Image-input__image" :src="imageSrc">
                        </div>

                        <div class="Image-input__input-wrapper">
                          Selecione uma Foto
                          <input @change="previewThumbnail" class="Image-input__input" name="thumbnail" type="file">
                        </div>
                      </div>
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
         <image-input image-src=""></image-input>
        <div v-if="this.$store.getters.getToken === undefined">
          <v-alert color="info" icon="info" dismissible v-model="alert">
            <p>Usuário não está logado. Faça login e tenha muitas vantagens!</p>
            <v-dialog persistent max-width="500px">
              <v-btn dark color="info"slot="activator">ENTRAR</v-btn>
              <v-card color="grey lighten-4">
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 >
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
          </v-alert>
        </div>
        <v-layout row wrap>
          <v-flex xs4
            v-bind="{ [`xs${produto.flex}`]: true }"
            v-for="produto in produtos"
            :key="produto._id">
            <v-card>
              <v-card-media :src="produto.src" height="200px">
                <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span color="black" v-text="produto.nome" @click="trazerApenasUmProdutoDoBanco(produto._id)"></span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
              <v-card-actions class="white">
                <span color="black" v-text="produto.preco"></span>
                <v-spacer></v-spacer>
                <v-dialog persistent max-width="500px" v-model="dialog">
                  <v-btn fab dark small color="green" slot="activator">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <v-card color="grey lighten-4">
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 >
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn fab dark small color="red" top right @click.native="dialog = false">
                                <v-icon>close</v-icon>
                              </v-btn>
                            </v-card-actions>
                          <v-form>
                            <v-text-field label="Nome" v-model="nomeProdutoNovo" required>{{produto.nome}}</v-text-field>
                            <v-text-field label="Descricao" v-model="descricaoProdutoNovo" required>{{produto.descricao}}</v-text-field>
                            <v-text-field label="Preco" v-model="precoProdutoNovo" required>{{produto.preco}}</v-text-field>
                          </v-form>
                          <v-btn block color="primary" block @click="updateProdutoDoBanco(produto._id)">Atualizar</v-btn>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-dialog>
                <v-btn fab dark small color="red" @click="deletarProdutoDoBanco(produto._id)">
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
  </v-layout>
</template>


<script src="./homeAdmin.js"></script>

<style scoped src="./homeAdmin.scss"></style>
