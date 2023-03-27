<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\School;
use App\Models\HomeModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    protected $ReadyMadeList = [];
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {   
        $this->data['page_number']=1;
        $this->data['SchoolInfo'] = School::getSchoolDetails();
        return view('home',$this->data);
    }

    public function getSchoolPrsDtl(){

        $mReadyMadeOrderType = DB::table('mReadyMadeOrderType')->select('*')->get()->all();

        foreach ($mReadyMadeOrderType as $ReadyMadeOrderkey => $ReadyMadeOrdervalue) {

           $this->ReadyMadeList[$ReadyMadeOrdervalue->ReadyMadeOrderType_Name] = $ReadyMadeOrdervalue->ReadyMadeOrderTypeUID;
        }

        $schooluid  = $_POST['schooluid'];

        $readmadeprzlist = HomeModel::getSclReadyMadeDtl($_POST['schooluid']);


        $shirt = '<div class="col-12 col-xxl-3 mb-4">
        <div class="card rounded-24 shadow-dark-80 border border-gray-50 py-3 px-2 p-md-4">
        <div class="p-2">
        <h5 class="font-weight-semibold title-box">Shirt</h5>
        <table class="table datatable_Userlist checklist_table shirt_table" id="school_table" style="width:100%;">
        <thead>
        <tr> <th>Size</th> <th>Normal</th> <th>Special</th> </tr> </thead><tbody>' ;

        $Chudi = '<div class="col-12 col-xxl-3 mb-4">
        <div class="card rounded-24 shadow-dark-80 border border-gray-50 py-3 px-2 p-md-4">
        <div class="p-2">
        <h5 class="font-weight-semibold title-box">Chudi</h5>
        <table class="table datatable_Userlist checklist_table shirt_table" id="school_table" style="width:100%;">
        <thead>
        <tr> <th>Size</th> <th>Normal</th> </tr> </thead><tbody>' ;

        $Material = '<div class="col-12 col-xxl-3 mb-4">
        <div class="card rounded-24 shadow-dark-80 border border-gray-50 py-3 px-2 p-md-4">
        <div class="p-2">
        <h5 class="font-weight-semibold title-box">Material</h5>
        <table class="table datatable_Userlist checklist_table shirt_table" id="school_table" style="width:100%;">
        <thead>
        <tr> <th>Material</th> <th>Rate</th> </tr> </thead><tbody>' ;


        $Shirt_array        =[];
        $Trowsers_array     =[];
        $Pant_array         =[];
        $Chudi_array        =[];
        $Binoform_array     =[];
        $Cort_array         =[];    
        $Material_array     =[];

        foreach ($readmadeprzlist as $key => $value) {
            /*shirt*/

            if($value->ReadyMadeOrderType_Name == "Shirt"){
                $rate = explode(" ",$value->Size_Material);
                $key = array_search($rate[0], array_column($Shirt_array, 'Size'));

                if ($key != "") {
                    $Shirt_array[$key]['Special'] = $value->Rate;
                }else{
                    $Shirt_array[] = array(
                        "Size"          => $rate[0],
                        "Noraml"        => $value->Rate,
                        "ProductName"   => $value->ReadyMadeOrderType_Name,
                        "Special"       => "---"
                    );
                }
            }

            /*Chusi*/
            if($value->ReadyMadeOrderType_Name == "Chudi"){

                $rate = explode(" ",$value->Size_Material);
                $key = array_search($rate[0], array_column($Chudi_array, 'size'));
                if ($key) {
                    $Chudi_array[$key]['Special'] = $value->Rate;
                }else{
                    $Chudi_array[] = array(
                        "Size"          => $rate[0],
                        "Noraml"        => $value->Rate,
                        "ProductName"   => $value->ReadyMadeOrderType_Name
                    );
                }
            }

            /*Material*/
            if($value->ReadyMadeOrderType_Name == "Material"){

                $rate = explode(" ",$value->Size_Material);
                $key = array_search($rate[0], array_column($Material_array, 'size'));
                if ($key) {
                    $Material_array[$key]['Special'] = $value->Rate;
                }else{
                    $Material_array[] = array(
                        "Size"          => $rate[1],
                        "Noraml"        => $value->Rate,
                        "ProductName"   => $value->ReadyMadeOrderType_Name
                    );
                }
            }
        }

        foreach ($Shirt_array as $Shirtkey => $Shirtvalue) {
            $shirt .='<tr><td><b>'.$Shirtvalue['Size'].'</b></td><td>'.$Shirtvalue['Noraml'].'</td><td>'.$Shirtvalue['Special'].'</td></tr>';
        }

        foreach ($Chudi_array as $Chudikey => $Chudivalue) {
            $Chudi .='<tr><td><b>'.$Chudivalue['Size'].'</b></td><td>'.$Chudivalue['Noraml'].'</td></tr>';
        }

        foreach ($Material_array as $Materialkey => $Materialvalue) {
            $Material .='<tr><td><b>'.$Materialvalue['Size'].'</b></td><td>'.$Materialvalue['Noraml'].'</td></tr>';
        }

        $shirt .=' </tbody></table></div></div></div>';
        $Chudi .=' </tbody></table></div></div></div>';
        $Material .=' </tbody></table></div></div></div>';

        $table =  $shirt.$Chudi.$Material;

        return response()->json(['table'=>$table]);
    }
}