<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class HomeModel extends Model
{
    use HasFactory;

    Protected function getSchoolDetails(){
    $users = DB::table('mSchool')->select('*')->get();
        return $users;
    }

    Protected function getSclReadyMadeDtl($schooluid){

         $readymadeprice_list = DB::table('tReadyMadeRate')->select('tReadyMadeRate.Size_Material','tReadyMadeRate.ReadyMadeRateUID','tReadyMadeRate.Rate','mReadyMadeOrderType.ReadyMadeOrderType_Name','mReadyMadeOrderType.ReadyMadeOrderTypeUID')->leftjoin('mReadyMadeOrderType','mReadyMadeOrderType.ReadyMadeOrderTypeUID','=','tReadyMadeRate.ReadyMadeOrderTypeUID')->where("tReadyMadeRate.SchoolUID",$schooluid)->get();
        return $readymadeprice_list;
    }
}