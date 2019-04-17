<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Laravel</title>
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <style>
      .list-group {
        max-height: 200px;
        overflow-y: scroll;
      }
    </style>
  </head>
  <body>
    <div class="d-flex justify-content-center vh100">
      <div id="app" class="d-flex flex-column justify-content-center">
        <div class="vh50">
          <li class="list-group-item active">Chat Room</li>
          <ul class="list-group" v-chat-scroll>
            <message
              v-for="value,index in chat.messages"
              :key=value.index
              :color=chat.color[index]
              :user=chat.users[index]
            >
              @{{ value }}
            </message>
          </ul>
          <input type="text" class="form-control" placeholder="Type your message here..." v-model="message" @keyup.enter="send">
        </div>
        @guest
          <p>guest</p>
        @else
          {{ Auth::user()->name }}
        @endguest
      </div>
    </div>
    <script src="{{ asset('js/app.js') }}"></script>
  </body>
</html>
