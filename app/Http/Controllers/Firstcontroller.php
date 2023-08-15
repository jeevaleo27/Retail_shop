<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;

class Firstcontroller extends Controller
{

  

 public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(){

        if(Auth::user()->usertype == 1){

            return redirect('/product');
        }else{

           return redirect('/dashboard');
        }
    }

    public function index_new(){

        $this->data['page_number']=8;
        return view('home2',$this->data);
    }
}