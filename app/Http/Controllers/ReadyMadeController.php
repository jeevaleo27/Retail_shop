<?php

namespace App\Http\Controllers;


use App\Models\ReadymadeModel;
use App\Models\School;
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
            foreach ($readymadesize as $key => $value ) {

                    $readymadesize_array=array(
                        "SchoolUID"  => $schooluid,
                        "ReadyMadeOrderTypeUID"  =>$orderType, 
                        "Size_Material"  => $readymadesize[$key],
                        "Rate" => $readymaderate[$key],
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
}