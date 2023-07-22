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

	table.subchecklist_table thead tr th{

		font-size: .8125rem;
		text-transform: capitalize;
		font-weight: 600;
		white-space: nowrap;
		color: #6c757d;
		padding: .5rem 1rem;
		background-color: #F8F9C0;
		border-color: #f8f9fa!important;


/*		//background-color: #F8F9C0!important;*/
}

</style>

<div class="px-3 px-xxl-3 py-2 py-lg-2 pb-lg-3 border-bottom border-gray-200 after-header bg-custom-light-bg">
	<div class="container-fluid px-0">
		<div class="row align-items-center">
			<div class="col">
				<h1 class="h2 mb-0 lh-sm text-white">
					<svg width="35" height="35" viewBox="0 0 16 16" class="bi bi-person me-1" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
					</svg>
					<span class="head_name">Order List</span>
				</h1>
			</div>
			<input type="hidden" id="usertype" name="usertype" value="#">
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
						<table class="table datatable_Userlist checklist_table readymadelist_table nowrap" id="stitching_list_table" style="width:100%;">
							<thead>
								<tr>
									<th style=" text-align: center;" >Order Number</th>
									<th style=" text-align: center;" >Customer Name</th>
									<th style=" text-align: center;" >Phone Number</th>
									<th style=" text-align: center;" >Order Date</th>
									<th style=" text-align: center;" >Action</th>
								</tr>
							</thead>
							<tbody>

								@foreach($rsorderlist as $item)
								<tr class="show_readymade_dtl" data-OrderUID="{{base64_encode($item->OrderUID)}}">
									<th scope="row" style=" text-align: center;">{{$item->OrderUID}}</th>
									<td style=" text-align: center;" >{{$item->CustomerName}}</td>
									<td style=" text-align: center;" >{{$item->PhoneNo}}</td>
									<td style=" text-align: center;" >{{$item->CreatedDateTime}}</td>
									<td style=" text-align: center;" >
										<a class="dropdown-item delete_order_data" data-orderid="{{base64_encode($item->OrderUID)}}" id="delete_order" style="color:red;">
											<svg width="20" height="20" viewBox="0 0 16 16" class="bi bi-trash"  fill="currentColor" xmlns="http://www.w3.org/2000/svg">
												<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
												<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
											</svg><span class="ms-2">Delete data</span>
										</a>
									</td>
								</tr>
								@endforeach
							</tbody>
						</table>
						<input type="hidden" class="form-control form-control-sm" id="_token" name="_token" title="Enter User Name" data-toggle="tooltip" data-placement="right" value="{{ csrf_token() }}"/>
					</div>
				</div>
			</div>
		</div>


	</div>
</div>



<script>

	var _token = $('#_token').val();
	$(document).ready(function () {
		$('#stitching_list_table').DataTable();
	});

	$('.delete_order_data').click(function(e){

		e.preventDefault();

		var formdata = $(this).attr('data-orderid'); 
		var _token = $('#_token').val(); 
		$.ajax({
			type: "POST",
			url: "{{route('delete_readymade_order')}}",
			data: {orderid:formdata,_token:_token},
			dataType:'json',
			success: function (response) {
				if(response.Status == 1)
				{ 
					swal({
						text: "Order Deleted successfully :)",
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
						},
					}).then(function (confirm) {

						if (confirm == "catch") {
							window.location.reload();
						}

					}, function (dismiss) {});
				}
			}})
	});


	$('.readymadelist_table tbody').on('click', 'tr.show_readymade_dtl', function(){

		var OrderUID = $(this).attr('data-OrderUID');
		var tr = $(this);

		var table = $('.readymadelist_table').DataTable();
		var row = table.row( tr );

		if(row.child.isShown()){
			row.child.hide();
			tr.removeClass('shown');
		} else {

			$.ajax({
				type: "POST",
				url: "{{route('get_rsorder_dtl')}}",
				data: {orderid:OrderUID,_token:_token},
				dataType:'json',
				success: function (response) {


					console.log(response);
					row.child(response.html).show();
					tr.addClass('shown');
				}
			})


		}

	});

</script>

@include('layouts.page_script')
@include('layouts.footer')
