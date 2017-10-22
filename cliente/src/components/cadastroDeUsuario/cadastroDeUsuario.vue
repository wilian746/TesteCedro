<template>
  <v-layout column>
      <v-toolbar color="primary" dark>
        <v-btn color="light-blue darken-1" dark @click="voltarParaHomeCliente()">
            <v-icon dark left>arrow_back</v-icon>Back
        </v-btn>
        <v-toolbar-title>Cedro Tech</v-toolbar-title>
      </v-toolbar>
      <v-container fluid grid-list-md class="grey lighten-4">
        <v-layout row wrap>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs1s2 >
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
        </v-layout>
      </v-container>
  </v-layout>
</template>

<script src="./cadastroDeUsuario.js"></script>

<style scoped src="./cadastroDeUsuario.scss"></style>
