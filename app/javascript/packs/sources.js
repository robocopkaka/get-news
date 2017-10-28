import Vue from 'vue/dist/vue'
import App from './app.vue'
import axios from 'axios'
import TurbolinksAdapter from 'vue-turbolinks';
import localforage from 'localforage'
Vue.use(TurbolinksAdapter)

document.addEventListener('turbolinks:load', () => {
  let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
  axios.defaults.headers.common['X-CSRF-Token'] = token
  axios.defaults.headers.common['Accept'] = 'application/json'
  var element = document.getElementById('user-info');
  if(element !== null){
    var user_id = element.dataset.id
    var fetched_user_sources = element.dataset.sources
    var current_user = element.dataset.user
    var logged_in = true
  }
  else{
    var fetched_user_sources = []
    var logged_in = false
  }

  // Vue.component("logged-in-user", {
  //   template:'#logged-in-user',
  //   props: ['sources'],
  //   data(){
  //     return{
  //       mutableSources: [],
  //     }
  //   },
  //   methods:{
  //     addSource(source){
  //       // this.current_user_sources.push(source.shortcode)
  //       this.user_sources.push(source)
  //     },
  //     removeSource(source){
  //       var index = user_sources.indexOf(source)
  //       // this.current_user_sources.splice(index,1)
  //       this.user_sources.splice(index,1)
  //     },
  //     //only show sources if the user doesn't have them saved and  if he hasn't selected them
  //     checkSourceExists(source){
  //       if (this.current_user_sources.indexOf(source.shortcode) === -1 && this.user_sources.indexOf(source) === -1){
  //         return true;
  //       }
  //     },
  //     confirmSources(){
  //       var id = ''
  //       var user_sources = this.user_sources.map(source => {
  //        return source.shortcode;
  //       });
  //       var current_user_sources = user_sources.forEach(source => this.current_user_sources.push(source))
  //       axios.post('/confirm_sources', {sources: JSON.stringify(user_sources)}).then(response => {
  //         alert("you just added " + this.user_sources.map(source => source.name).toString())
  //         this.user_sources = []
  //       })
  //     },
  //   },
  //   computed:{
  //     return_sources_count(){
  //       return this.user_sources.length
  //     }
  //   }
  // })
  //
  // Vue.component("non-logged-in-user", {
  //   template: '#non-logged-in-user',
  //   props:['sources', 'return_sources_count'],
  //   data(){
  //     return{
  //       mutableSources: [],
  //       non_logged_user_sources: [],
  //     }
  //   },
  //   mounted(){
  //     this.mutableSources = this.sources
  //   }
  // })

  Vue.component('login-modal',{
    template: '#login',
    props:{
      show:{
        type: Boolean,
        required: true,
        twoWay: true,
      }
    }
  })
	new Vue({
		el: '#sources',
		data:{
      // currentView: 'non-logged-in-user',
        user_sources:[],
  			sources:[],
        current_user_sources: fetched_user_sources,
        index:0,
        current_user: current_user,
        logged_in: logged_in,
        showModal: false,
		},
    methods:{
      addSource(source){
        // this.current_user_sources.push(source.shortcode)
        this.user_sources.push(source)
      },
      removeSource(source){
        var index = this.user_sources.indexOf(source)
        this.user_sources.splice(index, 1)
      },
      //only show sources if the user doesn't have them saved and  if he hasn't selected them
      checkSourceExists(source){
        if (this.current_user_sources.indexOf(source.shortcode) === -1 && this.user_sources.indexOf(source) === -1){
          return true;
        }
      },
      confirmSources(){
        if(this.logged_in == true){
          var id = ''
          var user_sources = this.user_sources.map(source => {
            return source.shortcode;
          });
          axios.post('/confirm_sources', {sources: JSON.stringify(user_sources)}).then(response => {
            alert("you just added " + this.user_sources.map(source => source.name).toString())
            this.user_sources = []
          })
        }
        else{
          alert("You need to log in first")
          this.login();
          var user_sources = this.user_sources.map(source => {
            return source.shortcode;
          });
          axios.post('/confirm_sources', {sources: JSON.stringify(user_sources)}).then(response => {
            alert("you just added " + this.user_sources.map(source => source.name).toString())
            this.user_sources = []
          })
        }
      },
      login(){
        axios.post('/users').then(response => {
          this.current_user_sources = response.data.sources
        })

      }
    },
    computed:{
      return_sources_count(){
        return this.user_sources.length
      }
    },
    mounted(){
			axios.get('/sources.json').then(response => this.sources = response.data);
		},
	})
})
