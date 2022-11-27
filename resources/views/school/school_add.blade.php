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
					<li class="breadcrumb-item" aria-current="page">School List</li>
					</ol>
				</nav>
				<h1 class="h2 mb-0 lh-sm text-white">
					<svg width="35" height="35" viewBox="0 0 16 16" class="bi bi-person me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
					</svg>
					<span class="head_name">School</span></h1>
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
                    <a href="#checklist_tab1" class="nav-link active" href="user-profile-general.html" role="tab" data-bs-toggle="pill">School Details</a>
                  </li>
                </ul>
              </div>

              <!-- Tab Content -->
              <form action="#"  name="school_form" id="school_form">
                <div class="tab-content">
                	<div class="tab-pane fade show active" id="checklist_tab1" role="tabpanel" aria-labelledby="pills-one-code-features-example1-tab">

                		<input type="hidden" class="form-control form-control-sm" id="_token" name="_token" title="Enter User Name" data-toggle="tooltip" data-placement="right" value="{{ csrf_token() }}"/>
                		@if(isset($school_details))
                		<input type="hidden" class="form-control form-control-sm" id="schoolid" name="schoolid" data-placement="right" value="@if(isset($school_details)){{$school_details->SchoolUID }}@endif"/>
                		@endif
                		<div class="row g-3">

                      <div class="col-md-3">
                        <label for="schoolname" class="form-label">School Name <span class="mandatory"></span></label>
                        <input type="text" class="form-control form-control-sm  @error('schoolname') is-invalid @enderror" value="@if(isset($school_details)){{$school_details->School_Name}}@endif"  id="schoolname" name="schoolname" title="Enter User Name" data-toggle="tooltip" data-placement="right"/>
                      </div>
                      <!-- <div class="col-md-3">
                        <label for="loginid" class="form-label">Login ID <span class="mandatory"></span></label>
                        <input type="text" class="form-control form-control-sm" id="loginid" name="loginid" title="Enter Login Id" data-toggle="tooltip" data-placement="right"/>
                      </div>
                      <div class="col-md-3">
                        <label for="password" class="form-label">Password <span class="mandatory"></span></label>
                         <div class="show_hide_password_div position-relative">
                            <input type="password" class="form-control form-control-sm password" id="password" name="password" autocomplete="new-password" title="Enter Password" data-toggle="tooltip" data-placement="right"/>
                            <svg style="display:none;" title="Hide Password" width="20" height="20" viewBox="0 0 16 16" class="bi bi-eye text-primary tooltip_new hidepassword_icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 0 0 1.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0 0 14.828 8a13.133 13.133 0 0 0-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 0 0 1.172 8z"></path>
                              <path fill-rule="evenodd" d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
                            </svg>
                            <svg title="Show Password" width="20" height="20" viewBox="0 0 16 16" class="bi bi-eye-slash text-danger tooltip_new showpassword_icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"></path>
                              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"></path>
                              <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709z"></path>
                              <path fill-rule="evenodd" d="M13.646 14.354l-12-12 .708-.708 12 12-.708.708z"></path>
                            </svg>
                          </div>
                      </div>
                      <div class="col-md-3">
                        <label for="emailid" class="form-label">E-mail ID <span class="mandatory"></span></label>
                        <input type="text" class="form-control form-control-sm" id="emailid" name="emailid" title="Enter User's Email Id" data-toggle="tooltip" data-placement="right"/>
                      </div>
                      <div class="col-md-3">
                        <label for="contactno" class="form-label">Contact </label>
                        <input type="text" class="form-control form-control-sm usnumber" id="contactno" name="contactno" data-mask="(000)000-0000" maxlength="13"
                         title="Enter User's Contact Number" data-toggle="tooltip" data-placement="right"/>
                      </div>
                      <div class="col-md-3">
                        <label for="faxno" class="form-label">Fax No </label>
                        <input type="text" class="form-control form-control-sm" id="faxno" name="faxno" data-mask="(000)000-0000" maxlength="13" title="Enter User's Fax Number" data-toggle="tooltip" data-placement="right"/>
                      </div> -->

                       
                      
                      

                       
                      </div>
                      <div class="row g-3 ">
                        <div class="col-md-4">
                          <div class="media border-bottom border-top border-gray-200 mt-3 py-2 py-md-3">
                            <div class="media-body my-2 w-100">
                              <div class="row align-items-center">
                                <div class="col">
                                  <span class="fs-16">Active / In-active</span>
                                  <span class="d-block small text-gray-600 mt-1">Set your User Active / In-active </span>
                                </div>
                                <div class="col-auto">
                                  <div class="form-check form-switch mb-0">
                                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked="checked">
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-8 text-end mt-4 pt-5" style="float:right">
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

  	      $(document).off('click','.addschool').on('click','.addschool', function(e) {
        var formdata = $('#school_form').serialize(); 
       
          button = $(this);
          button_val = $(this).val();
          button_text = $(this).html();
          $.ajax({
            type: "POST",
            url: "{{route('schoolsave')}}",
            data: formdata,
            dataType:'json',
            beforeSend: function () {
              button.prop("disabled", true);
            },

            success: function (response) {
              if(response.Status == 0)
              { 
                swal({
                  text: response.success,
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
                    },
                    /*catch: {
                      text: "Add New User",
                      value: "catch",
                      className: "btn-sm",
                    },
                    defeat:{
                      text: "Go and Edit ",
                      className: "btn-sm",
                    },*/
                  },
                }).then(function (confirm) {

                  if (confirm == "catch") {
                    window.location.href = '{{route('add_school')}}';
                  }

                }, function (dismiss) {});
              }
              else
              {  

              	if(response.Status == 1){

                  $Message=response.error;
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
              button.html(button_text);
              button.val(button_val);
              button.prop('disabled',false);
            }
          });
        
      });


  </script>


@include('layouts.page_script')
@include('layouts.footer')



