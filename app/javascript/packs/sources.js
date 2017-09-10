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
		data(){
      return{
  			sources:[],
        user: JSON.parse(current_user),
        new_sources:[],
      }
		},
    methods:{
      addSource(source_id){
        // var source_id = source_id
        this.new_sources.push(1)
      }
    },

		mounted(){
			axios.get('/sources.json').then(response => this.sources = response.data);
		}
	})
})
