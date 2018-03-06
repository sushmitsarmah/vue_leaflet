<template>
  <div class="row">
    <div class="col-md-4 offset-md-4">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group label="UserName:"
                        label-for="name"
                        description="Enter your username.">
            <b-form-input type="text"
                          v-model="form.name"
                          required
                          placeholder="Enter UserName">
            </b-form-input>
          </b-form-group>
          <b-form-group label="Password:"
                        label-for="password">
            <b-form-input id="exampleInput2"
                          type="password"
                          v-model="form.password"
                          required
                          placeholder="Enter Password">
            </b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
    </div>

    <window></window>

  </div>
</template>

<script>
  import Window from '@/directives/Window'

/*      this.axios.post('login', {
        name: this.form.name,
        password: this.form.password
      })*/   

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
        console.log('#########')
        console.log(this.form.name)

        let redirect = this.$auth.redirect()

        let body = {
          username: this.form.name,
          password: this.form.password
        }

        this.$auth.login({
          body: body, // Vue-resource
          data: body, // Axios
          rememberMe: false,
          redirect: {name: redirect ? redirect.from.name : 'Hello'},
          fetchUser: false
        })
          .then(response => {
            console.log(response.data)
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
      'window': Window
    }
  }
</script>