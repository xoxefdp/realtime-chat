import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'

Vue.use(VueChatScroll)
Vue.use(Toaster, { timeout: 5000 })

require('./bootstrap')

Vue.component('message', require('./components/message.vue').default)

const app = new Vue({
  el: '#app',
  data: {
    message: '',
    chat: {
      message: [],
      user: [],
      color: [],
      time: []
    },
    typing: '',
    numberOfUsers: 0
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
        this.chat.message.push(this.message)
        this.chat.user.push('you')
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
        this.chat.message.push(e.message)
        this.chat.user.push(e.user)
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

    Echo.join('chat')
      .here(
        (users) => {
          this.numberOfUsers = users.length
        }
      )
      .joining(
        (user) => {
          this.numberOfUsers += 1
          this.$toaster.success(user.name + ' has joined the chat room')
        }
      )
      .leaving(
        (user) => {
          this.numberOfUsers -= 1
          this.$toaster.warning(user.name + ' has leaved the chat room')
        }
      )
  }
})
