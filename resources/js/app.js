import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'

Vue.use(VueChatScroll)

require('./bootstrap')

Vue.component('message', require('./components/message.vue').default)

const app = new Vue({
  el: '#app',
  data: {
    message: '',
    chat: {
      messages: [],
      users: [],
      color: [],
      time: []
    },
    typing: ''
  },
  watch: {
    message() {
      Echo.private('chat')
        .whisper('typing', {
          whispering: this.message
        })
    }
  },
  methods: {
    send() {
      if (this.message.length !== 0) {
        this.chat.messages.push(this.message)
        this.chat.users.push('you')
        this.chat.color.push('success')
        this.chat.time.push(this.getTime())

        axios.post('/send', {
          message: this.message
        })
          .then(response => {
            console.log(response)
            this.message = ''
          })
          .catch(failed => {
            console.log(failed)
          })
      }
    },
    getTime() {
      let time = new Date()
      return time.getHours() + ':' + time.getMinutes()
    }
  },
  mounted() {
    Echo.private('chat')
      .listen('ChatEvent', (e) => {
        console.log(e)
        this.chat.messages.push(e.message)
        this.chat.users.push(e.user)
        this.chat.color.push('warning')
        this.chat.time.push(e.time)
      })
      .listenForWhisper('typing', (e) => {
        if (e.whispering !== '') {
          this.typing = 'typing...'
        } else {
          this.typing = ''
        }
      })
  }
})
