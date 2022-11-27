<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\School;

class Firstcontroller extends Controller
{

   protected $School;

 public function __construct()
    {
        $this->middleware('auth');
         $School = new School();
    }

   public function index(){
    
        $SchoolInfo=$this->School->getSchoolDetails();
echo '<pre>';print_r($SchoolInfo);exit;
        $this->data['school'] = Category::all();
        return view('category.index',$this->data);
    }

}


