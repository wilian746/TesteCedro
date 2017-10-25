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
                <span color="black" v-text="'R$'+produto.preco"></span>
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
                            <p>{{nomeProdutoNovo}}</p>
                            <p>{{descricaoProdutoNovo}}</p>
                            <p>{{precoProdutoNovo}}</p>
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
                            <p> O valor para você pagar é de R$ {{precoProdutoNovo}}</p>
                            <v-text-field label="Valor" placeholder="0.00" v-model="valorPagamento" required></v-text-field>
                            <v-text-field label="Tipo de Pagamento" placeholder="cartão ou dinheiro" v-model="tipoPagamento" required></v-text-field>
                            <div v-if="tipoPagamento !== 'cartão' && tipoPagamento !== 'dinheiro'">
                              <v-alert color="info" icon="info" dismissible v-model="alertCompra">
                                <p>Você deve inserir cartão ou dinheiro</p>
                              </v-alert>
                               <v-btn block color="grey lighten-1" block disabled>Próximo</v-btn>
                            </div>
                            <div v-if="tipoPagamento === 'cartão' || tipoPagamento === 'dinheiro'">
                               <v-btn block color="light-blue darken-1" block @click="guardarValoresPagamento()">Próximo</v-btn>
                            </div>
                            <div v-if="proximoRequisito === true && tipoPagamento === 'cartão'">
                              <v-text-field label="Forma de Pagamento" placeholder="avista ou aprazo" v-model="formaDePagamento" required></v-text-field>
                                <div v-if="formaDePagamento !== 'avista' && formaDePagamento !== 'aprazo'">
                                <v-alert color="info" icon="info" dismissible v-model="alertCompraDnv">
                                  <p>Você deve inserir avista ou aprazo</p>
                                </v-alert>
                                <v-btn block color="grey lighten-1" block disabled>Próximo</v-btn>
                                </div>
                                <div v-if="formaDePagamento === 'avista' || formaDePagamento === 'aprazo'">
                                  <v-btn block color="light-blue darken-1" block @click="guardarValoresPagamentoDeNovo()">Próximo</v-btn>
                                </div>
                                <div v-if="proximoRequisitoDeNovo === true && formaDePagamento === 'aprazo'">
                                  <v-text-field label="Quantidade de parcelas" v-model="parcelas" required></v-text-field>
                                  <div v-if="parcelas === ''">
                                    <v-alert color="info" icon="info" dismissible v-model="alertCompraDnv">
                                      <p>Você deve inserir o numero de parcelas</p>
                                    </v-alert>
                                    <v-btn block color="grey lighten-1" block disabled>Comprar</v-btn>
                                  </div>
                                  <div v-if="parcelas !== ''">
                                    <v-btn block color="light-blue darken-1" @click="comprarProdutoAprazo()">Comprar</v-btn>
                                    <p>O valor a pagar é: {{resultado}}</p>
                                    <p>O valor de suas parcelas fixas é de: {{resultadoParcelado}}</p>
                                  </div>
                                </div>
                            </div>
                            <br><br><br><br>
                            <div v-if="proximoRequisitoDeNovo === true && formaDePagamento === 'avista'">
                              <v-spacer></v-spacer>
                              <v-btn block color="light-blue darken-1" @click="comprarProdutoAvista()">Comprar</v-btn>
                              <p>O valor do seu produto é: {{precoProdutoNovo}}</p>
                              <p>Seu troco é: {{resultado}}</p>
                            </div>
                            <div v-if="proximoRequisito === true && tipoPagamento === 'dinheiro'">
                              <v-btn block color="light-blue darken-1" @click="comprarProdutoAvistaComDesconto()">Comprar</v-btn>
                              <p>O valor do seu produto é: {{precoProdutoNovo}}</p>
                              <p>Seu produto irá custar: {{resultado}}</p>
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
