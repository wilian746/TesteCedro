<template>
  <v-layout column>
      <v-toolbar color="primary" dark>
        <v-toolbar-title class="cedroTech">Cedro Tech</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
          <v-dialog persistent max-width="500px" v-model="cardLogin">
            <v-btn dark slot="activator" color="white">ENTRAR</v-btn>
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
                      <div v-if="mensagemParaFecharCard === true">
                        <v-alert color="info" icon="info" dismissible v-model="alertFecharLogin">
                          <p>{{mensagemParaFecharCard}}</p>
                        </v-alert>
                      </div>
                    </v-form>
                    <v-btn block color="primary" @click="fazerLogin()">Login</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-dialog>
          <v-dialog persistent max-width="500px" v-model="cardCadastrar">
            <v-btn dark slot="activator" color="white">Cadastrar</v-btn>
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
                      <v-radio-group v-model="autorizacao" row>
                        <v-radio label="Administrador" value="admin"></v-radio>
                        <v-radio label="Usuário" value="user"></v-radio>
                      </v-radio-group>
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
            <p>Usuário não está logado. Faça login para visualizar detalhes e realizar compras!</p>
          </v-alert>
        </div>
        <div v-if="this.$store.getters.getToken !== undefined">
          <v-alert color="info" icon="info" dismissible v-model="alert">
            <p>Seja muito Bem Vindo {{nomeDoUsuarioLogado}}!</p>
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
                      <b><h5><span v-text="produto.nome" class="nomeProduto"></span></h5></b>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-media>
              <v-card-actions class="white">
                <span color="black" v-text="'R$'+produto.preco"></span>
                <v-spacer></v-spacer>
                <v-dialog persistent max-width="500px" v-model="cardInfo">
                  <v-btn fab dark small color="grey darken-1" slot="activator" @click="getProdutoID(produto._id)">
                    <v-icon>info</v-icon>
                  </v-btn>
                  <v-card color="grey lighten-4">
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 >
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn fab dark small color="red" top right @click.native="cardInfo = false">
                              <v-icon>close</v-icon>
                            </v-btn>
                          </v-card-actions>
                          <v-form>
                            <p><b>Nome:</b> {{nomeProdutoNovo}}</p>
                            <p><b>Descrição:</b> {{descricaoProdutoNovo}}</p>
                            <p><b>Preço:</b> R$ {{precoProdutoNovo}}</p>
                            <v-card-media :src="linkImageNovo" height="300px">
                              <v-container fill-height fluid>
                                <v-layout fill-height>
                                  <v-flex xs12 align-end flexbox>
                                  </v-flex>
                                </v-layout>
                              </v-container>
                            </v-card-media>
                          </v-form>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-dialog>
                  <v-dialog persistent max-width="500px" v-model="cardDialog">
                    <v-btn fab dark small color="light-blue darken-1" slot="activator" @click="getProdutoID(produto._id)">
                      <v-icon>gavel</v-icon>
                    </v-btn>
                    <v-card color="grey lighten-4">
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 >
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn fab dark small color="red" top right @click.native="cardDialog = false">
                                  <v-icon>close</v-icon>
                                </v-btn>
                              </v-card-actions>
                            <v-form>
                              <p><b>O valor para você pagar é de R$ {{precoProdutoNovo}}</b></p>
                              <v-radio-group v-model="tipoPagamento" row>
                                <v-radio label="Cartão" value="cartao" @click.native="proximoRequisito = true"></v-radio>
                                <v-radio label="Dinheiro" value="dinheiro" @click.native="proximoRequisito = true, proximoRequisitoDeNovo = false"></v-radio>
                              </v-radio-group>
                              <div v-if="proximoRequisito === true && tipoPagamento === 'cartao'">
                                  <v-radio-group v-model="formaDePagamento" row>
                                    <v-radio label="A vista" value="avista" @click.native="proximoRequisitoDeNovo = true"></v-radio>
                                    <v-radio label="A prazo" value="aprazo" @click.native="proximoRequisitoDeNovo = true"></v-radio>
                                  </v-radio-group>
                              </div>
                              <div v-if="proximoRequisitoDeNovo === true && formaDePagamento === 'aprazo'">
                                  <v-text-field label="Quantidade de parcelas" v-model="parcelas" required></v-text-field>
                                  <div v-if="parcelas === ''">
                                    <v-alert color="info" icon="info" dismissible v-model="alertCompraDnv">
                                      <p>Você deve inserir o numero de parcelas</p>
                                    </v-alert>
                                    <v-btn block color="grey lighten-1" block disabled>Comprar</v-btn>
                                  </div>
                                  <div v-if="parcelas > 0">
                                    <v-btn block color="light-blue darken-1" @click="comprarProdutoAprazo()">Comprar</v-btn>
                                  </div>
                                  <div v-if="mensagemParaMostrarResultado === 'mostra'">
                                    <p>O valor a pagar é: R$ {{resultado}}</p>
                                    <p>O valor de suas parcelas fixas é de: R$ {{resultadoParcelado}}</p>
                                  </div>
                              </div>
                              <br><br><br><br>
                              <div v-if="proximoRequisitoDeNovo === true && formaDePagamento === 'avista'">
                                <v-btn block color="light-blue darken-1" @click="comprarProdutoAvista()">Comprar</v-btn>
                                <br>
                                <div v-if="mensagemParaMostrarResultado === 'mostra'">
                                    <p>O valor do seu produto irá custar: R$ {{precoProdutoNovo}}</p>
                                </div>
                              </div>
                              <div v-if="proximoRequisito === true && tipoPagamento === 'dinheiro'">
                                <v-btn block color="light-blue darken-1" @click="comprarProdutoAvistaComDesconto()">Comprar</v-btn>
                                <div v-if="mensagemParaMostrarResultado === 'mostra'">
                                  <p>O valor do seu produto é: R$ {{precoProdutoNovo}}</p>
                                  <p>Seu produto irá custar com DESCONTO: R$ {{resultado}}</p>
                                </div>
                              </div>
                            </v-form>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-card>
                  </v-dialog>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
  </v-layout>
</template>


<script src="./homeCliente.js"></script>

<style scoped src="./homeCliente.scss"></style>
