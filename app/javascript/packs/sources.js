import Vue from 'vue/dist/vue'
import App from './app.vue'
import axios from 'axios'
import TurbolinksAdapter from 'vue-turbolinks';
Vue.use(TurbolinksAdapter)

document.addEventListener('turbolinks:load', () => {
  let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
  axios.defaults.headers.common['X-CSRF-Token'] = token
  axios.defaults.headers.common['Accept'] = 'application/json'
  var element = document.getElementById('user-info');
  var user_id = element.dataset.id
  var user_sources = element.dataset.sources
  var current_user = element.dataset.user
	new Vue({
		el: '#sources',
		data:{
        user_sources:[],
  			sources:[],
        current_user_sources: JSON.parse(current_user).sources,
        index:0
		},
    methods:{
      addSource(source){
        this.current_user_sources.push(source)
      },
      removeSource(source){
        var index = this.current_user_sources.indexOf(source)
        this.current_user_sources.splice(index,1)
      },
      confirmSources(){
        var id = ''
        var user_sources = this.current_user_sources.map(source => {
          return source.id
        })
        var sources = JSON.stringify(this.user_sources)
        axios.post('/confirm_sources', JSON.stringify(user_sources)).then(response => console.log(response))
      },
    },

		mounted(){
			axios.get('/sources.json').then(response => this.sources = response.data);
		},
    computed:{
      return_sources_count(){
        return this.user_sources.length
      }
    }
	})
})
