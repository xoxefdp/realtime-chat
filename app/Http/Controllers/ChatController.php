<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\ChatEvent;

class ChatController extends Controller
{
    public function __construct() {

    }

    public function chat() {
        return view('chat');
    }

    public function name() {
        return $request->all();
    }

    // public function send(Request $request) {
    //     $user = User::find(Auth::id());
    //     event(new ChatEvent($request->message, $user));
    // }

    public function send(Request $request) {
        $user = User::find(Auth::id());
        event(new ChatEvent($request->message, $user));
    }
}
