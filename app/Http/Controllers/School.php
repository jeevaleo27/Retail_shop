<?php

namespace App\Http\Controllers;

use App\Models\School;

use Illuminate\Http\Request;

class School extends Controller
{
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
