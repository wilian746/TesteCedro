<template>
  <v-layout column>
      <v-toolbar color="indigo" dark>
        <v-menu style="width: 150px" right>
          <v-btn icon slot="activator" dark>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list >
            <v-list-tile v-for="item in items" :key="item.title">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <v-toolbar-title>Cedro Tech</v-toolbar-title>
        <v-btn @click="getProduto()" icon>
          <v-icon>search</v-icon>
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
                        <v-btn fab dark small color="red">
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


<script src="./home.js"></script>

<style scoped src="./home.scss"></style>
