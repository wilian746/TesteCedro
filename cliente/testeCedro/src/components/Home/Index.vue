<template>
<v-app>
    <v-form>
    <v-text-field
      label="email"
      v-model="email"
      required
    ></v-text-field>
    <v-text-field
      label="password"
      v-model="password"
      required
    ></v-text-field>
    </v-form>
    <v-btn color="primary" @click="login()">Login</v-btn>
    <v-btn color="primary" @click="getProduto()">Produto</v-btn>
    <v-list>
          <template v-for="(produto,index) in produtos">
            <v-list-tile v-bind:key="produto._id">
              {{produto.nome}}
            </v-list-tile>
          </template>
    </v-list>
</v-app>
</template>

<script src="./home.js"></script>

<style scoped src="./home.scss"></style>
