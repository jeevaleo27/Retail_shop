<?php

namespace App\Http\Controllers;


use App\Models\ReadymadeModel;
use App\Models\School;
use App\Models\OrderModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Validator;

class ReadyMadeController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->data['page_number']=5;
        
        $this->data['readymadesizelist']=ReadymadeModel::getReadyMadeSizeDetails();
        return view('readymade.readymade_size_list',$this->data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function add_readymade_size()
    {   
        $this->data['page_number']=5;
        $this->data['SchoolInfo'] = School::getSchoolDetails();
        $this->data['ReadyMadeOrderType'] = DB::table('mReadyMadeOrderType')->select('*')->get();
        return view('readymade.readymade_size_add',$this->data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function readymadesizesave(Request $request)
    {

        $validator = Validator::make($request->all(), [

            "schooluid" => 'required',
            "orderType" => 'required',
            "readymadesize.*" => 'required',
            "readymaderate.*" => 'required'

        ]);
        $user = Auth::user()->id;
        if ($validator->passes()) 
        {
            if(isset($_POST['SchoolUID']) && isset($_POST['ReadyMadeOrderTypeUID'])){
               $SchoolUID=$_POST['SchoolUID'];
               $ReadyMadeOrderTypeUID=$_POST['ReadyMadeOrderTypeUID'];
               $order_prize_data = DB::table('tReadyMadeRate')->where("SchoolUID",$SchoolUID)->where("ReadyMadeOrderTypeUID",$ReadyMadeOrderTypeUID)->delete();
           }
            
            $schooluid=$_POST['schooluid'];
            $orderType=$_POST['orderType'];
            $readymadesize=$_POST['readymadesize'];
            $readymaderate=$_POST['readymaderate'];
            $stitchcount=$_POST['stitchcount'];
            foreach ($readymadesize as $key => $value ) {

                    $readymadesize_array=array(
                        "SchoolUID"  => $schooluid,
                        "ReadyMadeOrderTypeUID"  =>$orderType, 
                        "Size_Material"  => $readymadesize[$key],
                        "Rate" => $readymaderate[$key],
                        "StitchCount" => $stitchcount[$key],
                        "Created_by"  => $user
                    );

                    $readymadesizeuid=ReadymadeModel::save_readymade_size($readymadesize_array);
            }
            return response()->json(['Status'=>0,'success'=>'Rate added Successfully.']);
        }
        return response()->json(['Status'=>1,'error'=>$validator->errors()->all()]);
    }

    public function edit_readymadesize($id,$id2){

        $this->data['page_number']=5;
        $this->data['SchoolUID']=base64_decode($id);
        $this->data['ReadyMadeOrderTypeUID']=base64_decode($id2);
        $this->data['SchoolInfo'] = School::getSchoolDetails();
        $this->data['ReadyMadeOrderType'] = DB::table('mReadyMadeOrderType')->select('*')->get();
        $this->data['readymadesizelist_detail']=ReadymadeModel::getReadyMadeSizeData(base64_decode($id),base64_decode($id2));

        return view('readymade.readymade_size_add',$this->data);
    }

    public function readymade_neworder(){
        $this->data['page_number']=6;
        $this->data['SchoolInfo']=School::getSchoolDetails();
        
        return view('readymade.readymade_orderpage',$this->data);

    } 

    public function fetch_ordertype(){


        $ReadyMadeOrderType = DB::table('tReadyMadeRate')->select('mReadyMadeOrderType.ReadyMadeOrderTypeUID','mReadyMadeOrderType.ReadyMadeOrderType_Name')->leftjoin('mReadyMadeOrderType','mReadyMadeOrderType.ReadyMadeOrderTypeUID','=','tReadyMadeRate.ReadyMadeOrderTypeUID')->where("tReadyMadeRate.SchoolUID",$_POST['schooluid'])->groupBy("ReadyMadeOrderType_Name")->get();
        $html="";
        foreach ($ReadyMadeOrderType as $key => $value) {

            $html.='<option value="'.$value->ReadyMadeOrderTypeUID.'">'.$value->ReadyMadeOrderType_Name.'</option>';
        }


         return response()->json(["html"=>$html]);

    }

    public function readdymade_ordertbale(){
        $html="";

        $ordertype=$_POST['ordertype'];
        $schooluid=$_POST['schooluid'];

        foreach ($ordertype as $key => $value) {

            $ReadyMadeOrderType = DB::table('mReadyMadeOrderType')->select('ReadyMadeOrderType_Name')->where('ReadyMadeOrderTypeUID',$value)->get()->all();

            $ReadyMadeRate =  DB::table('tReadyMadeRate')->select('ReadyMadeRateUID','Size_Material','Rate')->where("tReadyMadeRate.SchoolUID",$schooluid)->where("tReadyMadeRate.ReadyMadeOrderTypeUID",$value)->get()->all();

            $html.='<tr>
            <td>' .($key+1).'</td>
            <td class="Order_type_name" style="width:20%;">'.$ReadyMadeOrderType[0]->ReadyMadeOrderType_Name.'</td>
            <input type="hidden" class="form-control form-control-sm Order_type_UID" name="order_type_id[]" data-deleterow="'.$key.'" value="'.$value.'">
            <input type="hidden" class="form-control form-control-sm "  value="">

            <td><select class="form-select form-select-sm select2_singleselect orderwisw_size" aria-label=".form-select-sm example" style="width:100%;"   name="orderwise_size[]"><option value="">select<option>';

            foreach ($ReadyMadeRate as $key => $value) {
                $html.='<option value="'.$value->ReadyMadeRateUID.'">'.$value->Size_Material.'</option>';
            }

            $html.='</select>


            <td class="input-group" style="width:90%;">
            <span class="input-group-text" id="basic-addon1">&#8377</span> <input type="text" class="form-control form-control-sm Fixed_price" name="Fixed_price[]" value="" readonly>
            </td>

            <td >
            <input type="number" class="form-control form-control-sm order_type_count" min="1" name="order_type_count[]" value="1">
            </td>

            <td >
            &#8377 <span  class="order_type_price">  </span>
            <input type="hidden" class="form-control form-control-sm order_type_price_total" name="order_type_price_total[]" value=""/>
            </td>

            <td class="text-center delete_order_type" id="delete_order_type">
            <svg title="Delete" style="cursor: pointer;" width="16" height="16" viewBox="0 0 16 16" class="bi bi-trash text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
            </svg>
            </td>
            </tr>';
        }

        echo json_encode($html);
    }

    public function get_size_rise(){
        $order_size=$_POST['order_size'];
        $ReadyMadeRate =  DB::table('tReadyMadeRate')->select('Rate')->where("tReadyMadeRate.ReadyMadeRateUID",$order_size)->get()->all();
        echo json_encode($ReadyMadeRate[0]);
    }

    public function savereadymadeorder_details(Request $request){
        $validator = Validator::make($request->all(), [

            "customername" => 'required',
            "phoneno" => 'required',
            "schooluid" => 'required',
            "orderwise_size.*" => 'required',
            'order_type_id.*' => 'required',
            'order_type_count.*' => 'required',
            'Fixed_price.*' => 'required'
        ]);

        $user = Auth::user()->id;
        if ($validator->passes()) 
        {
            $customer_details = array("CustomerName"    =>   $_POST['customername'],
                "PhoneNo"       =>   $_POST['phoneno'],
                "WhatsAppNo"    =>   $_POST['phoneno'],
                "Created_by"    =>   $user);

            $CustomerID=OrderModel::save_customer($customer_details);

            $ReadyMadeOrder_detail = array("CustomerUID" => $CustomerID,
                "SchoolUID"    =>  $_POST['schooluid'],
                "CreatedBy"    =>  $user);

            $readymade_orderID=OrderModel::save_ready_made_order($ReadyMadeOrder_detail);

            $order_type_id        = $_POST['order_type_id'];
            $order_type_count     = $_POST['order_type_count'];
            $Fixed_price          = $_POST['Fixed_price'];
            $orderwise_size       = $_POST['orderwise_size'];

            $total_amount=0;
            foreach ($order_type_id as $key =>$value) {

                $Size_Material =  DB::table('tReadyMadeRate')->select('Size_Material')->where("tReadyMadeRate.ReadyMadeRateUID",$orderwise_size[$key])->get()->all();

                $ReadyMadeOrderType_Name =  DB::table('mReadyMadeOrderType')->select('ReadyMadeOrderType_Name')->where("mReadyMadeOrderType.ReadyMadeOrderTypeUID",$order_type_id[$key])->get()->all();

                $ready_made_order_type_details = array( 
                    "ReadyMadeOrderUID"         => $readymade_orderID,
                    "ReadyMadeOrderType"        => $order_type_id[$key],
                    "ReadyMadeOrder_Qty"        => $order_type_count[$key],
                    "ReadyMadeRateUID"          => $orderwise_size[$key],
                    "ReadyMadePrize"            => $Fixed_price[$key],
                    "Size_Material"             => $Size_Material[0]->Size_Material,
                    "ReadyMadeOrderType_Name"   => $ReadyMadeOrderType_Name[0]->ReadyMadeOrderType_Name,
                    "Created_by"                => $user
                );

                $total_amount=$total_amount+($Fixed_price[$key]*$order_type_count[$key]);

                $ordertypeID=OrderModel::save_ready_made_order_type($ready_made_order_type_details);

                $ReadymdeorderRatedtl =ReadymadeModel::getReadymadeRate($orderwise_size[$key]);

                $ReadyMadeRateUID  = $ReadymdeorderRatedtl[0]->ReadyMadeRateUID;
                $StitchCount  = $ReadymdeorderRatedtl[0]->StitchCount;

                $current_total = array(
                    "StitchCount"  =>  $StitchCount - $order_type_count[$key] );

                $order_prize_data = DB::table('tReadyMadeRate')->where("ReadyMadeRateUID",$ReadyMadeRateUID)->update($current_total);
            }

            $Order_prize = array('Total_amount' => $total_amount);
            $order_prize_data = DB::table('tReadyMadeOrder')->where("ReadyMadeOrderUID",$readymade_orderID)->update($Order_prize);

            echo json_encode(['Status'=>0,"totalamount"=>$total_amount,"ReadyMadeOrderUID "=>$readymade_orderID]);exit; 

        }
        return response()->json(['Status'=>1,'error'=>$validator->errors()->all()]);
    }

    public function readymaadeorder_list(){
       $this->data['page_number']=7;
       $this->data['readymadeorderlist']=ReadymadeModel::getreadymadelist();
       return view('readymade.readymadelist',$this->data); 
    }

    public function get_readymade_dtl(){

       // $this->data['page_number']=7;
        $readymadeorderlist=ReadymadeModel::getreadymadedtl(base64_decode($_POST['orderid']));

        $html="<table  class='table datatable_Userlist subchecklist_table  nowrap' style='width:100%;' >
        <thead>
        <tr>
        <th>Order Type</th>
        <th>Order Size</th>
        <th>Count</th>
        <th>Rate</th>
        </tr>
        </thead>
        ";
        foreach ($readymadeorderlist as $key => $value) {
           $html.="<tr><td>".$value->ReadyMadeOrderType_Name."</td><td>".$value->Size_Material."</td><td>".$value->ReadyMadeOrder_Qty."</td><td>".$value->ReadyMadePrize."</td></tr>";
        }
        $html.="
        </table>";

        return response()->json(['html'=>$html]);
    }

    public function delete_readymade_order(){

        $Order_prize = array('is_delete' => 1);
        $order_prize_data = DB::table('tReadyMadeOrder')->where("ReadyMadeOrderUID", base64_decode($_POST['orderid']))->update($Order_prize);
        echo json_encode(['Status'=>$order_prize_data]);exit; 
    }
}