import Window from '@/directives/Window'
import Lmap from '@/directives/lmap/LMap.vue'

export default {
    name: 'home',
    data () {
        return {
            msg: 'Leaflet'
        }
    },
    methods: {
        onClick (evt) {
        // HTTP.defaults.headers.common['Authorization'] = 'Bearer ' + this.$localStorage.get('access_token')
            this.axios.get(`api`)
                .then(response => {
                    console.log(response.data)
                })
                .catch(e => {
                    console.log(e)
                })
        }
    },
    components: {
        'window': Window,
        'lmap': Lmap
    }
}
