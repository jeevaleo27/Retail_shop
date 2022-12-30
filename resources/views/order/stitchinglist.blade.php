@include('layouts.page_start')
@include('layouts.sidebar')

<style type="text/css">

	.datatable_Userlist_div .dataTables_length{
		display:none;
	}
	.datatable_Userlist_div .dataTables_filter{
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
		border-color: #e9ecef!important;
		color: #495057;
		vertical-align: middle;
	}
	.myloans-custom-action-menu {
		margin-left: -145px !important;
	}
	div.dataTables_wrapper div.dataTables_paginate ul.pagination {
		margin: 8px 0;
	}
	
</style>

<div class="px-3 px-xxl-3 py-2 py-lg-2 pb-lg-3 border-bottom border-gray-200 after-header bg-custom-light-bg">
	<div class="container-fluid px-0">
		<div class="row align-items-center">
			<div class="col">
    				<!-- <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
    					<ol class="breadcrumb bcram mb-2">
    						@Desc Added BreadCrumb Link to the Admin New theme Page @Karthiga V @JULY 21 2021
    						<li class="breadcrumb-item"><a href="">Dashboard</a></li>
    						<li class="breadcrumb-item" aria-current="page">School List</li>
    					</ol>
    				</nav> -->
    				<h1 class="h2 mb-0 lh-sm text-white">
    					<svg width="35" height="35" viewBox="0 0 16 16" class="bi bi-person me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    						<path fill-rule="evenodd" d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
    					</svg>
    					<span class="head_name">Stitching Order List</span></h1>
    				</div>
    				<input type="hidden" id="usertype" name="usertype" value="#">
    				<!-- <div class="col-auto d-flex align-items-center my-2 my-sm-0">
    					<a href="{{route('add_school')}}"
    					type="button" class="btn btn-warning mb-2 me-2 mt-3">
    					<svg width="20" height="20" viewBox="0 0 16 16" class="bi bi-plus me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    						<path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"></path>
    						<path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"></path>
    					</svg>
    					Add School 
    				</a>
    			</div> -->
    		</div>
    	</div>
    </div>

    <div class="p-3 p-xxl-5">
    	<div class="container-fluid px-0">
    		<div class="row">
    			<div class="col-12">
    				<div class="card rounded-12 shadow-dark-80 border border-gray-50 mb-3 mb-xl-5 overflow-hidden">
    					<input type="hidden" class="form-control form-control-sm" id="_token" name="_token" title="Enter User Name" data-toggle="tooltip" data-placement="right" value="{{ csrf_token() }}"/>
    					<div class=" table-responsive card-body p-4 pt-5 p-lg-5 position-relative">
    						<table class="table datatable_Userlist checklist_table nowrap" id="stitching_list_table" style="width:100%;">
    							<thead>
    								<tr>
    									<th style=" text-align: center;" >Order Number</th>
    									<th style=" text-align: center;" >Customer Name</th>
    									<th style=" text-align: center;" >School Name</th>
    									<th style=" text-align: center;" >Class</th>
    									<th style=" text-align: center;" >Status</th>
    									<th style=" text-align: center;" >Order Date</th>
    									<th style=" text-align: center;" >Due Date</th>
    									<th style=" text-align: center;" >Action</th>
    								</tr>
    							</thead>
    							<tbody>

    								@foreach($orderlist as $item)
    								<tr>
    									<th scope="row" style=" text-align: center;">{{$item->OrderUID}}</th>
    									<td style=" text-align: center;" >{{$item->CustomerName}}</td>
    									<td style=" text-align: center;" >{{$item->School_Name}}</td>
    									<td style=" text-align: center;" >{{$item->ClassName}}</td>
    									<td style=" text-align: center;" >
    										<button type="button" style="height: 1.5rem;width: 100px;" class="btn btn-sm {{$item->Color}}">{{$item->Status_Name}}</button>
    									</td>
    									<td style=" text-align: center;" >{{$item->Order_Date}}</td>
    									<td style=" text-align: center;" >{{$item->Due_Date}}</td>
    									
    									<td>
    										<div class="dropdown">
    											<a href="#" class="btn btn-dark-100 btn-icon btn-sm rounded-circle" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    												<svg data-name="Icons/Tabler/Notification" xmlns="http://www.w3.org/2000/svg" width="13.419" height="13.419" viewBox="0 0 13.419 13.419">
    													<rect data-name="Icons/Tabler/Dots background" width="13.419" height="13.419" fill="none"></rect>
    													<path d="M0,10.4a1.342,1.342,0,1,1,1.342,1.342A1.344,1.344,0,0,1,0,10.4Zm1.15,0a.192.192,0,1,0,.192-.192A.192.192,0,0,0,1.15,10.4ZM0,5.871A1.342,1.342,0,1,1,1.342,7.213,1.344,1.344,0,0,1,0,5.871Zm1.15,0a.192.192,0,1,0,.192-.192A.192.192,0,0,0,1.15,5.871ZM0,1.342A1.342,1.342,0,1,1,1.342,2.684,1.344,1.344,0,0,1,0,1.342Zm1.15,0a.192.192,0,1,0,.192-.192A.192.192,0,0,0,1.15,1.342Z" transform="translate(5.368 0.839)" fill="#6c757d"></path>
    												</svg>
    											</a>
    											<div class="dropdown-menu dropdown-new-menu dropdown-menu-end myloans-custom-action-menu">
    												<a href="{{route('view_order_details',base64_encode($item->OrderUID))}}" class="dropdown-item">
    													<svg width="16" height="16" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    														<path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"></path>
    														<path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"></path>
    													</svg><span class="ms-2">View</span>
    												</a>
    												<a href="{{route('edit-school',base64_encode($item->OrderUID))}}" class="dropdown-item" style="color:red;">
    													<svg width="20" height="20" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    														<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
    														<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
    													</svg><span class="ms-2">Delete</span>
    												</a>
    											</div>
    										</div>
    									</td>
    								</tr>
    								@endforeach

    								
    							</tbody>
    						</table>
    					</div>
    				</div>
    			</div>
    		</div>


    	</div>
    </div>



    <script>

    	$(document).ready(function () {
    		$('#stitching_list_table').DataTable();
    	});
    </script>



    @include('layouts.page_script')
    @include('layouts.footer')



