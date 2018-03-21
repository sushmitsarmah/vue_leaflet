import Vue2Leaflet from 'vue2-leaflet'
import L from 'leaflet'

export default {
    name: 'lmap',
    props: {
        'mapOptions': {
            'type': Object,
            default: () => {
                var myIcon = L.icon({
                    iconUrl: 'static/img/marker-icon-2x.png',
                    shadowUrl: 'static/img/marker-shadow.png'
                })

                console.log(myIcon)

                return {
                    zoom: 16,
                    center: [38.848611, -76.924167],
                    url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                    marker: [38.848611, -76.924167],
                    icon: myIcon
                }
            }
        }
    },
    data () {
        return {
            options: this.mapOptions
        }
    },
    components: {
        'v-map': Vue2Leaflet.Map,
        'v-tilelayer': Vue2Leaflet.TileLayer,
        'v-marker': Vue2Leaflet.Marker
    }
}
