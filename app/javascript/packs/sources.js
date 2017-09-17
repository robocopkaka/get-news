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
        // this.current_user_sources.push(source.shortcode)
        this.user_sources.push(source)
      },
      removeSource(source){
        var index = user_sources.indexOf(source)
        // this.current_user_sources.splice(index,1)
        this.user_sources.splice(index,1)
      },
      //only show sources if the user doesn't have them saved and  if he hasn't selected them
      checkSourceExists(source){
        if (this.current_user_sources.indexOf(source.shortcode) === -1 && this.user_sources.indexOf(source) === -1){
          return true;
        }
      },
      confirmSources(){
        var id = ''
        var user_sources = this.user_sources.map(source => {
         return source.shortcode;
        });
        var current_user_sources = user_sources.forEach(source => this.current_user_sources.push(source))
        axios.post('/confirm_sources', {sources: JSON.stringify(user_sources)}).then(response => {
          alert("you just added " + this.user_sources.map(source => source.name).toString())
          this.user_sources = []
        })
      },
    },

		mounted(){
			axios.get('/sources.json').then(response => this.sources = response.data);
		},
    updated(){
    },
    computed:{
      return_sources_count(){
        return this.user_sources.length
      }
    }
	})
})
