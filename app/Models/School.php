<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    use HasFactory;

    Protected function getSchoolDetails(){
    $users = DB::table('mSchool')->select('*')->get();
        return $users;
    }

    Protected function check_school($school_name){

        $users = DB::table('mSchool')->select('School_Name')->where("School_Name",$school_name)->get();

        if(!empty($users[0])){
            return $users[0]->School_Name;

        }else{
            return false;
        }
        
    }

    Protected function add_school($school_name){

        $school_detail = array('School_Name' => $school_name);
        $school =  DB::table('mSchool')->insertGetId($school_detail);

        return $school;
    }

    Protected function get_school($id){

       $get_school = DB::table('mSchool')->select('*')->where("SchoolUID",$id)->first();

       return $get_school;
   }

   Protected function update_school($id,$schoolname){

    $school_detail = array('School_Name' => $schoolname);
    $get_school = DB::table('mSchool')->where("SchoolUID",$id)->update($school_detail);

    return $get_school;
}



}