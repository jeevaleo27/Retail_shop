@include('layouts.page_start')
@include('layouts.sidebar')
<style type="text/css">

  .datatable_checklist_div .dataTables_length{
    display:none;
  }
  .datatable_checklist_div .dataTables_filter{
    display:none;
  }
  table.checklist_table thead tr th{
    font-size: .8125rem;
    text-transform: capitalize;
    font-weight: 600;
    white-space: nowrap;
    color: #6c757d;
    padding: .5rem 1rem;
    background-color: #f8f9fa;
    border-color: #f8f9fa!important;
  }
  table.checklist_table tbody tr td{
    font-size: .8125rem;
    font-weight: 400;
    padding: .2rem 1rem;
    text-transform: lowercase;
    border-color: #e9ecef!important;
    color: #495057;
    vertical-align: middle;
  }
  .showpassword_icon, .hidepassword_icon{
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 4px;
  }

  /*To Hide the Unwanted DropDowns For Role Name @Author Karthiga V @ JULY 15 2021*/
  .hideshoww{
    display: none;
  }
  /*Ends*/
</style>

<div class="px-3 px-xxl-3 py-2 py-lg-2 pb-lg-3 border-bottom border-gray-200 after-header bg-custom-light-bg">
	<div class="container-fluid px-0">
		<div class="row align-items-center">
			<div class="col">
       <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
         <ol class="breadcrumb bcram mb-2">
           <li class="breadcrumb-item"><a href="">Dashboard</a></li>
           <li class="breadcrumb-item" aria-current="page">Ready Made List</li>
         </ol>
       </nav>
       <h1 class="h2 mb-0 lh-sm text-white">
         <svg width="35" height="35" viewBox="0 0 16 16" class="bi bi-person me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
        </svg>
        <span class="head_name">Ready Made Size Add</span></h1>
      </div>
      <input type="hidden" id="usertype" name="usertype" value="#">
    </div>
  </div>
</div>

<div class="p-3 p-xxl-5">
  <div class="container-fluid px-0">
    <div class="row">
      <div class="col-12">
        <div class="card rounded-12 shadow-dark-80 border border-gray-50 mb-2 mb-xl-4 p-2 py-2">
          <div class="card-body p-0 p-md-2">
            <div class="">
              <div class="mb-1 mb-md-3 mb-xl-1 pb-3">
                <ul class="nav nav-tabs nav-tabs-md nav-tabs-line position-relative zIndex-0 admin_menu_style" role="tablist" style="border-width: .15rem;">
                  <li class="nav-item">
                    <a href="#checklist_tab1" class="nav-link active" href="user-profile-general.html" role="tab" data-bs-toggle="pill">Ready Made Size Details</a>
                  </li>
                </ul>
              </div>

              <!-- Tab Content -->
              <form action="#"  name="school_form" id="school_form">
                <div class="tab-content">
                	<div class="tab-pane fade show active" id="checklist_tab1" role="tabpanel" aria-labelledby="pills-one-code-features-example1-tab">

                    <input type="hidden" class="form-control form-control-sm" id="_token" name="_token" title="Enter User Name" data-toggle="tooltip" data-placement="right" value="{{ csrf_token() }}"/>

                    @if(isset($readymadesizelist_detail))
                    <input type="hidden" class="form-control form-control-sm" id="SchoolUID" name="SchoolUID" value="<?php echo $SchoolUID  ?>"/>
                    <input type="hidden" class="form-control form-control-sm" id="ReadyMadeOrderTypeUID" name="ReadyMadeOrderTypeUID" value="<?php echo $ReadyMadeOrderTypeUID  ?>"/>
                    @endif
                    <div class="row g-3">
                      <div class="col-md-3">
                        <label for="roleuid" class="form-label">School Name <span class="mandatory"></span></label>
                        <select class="form-select form-select-sm select2_singleselect"  id="schooluid" name="schooluid">
                          @if(!isset($readymadesizelist_detail))
                          <option value="">Select School</option>
                          <?php foreach ($SchoolInfo as $schoolkey => $schoolvalue) { ?>
                            <option value="<?php echo $schoolvalue->SchoolUID; ?>"><?php echo $schoolvalue->School_Name; ?></option>
                          <?php } ?>
                          @endif

                          @if(isset($readymadesizelist_detail))
                          <?php foreach ($SchoolInfo as $schoolkey => $schoolvalue) { ?>
                            @if(isset($SchoolUID) && $SchoolUID==$schoolvalue->SchoolUID)
                            <option value="<?php echo $schoolvalue->SchoolUID; ?>" selected><?php echo $schoolvalue->School_Name;?></option>
                            @endif
                          <?php } ?>  
                          @endif  


                        </select>
                      </div>
                      <div class="col-md-3">
                        <label for="" class="form-label">Order Type<span class="mandatory"></span></label>
                        <select class="form-select form-select-sm select2_singleselect" aria-label=".form-select-sm example" style="width:100%;" id="orderType"  name="orderType">
                          @if(!isset($readymadesizelist_detail))
                          <option value="">Select Order Type</option>
                          <?php foreach ($ReadyMadeOrderType as $readymadekey => $readymadevalue) { ?>
                            <option value="<?php echo $readymadevalue->ReadyMadeOrderTypeUID; ?>"><?php echo $readymadevalue->ReadyMadeOrderType_Name; ?></option>
                          <?php } ?> 
                          @endif

                          @if(isset($readymadesizelist_detail))
                          <?php foreach ($ReadyMadeOrderType as $readymadekey => $readymadevalue) { ?>
                           @if(isset($ReadyMadeOrderTypeUID) && $ReadyMadeOrderTypeUID==$readymadevalue->ReadyMadeOrderTypeUID)
                           <option value="<?php echo $readymadevalue->ReadyMadeOrderTypeUID; ?>"selected><?php echo $readymadevalue->ReadyMadeOrderType_Name; ?></option>
                           @endif
                         <?php } ?> 
                         @endif
                       </select>
                     </div>
                     <div class="tab-pane fade show" id="dynamic_mapping_tab" role="tabpanel" aria-labelledby="pills-one-code-features-example1-tab">
                       <div class="row g-3 ">
                        <div class="col-md-6">
                          <h5 class="card-header-title mb-0 font-weight-semibold">Size Fields</h5>
                        </div>

                        <div class="col-md-6 text-end">
                          <a type="button" class="btn btn-warning add_new_field_btn">
                            <svg width="20" height="20" viewBox="0 0 16 16" class="bi bi-plus me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"></path>
                              <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"></path>
                            </svg>
                            Add Fields
                          </a>
                        </div>

                        <form method="post" id="dynamicForm">

                         <div class="col-md-12 dynamic_append_row_div" id="dynamic_append_row_div">
                          @if(isset($readymadesizelist_detail))
                          <?php $sequence=0;?>
                          @foreach($readymadesizelist_detail as $readymadedatakey => $readymadedatavalue)
                          <?php $sequence++;?>

                          <div class="row g-3 m-0 mb-3 pb-3 mt-0 border-blue-100 px-2 dynamic_append_row_child_div" style="    border: 1px dashed;">

                            <div class="col-md-12 m-0">
                              <input type="hidden" class="sequence" id="sequence<?php echo $sequence ?>" name="sequence<?php echo $sequence ?>"/>
                            </div>
                            <div class="col-md-3">
                              <label for="" class="form-label">Size<span class="mandatory"></span></label>
                              <input id="Label<?php echo $sequence ?>"type="text" class="form-control form-control-sm" name="readymadesize[]" value="<?php echo $readymadedatavalue->Size_Material  ?>" required>
                            </div>

                            <div class="col-md-3">
                              <label for="" class="form-label">Rate<span class="mandatory"></span></label>
                              <input id="toolTip<?php echo $sequence ?>" name="readymaderate[]" type="text" class="form-control form-control-sm" value="<?php echo $readymadedatavalue->Rate ?>" required>
                            </div>

                            <div class="col-md-3 pt-4">
                              <svg width="18" height="18" viewBox="0 0 16 16" class="bi bi-trash dynamic_section_remove text-danger tooltip_new" fill="currentColor" xmlns="http://www.w3.org/2000/svg" title="Delete Field">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
                              </svg>
                            </div>

                          </div>
                          
                          @endforeach
                          @endif
                          @if(isset($readymadesizelist_detail))
                          <input type="hidden" id="countFields" name="countFields" value="<?php echo $sequence;?>" />
                          @else
                          <input type="hidden" id="countFields" name="countFields"/>
                          @endif
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="row g-3 ">
                  <div class="col-md-12 text-end mt-4 pt-5" style="float:right">
                    <a href="" class="btn btn-md btn-outline-dark me-1">
                      <svg width="20" height="20" viewBox="0 0 16 16" class="bi bi-x me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"></path>
                        <path fill-rule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"></path>
                      </svg>
                    Cancel</a>
                    <a  class="btn btn-md btn-primary addschool" name="addschool" style="border: 1px solid #0d6efd;">
                      <svg width="20" height="20" viewBox="0 0 16 16" class="bi bi-check me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"></path>
                      </svg>
                    Save</a>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <!-- End Tab Content -->

        </div>
      </div>
    </div>
  </div>
</div>
</div>
</div>

<script>

  $(document).ready(function(){
    $('.select2_singleselect').select2({});
    loadmultipleselect();
  });

  function loadmultipleselect() {
    $(".mdb-fselect:not(.singlemdbfselect)").each(function () {
      var placeholder = $(this).attr('placeholder');
      $(this).fSelect({
        placeholder: placeholder,
        numDisplayed: 1,
        overflowText: '{n} selected',
        showSearch: true
      });
    });
  }

  $(document).off("click",".add_new_field_btn").on("click",".add_new_field_btn", function() {
    var sequence = $("#countFields").val();
    sequence = Number(sequence)+Number(1);
    $("#countFields").val(sequence);
    $(".dynamic_append_row_div").append(`

      <div class="row g-3 m-0 mb-3 pb-3 mt-0 border-blue-100 px-2 dynamic_append_row_child_div" style="    border: 1px dashed;">

      <div class="col-md-12 m-0">
      <input type="hidden" class="sequence" id="sequence`+sequence+`" name="sequence`+sequence+`"/>
      </div>
      <div class="col-md-3">
      <label for="" class="form-label">Size<span class="mandatory"></span></label>
      <input id="Label`+sequence+`"type="text" class="form-control form-control-sm" name="readymadesize[]" required>
      </div>

      <div class="col-md-3">
      <label for="" class="form-label">Rate<span class="mandatory"></span></label>
      <input id="toolTip`+sequence+`" name="readymaderate[]" type="text" class="form-control form-control-sm">
      </div>

      <div class="col-md-3 pt-4">
      <svg width="18" height="18" viewBox="0 0 16 16" class="bi bi-trash dynamic_section_remove text-danger tooltip_new" fill="currentColor" xmlns="http://www.w3.org/2000/svg" title="Delete Field">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
      </svg>
      </div>

      </div>`);
    tooltip_new();
    $('.select2_single_select').select2({});

  });

  $(document).off("click",".dynamic_section_remove").on("click",".dynamic_section_remove", function() {
    $(this).closest(".dynamic_append_row_child_div").remove();
    var Payload_CountFields = $("#Payload_CountFields").val();
    $("#Payload_CountFields").val(Number(Payload_CountFields)-Number(1));
    $('.payload_dynamic_input_select').trigger('change');
  });

  $(document).off('click','.addschool').on('click','.addschool', function(e) {
    var formdata = $('#school_form').serialize(); 
    $.ajax({
      type: "POST",
      url: "{{route('readymade_size_save')}}",
      data: formdata,
      dataType:'json',
            /*beforeSend: function () {
              button.prop("disabled", true);
            },*/

      success: function (response) {
        if(response.Status == 0)
        { 

          swal({
            text: "Order Placed Successfully :)",
            icon: "success",
            showCancelButton: true, 
            buttonsStyling: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
            position: 'top-end',
            buttons: {
              cancel: {
                text: "Close",
                value: "catch",
                visible: true,
                className: "btn-sm",
                closeModal: true,
              }
            },
          }).then(function (confirm) {

            if (confirm == "catch") {
              window.location.href = '{{route('readymadesizelist')}}';
            }

          }, function (dismiss) {});
        }
        else
        {  

          if(response.Status == 1){

            $Message="Please Fill Required Fields :(";
          }else{
            $Message=response.error[0];

          }
          swal({
            text: $Message,
            icon: "warning",
            showCancelButton: true, 
            buttonsStyling: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            showLoaderOnConfirm: true,
            position: 'top-end',
            buttons: {
              cancel: {
                text: "Close",
                value: false,
                visible: true,
                className: "btn-sm",
                closeModal: true,
              },
            },
          });
        }
      }
    });
  });

</script>

@include('layouts.page_script')
@include('layouts.footer')