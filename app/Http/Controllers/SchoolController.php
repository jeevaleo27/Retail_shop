<?php

namespace App\Http\Controllers;

use App\Models\School;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;
//use App\Models;

class SchoolController extends Controller
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
        $this->data['page_number']=2;
        $this->data['SchoolInfo']=School::getSchoolDetails();
        return view('school.schoollist',$this->data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function add_school()
    {   
        $this->data['page_number']=2;
        return view('school.school_add',$this->data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function schoolsave(Request $request)
    {
/*echo '<pre>';print_r($request->schoolid);exit;*/
        $validator = Validator::make($request->all(), [
            'schoolname' => 'required',

        ]);

        if ($validator->passes()) {

            $schoolname=$_POST['schoolname'];
            $school_detail=School::check_school($schoolname);

            if(!empty($school_detail)){
                return response()->json(['Status'=>1,'error'=>'School Already Available.']);
            }else{

                if(!empty($request->schoolid)){
                    $schoolid=$_POST['schoolid'];

                    $school_detail=School::update_school($schoolid,$schoolname);
                }else{

                    $school_detail=School::add_school($schoolname);
                }

            return response()->json(['Status'=>0,'success'=>'Added New School.']);
            }

        }
        return response()->json(['error'=>$validator->errors()->all()]);
    }


    public function validation(array $request)
    {

        $request->validate([
            'schoolname' => 'required|string',
        ]);
    }

    public function edit_school($id)
    {
        $this->data['page_number']=2;
        $this->data['school_details']=School::get_school(base64_decode($id));

        return view('school.school_add',$this->data);
    }
}
