<template>
  <v-layout column>
      <v-toolbar color="primary" dark>
        <v-toolbar-title class="cedroTech">Cedro Tech</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog persistent max-width="500px" v-model="cardCadastroDeProduto">
            <v-btn dark color="white" slot="activator">CADASTRAR PRODUTO</v-btn>
            <v-card color="grey lighten-4">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn fab dark small color="red" top right @click.native="cardCadastroDeProduto = false">
                        <v-icon>close</v-icon>
                      </v-btn>
                    </v-card-actions>
                    <v-form>
                      <v-text-field label="Nome" v-model="nomeProduto" required></v-text-field>
                        <div v-if="nomeProduto === ''">
                          <v-alert color="info" icon="info" dismissible v-model="alertNomeProduto">
                            <p>Você deve inserir o nome do produto</p>
                          </v-alert>
                        </div>
                      <v-text-field label="Descricao" v-model="descricaoProduto" required></v-text-field>
                        <div v-if="descricaoProduto === ''">
                          <v-alert color="info" icon="info" dismissible v-model="alertDescricaoProduto">
                            <p>Você deve inserir a descrição do produto</p>
                          </v-alert>
                        </div>
                      <v-text-field label="Preco" v-model="precoProduto" required></v-text-field>
                        <div v-if="precoProduto === 0">
                          <v-alert color="info" icon="info" dismissible v-model="alertPrecoProduto">
                            <p>Você deve inserir o preço do produto</p>
                          </v-alert>
                        </div>
                      <v-text-field label="Link da imagem" v-model="linkImage" required></v-text-field>
                        <div v-if="linkImage === ''">
                          <v-alert color="info" icon="info" dismissible v-model="alertPrecoProduto">
                            <p>Você deve inserir uma Image</p>
                          </v-alert>
                        </div>
                    </v-form>
                    <v-btn color="primary" @click="cadastrarProduto()">Cadastrar</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-dialog>
        <v-spacer></v-spacer>
        <v-btn color="white" @click="sairParaPaginaPrincipal() ">
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
              <v-card-media :src="produto.foto" height="200px">
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
                <v-dialog persistent max-width="500px" v-model="dialog">
                  <v-btn fab dark small color="green" slot="activator" @click="getProdutoID(produto._id)">
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
                            <v-text-field label="Descricao" v-model="descricaoProdutoNovo" required>{{descricaoProdutoSelecionado}}</v-text-field>
                            <v-text-field label="Preco" v-model="precoProdutoNovo" required>{{produto.preco}}</v-text-field>
                            <v-text-field label="Link da imagem" v-model="linkImageNovo" required></v-text-field>
                          </v-form>
                          <v-btn block color="light-blue darken-1" block @click="updateProdutoDoBanco()">Atualizar</v-btn>
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
