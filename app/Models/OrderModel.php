<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class OrderModel extends Model
{
    use HasFactory;

    Protected function getOrderID(){
    $users = DB::table('mOrder')->select('*')->get();
        return $users;
    }

    Protected function save_customer($customer_details){

        $Customer =  DB::table('tCustomer')->insertGetId($customer_details);
        return $Customer;
    }

    Protected function save_order($Order_detail){
        $orderUID =  DB::table('mOrder')->insertGetId($Order_detail);
        return $orderUID;
    }

    Protected function save_order_type($order_type_details){

        $orderUID =  DB::table('mOrderDetails')->insertGetId($order_type_details);
        return $orderUID;
    }


    Protected function getstitchlist(){

        $stitching_list = DB::table('mOrder')->select('mOrder.*','mStatus.Status_Name','mStatus.Color','mClass.ClassName','mSchool.School_Name','tCustomer.CustomerName','tCustomer.PhoneNo')->leftjoin('mStatus','mStatus.StatusUID','=','mOrder.Status')->leftjoin('mClass','mClass.ClassUID','=','mOrder.ClassUID')->leftjoin('mSchool','mSchool.SchoolUID','=','mOrder.SchoolUID')->leftjoin('tCustomer','tCustomer.CustomerUID','=','mOrder.CustomerUID')->where("mOrder.is_delete",0)->get();
        return $stitching_list;
    }

    Protected function getstitchdetail($id){

        $stitching_order = DB::table('mOrder')->select('mOrder.*','mStatus.Status_Name','mStatus.Color','mClass.ClassName','mSchool.School_Name','tCustomer.CustomerName','tCustomer.PhoneNo')->leftjoin('mStatus','mStatus.StatusUID','=','mOrder.Status')->leftjoin('mClass','mClass.ClassUID','=','mOrder.ClassUID')->leftjoin('mSchool','mSchool.SchoolUID','=','mOrder.SchoolUID')->leftjoin('tCustomer','tCustomer.CustomerUID','=','mOrder.CustomerUID')->where("mOrder.is_delete",0)->where("mOrder.OrderUID",$id)->first();
        return $stitching_order;
    }

    Protected function getstitch_ordertypedetail($id){

        $stitching_ordertype= DB::table('mOrderDetails')->select('mOrderDetails.*')->where("mOrderDetails.OrderUID",$id)->get();
        return $stitching_ordertype;
    }
    Protected function get_status(){
        $orderUID_status= DB::table('mStatus')->select('mStatus.*')->where("mStatus.Action",0)->get();
        return $orderUID_status;
    }

    Protected function update_order_status($orderUID,$order_stautsUID){

    $order_status = array('Status' => $order_stautsUID);
    $Saved_status = DB::table('mOrder')->where("OrderUID",$orderUID)->update($order_status);

    return $Saved_status;
}

}