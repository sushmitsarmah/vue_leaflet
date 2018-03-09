export default {
    name: 'login',
    data () {
        return {
            form: {
                name: '',
                password: ''
            },
            show: true
        }
    },
    methods: {
        onSubmit (evt) {
            evt.preventDefault()

            let redirect = this.$auth.redirect()

            let body = {
                username: this.form.name,
                password: this.form.password
            }

            this.$auth.login({
                body: body, // Vue-resource
                data: body, // Axios
                rememberMe: false,
                redirect: {name: redirect ? redirect.from.name : 'Home'},
                fetchUser: false
            })
                .then(response => {
                    this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
                    this.$localStorage.set('token', response.data.token)
                // this.$router.push({path: '/home'})
                })
                .catch(e => {
                    console.log(e)
                })
        },
        onReset (evt) {
            evt.preventDefault()
            /* Reset our form values */
            this.form.name = ''
            this.form.password = ''
            /* Trick to reset/clear native browser form validation state */
            this.show = false
            this.$nextTick(() => { this.show = true })
        }
    },
    components: {
    }
}
