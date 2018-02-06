<template>
    <div id="app" style="height: 95%;width:95%">
        <v-map :zoom="zoom" :center="center">
            <v-tilelayer :url="url" :attribution="attribution"></v-tilelayer>
            <v-marker :lat-lng="marker"></v-marker>
        </v-map>
    </div>
</template>

<script>
  import Vue2Leaflet from 'vue2-leaflet'
  import L from 'leaflet'
  
  export default {
    name: 'lmap',
    data () {
      return {
        zoom: 16,
        center: [30.2792953, 120.1198430],
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        marker: L.latLng(30.2792953, 120.1198430)
      }
    },
    components: {
      'v-map': Vue2Leaflet.Map,
      'v-tilelayer': Vue2Leaflet.TileLayer,
      'v-marker': Vue2Leaflet.Marker
    }
  }
</script>