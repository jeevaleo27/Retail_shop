<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class ReadymadeModel extends Model
{
    use HasFactory;

    Protected function save_readymade_size($readymadesize_array){
        $readymadesizeid =  DB::table('tReadyMadeRate')->insertGetId($readymadesize_array);
        return $readymadesizeid;
    }

    Protected function getReadyMadeSizeDetails(){

         $readymade_list = DB::table('tReadyMadeRate')->select('tReadyMadeRate.SchoolUID','tReadyMadeRate.ReadyMadeOrderTypeUID','tReadyMadeRate.ReadyMadeRateUID','mReadyMadeOrderType.ReadyMadeOrderType_Name','mSchool.School_Name')->leftjoin('mReadyMadeOrderType','mReadyMadeOrderType.ReadyMadeOrderTypeUID','=','tReadyMadeRate.ReadyMadeOrderTypeUID')->leftjoin('mSchool','mSchool.SchoolUID','=','tReadyMadeRate.SchoolUID')->where("tReadyMadeRate.is_delete",0)->groupBy('tReadyMadeRate.SchoolUID','tReadyMadeRate.ReadyMadeOrderTypeUID')->get();
    
        return $readymade_list;
    }

    Protected function getReadyMadeSizeData($schooluid,$ReadyMadeOrderTypeUID){

        $readymade_list = DB::table('tReadyMadeRate')->select('tReadyMadeRate.*','mReadyMadeOrderType.ReadyMadeOrderType_Name','mSchool.School_Name')->leftjoin('mReadyMadeOrderType','mReadyMadeOrderType.ReadyMadeOrderTypeUID','=','tReadyMadeRate.ReadyMadeOrderTypeUID')->leftjoin('mSchool','mSchool.SchoolUID','=','tReadyMadeRate.SchoolUID')->where("tReadyMadeRate.is_delete",0)->where("tReadyMadeRate.SchoolUID",$schooluid)->where("tReadyMadeRate.ReadyMadeOrderTypeUID",$ReadyMadeOrderTypeUID)->get();

        return $readymade_list;
    }
}