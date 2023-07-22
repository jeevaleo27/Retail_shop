<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    Protected function getproduct(){
        $product = DB::table('mProduct')->select('*')->get();
        return $product;
    }

    Protected function check_product_code($productcode){

        $product_code = DB::table('mProduct')->select('Product_Code')->where("Product_Code",$productcode)->get();

        if(!empty($product_code[0])){
            return $product_code[0]->Product_Code;

        }else{
            return false;
        }
        
    }

    Protected function add_product($productname,$productcode,$user){

        $product_detail = array('ProducrName' => $productname,'Product_Code' => $productcode,'Created_By' => $user);
        $inserted_product_dtl =  DB::table('mProduct')->insertGetId($product_detail);

        return $inserted_product_dtl;
    }

    Protected function update_product($id,$productname,$productcode,$user){

        $product_detail = array('ProducrName' => $productname,'Product_Code' => $productcode,'Created_By' => $user);
        $updated_product_dtl = DB::table('mProduct')->where("ProductUID",$id)->update($product_detail);

        return $updated_product_dtl;
    }

    Protected function get_product($id){

        $get_product = DB::table('mProduct')->select('*')->where("ProductUID",$id)->first();

        return $get_product;
    }

    Protected function get_productprisedtl($id){
        $get_product = DB::table('mProductDetails')->select('*')->where("ProductUID",$id)->first();

        return $get_product;
    }

    Protected function check_product_code_exist($productcode,$ProductUID){

        $product_code = DB::table('mProduct')->select('Product_Code')->where("Product_Code",$productcode)->whereNotIn("ProductUID",[$ProductUID])->get();
        if(!empty($product_code[0])){
            return $product_code[0]->Product_Code;

        }else{
            return false;
        }
    }

    Protected function saveproductdetail($productDtlAry){

        $inserted_productDtl =  DB::table('mProductDetails')->insertGetId($productDtlAry);
        return $inserted_productDtl;
    }


    Protected function update_product_detail($id,$updateproductDtlAry){

        $updated_product_dtl = DB::table('mProductDetails')->where("ProductUID",$id)->update($updateproductDtlAry);
        return $updated_product_dtl;
    }

    Protected function savestockdetail($productDtlAry){

        $inserted_stockDtl =  DB::table('tStockEntryRs')->insertGetId($productDtlAry);
        return $inserted_stockDtl;
    }

    Protected function getstockdtl(){
        $stockdtl = DB::table('tStockEntryRs')->select('*','users.name')->leftjoin("users","users.id" ,"=","tStockEntryRs.Created_by")->get();
        return $stockdtl;
    }
}