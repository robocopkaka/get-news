import Vue from 'vue/dist/vue'
import App from './app.vue'
import axios from 'axios'
import TurbolinksAdapter from 'vue-turbolinks';
Vue.use(TurbolinksAdapter)

document.addEventListener('DOMContentLoaded', () => {
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
        user: JSON.parse(current_user),
        index:0
		},
    methods:{
      addSource(source_id){
        this.user_sources.push(source_id)
        // alert(this.index)
        // var source_id = source_id
        // this is not refreshing the DOM. Consider adding to users once they click
        // Vue.set(this.user_sources, this.index++, source_id)
        // this.user_sources.forEach(source => alert(source.name))
      },
      removeSource(source_id){
        var index = this.user_sources.indexOf(source_id)
        this.user_sources.splice(index,1)
      }
    },

		mounted(){
			axios.get('/sources.json').then(response => this.sources = response.data);
		}
	})
})
