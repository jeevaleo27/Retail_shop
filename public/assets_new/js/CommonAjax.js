function _asyncToGenerator(fn) {
	return function () {
		var gen = fn.apply(this, arguments);
		return new Promise(function (resolve, reject) {
			function step(key, arg) {
				try {
					var info = gen[key](arg);
					var value = info.value;
				} catch (error) {
					reject(error);
					return;
				}
				if (info.done) {
					resolve(value);
				} else {
					return Promise.resolve(value).then(function (value) {
						step("next", value);
					}, function (err) {
						step("throw", err);
					});
				}
			}
			return step("next");
		});
	};
}
var OrderEntryBtnID ='';
var btnclearexception_value = '';
var $button = $(this);
$(function () {

	$(document).off('click', '.cancel_old').on('click', '.cancel_old', function (e) {

		var OrderUID = $('#OrderUID').val();
		swal({
			title: 'Are you sure?',
			text: 'Do you want to discard the order!',
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, do it!',
			cancelButtonText: 'No, keep it',
			confirmButtonClass: "btn btn-success",
			cancelButtonClass: "btn btn-danger",
			buttonsStyling: false
		}).then(function (confirm) {

			$.ajax({
				type: "POST",
				url: base_url + "CommonController/UpdateNullStatus",
				data: {
					"OrderUID": OrderUID
				},
				dataType: 'json',
				beforeSend: function () {
					// addcardspinner('#Orderentrycard');
				},

				success: function (response) {
					// console.table(response);
					if (response.validation_error == 0) {
						swal({
							title: "",
							text: response.message,
							icon: "success",
							closeOnClickOutside: false,
						    allowOutsideClick: false,
							showCancelButton: false,
						}).then(function(confirm) {
							if (check_is_url_contains_string_value(window.location.href)) {
								window.location.href = base_url + response['URL'];
							} else {
								triggerpage(base_url + response['URL']);
							}
						});
						/*$.notify({
							icon: "icon-bell-check",
							message: response.message
						}, {
							type: "success",
							delay: 1000
						});

						if (check_is_url_contains_string_value(window.location.href)) {
							window.location.href = base_url + response['URL'];
						} else {
							triggerpage(base_url + response['URL']);
						}*/
					} else {
						swal({
							title: "",
							text: response.message,
							icon: "error",
							closeOnClickOutside: false,
						    allowOutsideClick: false,
							showCancelButton: false,
						}).catch(swal.noop);
						/*$.notify({
							icon: "icon-bell-check",
							message: response.message
						}, {
							type: "danger",
							delay: 1000
						});*/
					}
				}
			});
		}, function (dismiss) {});
	});

	$(document).off('change', '#Customer').on('change', '#Customer', function (e) {
		var CustomerUID = $(this).val();
		var id = $(this).attr('id');

		console.log(AjaxGetCustomerProjects);
		AjaxGetCustomerProjects(CustomerUID).then(function (response) {
			console.table(response);
			// var ProjectCustomer = response.ProjectCustomer;

			// Project_select = ProjectCustomer.reduce((accumulator, value) => {
			// 	return accumulator + '<Option value="' + value.ProjectUID + '">' + value.ProjectName + '</Option>';
			// }, '');

			var Products = response.Products;

			Product_select = Products.reduce((accumulator, value) => {
				return accumulator + '<Option value="' + value.ProductUID + '">' + value.ProductName + '</Option>';
			}, '');
			if (id == 'Customer') {

				// $('.ProjectUID').html(Project_select);
				// $('.ProjectUID').val($('.ProjectUID').find('option:first').val()).trigger('change');
				$('#Single-ProductUID').html(Product_select);
				if(response.Customer != null){
					var DefaultProductUID = response.Customer.DefaultProductUID;
					$('#Single-ProductUID').val($('#Single-ProductUID').find('option[value='+DefaultProductUID+']').val()).trigger('change');
				}else{
					$('#Single-ProductUID').val($('#Single-ProductUID').find('option:first').val()).trigger('change');
				}
			} else if (id == 'bulk_Customers') {
				$('#bulk_ProjectUID').html(Project_select);
				$('#bulk_ProjectUID').val($('#bulk_ProjectUID').find('option:first').val()).trigger('change');
			}

			// removecardspinner('#Orderentrycard');
			// callselect2();
		}).catch(jqXHR => {
			console.log(jqXHR);
		});
	});

	$(document).off('change', '#bulk_Customers').on('change', '#bulk_Customers', function (e) {
		var CustomerUID = $(this).val();
		var id = $(this).attr('id');
		$('#bulk_ProductUID').empty();
		$('#bulk_ProjectUID').empty();
		$('#bulk_LenderUID').empty();
		$('.changeentryfilename').attr('disabled',true).addClass('disabled');
		$('.changeentryxmlfilename').attr('disabled',true).addClass('disabled');
		AjaxGetCustomerProducts(CustomerUID).then(function (response) {
			console.table(response);

			var CustomerProducts = response.CustomerProducts;

			var DefaultProductUID = response.DefaultProductUID;

			Product_select = CustomerProducts.reduce((accumulator, value) => {
				return accumulator + '<Option value="' + value.ProductUID + '" data-type="' + value.BulkImportFormat + '" data-typename="' + value.BulkImportTemplateName + '"  data-typexmlname="' + value.BulkImportTemplateXMLName + '">' + value.ProductName + '</Option>';
			}, '');

			$('#bulk_products').html(Product_select);
			
			if(CustomerProducts.length > 0){
				if (DefaultProductUID) {
					$('#bulk_products').val($('#bulk_products').find('option[value='+DefaultProductUID+']').val()).trigger('change');
				} else {
					$('#bulk_products').val($('#bulk_products').find('option:first').val()).trigger('change');
				}				
			}
			
			// removecardspinner('#Orderentrycard');
			// callselect2();
		}).catch(jqXHR => {
			console.log(jqXHR);
		});
	});

	$(document).off('change', '#Single-ProjectUID').on('change', '#Single-ProjectUID', function (e) {
		
		var currentrow = $(this).closest('.productsubproduct_row');
		var ProjectUID = $(this).val();
		var dataExtraction = checkDataExtraction(ProjectUID);
		$.ajax({
			type: "POST",
			url: base_url + "CommonController/GetPriorityAndLender",
			data: {
				"ProjectUID": ProjectUID
			},
			dataType: 'json',
			beforeSend: function () {
				// addcardspinner('#Orderentrycard');
			},

			success: function (response) {

				var ProjectLender = response.ProjectLender;
				var ProjectInvestor = response.ProjectInvestor;
				var ProjectTypeDoc = response.ProjectTypeDoc;


				Lender_Select = ProjectLender.reduce((accumulator, value) => {
					
					return accumulator + '<Option value="' + value.LenderName + '">' + value.LenderName + '</Option>';
				}, '');

				Investor_Select = ProjectInvestor.reduce((accumulator, value) => {

					return accumulator + '<Option value="' + value.InvestorName + '">' + value.InvestorName + '</Option>';
				}, '');

				$('#Single-LenderUID').html(Lender_Select);
				$('#Single-LenderUID').val($('#Single-LenderUID').find('option:first').val()).trigger('change');

				$('#Single-InvestorUID').html(Investor_Select);
				$('#Single-InvestorUID').val($('#Single-InvestorUID').find('option:first').val()).trigger('change');
				/*@Desc DocTypes @Author Jainulabdeen @Since April 12 2021*/
				var DocTypes_HTML = '';

				if (ProjectTypeDoc.length) {

					DocTypes_HTML = ProjectTypeDoc.reduce((accumulator, value, index) => {

						return accumulator + `<tr>
						<td class="text-center">

						<input type="hidden" name="DocType[`+index+`]" value="`+value.InputDocTypeUID+`" />
						`+value.DocTypeName+`
						
						</td>

						<td class="text-center">
						
						<div class="form-group bmd-form-group">
						<input type="text" class="form-control" id="AltOrderNumber`+index+`" name="AltOrderNumber[`+index+`]" />
						</div>
						
						</td>

						<td class="text-center">
						
						<button type="button" class="btn btn-sm btn-social btn-reddit btn-doctype" data-doctypeuid="`+value.InputDocTypeUID+`" data-doctypename="`+value.DocTypeName+`" style="font-size: 9px;">
						<i class="icon-upload4 pr-10"></i>Upload File(s)
						<div class="ripple-container"></div>
						</button>
						
						</td>
						</tr>`;
					}, '<div class="col-md-12"><table class="table table-bordered" id="tbl-singledoctype"><thead><tr><th class="text-center">Doc Type</th><th class="text-center">Alt Order Number</th><th class="text-center">Priority</th><th class="text-center" width="20%">Upload Files</th></thead><tbody>');

					DocTypes_HTML += '</tbody></table></div>';
				}
				$('#row-doctypes').html(DocTypes_HTML);
				$('#row-doctypes').removeClass('hide');
				/*End*/
				// callselect2();
				// removecardspinner('#Orderentrycard');
			}
		});
	});


	$(document).off('change', '#Single-ProductUID, #MOM, #SecondLienFlag').on('change', '#Single-ProductUID, #MOM, #SecondLienFlag', function (e) {

		var currentrow = $('#Single-ProductUID').closest('.productsubproduct_row');
		var ProductUID = $('#Single-ProductUID').val();
		var CustomerUID = $('#Customer').val();
		var MOM = $('#MOM').val();
		var LoanPurpose = $('#LoanPurpose').val();
		var GAPMortgageAmount = $('#GAPMortgageAmount').val();
		var SecondLienFlag = $('#SecondLienFlag').val();

		var dataobject = {
			ProductUID: ProductUID,
			CustomerUID: CustomerUID,
			MOM: MOM,
			LoanPurpose: LoanPurpose,
			GAPMortgageAmount: GAPMortgageAmount,
			SecondLienFlag: SecondLienFlag,
		};

		Fetch_Product_DocType(dataobject);
	});

	$(document).off('blur', '#LoanPurpose, #GAPMortgageAmount').on('blur', '#LoanPurpose, #GAPMortgageAmount', function (e) {

		var currentrow = $('#Single-ProductUID').closest('.productsubproduct_row');
		var ProductUID = $('#Single-ProductUID').val();
		var CustomerUID = $('#Customer').val();
		var MOM = $('#MOM').val();
		var LoanPurpose = $('#LoanPurpose').val();
		var GAPMortgageAmount = $('#GAPMortgageAmount').val();
		var SecondLienFlag = $('#SecondLienFlag').val();

		var dataobject = {
			ProductUID: ProductUID,
			CustomerUID: CustomerUID,
			MOM: MOM,
			LoanPurpose: LoanPurpose,
			GAPMortgageAmount: GAPMortgageAmount,
			SecondLienFlag: SecondLienFlag,
		};

		Fetch_Product_DocType(dataobject);
	});



	$(document).off('change', '#bulk_ProjectUID').on('change', '#bulk_ProjectUID', function (e) {

		var ProjectUID = $(this).val();
		$.ajax({
			type: "POST",
			url: base_url + "CommonController/GetPriorityAndLender",
			data: {
				"ProjectUID": ProjectUID
			},
			dataType: 'json',
			beforeSend: function () {
				// addcardspinner('#Orderentrycard');
			},

			success: function (response) {
				console.table(response);

				var ProjectLender = response.ProjectLender;
				var ProjectTypeDoc = response.ProjectTypeDoc;
				Lender_Select = ProjectLender.reduce((accumulator, value) => {
					console.log(value);
					return accumulator + '<Option value="' + value.LenderUID + '">' + value.LenderName + '</Option>';
				}, '');

				$('#bulk_LenderUID').html(Lender_Select);
				// $('#bulk_LenderUID').val($('#bulk_LenderUID').find('option:first').val()).trigger('change');
				/*@Desc DocTypes @Author Jainulabdeen @Since April 12 2021*/
				var DocTypes_HTML = '';

				if (ProjectTypeDoc.length) {

					DocTypes_HTML = ProjectTypeDoc.reduce((accumulator, value, index) => {

						return accumulator + `<tr>
						<td class="text-center">

						<input type="hidden" name="DocType[`+index+`]" value="`+value.InputDocTypeUID+`" />
						`+value.DocTypeName+`
						
						</td>

						<td class="text-center">
						
						<div class="form-group bmd-form-group">
						<input type="text" class="form-control" id="AltOrderNumber`+index+`" name="AltOrderNumber[`+index+`]" />
						</div>
						
						</td>

						<td class="text-center">
						
						<button type="button" class="btn btn-sm btn-social btn-reddit btn-doctype" data-doctypeuid="`+value.InputDocTypeUID+`" data-doctypename="`+value.DocTypeName+`" style="font-size: 9px;">
						<i class="icon-upload4 pr-10"></i>Upload File(s)
						<div class="ripple-container"></div>
						</button>
						
						</td>
						</tr>`;
					}, '<div class="col-md-12"><table class="table table-bordered" id="tbl-singledoctype"><thead><tr><th class="text-center">Doc Type</th><th class="text-center">Alt Order Number</th><th class="text-center">Priority</th><th class="text-center" width="20%">Upload Files</th></thead><tbody>');

					DocTypes_HTML += '</tbody></table></div>';
				}
				$('#row-doctypes').html(DocTypes_HTML);
				$('#row-doctypes').removeClass('hide');
				/*End*/
				// callselect2();

				// removecardspinner('#Orderentrycard');
			}
		});
	});

	/*ZipCode Change function*/

	$(document).off('blur', '#PropertyZipcode').on('blur', '#PropertyZipcode', function (event) {
		zip_val = $(this).val();
		if (zip_val != '') {
			// addcardspinner('#Orderentrycard');
			$.ajax({
				type: "POST",
				url: base_url + 'CommonController/GetZipCodeDetails',
				data: {
					'Zipcode': zip_val
				},
				dataType: 'json',
				cache: false,
				beforeSend: function () {
					// addcardspinner('#Orderentrycard');
				},
				success: function (data) {
					$('.PropertyCityName').empty();
					$('.PropertyStateCode').empty();
					$('.PropertyCountyName').empty();
					$('.MultiOrderedcity').html(' ');
					$('.MultiOrderedcounty').html(' ');
					$('.MultiOrderedstate').html(' ');

					if (data != '') {

						if (data['success'] == 1) {
							$("#zipcodeadd").hide();

							if (data['City'].length > 1) {
								$('.MultiOrderedcity').html(' ');
								$('.MultiOrderedcity').append('<span class="badge badge-danger cus-badge" style="background: #eb6357;color: #fff; z-index: 9999; top: -16px; right: -20px;">' + data['City'].length + '</span>');
							}

							if (data['County'].length > 1) {
								$('.MultiOrderedcounty').html(' ');
								$('.MultiOrderedcounty').append('<span class="badge badge-danger cus-badge" style="background: #eb6357;color: #fff; z-index: 9999; top: -16px; right: -20px;">' + data['County'].length + '</span>');
							}

							if (data['State'].length > 1) {
								$('.MultiOrderedstate').html(' ');
								$('.MultiOrderedstate').append('<span class="badge badge-danger cus-badge" style="background: #eb6357;color: #fff; z-index: 9999; top: -16px; right: -20px;">' + data['State'].length + '</span>');
							}

							$.each(data['City'], function (k, v) {
								$('#PropertyCityName').val(v['CityName']);
								$('.PropertyCityName').append('<li><a href="javascript:(void);" data-value="' + v['CityName'] + '">' + v['CityName'] + '</a></li>');
								$('#PropertyCityName').closest('.form-group').addClass('is-filled');
								zipcode_select();
							});

							$.each(data['County'], function (k, v) {
								$('#PropertyCountyName').val(v['CountyName']);
								$('.PropertyCountyName').append('<li><a href="javascript:(void);" data-value="' + v['CountyName'] + '">' + v['CountyName'] + '</a></li>');
								$('#PropertyCountyName').closest('.form-group').addClass('is-filled');
								zipcode_select();
							});

							$.each(data['State'], function (k, v) {
								$('#PropertyStateCode').val(v['StateCode']);
								$('.PropertyStateCode').append('<li><a href="javascript:(void);" data-value="' + v['StateCode'] + '">' + v['StateCode'] + '</a></li>');
								$('#PropertyStateCode').closest('.form-group').addClass('is-filled');
								zipcode_select();
							});

							$('#PropertyStateCode,#PropertyCountyName,#PropertyCityName').removeClass("is-invalid").closest('.form-group').removeClass('has-danger');
							$('#PropertyStateCode.select2picker,#PropertyCountyName.select2picker,#PropertyCityName.select2picker').next().find('span.select2-selection').removeClass('errordisplay');
						} else {
							$('#PropertyCityName').val('');
							$('#PropertyCityName').closest('.form-group').removeClass('is-filled');

							$('#PropertyCountyName').val('');
							$('#PropertyCountyName').closest('.form-group').removeClass('is-filled');

							$('#PropertyStateCode').val('');
							$('#PropertyStateCode').closest('.form-group').removeClass('is-filled');

							$("#zipcodeadd").show();
						}
					}
					// removecardspinner('#Orderentrycard');
				},
				error: function (jqXHR, textStatus, errorThrown) {

					console.log(errorThrown);
				},
				failure: function (jqXHR, textStatus, errorThrown) {

					console.log(errorThrown);
				}
			});
		} else {
			$('#PropertyCityName').val('');
			$('#PropertyCityName').closest('.form-group').removeClass('is-filled');

			$('#PropertyCountyName').val('');
			$('#PropertyCountyName').closest('.form-group').removeClass('is-filled');

			$('#PropertyStateCode').val('');
			$('#PropertyStateCode').closest('.form-group').removeClass('is-filled');
		}
	});
/*@DESC TO set validation popup, process done in workflowbuttons page @Karthiga*/
// $(document).off('click', '#stackingcomplete').on('click', '#stackingcomplete', function (e) {
// 	var button = $(this);
// 	var button_text = $(this).html();
// 	/*Desc To check whether the unclassified section contain pages or not @Karthiga*/
// 	var Unclassified = parseInt($('span#UnClassi_Count').text());
// 	console.log(Unclassified)
//   	if(Unclassified ==0 || Unclassified == NaN)
// 	{	/*SWEET ALERT CONFIRMATION*/
// 	swal({
// 		title: 'Are you sure ?',
// 		text: 'Do you want to complete the Classification !',
// 		icon: "warning",
// 			// buttons: true,
// 			showCancelButton: true,
// 			confirmButtonClass: 'btn btn-success',
// 			cancelButtonClass: 'btn btn-danger',
// 			buttonsStyling: false,
// 			closeOnClickOutside: false,
// 			allowOutsideClick: false,
// 			showLoaderOnConfirm: true,
// 			position: 'top-end',
// 			className: "swal_auto_width",
// 			buttons: {
// 				cancel: "Cancel",
// 				catch: {
// 					text: "Complete & Go to My Loans!",
// 					value: "catch",
// 					className:"btn-success",
// 				},
// 				//defeat: "Complete",
// 			},
// 		}).then(function (confirm) {

// 			if (confirm == "defeat" || confirm == "catch") {

// 				var complete_action = 0;
// 				if (confirm == "catch") {
// 					var complete_action = "Transactions";
// 				}

// 				$(button).prop('disabled', true);
// 				$(button).html('Completing...');
// 				/*Desc To show the loaded for Classification Complete @Karthiga*/
// 				$('.page_loader_div').show();
// 				var OrderUID = $('#OrderUID').val();

// 				fn_save_stacking().then(function () {

// 					// Call Stackin complete
// 					stacking_complete(button, button_text, complete_action);
// 				}).catch(function () {});
// 			}

// 		}, function (dismiss) {});
// 	}
// 	else
//   	{
//   		alert('hello');
//   		swal({
//            title: "Sorry, we couldn't complete your request",
//            text: "Please classify the unclassified pages.",
//            icon: "warning",
//            dangerMode: false,
//          });
//   	}
// 	});



$(".discard-loan").click(function(e){
	e.preventDefault();
	/*SWEET ALERT CONFIRMATION*/
	swal({
		title: '',
		text: 'Are you sure want to cancel this Order ?',
		icon: "warning",
		buttons: {
        cancel: {
          text: "Cancel",
          value: false,
          visible: true,
          className: "btn-sm btn-danger",
          closeModal: true,
        },
        catch: {
          text: "Ok",
          value: "catch",
          className: "btn-sm",
        },
      },
		content: {
    		element: "input",
    		attributes: {
      			placeholder: "Remarks",
      			type: "text",
      			id:"cancelReason"
      			
    		},
		},

							
		showCancelButton: true,
		confirmButtonClass: 'btn btn-success',
		cancelButtonClass: 'btn btn-danger',
		buttonsStyling: false,
		closeOnClickOutside: false,
		allowOutsideClick: false,
		showLoaderOnConfirm: true,
		position: 'top-end'
	}).then(function (confirm) {


		if (confirm == 'catch') {
			var OrderUID = $('#OrderUID').val();
			var cancelReason = $('#cancelReason').val();

			$.ajax({
				type: "POST",
				url: base_url + 'OrderComplete/OrderCancellation',
				data: {
					'OrderUID': OrderUID, 'cancelReason': cancelReason
				},
				dataType: 'json',
				cache: false,
				beforeSend: function () {
						$('.page_loader_div').show();
					},
					success: function (data) {
						if (data.validation_error == 0) {
							/*Sweet Alert MSG*/
							/*$(".toast-body-Success").html(data['message']);
							$("#liveToastSuccess").toast("show");*/
							swal({
								// title: "Error",
								text: data['message'],
								icon: "warning",
								confirmButtonClass: "btn btn-success",
								allowOutsideClick: false,
								width: '300px',
								buttonsStyling: false
							}).then(function(confirm) {
								disposepopover();
								setTimeout(function(){
									location.reload();
								},3000);
							});
							
							
						} else if (data.validation_error == 2) {
							swal({
								// title: "Error",
								text: data.message,
								icon: "warning",
								confirmButtonClass: "btn btn-success",
								allowOutsideClick: false,
								width: '300px',
								buttonsStyling: false
							}).then(function(confirm) {
								disposepopover();
								setTimeout(function(){
									location.reload();
								},3000);
							});
						} else {
							$('.page_loader_div').hide();
							swal({
								// title: "Error",
								text: data.message,
								icon: "warning",
								confirmButtonClass: "btn btn-success",
								allowOutsideClick: false,
								width: '300px',
								buttonsStyling: false
							}).then(function (confirm) {
								$( ".discard-loan" ).trigger( "click" );
							});
						}
					},
					error: function (jqXHR) {
						$('.page_loader_div').hide();
						swal({
							title: "",
							text: "Failed to Complete",
							icon: "error",
							confirmButtonClass: "btn btn-success",
							allowOutsideClick: false,
							width: '300px',
							buttonsStyling: false
						}).catch(swal.noop);
					}
				});
		}

	}, function (dismiss) {});
});

$(document).off('click', '#auditcomplete').on('click', '#auditcomplete', function (e) {
	/* AAS - TRIGGER AUTO SAVE ACTION - START */
	if($("#hid_audit_changes_check").val() == 1)
	{
		trigger_audit_form_changes('Audit','');
		// return false;
	}
	/* AAS - TRIGGER AUTO SAVE ACTION - END */
	
	var button = $(this);
	var button_text = $(this).html();

	/*@Desc Page count Question insert Function call @Author Jeeva Kaleeswar N @Added on Nov 13 2021*/
	var url = location.pathname;
		const lastSegment = url.split("/").pop();// "orderId" 

		$.ajax({
			type: "POST",
			url: base_url + 'Audit/pagecountquestioninsert',
			data: {
				'OrderUID': lastSegment,
			},
			dataType: 'json',
			cache: false,
		});
		/*@Desc For CashToCloseException status dynamic Question @Author Jeeva Kaleeswar N @Added on March 04 2022*/
		$.ajax({
			type: "POST",
			url: base_url + 'CommonController/CashToCloseException',
			data: {
				'OrderUID': lastSegment,
			},
			dataType: 'json',
			cache: false,
		});
		/*END*/

	/*@ To Complete the Audit Exception Details with Question @Author Aiswarya Villodi @Added on July 27 2021*/
	if (is_url_contains_string('Audit/index_new/')) { 
		fn_AuditScreen_audit_complete(button, button_text);
	}else {//Added By aiswarya Date 27 July 2021 //Updated by Aravindhan on 08 Nov 2021
		var url  			= location.pathname;
		const lastSegment 	= url.split("/").pop();// "orderId" 
		window.location 	= base_url + 'Audit/index_new/'+ lastSegment;
	/*use end Here */ 	
	}
	/*@Desc Commented By Aravindhan R @Added on 08 Nov 2021*/
	/*else{

		/*SWEET ALERT CONFIRMATION*/
		/*swal({
			title: 'Are you sure ?',
			text: 'Do you want to complete the Audit ?',
			icon: "warning",
				// buttons: true,
				showCancelButton: true,
				confirmButtonClass: 'btn btn-success',
				cancelButtonClass: 'btn btn-danger',
				buttonsStyling: false,
				closeOnClickOutside: false,
				allowOutsideClick: false,
				showLoaderOnConfirm: true,
				position: 'top-end',
				buttons: {
					cancel: "Cancel",
					catch: {
						text: "Complete & Go to My Loans!",
						value: "catch",
					},
					//defeat: "Complete",
				},
			}).then(function (confirm) {
				if (confirm == "defeat" || confirm == "catch") {

					var complete_action = 0;
					if (confirm == "catch") {
						var complete_action = "Transactions";
					}

					$(button).prop('disabled', true);
					$(button).html('<i class="fa fa-spin fa-spinner"></i> Completing');

					var OrderUID = $('#OrderUID').val();

					if (is_url_contains_string('Indexing')) {

						fn_autosave_auditing().then(function (response) {

							fn_audit_complete(button, button_text, complete_action);
						}).catch(function (error) {});
					} else if (is_url_contains_string('Audit')) {

						fn_autosave_auditing().then(function (response) {

							fn_audit_complete(button, button_text, complete_action);
						}).catch(function (error) {});
					} else {
						fn_audit_complete(button, button_text, complete_action);
					}
				}
			}, function (dismiss) {});
	}*/
});

/*@Desc function for QC value Save @Author Jeeva @Added on April 18 2022*/
$(document).off('click', '#ExceptionQCWorkflow').on('click', '#ExceptionQCWorkflow', function (e) {
	
	if($("#hid_audit_changes_check").val() == 1)
	{
		trigger_audit_form_changes('Audit','');
		
	}
	
	var button = $(this);
	var button_text = $(this).html();
	console.log(button);

	console.log(button, button_text);
	var url = location.pathname;
		const lastSegment = url.split("/").pop();

	if (is_url_contains_string('Audit/index_new/')) { 
		fn_AuditScreen_audit_complete(button, button_text);
	}else {
		var url  			= location.pathname;
		const lastSegment 	= url.split("/").pop();
		window.location 	= base_url + 'Audit/index_new/'+ lastSegment;
	
	}

});


$(document).off('click', '#shippingcomplete').on('click', '#shippingcomplete', function (e) {
	/*SWEET ALERT CONFIRMATION*/
	swal({
		title: '<div class="text-primary" id="iconchg"><i style="font-size: 40px;" class="fa fa-info-circle fa-5x"></i></div>',
		html: '<span id="modal_msg" class= "modal_spanheading" > Do you want to complete Shipping ?</span>',
		showCancelButton: true,
		confirmButtonClass: 'btn btn-success',
		cancelButtonClass: 'btn btn-danger',
		buttonsStyling: false,
		closeOnClickOutside: false,
		allowOutsideClick: false,
		showLoaderOnConfirm: true,
		position: 'top-end'
	}).then(function (confirm) {

		var OrderUID = $('#OrderUID').val();

		$.ajax({
			type: "POST",
			url: base_url + 'OrderComplete/ShippingComplete',
			data: {
				'OrderUID': OrderUID
			},
			dataType: 'json',
			cache: false,
			beforeSend: function () {
					// addcardspinner('#Orderentrycard');
				},
				success: function (data) {
					if (data.validation_error == 0) {
						/*Sweet Alert MSG*/
						/*$.notify({
							icon: "icon-bell-check",
							message: data['message']
						}, {
							type: "success",
							delay: 1000
						});
						disposepopover();
						triggerpage(window.location.href);*/
						swal({
							title: "",
							text: data['message'],
							icon:"success",
							allowOutsideClick: false,
							closeOnClickOutside: false,
							showCancelButton: false
						}).then(function(confirm) {
							disposepopover();
							triggerpage(window.location.href);
						});
					} else {
						swal({
							title: "<i class='icon-close2 icondanger'></i>",
							html: "<p>" + data.message + "</p>",
							confirmButtonClass: "btn btn-success",
							allowOutsideClick: false,
							width: '300px',
							buttonsStyling: false
						}).catch(swal.noop);
					}
				},
				error: function (jqXHR) {
					swal("", "Failed to Complete", "error");
					/*swal({
						title: "<i class='icon-close2 icondanger'></i>",
						html: "<p>Failed to Complete</p>",
						confirmButtonClass: "btn btn-success",
						allowOutsideClick: false,
						width: '300px',
						buttonsStyling: false
					}).catch(swal.noop);*/
				}
			});
	}, function (dismiss) {});
});

$(document).off('click', '#reviewcomplete').on('click', '#reviewcomplete', function (e) {
	var button = $(this);
	var button_text = $(this).html();

	/*SWEET ALERT CONFIRMATION*/
	swal({
		title: 'Are you sure?',
		text: 'Do you want to complete Review ?',
		icon: "warning",
		showCancelButton: true,
		confirmButtonClass: 'btn btn-success',
		cancelButtonClass: 'btn btn-danger',
		buttonsStyling: false,
		closeOnClickOutside: false,
		allowOutsideClick: false,
		showLoaderOnConfirm: true,
		position: 'bottom-middle',
		className: "swal_auto_width",
		buttons: {
			cancel: "Cancel",
			catch: {
				text: "Complete & Go to My Loans!",
				value: "catch",
				className:"btn-success",
			},
			//defeat: "Complete",
		},
	}).then(function (confirm) {

		if (confirm == "defeat" || confirm == "catch") {

			var complete_action = 0;
			if (confirm == "catch") {
				var complete_action = "Transactions";
			}

			$(button).prop('disabled', true);
			$(button).html('<i class="fa fa-spin fa-spinner"></i> Completing');

			if (is_url_contains_string('Indexing')) {

				fn_save_stacking().then(function (response) {

					fn_review_complete(button, button_text, complete_action);
				}).catch(function (error) {});
			} else if (is_url_contains_string('Audit')) {

				fn_autosave_auditing().then(function (response) {
					fn_review_complete(button, button_text, complete_action);
				}).catch(function (error) {});
			} else {
				fn_review_complete(button, button_text, complete_action);
			}
		}
	}, function (dismiss) {});
});

$(document).off('submit', '#raiseexcetion').on('submit', '#raiseexcetion', function (e) {

	e.preventDefault();
	e.stopPropagation();
	var OrderUID = $('#OrderUID').val();

	var button = $('.btnraiseexcetion');
	var button_text = $('.btnraiseexcetion').html();

	$(button).prop('disabled', true);
	$(button).html('<i class="fa fa-spin fa-spinner"></i> ...Raising');

	var formdata = new FormData($(this)[0]);
	formdata.append('OrderUID', OrderUID);

	if (is_url_contains_string('Indexing')) {

		fn_save_stacking().then(function (response) {

			fn_raise_exception(formdata, button, button_text);
		}).catch(function (error) {});
	} else if (is_url_contains_string('Audit')) {

		fn_autosave_auditing().then(function (response) {
			fn_raise_exception(formdata, button, button_text);
		}).catch(function (error) {});
	} else {
		fn_raise_exception(formdata, button, button_text);
	}
});

$(document).off('click', '.btnclearexception').on('click', '.btnclearexception', function (e) {
	btnclearexception_value = $(this).val();
	$button = $(this);
});

$(document).off('submit', '#frmclearexception').on('submit', '#frmclearexception', function (e) {

	e.preventDefault();
	e.stopPropagation();
	var OrderUID = $('#OrderUID').val();

		// var $button = $('.btnclearexception');
		var button = $button;
		var button_text = $button.html();

		$(button).prop('disabled', true);
		$(button).html('Clearing');


		// var $submitbuttons = $('.btnclearexception');

		var formdata = new FormData($(this)[0]);
		formdata.append('OrderUID', OrderUID);
		formdata.append('submit', btnclearexception_value);

		if (is_url_contains_string('Indexing')) {

			fn_save_stacking().then(function (response) {

				fn_clear_exception(formdata, button, button_text);
			}).catch(function (error) {});
		} else if (is_url_contains_string('Audit')) {

			fn_autosave_auditing().then(function (response) {
				fn_clear_exception(formdata, button, button_text);
			}).catch(function (error) {});
		} else {
			fn_clear_exception(formdata, button, button_text);
		}
	});

$(document).off('submit', '#frm_orderreverse').on('submit', '#frm_orderreverse', function (e) {
	e.preventDefault();
	e.stopPropagation();
	var OrderUID = $('#OrderUID').val();
	var WorkflowUID =$('#ReverseStatusUID').val();

	$.ajax({
		type:"POST",
		url : base_url + 'CommonController/CheckOrderStatusandWorkflowShipping',
		data:{OrderUID:OrderUID},
		dataType :"json",
		cache: false,
		beforeSend: function () {
		},
		success :function(response){
			if (response.status == 1) {
				swal({
					title: 'Are you sure?',
					text: "You want to Order Reverse Bin Datails Removed ?",
					type: 'warning',
					showCancelButton: true,
					confirmButtonClass: 'btn btn-success',
					cancelButtonClass: 'btn btn-danger',
					confirmButtonText: 'Yes',
					buttonsStyling: false
				}).then(function() {
					swal({
						title: 'Successfully Order Reverse!',
						text: '',
						type: 'success',
						confirmButtonClass: "btn btn-success",
						buttonsStyling: false
					})
					$.ajax({
						type:"POST",
						url : base_url + 'OrderComplete/WorkflowOrderReverse',
						data:{OrderUID:OrderUID,WorkflowUID:WorkflowUID,VerifyBinOrder:'BinOrderRemove'},
						dataType :"json",
						cache: false,
						beforeSend: function () {
						},
						success :function(response){
							console.log(response);
							if (response.validation_error == 1) {
								/*$.notify(
								{
									icon:"icon-bell-check",
									message:response.message
								},
								{
									type:"success",
									delay:1000 
								});*/

								swal({
									title: "",
									text: response.message,
									icon: "success",
									closeOnClickOutside: false,
								    allowOutsideClick: false,
									showCancelButton: false, 
								}).then(function (confirm) {	
									$('#modal-OrderReverse').modal('hide');

									if (check_is_url_contains_string_value(window.location.href)) {
										window.location.href = response['RedirectURL'];
									} else {
										window.location.href = response['RedirectURL'];
									}
								});
							}
						}
					})
				}).catch(swal.noop);
			}
			else{
				$.ajax({
					type:"POST",
					url : base_url + 'OrderComplete/WorkflowOrderReverse',
					data:{OrderUID:OrderUID,WorkflowUID:WorkflowUID,VerifyBinOrder:''},
					dataType :"json",
					cache: false,
					beforeSend: function () {
					},
					success :function(response){
						console.log(response);
						if (response.validation_error == 1) {
							/*$.notify(
							{
								icon:"icon-bell-check",
								message:response.message
							},
							{
								type:"success",
								delay:1000 
							});*/

							swal({
								title: "",
								text: response.message,
								icon: "success",
								closeOnClickOutside: false,
							    allowOutsideClick: false,
								showCancelButton: false, 
							}).then(function (confirm) {	
								$('#modal-OrderReverse').modal('hide');

								if (check_is_url_contains_string_value(window.location.href)) {
									window.location.href = response['RedirectURL'];
								} else {
									window.location.href = response['RedirectURL'];
								}
							});
						}
					}
				})
			}

		}
	});



		// // var $button = $('.btnclearexception');
		// var button = $('#btnreverse');
		// var button_text = button.html();

		// // var $submitbuttons = $('.btnclearexception');

		// var formdata = new FormData($(this)[0]);
		// formdata.append('OrderUID', OrderUID);
		// formdata.append('submit', btnclearexception_value);

		// SendAsyncAjaxRequest('POST', 'OrderComplete/ReverseOrder', formdata, 'json', false, false, function () {
		// 	$('.errorindicator').remove();
		// 	button.prop("disabled", true);
		// 	button.html('<i class=""fa fa-spin fa-spinner"></i> Loading ...');
		// }).then(function (response) {
		// 	console.log(response);

		// 	if (response.validation_error == 0) {
		// 		/*Sweet Alert MSG*/

		// 		$.notify({
		// 			icon: "icon-bell-check",
		// 			message: response['message']
		// 		}, {
		// 			type: "success",
		// 			delay: 1000
		// 		});

		// 		$('#modal-OrderReverse').modal('hide');

		// 		// Redirect to Queues
		// 		// triggerpage(response['RedirectURL']);
		// 		// return true;

		// 		if (check_is_url_contains_string_value(window.location.href)) {
		// 			window.location.href = response['RedirectURL'];
		// 		} else {
		// 			triggerpage(response['RedirectURL']);
		// 		}
		// 	} else {

		// 		$.each(response, function (k, v) {
		// 			$('#' + k).addClass("is-invalid").closest('.form-group').removeClass('has-success').addClass('has-danger');
		// 			$('#' + k + '.select2picker').next().find('span.select2-selection').addClass('errordisplay');
		// 			$('#' + k).parent().append('<span class="errorindicator" style="color:red">' + v + '</span>');
		// 		});

		// 		$.notify({
		// 			icon: "icon-bell-check",
		// 			message: response['message']
		// 		}, {
		// 			type: "danger",
		// 			delay: 1000
		// 		});
		// 	}
		// 	button.html(button_text);
		// 	button.attr("disabled", false);
		// }).catch(function (reject) {});
	});

/* --- CHECK STACKING AND AUDIT HAS STACKING DOCUMENT STARTS --- */

$(document).off('click', '.stacking_audit').on('click', '.stacking_audit', function (e) {
	e.preventDefault();

	var href = $(this).attr('href');

	var OrderUID = $(this).attr('data-orderuid');

	var requestdata = {
		'OrderUID': OrderUID
	};

	SendAsyncAjaxRequest('POST', 'CommonController/IsStackingDocumentAvailable', requestdata, 'json', true, true, function () {}).then(function (response) {
		if (response.validation_error == 1) {
			/*$.notify({
				icon: "icon-bell-check",
				message: response['message']
			}, {
				type: "danger",
				delay: 1000
			});*/
			swal({
				title: '',
				text: response['message'],
				type: 'error',
				showCancelButton: false,
				allowOutsideClick: false,
				closeOnClickOutside: false,
				timer: 1000,
			}).catch(swal.noop);
		} else if (response.validation_error == 2) {
			swal({
				title: 'No Classification Document',
				text: response.message,
				type: 'error',
				timer: 1000,
				confirmButtonClass: "btn btn-success",
				buttonsStyling: false
			}).catch(swal.noop);
		} else if (response.validation_error == 3) {
			swal({
				title: 'Change to Classification',
				text: response.message,
				type: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Yes, Do it!',
				cancelButtonText: 'No, keep it',
				confirmButtonClass: "btn btn-success",
				cancelButtonClass: "btn btn-danger",
				buttonsStyling: false
			}).then(function () {

				SendAsyncAjaxRequest('POST', 'CommonController/ChangeToStacking', requestdata, 'json', true, true, function () {}).then(function (innerresponse) {

					swal({
						title: innerresponse.title,
						text: innerresponse.message,
						type: innerresponse.color,
						timer: 1000,
						confirmButtonClass: "btn btn-success",
						buttonsStyling: false
					}).catch(swal.noop);
					window.location.href = href;
				}).catch(function (error) {});
			}, function (dismiss) {
				swal({
					title: 'Cancelled',
					timer: 1000,
					type: 'error',
					confirmButtonClass: "btn btn-info",
					buttonsStyling: false
				}).catch(swal.noop);
			});
		} else if (response.validation_error == 0) {
			window.location.href = href;
		}
	}).catch(function (reject) {});
});

$("#Customer").trigger("change");

/* --- CHECK STACKING AND AUDIT HAS STACKING DOCUMENT ENDS --- */
}); //Document Ends


function zipcode_select() {
	$('.dropdown-menu a').click(function () {
		$(this).closest('.dropdown').find('input.select').val($(this).attr('data-value'));
	});
}

var AjaxGetCustomerProjects = (() => {
	var _ref = _asyncToGenerator(function* (CustomerUID) {
		return new Promise(function (resolve, reject) {
			resolve($.ajax({
				type: "POST",
				url: base_url + "CommonController/GetCustomerDetails",
				data: {
					"CustomerUID": CustomerUID
				},
				dataType: 'json',
				beforeSend: function () {
					// addcardspinner('#Orderentrycard');
				}
			}));
		});
	});

	return function AjaxGetCustomerProjects(_x) {
		return _ref.apply(this, arguments);
	};
})();

var AjaxGetCustomerProducts = (() => {
	var _ref = _asyncToGenerator(function* (CustomerUID) {
		return new Promise(function (resolve, reject) {
			resolve($.ajax({
				type: "POST",
				url: base_url + "CommonController/Get_CustomerProducts",
				data: {
					"CustomerUID": CustomerUID
				},
				dataType: 'json',
				beforeSend: function () {
					// addcardspinner('#Orderentrycard');
				}
			}));
		});
	});

	return function AjaxGetCustomerProducts(_x) {
		return _ref.apply(this, arguments);
	};
})();

var SendAsyncAjaxRequest = (() => {
	var _ref2 = _asyncToGenerator(function* (RequestType, ReqeustURL, RequestData, ResponseDataType, processData, contentType, BeforeSend_CallBack) {
		var ajaxoptions = {
			type: RequestType,
			url: base_url + ReqeustURL,
			data: RequestData,
			dataType: ResponseDataType,
			cache: false,
			beforeSend: BeforeSend_CallBack
		};

		if (processData == false) {
			ajaxoptions.processData = processData;
		}

		if (contentType == false) {
			ajaxoptions.contentType = contentType;
		}

		if (typeof this.processData === 'undefined') {
			this.processData = true;
		}
		if (typeof this.contentType === 'undefined') {
			this.contentType = true;
		}
		//console.log(ajaxoptions);
		return new Promise(function (resolve, reject) {
			resolve($.ajax(ajaxoptions));
		});
	});

	return function SendAsyncAjaxRequest(_x2, _x3, _x4, _x5, _x6, _x7, _x8) {
		return _ref2.apply(this, arguments);
	};
})();

var TestSendAsyncAjaxRequest = (() => {
	var _ref3 = _asyncToGenerator(function* (RequestType, ReqeustURL, RequestData, ResponseDataType, processData, contentType, BeforeSend_CallBack) {
		var ajaxoptions = {
			type: RequestType,
			url: base_url + ReqeustURL,
			data: RequestData,
			dataType: ResponseDataType,
			cache: false,
			beforeSend: BeforeSend_CallBack
		};

		if (processData == false) {
			ajaxoptions.processData = processData;
		}

		if (contentType == false) {
			ajaxoptions.contentType = contentType;
		}

		if (typeof this.processData === 'undefined') {
			this.processData = true;
		}
		if (typeof this.contentType === 'undefined') {
			this.contentType = true;
		}
		//console.log(ajaxoptions);
		return new Promise(function (resolve, reject) {
			$.ajax(ajaxoptions).done(function (data) {
				resolve(data);
			}).fail(function (error) {
				reject(error);
			});
		});
	});

	return function TestSendAsyncAjaxRequest(_x9, _x10, _x11, _x12, _x13, _x14, _x15) {
		return _ref3.apply(this, arguments);
	};
})();

var disposepopover = function (e) {
	$("[data-toggle=exception-popover]").popover('dispose');
	$("[data-toggle=clearexceptionpopover]").popover('dispose');
	$("[data-toggle=OnHold-popover]").popover('dispose');
	$("[data-toggle=Release-popover]").popover('dispose');
};

function check_is_url_contains_string_value(url) {
	// body...
	var substrings = ['Indexing', 'Audit','stacking'],
	length = substrings.length;
	while (length--) {
		if (url.indexOf(substrings[length]) != -1) {
			// one of the substrings is in yourstring
			return true;
		}
	}
	return false;
}

function is_url_contains_string(word) {
	// body...
	var url = window.location.href;
	if (url.indexOf(word) != -1) {
		// one of the substrings is in yourstring
		return true;
	}
	return false;
}

var stacking_complete = function (button, button_text, complete_action) {
	var OrderUID = $('#OrderUID').val();

	$.ajax({
		type: "POST",
		url: base_url + 'OrderComplete/StackingComplete',
		data: {
			'OrderUID': OrderUID
		},
		dataType: 'json',
		cache: false,
		beforeSend: function () {
			// addcardspinner('#Orderentrycard');
		},
		success: function (data) {
			console.log(data)
			if (data.validation_error == 0) {
				/*Sweet Alert MSG*/
				
				if (data.url == '') {
					/*$(".toast-body-Success").html(data['message']);
					$("#liveToastSuccess").toast("show");
					disposepopover();
					setTimeout(function(){
						if (complete_action) {
							window.location.href = base_url + complete_action;
						} else {
							location.reload();
						}
					},2000);*/

					swal({
						title: "",
						text: data['message'],
						icon: "success",
						closeOnClickOutside: false,
					    allowOutsideClick: false,
						showCancelButton: false, 
					}).then(function (confirm) {	
						disposepopover();
						setTimeout(function(){
							if (complete_action) {
								window.location.href = base_url + complete_action;
							} else {
								location.reload();
							}
						},500);
					});
				}
			}
			else if(data.validation_error == 5){
				swal({
					title: 'Are you sure ?',
					text: 'All critical documents are not stacked .Do you want to complete the Loan ?',
					icon: "warning",
					buttons: true,
					showCancelButton: true,
					confirmButtonClass: 'btn btn-success',
					cancelButtonClass: 'btn btn-danger',
					buttonsStyling: false,
					closeOnClickOutside: false,
					allowOutsideClick: false,
					showLoaderOnConfirm: true,
					position: 'bottom-middle'
				}).then(function (confirm) {	
					$.ajax({
						type: "POST",
						url: base_url + 'OrderComplete/SendOrderCompleteMail',
						data: {'OrderUID':OrderUID},
						dataType: 'json',
						cache: false,
						beforeSend: function () {
							// button.attr("disabled", true);
							// $submitbuttons.attr("disabled", true);
							button.html('Loading ...');
						},
						success: function (data) {
							if (data.validation_error == 0) {
								/*Sweet Alert MSG*/

								/*$(".toast-body-Success").html(data['message']);
								$("#liveToastSuccess").toast("show");
								disposepopover();
								setTimeout(function(){ 

									location.reload();

								}, 2000);*/
								swal({
									title: "",
									text: data['message'],
									icon: "success",
									closeOnClickOutside: false,
								    allowOutsideClick: false,
									showCancelButton: false, 
								}).then(function(confirm) {	
									disposepopover();
									setTimeout(function(){ 

										location.reload();

									}, 2000);
								});
							} 
							else {
								swal({
									title: "",
									text: data['message'],
									icon: "error",
									closeOnClickOutside: false,
								    allowOutsideClick: false,
									showCancelButton: false, 
								});
								
								//$(".toast-body-Error").html(data['message']);
								//$("#liveToastError").toast("show");
							}
							button.html(button_text);
							$(button).prop('disabled', false);
						},
						error: function (jqXHR) {
							swal({
								title: "Error",
								text: "Failed to Complete",
								icon: "error",
								confirmButtonClass: "btn btn-success",
								allowOutsideClick: false,
								width: '300px',
								buttonsStyling: false
							}).catch(swal.noop);
						}
					});
				}, function (dismiss) {
					swal({
						title: 'Cancelled',
						icon: "warning",
						type: 'error',
						confirmButtonClass: "btn btn-info",
						buttonsStyling: false
					}).catch(swal.noop);
				});
			}
			else {
				swal({
					title: "",
					text: data.message,
					icon: 'warning',
					confirmButtonText: 'Ok',
					confirmButtonClass: "btn btn-success",
					buttonsStyling: false
				}).catch(swal.noop);
			}
			// removecardspinner('#Orderentrycard');
			$(button).prop('disabled', false);
			$(button).html(button_text);
			/*Desc To hide the loaded for Classification Complete @Karthiga*/
			$('.page_loader_div').hide();
		},
		error: function (jqXHR) {
			swal({
				title: "Error",
				text: "Failed to Complete",
				icon: 'warning',
				confirmButtonClass: "btn btn-success",
				allowOutsideClick: false,
				width: '300px',
				buttonsStyling: false
			}).catch(swal.noop);
			/*Desc To hide the loaded for Classification Complete @Karthiga*/
			$('.page_loader_div').hide();
		}
	});
};

var fn_audit_complete = function (button, button_text, complete_action) {
	
	console.log(button, button_text);
	var OrderUID = $('#OrderUID').val();
	
	$.ajax({
		type: "POST",
		url: base_url + 'OrderComplete/AuditComplete',
		data: {
			'OrderUID': OrderUID
		},
		dataType: 'json',
		cache: false,
		beforeSend: function () {
			// addcardspinner('#Orderentrycard');
		},
		success: function (data) {
			console.log(data);
			if (data.validation_error == 0) {
				if(data['message'] == "Exception Raised"){
					 swal({
	                  text: data['message'],
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
	                      value: false,
	                      visible: true,
	                      className: "btn-sm",
	                      closeModal: true,
	                    },
	                  },
                	}).then(function (confirm) {	
						disposepopover();

						setTimeout(function(){
							if (complete_action) {
								window.location.href = base_url + complete_action;
							} else {
								location.reload();
							}
						},3000);
					});
					
				}
				else{
					swal({
						title: "",
						text: data['message'],
						icon: "success",
						closeOnClickOutside: false,
                		allowOutsideClick: false,
						showCancelButton: false, 
					}).then(function (confirm) {	
						disposepopover();

						if (complete_action) {
							window.location.href = base_url + complete_action;
						} else {
							location.reload();
						}
					});
				}
			}
			else {
				 swal({
                  //text: "Audit Completed",
                   text: data['message'],
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
                      value: false,
                      visible: true,
                      className: "btn-sm",
                      closeModal: true,
                    },
                  },
                }).then(function (confirm) {	
						disposepopover();
						if (complete_action) {
							window.location.href = base_url + complete_action;
						} else {
							location.reload();
						}
					});
			}
			// removecardspinner('#Orderentrycard');
			$(button).prop('disabled', false);
			$(button).html(button_text);
		},
		error: function (jqXHR) {
			swal("", "Failed to Complete", "error");
			/*swal({
				title: "<i class='icon-close2 icondanger'></i>",
				html: "<p>Failed to Complete</p>",
				confirmButtonClass: "btn btn-success",
				allowOutsideClick: false,
				width: '300px',
				buttonsStyling: false
			}).catch(swal.noop);*/
		}
	});
};

var fn_review_complete = function (button, button_text, complete_action) {
	var OrderUID = $('#OrderUID').val();

	$.ajax({
		type: "POST",
		url: base_url + 'OrderComplete/ReviewComplete',
		data: {
			'OrderUID': OrderUID
		},
		dataType: 'json',
		cache: false,
		beforeSend: function () {
			// addcardspinner('#Orderentrycard');
		},
		success: function (data) {
			if (data.validation_error == 0) {

				/*Sweet Alert MSG*/
				//$(".toast-body-Success").html(data['message']);
				//$("#liveToastSuccess").toast("show");
				swal({
					title: "",
					text: data['message'],
					icon: "success",
					closeOnClickOutside: false,
				    allowOutsideClick: false,
					showCancelButton: false, 
				})
				.then(function (confirm) {
					disposepopover();	
					setTimeout(function(){
						if (complete_action) {
							window.location.href = base_url + complete_action;
						} else {
							location.reload();
						}
					},2000);
				});
				//disposepopover();
				/*if (check_is_url_contains_string_value(window.location.href)) {
					window.location.href = base_url + 'Revieworders';
				} else {
					triggerpage(base_url + 'Revieworders');
				}*/
				/*setTimeout(function(){
					if (complete_action) {
						window.location.href = base_url + complete_action;
					} else {
						location.reload();
					}
				},2000);*/
			} else {
				swal("", data.message, "error");
			}
			// removecardspinner('#Orderentrycard');
			$(button).prop('disabled', false);
			$(button).html(button_text);
		},
		error: function (jqXHR) {
			swal("", "Failed to Complete", "error");
		}
	});
};

var fn_raise_exception = function (formdata, button, button_text) {
	var OrderUID = $('#OrderUID').val();

	$.ajax({
		type: "POST",
		url: base_url + 'OrderComplete/RaiseException',
		data: formdata,
		dataType: 'json',
		cache: false,
		processData: false,
		contentType: false,
		beforeSend: function () {
			button.attr("disabled", true);
			button.html('<i class=""fa fa-spin fa-spinner"></i> Loading ...');
		},
		success: function (data) {
			if (data.validation_error == 0) {
				/*Sweet Alert MSG*/
				/*$.notify({
					icon: "icon-bell-check",
					message: data['message']
				}, {
					type: "success",
					delay: 1000
				});
				disposepopover();

				if (check_is_url_contains_string_value(window.location.href)) {
					window.location.reload();
				} else {
					triggerpage(window.location.href);
				}*/

				swal({
					title: "",
					text: data['message'],
					icon: "success",
					closeOnClickOutside: false,
				    allowOutsideClick: false,
					showCancelButton: false, 
				}).then(function(confirm) {
					disposepopover();

					if (check_is_url_contains_string_value(window.location.href)) {
						window.location.reload();
					} else {
						triggerpage(window.location.href);
					}
				});
			} else {
				swal("" ,data['message'], "error");
				/*$.notify({
					icon: "icon-bell-check",
					message: data['message']
				}, {
					type: "danger",
					delay: 1000
				});*/
			}
			button.html(button_text);
			button.attr("disabled", false);
		},
		error: function (jqXHR) {
			swal("", "Failed to Complete", "error");
			/*swal({
				title: "<i class='icon-close2 icondanger'></i>",
				html: "<p>Failed to Complete</p>",
				confirmButtonClass: "btn btn-success",
				allowOutsideClick: false,
				width: '300px',
				buttonsStyling: false
			}).catch(swal.noop);*/
		}
	});
};

var fn_clear_exception = function (formdata, button, button_text) {
		button.html(button_text);
		$(button).prop('disabled', false);
		$("#frmclearexception").trigger('reset');
		$(".select2picker").select2({});
		$('.closeexc').click();
		swal({
		title: 'Are you sure?',
		text: 'Do you want to clear exception?',
		icon: "warning",
		showCancelButton: true,
		confirmButtonClass: 'btn btn-success',
		cancelButtonClass: 'btn btn-danger',
		buttonsStyling: false,
		closeOnClickOutside: false,
		allowOutsideClick: false,
		showLoaderOnConfirm: true,
		position: 'bottom-middle',
		buttons: {
			cancel: "No",
			defeat: "Yes",
		},
	}).then(function (confirm) {
		if (confirm == "defeat" || confirm == "catch") {
		var OrderUID = $('#OrderUID').val();
		$.ajax({
			type: "POST",
			url: base_url + 'OrderComplete/ClearException',
			data: formdata,
			dataType: 'json',
			cache: false,
			processData: false,
			contentType: false,
			beforeSend: function () {
			// button.attr("disabled", true);
			// $submitbuttons.attr("disabled", true);
			button.html('<i class=""fa fa-spin fa-spinner"></i> Loading ...');
		},
		success: function (data) {
			if (data.validation_error == 0) {
				/*Sweet Alert MSG*/

				/*$.notify({
					icon: "icon-bell-check",
					message: data['message']
				}, {
					type: "success",
					delay: 1000
				});
				disposepopover();*/
				// if (check_is_url_contains_string_value(window.location.href)) {
				// 	window.location.reload();
				// } else {
				// 	triggerpage(window.location.href);
				// }
				// $('#ClearException').modal('hide');
				/*setTimeout(function(){ 

					location.reload();

				}, 2000);*/

				swal({
					title: "",
					text: data['message'],
					icon: "success",
					closeOnClickOutside: false,
				    allowOutsideClick: false,
					showCancelButton: false, 
				}).then(function(confirm) {
					disposepopover();

					setTimeout(function(){ 

						location.reload();

					}, 2000);
				});
			} 
			else if(data.validation_error == 2){
				swal("", data['message'], "error");
				/*$.notify({
					icon: "icon-bell-check",
					message: data['message']
				}, {
					type: "danger",
					delay: 4000
				});*/

			}
			else {
				swal("", data['message'], "error");
				/*$.notify({
					icon: "icon-bell-check",
					message: data['message']
				}, {
					type: "danger",
					delay: 1000
				});*/
			}
			button.html(button_text);
			$(button).prop('disabled', false);

			// button.attr("disabled", false);
			// $submitbuttons.attr("disabled", false);
		},
		error: function (jqXHR) {
			swal("", "Failed to Complete", "error");
			/*swal({
				title: "<i class='icon-close2 icondanger'></i>",
				html: "<p>Failed to Complete</p>",
				confirmButtonClass: "btn btn-success",
				allowOutsideClick: false,
				width: '300px',
				buttonsStyling: false
			}).catch(swal.noop);*/
		}
	});
	}
	}, function (dismiss) {
		swal({
			title: 'Cancelled',
			timer: 1000,
			type: 'error',
			confirmButtonClass: "btn btn-info",
			buttonsStyling: false
		}).catch(swal.noop);
		$("#ClearException").modal('hide');
		$("#ClearException").find('textarea').val('');
		$("#ClearException").find('select').val('');
		location.reload();
	});
};

var fn_save_stacking = function () {

	return new Promise(function (resolve, reject) {

		if (is_url_contains_string('Indexing')) {

			arraied = toArray();
			console.table(arraied);
			var jsonString = JSON.stringify(arraied);
			var OrderUID = $('#OrderUID').val();

			var $dataobject = {
				"data": jsonString,
				"OrderUID": OrderUID
			};
			SendAsyncAjaxRequest('POST', 'Indexing/PageInsert', $dataobject, 'json', true, true, function () {
				// addcardspinner($('#AuditCard'));

			}).then(function (data) {

				resolve(data);
			}).catch(function (error) {

				console.log(error);
				reject(error);
			});
		} else {
			resolve('Success');
		}
	});
};

var fn_autosave_auditing = function () {

	return new Promise(function (resolve, reject) {
		var auto_save_answers = $('.answer');
		var $answers = [];
		if (auto_save_answers.length > 0) {

			$(auto_save_answers).each(function (index, element) {
				if ($(element).val()) {
					var tr = $(element).closest('tr');

					var obj = {};
					obj.exception = $(element).closest('tr').find('.exception-level').val();
					obj.comment = $(element).closest('tr').find('textarea').val();
					obj.answer = $(element).val();
					obj.questionuid = $(element).closest('tr').attr('data-questionuid');
					$answers.push(obj);
				}
			});

			$answers = JSON.stringify($answers);
			var OrderUID = $('#OrderUID').val();

			var $objectdata = {
				'answers': $answers,
				'OrderUID': OrderUID
			};
			SendAsyncAjaxRequest('POST', 'Audit/AutoSave', $objectdata, 'json', true, true, function () {
				addcardspinner($('#AuditCard'));
			}).then(function (data) {

				resolve(data);
			}).catch(function (error) {

				reject(error);
			});
		} else {
			resolve('Success');
		}
	});

	console.log($answers);
};


/*^^^^ Document CheckIn Complete Starts ^^^^^*/
$(document).off('click', '#DocumentCheckIncomplete').on("click", '#DocumentCheckIncomplete', function(e){

	e.preventDefault();
	var button = $(this);
	var button_text = $(this).html();

	/*SWEET ALERT CONFIRMATION*/
	swal({
		title: 'Are you sure ?',
		text: 'Do you want to complete the DocumentCheckIn !',
		icon: "warning",
			// buttons: true,
			showCancelButton: true,
			confirmButtonClass: 'btn btn-success',
			cancelButtonClass: 'btn btn-danger',
			buttonsStyling: false,
			closeOnClickOutside: false,
			allowOutsideClick: false,
			showLoaderOnConfirm: true,
			position: 'top-end',
			className: "swal_auto_width",
			buttons: {
				cancel: "Cancel",
				catch: {
					text: "Complete & Go to My Loans!",
					value: "catch",
					className:"btn-success",
				},
				//defeat: "Complete",
			},
	}).then(function(confirm) {	

		if (confirm == "defeat" || confirm == "catch") {

			var complete_action = 0;
			if (confirm == "catch") {
				var complete_action = "Transactions";
			}
			var OrderUID = $('#OrderUID').val();

			$.ajax({
				type: "POST",
				url: base_url+'OrderComplete/DocumentCheckInComplete',
				data: {
					'OrderUID': OrderUID
				},
				dataType: 'json',
				cache: false,
				beforeSend: function () {
					// addcardspinner('#Orderentrycard');
					$(button).html('<i class="fa fa-spin fa-spinner"></i> Completing...');
					$(button).prop('disabled', true);

				},
				success: function(data)
				{
					if (data.validation_error == 0) {
						/*Sweet Alert MSG*/
						/*$.notify({
							icon: "icon-bell-check",
							message: data['message']
						}, {
							type: "success",
							delay: 1000
						});
						disposepopover();
						if (check_is_url_contains_string_value(window.location.href)) {
							window.location.href = base_url + 'DocumentCheckInOrders';
						} else {
							triggerpage(base_url + 'DocumentCheckInOrders');
						}*/

						swal({
							title: "",
							text: data['message'],
							icon: "success",
							closeOnClickOutside: false,
						    allowOutsideClick: false,
							showCancelButton: false, 
						}).then(function(confirm) {
							disposepopover();
							/*if (check_is_url_contains_string_value(window.location.href)) {
								window.location.href = base_url + 'DocumentCheckInOrders';
							} else {
								window.location.href = base_url + 'DocumentCheckInOrders';
							}*/
							setTimeout(function(){
								if (complete_action) {
									window.location.href = base_url + complete_action;
								} else {
									location.reload();
								}
							},500);
						});
					} else {swal({
							title: "Document Not Upload",
							text: "Please Upload the Document",
							icon: "warning",
							dangerMode: true,
						})
						.catch(swal.noop);
					}
					$(button).prop('disabled', false);
					$(button).html(button_text);
				}
			})
			.always(function () {
				// removecardspinner('#Orderentrycard');
				$(button).html(button_text);
				$(button).prop('disabled', false);

			});
		}

	}, function (dismiss) {});
});
/*^^^^ Document CheckIn Complete Ends ^^^^^*/

// Export Document Submit
$(document).off('click', '.btn-export-document').on('click', '.btn-export-document', function (e) {  
	e.preventDefault();

	var OrderUID = $('#ExportDocument_OrderUID').val();
	var OrderNumber = $('#ExportDocument_OrderNumber').val();
	var LoanNumber = $('#ExportDocument_LoanNumber').val();
	/*@DESC To Get Export Document at DE, PC, Excep, QR Workflows @Karthiga 21/3/2022*/
	var Tab = $('#ExportDocument_Tab').val();

	console.log(Tab)
	if($("input:radio.exportformat:checked").val() < 3 && $("#hid_apicred").val()==1)
	{
		var filtype	=	($("input:radio.exportformat:checked").val()==1) ? 1 : 2;
		$.ajax({
			type: "POST",
			url: base_url+'Indexing/ExportDocumentAPI',
			dataType: 'json',
			data: { 'OrderUID': OrderUID,'projiddval': $("#hid_projid").val(),'export_grp_id': $('#ExportGroupUID').val(),'filtype': filtype },
			beforeSend: function () {
				$('.page_loader_div').show();
			},
			success: function (data) {

				$('.page_loader_div').hide();
				swal("", "Document Export is inprogress. Once its completed will be displayed in the download summary section.", "success");
				
			},
			error: function (jqXHR) {
				$('.page_loader_div').hide();
				swal("", "Document Export is inprogress. Once its completed will be displayed in the download summary section.", "success");
			}
		});  
		return false;
	}
	console.log('OrderUID - '+OrderUID);
	console.log('OrderNumber - '+OrderNumber);
	console.log('LoanNumber - '+LoanNumber);

	var TableData = new Array();
	if ($('#export1').prop('checked') || $('#export2').prop('checked')|| $('#export3').prop('checked')|| $('#export4').prop('checked') || $('#export5').prop('checked')) {
		var ExportGroupUID = $('#ExportGroupUID').val();
		var responseobj = {
			"SinglePDF": $('#export1').prop('checked'),
			"ZipFile": $('#export2').prop('checked'),
			"XML": $('#export3').prop('checked'),
			"folder":$('#export4').prop('checked'),
			"audit":$('#export5').prop('checked'),
		};
		var fn_array = []
		if (responseobj.SinglePDF) {
			console.log('OrderUID - '+OrderUID);
			console.log('OrderNumber - '+OrderNumber);
			console.log('LoanNumber - '+LoanNumber);
			console.log('ExportGroupUID - '+ExportGroupUID);
			var FileType = 'PDF';/*@DESC File type for Export document @Karthiga 21/3/2022*/
			fn_array[0] = ExportPDF(OrderUID, OrderNumber, LoanNumber, ExportGroupUID,Tab);
		}
		if (responseobj.ZipFile) {
			var FileType = 'Zip';/*@DESC File type for Export document @Karthiga 21/3/2022*/
			fn_array[1] = ExportZip(OrderUID, OrderNumber,LoanNumber, ExportGroupUID,Tab);
		}
		if (responseobj.XML) {
			var FileType = 'XML';/*@DESC File type for Export document @Karthiga 21/3/2022*/
			fn_array[2] = ExportXML(OrderUID, OrderNumber,LoanNumber,Tab);
		}
		if (responseobj.folder) {
			var FileType = 'Folder';/*@DESC File type for Export document @Karthiga 21/3/2022*/
			fn_array[3] = ExportAsFolder(OrderUID, OrderNumber,LoanNumber,Tab);
		}
		if (responseobj.audit) {
			var FileType = 'Audit';/*@DESC File type for Export document @Karthiga 21/3/2022*/
			fn_array[4] = ExportAuditCheckList(OrderUID, OrderNumber,LoanNumber,Tab);
		}

		console.log(FileType)
		var function_updatemainstoragestatus = "";
		Promise.race(fn_array).then(function (response) {
			console.log('inside promise');
			function_updatemainstoragestatus = DeleteOrderFilesFromMainStorage(OrderUID);
			/*@DESC To Get Export Document at DE, PC, Excep, QR Workflows @Karthiga 21/3/2022*/
			console.log('Before If');
			if (function_updatemainstoragestatus) {
				console.log('After Deleted');
				if (Tab!='Completed' && Tab!='Export') {
					console.log('For Workflows');
					ExportLogAllWorkflows = ExportStatusUpdateForAllWorkflows(OrderUID,FileType,Tab); 
				}
			}		
			$('#exportdoc_Popup').modal('toggle');
			swal("", "Document Exported Successfully", "success");

		});
		/*@DESC To make Proper Activity log capturing did a Promise By @Karthiga @30/03/2022*/
		// Promise.race(fn_array).then(function (response) {
		// let Prmise = new Promise((resolve, reject) =>{
		// 	console.log('inside my promise');
		// 	function_updatemainstoragestatus = DeleteOrderFilesFromMainStorage(OrderUID);
		// 	if(function_updatemainstoragestatus) {
		// 		resolve('Success');
		// 	}
		// 	else {
		// 		reject('Failed');
		// 	}
		// });
		// Prmise.then((message) => {
		// 	console.log('Prmise then');
		// 	if (Tab!='Completed' && Tab!='Export') {
		// 		ExportLogAllWorkflows = ExportStatusUpdateForAllWorkflows(OrderUID,FileType,Tab);
		// 	}
		// 	else {

		// 	}
		// 	// $('#exportdoc_Popup').modal('toggle');
		// 	// swal("", "Document Exported Successfully", "success");
		// 	console.log(message); 
		// }).catch((message) => {
		// 	console.log(message); 
		// });
		// });
		/*My Promise Done*/

		Promise.race(function_updatemainstoragestatus).then(function (response) {			
			if (location.href == base_url+'Export') {
				triggerpage(base_url+'Export');
			}
		});
		
		$('.page_loader_div').hide();

	}
	else {
		swal("", "Please choose export document type!", "error");
		$('.page_loader_div').hide();
	}

});

// Start Changes by Raveena
/*@DESC To Get Export Document at DE, PC, Excep, QR Workflows @Karthiga 21/3/2022*/
function SwalConfirmExport(OrderUID, OrderNumber, currentrow, table, LoanNumber,Tab) {
	$('.page_loader_div').show();
	$.ajax({
		type: "POST",
		url: base_url+'Export/GetExportType_new',
		dataType: 'json',
		/*@DESC To Get Export Document at DE, PC, Excep, QR Workflows @Karthiga 21/3/2022*/
		data: { 'OrderUID': OrderUID,'Tab':Tab },
		success: function (data) {

			// Export document html content start
			$(".export_document_body").html(data);
			$(".exportgroup_select2").select2("destroy").select2();
			$('.page_loader_div').hide();
			$('#exportdoc_Popup').modal('toggle');
			// Export document html content end
		}
	});  

	$('.page_loader_div').hide();
	// End Changes by Raveena
}

/*@Desc Delete order files from main storage @Author SathishKumar @Added on Feb 16 2021*/
function DeleteOrderFilesFromMainStorage(OrderUID) {
	return new Promise(function (resolve, reject) {
		$.ajax({
			type: "POST",
			url: base_url+'CommonController/DeleteOrderFilesFromMainStorage',
			dataType: 'json',
			data: { 'OrderUID': OrderUID },
			success: function (data) {
				console.log(data);
				resolve('Success');
			}
		});
	});	
}

// For Export email Start
// By Raveena
function SwalConfirmExportEmail(OrderUID, OrderNumber, currentrow, table, LoanNumber) {
	//
	$('.page_loader_div').show();
	$.ajax({
		type: "POST",
		url: base_url+'Export/GetExportEmailType_new',
		dataType: 'json',
		data: { 'OrderUID': OrderUID },
		success: function (data) {
			$('.Send_Email_Modal_popup_container').html(data);
			$('.select2_selectemail').select2({
				tags: true,
				placeholder: "Select a Email"
			});    

			$('.select2_single_select').select2({

			});

			$('#expiration-days').trigger('change');

			$('#sendemail_Popup').modal('toggle');
		}
	});  	
	$('.page_loader_div').hide();
}
// End 

// Export Email Submit
$(document).off('click', '.btn-export-email').on('click', '.btn-export-email', function (e) {  
	e.preventDefault();
	$('.btn-export-email').prop('disabled', true);
	$('.page_loader_div').show();
	var OrderUID = $('#ExportEmail_OrderUID').val();
	var OrderNumber = $('#ExportEmail_OrderNumber').val();
	var LoanNumber = $('#ExportEmail_LoanNumber').val();	

	var TableData = new Array();				

	$("#export_table input[type=checkbox]").each(function (row) {											
		if ($(this).prop('checked')==true){ 
			TableData[row] = {
				"ExportDoc": $(this).val(),
			}
		}
	});
	
	TableData.shift(); // first row will be empty - so remove
	TableData = TableData.filter(function (el) {
		$('.btn-export-email').prop('disabled', false);
		$('.page_loader_div').hide();
		return el != null;
	});

	if($('#ExportEmail').val() == ""){
		$('#error_email').html("Please select email!");
		$('.change_text_name').html('Send');
		$('.btn-export-email').prop('disabled', false);
		$('.page_loader_div').hide();
		return false;
	}	

	if($('#expiration-days').val() == "" || $('#expiration-days').val() == 0){
		$('#expiration-days-limit-info').html('Please enter the expiration days');
		$('#expiration-days-limit-info').show();
		$('.change_text_name').html('Send');
		$('.btn-export-email').prop('disabled', false);
		$('.page_loader_div').hide();
		return false;
	}

	if(TableData.length === 0){
		$('#error_doc').html("Please select atleast one document!");
		$('.change_text_name').html('Send');
		$('.btn-export-email').prop('disabled', false);
		$('.page_loader_div').hide();
		return false;
	}
	else{

		var MailData;
		MailData = JSON.stringify(TableData);

		var ExportDocSizeTxt = $('#ExportDocSizeTxt').val();
		var ExportEmail = $('#ExportEmail').val();
		var PdfDoc = $(".pdfDoc:checked").val();
		var xmlDoc = $(".xmlDoc:checked").val();
		var attachzipurl = $("#attachzipurl").val();
		var expirationdays = $("#expiration-days").val();
		var mailSent=[];
		if(PdfDoc == 'on' || xmlDoc == 'on'){			
			if(MailData!="" && ExportDocSizeTxt!=1 && ExportEmail!=""){
				$('.page_loader_div').show();
				mailSent[1] = SendDocEmail(OrderUID,OrderNumber,LoanNumber,MailData,PdfDoc,xmlDoc,ExportEmail,attachzipurl,expirationdays);
			}
		}
		else{
			$('#error_doctype').html("Please select atleast one!");
			$('.change_text_name').html('Send');
			$('.btn-export-email').prop('disabled', false);
			$('.page_loader_div').hide();
			return false;
		}
		// return false;
		Promise.race(mailSent).then(function (response) {
			// $('.page_loader_div').hide();
			if (location.href == base_url+'Export') {
				triggerpage(base_url+'Export');
			}
		})
	}
});

function ExportPDF(OrderUID, OrderNumber, LoanNumber, ExportGroupUID='',Tab) {

	this.ExportGroupUID = ExportGroupUID;
	return new Promise(function (resolve, reject) {
		//Getting the naming convention from project setup for single pdf 
		var SinglePDFName =	$('#SinglePDFName').val();
		var clickable_link = document.createElement('a');
		/*@DESC To Get Log at Activity log and Attachments @Karthiga 21/3/2022*/
		var SaveOnly = 1;
		var tDocumentsVal = 'empty';
		var ExportGroupUID = this.ExportGroupUID;
		if(ExportGroupUID == ''){
		 ExportGroupUID = 'empty';			
		}
		if (Tab == 'Completed' || Tab == 'Export') {
			var WorkFlowExport = 0;
		}
		else{
			var WorkFlowExport = 1;
		}
		
		clickable_link.href = base_url + 'Indexing/DownloadPDF/' + OrderUID +'/'+ ExportGroupUID +'/'+ tDocumentsVal +'/'+ SaveOnly +'/'+ WorkFlowExport;

		console.log(clickable_link.href)
		/*@DESC To Get Log at Activity log and Attachments @Karthiga 21/3/2022*/
		// clickable_link.target = '_blank';
		// if(SinglePDFName == ""){
		// 	clickable_link.download = (LoanNumber ? LoanNumber : OrderNumber) + "_Export.pdf";
		// } else {
		// 	var SaveOnly = 1;
		// 	console.log(SaveOnly)
			
		// 	clickable_link.download =  SinglePDFName + "_Export.pdf";
		// }
		clickable_link.click();
		resolve('Success');
		console.log('pdf generated')
		/*^^^^^ OR USE Below ^^^^*/

		// $.ajax({
		// 	type: "POST",
		// 	url: base_url+'Indexing/DownloadPDF/' + OrderUID,
		// 	xhrFields: {
		// 		responseType: 'blob',
		// 	},
		// 	beforeSend: function () {

		// 	},
		// 	success: function (data) {
		// 		var filename = (LoanNumber ? LoanNumber : OrderNumber) + "_Export.pdf";
		// 		if (typeof window.chrome !== 'undefined') {
		// 			// Chrome version
		// 			var link = document.createElement('a');
		// 			link.href = window.URL.createObjectURL(data);
		// 			link.download = filename;
		// 			link.click();
		// 		} else if (typeof window.navigator.msSaveBlob !== 'undefined') {
		// 			// IE version
		// 			var blob = new Blob([data], { type: 'application/pdf' });
		// 			window.navigator.msSaveBlob(blob, filename);
		// 		} else {
		// 			// Firefox version
		// 			var file = new File([data], filename, { type: 'application/force-download' });
		// 			window.open(URL.createObjectURL(file));
		// 		}
		// 		resolve('Success');
		// 	},
		// 	error: function (jqXHR, textStatus, errorThrown) {

		// 		console.log(jqXHR);
		// 		reject('error');


		// 	},
		// 	failure: function (jqXHR, textStatus, errorThrown) {

		// 		console.log(errorThrown);

		// 	},
		// });
	})

}



// Start Changes by Raveena
// function SendDocEmail(OrderUID,OrderNumber,LoanNumber,ExportEmail,ExportDoc,PdfDoc,xmlDoc){
	function SendDocEmail(OrderUID,OrderNumber,LoanNumber,MailData,PdfDoc,xmlDoc,ExportEmail,attachzipurl,expirationdays){
		return new Promise(function (resolve, reject) {
		// var dataString = "OrderUID="+OrderUID+"&ExportEmail="+ExportEmail+"&ExportDoc="+ExportDoc+"&OrderNumber="+OrderNumber+"&LoanNumber="+LoanNumber+"&PdfDoc="+PdfDoc+"&xmlDoc="+xmlDoc;
		var dataString = "OrderUID="+OrderUID+"&MailData="+MailData+"&ExportEmail="+ExportEmail+"&OrderNumber="+OrderNumber+"&LoanNumber="+LoanNumber+"&PdfDoc="+PdfDoc+"&xmlDoc="+xmlDoc+"&attachzipurl="+attachzipurl+"&expirationdays="+expirationdays;
		$.ajax({
			type: "POST",
			url: base_url+'Indexing/SendDocEmail/',
			// xhrFields: {
			// 	responseType: 'blob',
			// },
			dataType: 'json',
			data: dataString,
			beforeSend: function () {

			},
			success: function (data) {
				$('.page_loader_div').hide();
				$('#sendemail_Popup').modal('toggle');
				$('.change_text_name').html('Cancel');
				if(data.error== 0){

					swal({
						title: "Success!",
						text: data.msg,
						icon: "success",
						button: "Close",
					});
				}
				else
				{

					swal({
						title: "Error!",
						text: data.msg,
						icon: "warning",
						button: "Close",
					});
				}			

			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
				reject('error');
			},
			failure: function (jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
				reject('error');

			},
		});
		resolve('Success');
	})
	}
// End changes by Raveena

function ExportZip(OrderUID, OrderNumber,LoanNumber, ExportGroupUID='',Tab) {
	this.ExportGroupUID = ExportGroupUID;
	return new Promise(function (resolve, reject) {
		//Getting the naming convention from project setup for ZIP 
		/*@DESC To Get Log at Activity log and Attachments @Karthiga 21/3/2022*/
		var ZipName =	$('#ZipName').val();
		var SplitPDF = 'empty';
		var reviewcomplete = 1;
		var ExportGroupUID = this.ExportGroupUID;
		if(ExportGroupUID == ''){			
		 ExportGroupUID = 'empty';
		}
		if (Tab == 'Completed' || Tab == 'Export') {
			var WorkFlowExport = 0;
		}
		else{
			var WorkFlowExport = 1;
		}
		var clickable_link = document.createElement('a');
		console.log(SplitPDF)
		clickable_link.href = base_url + 'Indexing/DownloadZip/' + OrderUID +'/'+ ExportGroupUID +'/'+ SplitPDF +'/'+ reviewcomplete +'/'+ WorkFlowExport;
		console.log(clickable_link.href);
		/*@DESC To Get Log at Activity log and Attachments @Karthiga 21/3/2022*/
		// clickable_link.href = base_url + 'Indexing/DownloadZip/' + OrderUID +'/'+ ExportGroupUID;
		// clickable_link.target = '_blank';
		// if(ZipName == ""){
		// 	clickable_link.download = (LoanNumber ? LoanNumber : OrderNumber) + "_Export.zip";
		// } else {
		// 	clickable_link.download = ZipName + "_Export.zip";
		// }
		clickable_link.click();
		resolve('Success');

		// $.ajax({
		// 	type: "POST",
		// 	url: base_url+'Indexing/DownloadZip/' + OrderUID,
		// 	xhrFields: {
		// 		responseType: 'blob',
		// 	},
		// 	data: { 'OrderUID': OrderUID },
		// 	beforeSend: function () {

		// 	},
		// 	success: function (data) {

		// 		var filename = (LoanNumber ? LoanNumber : OrderNumber) + "_Export.zip";
		// 		if (typeof window.chrome !== 'undefined') {
		// 			// Chrome version
		// 			var link = document.createElement('a');
		// 			link.href = window.URL.createObjectURL(data);
		// 			link.download = filename;
		// 			link.click();
		// 		} else if (typeof window.navigator.msSaveBlob !== 'undefined') {
		// 			// IE version
		// 			var blob = new Blob([data], { type: 'application/zip' });
		// 			window.navigator.msSaveBlob(blob, filename);
		// 		} else {
		// 			// Firefox version
		// 			var file = new File([data], filename, { type: 'application/force-download' });
		// 			window.open(URL.createObjectURL(file));
		// 		}
		// 		resolve('Success');
		// 	},
		// 	error: function (jqXHR, textStatus, errorThrown) {

		// 		console.log(jqXHR);
		// 		reject('error');


		// 	},
		// 	failure: function (jqXHR, textStatus, errorThrown) {

		// 		console.log(errorThrown);

		// 	},
		// });
	})

}

function ExportSplitPDF(OrderUID) {

	$.ajax({
		type: "POST",
		url: base_url+'Indexing/DownloadAllPDF/' + OrderUID,
		dataType: 'json',
		data: { 'OrderUID': OrderUID },
		beforeSend: function () {

		},
		success: function (data) {

			if(data.file){
				for (var i = 0; i < data.file.length; i++) {
					
					var filename = data.file[i];
					var url = data.url[i];
					var clickable_link = document.createElement('a');
					clickable_link.href = url+filename;
					clickable_link.target = '_blank';
					clickable_link.download = filename;
					clickable_link.click();
					
				}
				setTimeout(function(){ 

					location.reload();

				}, 1000);
			}else{
				/*$.notify({
					icon: "icon-bell-check",
					message: "Failed to download"
				}, {
					type: "danger",
					delay: 1000
				});*/

				swal({
					title:"",
					text:"Failed to download",
					icon:"error",
					closeOnClickOutside: false,
					closeOnClickOutside: false,
					showCancelButton : false,
					dangerMode: true
				}).catch(swal.noop);
			}

				// resolve('Success');
			},
			error: function (jqXHR, textStatus, errorThrown) {

				console.log(jqXHR);
				


			},
			failure: function (jqXHR, textStatus, errorThrown) {

				console.log(errorThrown);

			},
		});
	

}


// Madhuri XML Export

function ExportXML(OrderUID, OrderNumber,LoanNumber,Tab) {

	return new Promise(function (resolve, reject) {

		//Getting the naming convention from project setup for XML 
		var XMLName =	$('#XMLName').val();
		/*@DESC To Get Log at Activity log and Attachments @Karthiga 21/3/2022*/
		if (Tab == 'Completed' || Tab == 'Export') {
			var WorkFlowExport = 0;
		}
		else{
			var WorkFlowExport = 1;
		}
		$.ajax({
			type: "POST",
			url: base_url+'Export/XMLDownload/' + OrderUID,
			dataType: 'json',
			data: { 'OrderUID': OrderUID, 'WorkFlowExport':WorkFlowExport},
			beforeSend: function(){
				// addcardspinner('#Orderentrycard');
			},
			success: function (data) {		
				var clickable_link = document.createElement('a');
				clickable_link.href = base_url + data.filename;
				/*@DESC To Get Log at Activity log and Attachments @Karthiga 21/3/2022*/
				// clickable_link.target = '_blank';
				// if(XMLName == ""){
				// 	clickable_link.download = (LoanNumber ? LoanNumber : OrderNumber) + "_results.xml";
				// } else {
				// 	clickable_link.download =  XMLName + "_results.xml";
				// }
				clickable_link.click();
				
			},
			error: function (jqXHR, textStatus, errorThrown) {

				console.log(jqXHR);
				reject('error');


			},
			failure: function (jqXHR, textStatus, errorThrown) {

				console.log(errorThrown);

			},
		});
		resolve('Success');
	})

}
function ExportAsFolder(OrderUID, OrderNumber,LoanNumber) {

	return new Promise(function (resolve, reject) {

		$.ajax({
			type: "POST",
			url: base_url+'Export/ExportAsFolder/' + OrderUID,
			dataType: 'json',
			data: { 'OrderUID': OrderUID },
			beforeSend: function(){
				// addcardspinner('#Orderentrycard');
			},
			success: function (data) {	
				if(data == '1')
				{
					swal({
						title: 'Success!',
						text: 'Loan is uploading to client FTP',
						type: 'success',
						confirmButtonClass: "btn btn-success",
						buttonsStyling: false

					})
				}
				else
				{
					swal({
						title: 'Error!',
						text: 'Some Error Accured !',
						type: 'danger',
						confirmButtonClass: "btn btn-success",
						buttonsStyling: false

					})
				}			
				
				
			},
			error: function (jqXHR, textStatus, errorThrown) {

				console.log(jqXHR);
				reject('error');


			},
			failure: function (jqXHR, textStatus, errorThrown) {

				console.log(errorThrown);

			},
		});
		resolve('Success');
	})

}

/**
  * Function for Exporting Audit Checklist
  *
  * @throws no exception
  * @author Chitransh Mathur
  * <chitransh.mathur@avanzegroup.com>
  * @return NULL
  * @since 21st August 2020
  *
  */ 
  function ExportAuditCheckList(OrderUID, OrderNumber,LoanNumber,Tab){
  	if(OrderUID != ""){
  		console.log('ExportAuditCheckList')
  		/*@DESC To Get Log at Activity log and Attachments @Karthiga 21/3/2022*/
  		if (Tab == 'Completed' || Tab == 'Export') {
			var WorkFlowExport = 0;
		}
		else{
			var WorkFlowExport = 1;
		}
  		window.location = base_url+'Audit/ExportAuditCheckList/'+OrderUID +'/'+ WorkFlowExport;
  	}

  }

  function toArray() {
  	var pages = $('ol.sortable .leaf');
  	var JSONArray = [];
  	$(pages).each(function (key, elem) {
  		var dataobject = {};


  		var documenttype = findParentElement($(elem)[0], 'li');
  		var category = findParentElement($(documenttype)[0], 'li');
  		var InstanceUID = 1;
  		if ($(documenttype).attr('data-instance')) {
  			InstanceUID = $(documenttype).attr('data-instance');
  		}
  		dataobject.CategoryName = $(category).attr('data-category');
  		dataobject.DocumentTypeName = $(documenttype).attr('data-documenttype');
  		dataobject.Page = $(elem).attr('data-category');
  		dataobject.InstanceUID = InstanceUID;
  		JSONArray.push(dataobject);
  	})

  	console.table(JSONArray);
  	return JSONArray;
  }


  function findParentElement(elem, tagName) {
  	var parent = elem.parentNode;

  	if (parent && parent.tagName && parent.tagName.toLowerCase() != tagName) {
  		parent = findParentElement(parent, tagName);
  	}
  	return parent;
  }

$(".OrderRevokeBtn").click(function(e){
  	var OrderUID =$('#OrderUID').val();
  	swal({
  		title: 'Are you sure?',
  		text: "You want to revoke this Loan ?",
  		buttons: true,
  		type: 'warning',
  		showCancelButton: true,
  		confirmButtonClass: 'btn btn-success',
  		cancelButtonClass: 'btn btn-danger',
  		confirmButtonText: 'Yes',
  		buttonsStyling: false
  	}).then(function(willrovoke) {
  		if (willrovoke) {
  			swal({
  				title: 'Revoked!',
  				text: 'Your order has been Revoked.',
  				type: 'success',
  				confirmButtonClass: "btn btn-success",
  				buttonsStyling: false

  			})
  			$.ajax({
  				type :"POST",
  				url : base_url+'CommonController/CancelOrderRevoke',
  				data :{OrderUID:OrderUID},
  				dataType:"json",
  				beforeSend: function () {
  					$('.page_loader_div').show();
  				},
  				success: function(response){
  					if(response.validation_error == 1)
  					{
  						swal({
  							text: response.message,
  							icon: "success",
  							confirmButtonClass: "btn btn-success",
  							allowOutsideClick: false,
  							width: '300px',
  							buttonsStyling: false
  						}).catch(swal.noop);

  						setTimeout(function(){ 

  							location.reload();

  						}, 3000);
  					} else {
  						$('.page_loader_div').hide();
  						swal({
							text: response.message,
  							icon: "warning",
  							confirmButtonClass: "btn btn-success",
  							allowOutsideClick: false,
  							width: '300px',
  							buttonsStyling: false
  						}).catch(swal.noop);
  					}
  				}
  			});
  		}

  	}).catch(swal.noop);
  });


$(document).off('click','.WorkflowBtnOnHoldSubmit').on('click','.WorkflowBtnOnHoldSubmit',function(e){
	e.preventDefault();
	e.stopPropagation();
	var OrderUID = $('#OrderUID').val();
	var comments = $('#workflow_onhold_comments').val();
	var UserEmails = $('#workflow_onhold_UserEmails').val();
	var moduleName = $(this).attr('data-name');
	var Buttontype = $(this).attr('data-button');
	if(Buttontype == 'email'){
		var CustomerNotification = 'on';
	}else{
		var CustomerNotification = 'off';
	}

	if(comments == ''){
		$('#workflow_onhold_comments').addClass('highlight-invalid');
		/*$(".toast-body-Warning").html("Remarks Mandatory");
		$("#liveToastWarning").toast("show");*/
		swal({
                
                text: "Remarks Mandatory",
                icon: "warning",
                confirmButtonClass: "btn btn-success",
                allowOutsideClick: false,
                width: '300px',
                buttonsStyling: false
              }).catch(swal.noop);
		return false;
	}		

	var button = $('.WorkflowBtnOnHoldSubmit');
	var button_text = $('.WorkflowBtnOnHoldSubmit').html();

	$(button).prop('disabled', true);
	//$(button).html('OnHolding...');

	$.ajax({
		type: "POST",
		url: base_url + 'OrderComplete/OrderOnHold',
		data: {OrderUID:OrderUID,comments:comments,CustomerNotification:CustomerNotification,UserEmails:UserEmails,Theme:'NewTheme',ModuleName:moduleName},
		dataType: 'json',
		cache: false,
		beforeSend: function () {
			/*button.attr("disabled", true);
			button.html('Loading ...');*/
		},
		success:function(response){
			console.log(response);
			if (response.validation_error == 1) {
				swal({
					text: response.message,
					icon: "success",
					confirmButtonClass: "btn btn-success",
					allowOutsideClick: false,
					width: '300px',
					buttonsStyling: false
				}).catch(swal.noop);

				setTimeout(function(){ 

					location.reload();

				}, 3000);
			} else {
				swal({
					text: response.message,
					icon: "warning",
					confirmButtonClass: "btn btn-success",
					allowOutsideClick: false,
					width: '300px',
					buttonsStyling: false
				}).catch(swal.noop);
				$('.WorkflowBtnOnHoldSubmit').html(button_text);
			}

		}

	})
});

$(document).off('click','.BtnReleaseOnHold').on('click','.BtnReleaseOnHold',function(e){
	var OrderUID =$('#OrderUID').val();
	var OnHoldUID =$('#OnHoldUID').val();

	var button = $('.BtnReleaseOnHold');
	var button_text = $('.BtnReleaseOnHold').html();

	var comments = $('#workflow_onhold_comments').val();
	var CustomerNotification = $('#workflow_onhold_CustomerNotification').val();
	var UserEmails = $('#workflow_onhold_UserEmails').val();

	if(comments == ''){
		$('#workflow_onhold_comments').addClass('highlight-invalid');
		/*$(".toast-body-Warning").html("Comments Mandatory");
		$("#liveToastWarning").toast("show");*/
		 swal({
                
                text: "Remarks Mandatory",
                icon: "warning",
                confirmButtonClass: "btn btn-success",
                allowOutsideClick: false,
                width: '300px',
                buttonsStyling: false
              }).catch(swal.noop);
          
	
		return false;
	}

	$.ajax({
		type: "POST",
		url: base_url + 'OrderComplete/ReleaseOnHold',
		data: {OrderUID:OrderUID,OnHoldUID:OnHoldUID,comments:comments,CustomerNotification:CustomerNotification,UserEmails:UserEmails,Theme:'NewTheme'},
		dataType: 'json',
		cache: false,
		beforeSend: function () {
			// button.attr("disabled", true);
			// button.html('Loading ...');
		},
		success:function(response){
			console.log(response);
			if (response.validation_error == 1) {
				{
					$(".toast-body-Success").html(response.message);
					$("#liveToastSuccess").toast("show");

					setTimeout(function(){ 

						location.reload();

					}, 3000);
				}
			} else {
				$(".toast-body-Warning").html(response.message);
				$("#liveToastWarning").toast("show");
				$('.WorkflowBtnOnHoldSubmit').html(button_text);
			}

		}

	})

});


  /*######## Orderentry and ordersummary form submit starts #########*/


  /*For single entry*/
			// $(document).off('click',".single_submit").on('click',".single_submit", function(e) {
			// 	$(".single_submit", $(this).parents("form")).removeAttr("clicked");
			// 	$(this).attr("clicked", "true");
			// 	console.log($(this));
			// });
			$(document).off('click','.single_submit').on('click','.single_submit',function(e){
				OrderEntryBtnID = $(this).attr('id'); 
			});
			/*@Desc Single Entry Document Upload alert @Author Jainulabdeenb @Added on Dec 14 2020*/
			var UploadType = '';
			$(document).off('submit', '#order_frm').on('submit', '#order_frm', function(event) {
				/* Act on the event */
				event.preventDefault();
				event.stopPropagation();

				$('#DocumentUpload').val('');
				var formData = new FormData($(this)[0]);
				var formDataValue = $(this).serialize();
				formData.append('LoansInsertedVia', 'Single');

				$.each(filetoupload, function (key, nfile) {

					formData.append('FileNames[]', nfile.filename);
					formData.append('Position[]', nfile.Position);
					formData.append('DocTypeUID[]', nfile.DocTypeUID);
					formData.append('DocTypeName[]', nfile.DocTypeName);
					formData.append('ObjectKey[]', key);

				});
				UploadType = 'Merge';
				// InsertData(formData,formDataValue); // Old One
				InsertData_New(formData,formDataValue); // New One

				/*if (filetouploadnew.length > 0) {

					swal({
						title: 'Choose Upload Type',
						html:
						`
						<div class="text-left ml-20 mt-30" style="font-size:16px;">
						<div class="form-check">
						<label class="form-check-label">
						<input id="mergeupload" type="radio" class="form-check-input uploadtype" name="radio-uploadtype" value="Merge" checked> Upload and Merge to Classification  Document
						<span class="circle">
						<span class="check"></span>
						</span>
						</label>
						</div>` +
						`<div class="form-check">
						<label class="form-check-label">
						<input id="seperateupload" type="radio" class="form-check-input uploadtype" name="radio-uploadtype" value="Seperate"> Upload as Separate Document
						<span class="circle">
						<span class="check"></span>
						</span>
						</label>
						</div>
						</div>`,
						showCancelButton: true,
						confirmButtonClass: "btn btn-success",
						cancelButtonClass: "btn btn-danger",
						confirmButtonText: "Upload Files",
						cancelButtonText: "Cancel",
						closeOnConfirm: false,
						closeOnCancel: true,
						showLoaderOnConfirm: true,
						buttonsStyling: false,
						preConfirm: function () {
							return new Promise(function (resolve, reject) {

								if ($('#seperateupload').prop('checked') ) {
									UploadType = 'Seperate';
								}
								else {
									UploadType = 'Merge';
								}
								resolve("true");
							})
						},
						onOpen: function () {
							$('#mergeupload').focus()
						}
					}).then(function (result) {
						InsertData(formData);
					}).catch(swal.noop)
				}
				else{            
					InsertData(formData);
				}*/

			});
			/*@Desc Insert Data @Author Jainulabdeenb @Added on Dec 14 2020*/
			function InsertData(formData,formDataValue){

				button = $(".single_submit[clicked=true]");
				button_val = $(".single_submit[clicked=true]").val();
				button_text = $(".single_submit[clicked=true]").html();
				console.log(button);
				/*@Decs Function Call for validate the unwanted input @Author Aravindhan R @Added on June 25 2021 */
				var unwanted=unwanted_input(formDataValue);
				if(unwanted==true){
				var progress=$('#orderentry-progressupload .progress-bar');

				$.ajax({
					type: "POST",
					url: base_url + 'Orderentry/insert',
					data: formData, 
					dataType:'json',
					cache: false,
					processData:false,
					contentType:false,
					beforeSend: function(){
			// addcardspinner('#Orderentrycard');
			button.attr("disabled", true);
			button.html('Loading ...'); 
			if (filetoupload.length || filetouploadnew.length) {
				$("#orderentry-progressupload").show();
			}
		},
		xhr: function () {
			var xhr = new window.XMLHttpRequest();
			if (filetoupload.length || filetouploadnew.length) {
				xhr.upload.addEventListener("progress", function (evt) {
					if (evt.lengthComputable) {
						var percentComplete = evt.loaded / evt.total;
						percentComplete = parseInt(percentComplete * 100);
						$(progress).width(percentComplete + '%');
						$(progress).text('' + percentComplete + '%');
					}
				}, false);
			}
			return xhr;
		},
		success: function(data)
		{
			if(data['validation_error'] == 0){

				var aFileSubmit = [];
				var files = [];
				var respOrderUIDs = data['id'];

				$.each(filetoupload, function (key, value) {
					files.push(value.filename);
				})

				$.each(data['matching_files'], function (fkey, fvalue) {

					var currentfield = filetoupload.filter(function (element, index) {
						return element.filename == fvalue.FileNames && element.Position == fvalue.Position;
					});

					if (currentfield) {
						var fFormData = new FormData();
						fFormData.append('DocumentFiles[]', currentfield[0].file);
						fFormData.append('OrderUID[]', fvalue.OrderUID);
						fFormData.append('UploadType', "Separate");
						fFormData.append('MergeLater', "Yes");
						fFormData.append('Files[]', currentfield[0].filename);

						aFileSubmit.push(SendFileAsync(fFormData, currentfield[0].filename));

					}
				})
				if (filetouploadnew && filetouploadnew.length > 0) {
					var aFileSubmitNew = [];
					var filesNew = [];
					var respOrderUIDs = data['id'];

					$.each(filetouploadnew, function (key, value) {
						filesNew.push(value.filename);
					})

					$.each(filetouploadnew, function (key, value) {

						var fFormData = new FormData();
						fFormData.append('OrderUID[]', respOrderUIDs);
						fFormData.append('DocumentFiles[]', value.file);

						$.each(filesNew, function (fKey, fValue) {
							var fileextension = value.filename.split('.').pop();
							if(fileextension == 'zip' || fileextension == 'pdf'){
								fFormData.append('Files[]', value);
							}
							else{
								return;
							}

						})

						fFormData.append('UploadType', UploadType);

						if (UploadType == 'Merge') {
							fFormData.append('UploadType', "Separate");
							fFormData.append('MergeLater', "Yes");
						}

						aFileSubmitNew.push(SendFileAsync(fFormData, value.filename));
					});
				}
				$(".toast-body-Success").html(data['message']);
				$("#liveToastSuccess").toast("show");
				var mergeavailable = false;
				Promise.all(aFileSubmit).then(function(response) {
						// make ajax to merge uploaded files.
						mergeavailable = true;
						MergeFilesLater();
					});

				var multiplemergeavailable = false;

				if (aFileSubmitNew && aFileSubmitNew.length > 0) {
					multiplemergeavailable = true;
					Promise.all(aFileSubmitNew).then(function(response) {
							// make ajax to merge uploaded files.

							MergeFilesLater().then(function(response) {
								/*Auto Complete Doc CheckIn*/
								$.when(CheckAutoComplete(data['id'][0])).done(function(a1){

									setTimeout(function() { 
										if (OrderEntryBtnID == 'saveandnew') {
											window.location.href = base_url + "Orderentry/index_new";
										} else {
											/*		window.location.href = base_url + data['Workflow_Controller'];*/
											window.location.href = base_url +"Transactions?e="+data['Workflow_redirection'];
										}						
									}, 1000);

								});
								
								/*End*/
							});
						});
				}

				if(!mergeavailable && !multiplemergeavailable) {

					setTimeout(function() { 
						if (OrderEntryBtnID == 'saveandnew') {
							window.location.href = base_url + "Orderentry/index_new";
						} else {
							/*window.location.href = base_url + data['Workflow_Controller'];*/
							window.location.href = base_url +"Transactions?e="+data['Workflow_redirection'];
						}						
					}, 3000);


				}

			}else if(data['validation_error'] == 1){


						// removecardspinner('#Orderentrycard');
						$(".toast-body-Error").html(data['message']);
						$("#liveToastError").toast("show");
						button.html(button_text);
						button.removeAttr("disabled");


						$.each(data, function(k, v) {
							$('#'+k).addClass("is-invalid").closest('.form-group').removeClass('has-success').addClass('has-danger');
							$('#'+ k +'.select2picker').next().find('span.select2-selection').addClass('errordisplay');

						});
					}else if(data['validation_error'] == 2){
						// removecardspinner('#Orderentrycard');
						$('#duplicate-modal').modal('show');
						$('#Skip_duplicate').val(1);
						$('#button_value').val(button_val);
						$('#insert_html').html(data['html']);	
						$('#insert_order').removeAttr('disabled');									
					}

				},
				error: function (jqXHR, textStatus, errorThrown) {

					console.log(errorThrown);

				},
				failure: function (jqXHR, textStatus, errorThrown) {

					console.log(errorThrown);

				},
			});
	}
}

/*@Desc Insert Data from missing loans @Author Jainulabdeenb @Added on Dec 17 2020*/
function InsertDataLoans(formData, filetouploadnew){
	button = $(".single_submit[clicked=true]");
	button_val = $(".single_submit[clicked=true]").val();
	button_text = $(".single_submit[clicked=true]").html();

	console.log(button);

	var progress=$('#orderentry-progressupload .progress-bar');
	return new Promise(function (resolve, reject) {
		$.ajax({
			type: "POST",
			url: base_url + 'Orderentry/insert',
			data: formData, 
			dataType:'json',
			cache: false,
			processData:false,
			contentType:false,
			beforeSend: function(){
			// addcardspinner('#Orderentrycard');
			button.attr("disabled", true);
			button.html('Loading ...'); 
			if (filetoupload.length || filetouploadnew.length) {
				$("#orderentry-progressupload").show();
			}
		},
		xhr: function () {
			var xhr = new window.XMLHttpRequest();
			if (filetoupload.length || filetouploadnew.length) {
				xhr.upload.addEventListener("progress", function (evt) {
					if (evt.lengthComputable) {
						var percentComplete = evt.loaded / evt.total;
						percentComplete = parseInt(percentComplete * 100);
						$(progress).width(percentComplete + '%');
						$(progress).text('' + percentComplete + '%');
					}
				}, false);
			}
			return xhr;
		},
		success: function(data)
		{
			// console.log(data);
			if(data['validation_error'] == 0){

				// var aFileSubmit = [];
				// var files = [];
				// var respOrderUIDs = data['id'];

				// $.each(filetoupload, function (key, value) {
				// 	files.push(value.filename);
				// })

				// $.each(data['matching_files'], function (fkey, fvalue) {

				// 	var currentfield = filetoupload.filter(function (element, index) {
				// 		return element.filename == fvalue.FileNames && element.Position == fvalue.Position;
				// 	});

				// 	if (currentfield) {
				// 		var fFormData = new FormData();
				// 		fFormData.append('DocumentFiles[]', currentfield[0].file);
				// 		fFormData.append('OrderUID[]', fvalue.OrderUID);
				// 		fFormData.append('UploadType', "Separate");
				// 		fFormData.append('MergeLater', "Yes");
				// 		fFormData.append('Files[]', currentfield[0].filename);

				// 		aFileSubmit.push(SendFileAsync(fFormData, currentfield[0].filename));

				// 	}
				// })
				// console.log(filetouploadnew);
				if (filetouploadnew && filetouploadnew.length > 0) {
					var aFileSubmitNew = [];
					var filesNew = [];
					var respOrderUIDs = data['id'];

					$.each(filetouploadnew, function (key, value) {
						filesNew.push(value.filename);
					})

					$.each(filetouploadnew, function (key, value) {

						var fFormData = new FormData();
						fFormData.append('OrderUID[]', respOrderUIDs);
						fFormData.append('DocumentFiles[]', value.file);

						$.each(filesNew, function (fKey, fValue) {
							var fileextension = value.filename.split('.').pop();
							if(fileextension == 'zip' || fileextension == 'pdf'){
								fFormData.append('Files[]', value);
							}
							else{
								return;
							}

						})

						fFormData.append('UploadType', UploadType);

						if (UploadType == 'Merge') {
							fFormData.append('UploadType', "Separate");
							fFormData.append('MergeLater', "Yes");
						}

						aFileSubmitNew.push(SendFileAsync(fFormData, value.filename));
						// console.log(aFileSubmitNew);
						$('#PDFsortable').find('.AbstractorFileRow[data-docname="'+value.filename+'"]').find('.action').html('');
						$('#PDFsortable').find('.AbstractorFileRow[data-docname="'+value.filename+'"]').find('.action').append("<span class='Found'>"+data['message']+"</span>");
					});
				}

				// $.notify({icon:"icon-bell-check",message:data['message']},{type:"success",delay:3000 });
				$(".toast-body-Successdata").html(data['message']);
				$("#liveToastSuccessdata").toast("show");

				// removecardspinner('#Orderentrycard');
					// triggerpage(base_url + "Orderentry/DocumentTracking/MissingLoanPackages");
					
					// Promise.all(aFileSubmit).then(function (response) {

					// // make ajax to merge uploaded files.
					// MergeFilesLater().then(function (response) {
					// 	resolve('successfully merged');
					// });

					// });
					
					if (aFileSubmitNew.length > 0) {

						Promise.all(aFileSubmitNew).then(function (response) {
					// make ajax to merge uploaded files.
					MergeFilesLater().then(function (response) {
						resolve('successfully merged');
						/*Auto Complete Doc CheckIn*/
						CheckAutoComplete(data['id'][0]);
						/*End*/
					});

				});
					}

				}else if(data['validation_error'] == 1){

						// removecardspinner('#Orderentrycard');

						// $.notify({icon:"icon-bell-check",message:data['message']},{type:"danger",delay:1000 });
						$(".toast-body-Error").html(data['message']);
						$("#liveToastError").toast("show");

						button.html(button_text);
						button.removeAttr("disabled");


						$.each(data, function(k, v) {
							$('#'+k).addClass("is-invalid").closest('.form-group').removeClass('has-success').addClass('has-danger');
							$('#'+ k +'.select2picker').next().find('span.select2-selection').addClass('errordisplay');

						});
					}else if(data['validation_error'] == 2){
						// removecardspinner('#Orderentrycard');
						$('#duplicate-modal').modal('show');
						$('#Skip_duplicate').val(1);
						$('#button_value').val(button_val);
						$('#insert_html').html(data['html']);	
						$('#insert_order').removeAttr('disabled');									
					}

				},
				error: function (jqXHR, textStatus, errorThrown) {

					console.log(errorThrown);

				},
				failure: function (jqXHR, textStatus, errorThrown) {

					console.log(errorThrown);

				},
			});
});
}


				//save bulk entry
				$(document).off('click',  '#bulk_save, #bulk_assignment_save').on('click',  '#bulk_save, #bulk_assignment_save', function (event) {
					event.preventDefault();
					$("#tblfailedentries").empty('');
					button = $(this);
					button_val = $(this).val();
					button_text = $(this).html();
					
					var CustomerUID = $('#bulk_Customers').val();
					var ProjectUID = $('#bulk_ProjectUID').val();
					var LenderUID = $('#bulk_LenderUID').val();
					var ProductUID = $('#bulk_products').val();
					var bulk_importtype = $('#bulk_importtype').val();

					if (CustomerUID == "" || CustomerUID == null || ProjectUID == "" || ProjectUID == null || ProductUID == "" || ProductUID == null) {
						$(".toast-body-Error").html("Select the Required Fields");
						$("#liveToastError").toast("show");
						return false;
					}


					if($('#filebulk_entry')[0].files.length === 0 && bulk_importtype == '1'){
						$(".toast-body-Error").html("No file selected");
						$("#liveToastError").toast("show");
						return false;
					}

					var file_data = $('#filebulk_entry').prop('files')[0];
					var form_data = new FormData();
					if(file_data != "undefined"){
						form_data.append('file', file_data);
					}
					form_data.append('CustomerUID',CustomerUID);
					form_data.append('ProjectUID',ProjectUID );
					form_data.append('LenderUID',LenderUID );
					form_data.append('ProductUID',ProductUID );
					form_data.append('LoansInsertedVia', 'Bulk');


					$.each(excelmultiplefileupload_Obj, function (key, value) {
						// form_data.append('DOCFILES[]', value.file);
						form_data.append('FILENAMES[]', value.filename);
					});

					

					var url = '';

					if(bulk_importtype == '2'){
						url = 'Orderentry/save_updatebulkentry';
					}else{

						if(file_data['type'] == 'text/xml'){

							url = 'Orderentry/save_new_xml'; 

						}else{

							if ($(this).attr('data-type') == 'assignment') {
								url="Orderentry/save_assignment_bulkentry";
							}
							else if ($(this).attr('data-type') == 'standard'){
								/* IIF - Handle Intake Insert Actions - VIK - START */
								//url = 'Orderentry/save_bulkentry';
								var curr_element_id		=	$(this).attr('id');
								console.log(curr_element_id);
								if(curr_element_id=="bulk_save"){
									if($("#bulk_ProjectUID option:selected").attr('data-intakeprojectval') == 1){
										url="Orderentry/save_intake_bulkentry";																	
										console.log('INTAKE'+ url);
									}else if($("#bulk_ProjectUID option:selected").attr('data-intakeprojectval') == 0){
										url = 'Orderentry/save_bulkentry';
										console.log('NOT INTAKE'+ url);
									}
								}else if(curr_element_id=="bulk_assignment_save"){
									url = 'Orderentry/save_bulkentry';
								}
								/* IIF - Handle Intake Insert Actions - VIK - END */							}
						}
					}

					$.ajax({
						type: "POST",
						url: base_url + url,
						data: form_data,
						processData: false,
						contentType: false,
						cache:false,
						dataType:'json',
						beforeSend: function(){
							$('.spinnerclass').addClass("be-loading-active");
							button.attr("disabled", true);
							button.html('Loading ...'); 
						},
						success: function(data)
						{
							// Load common notification
							$(".CommonNotificationContainer").load("CommonController/CommonNotification");

							button.html('save'); 
							button.removeAttr('disabled');
							
							if (data.error==1) {
								$(".toast-body-Error").html(data['message']);
								$("#liveToastError").toast("show");
							}
							else if (data.error==0) {
								var type='';
								/* IIF - Intake disable button upon save action - VIK - START */								
								$('#bulk_save').attr('disabled', true);								
								/* IIF - Intake disable button upon save action - VIK - END */								
								if (data.failedError == 1) {
									type="#liveToastError";
									bodytype=".toast-body-Error"
									$('.importTab').removeClass('active');
									$('.notImportTab').addClass('active');
								}else{
									type="#liveToastSuccess";
									bodytype=".toast-body-Success"
								}
								$(bodytype).html(data['message']);
								$(type).toast("show");
								$('#imported-table').html(data.html);
								$('#preview-table').html('');

								/* Datatable initialization for excel, pdf export */
								if ( $.fn.DataTable.isDataTable( '.datatable' ) ) {
									$('.datatable').dataTable().fnClearTable();
									$('.datatable').dataTable().fnDestroy();
								}
								
								$('#tblsuccessentries').DataTable( {
									"scrollX": true,
									"autoWidth": true,
									"processing": true, //Feature control the processing indicator.
									language: {
										sLengthMenu: "Show _MENU_ Loans",
										emptyTable:     "No Loans Found",
										info:           "Showing _START_ to _END_ of _TOTAL_ Loans",
										infoEmpty:      "Showing 0 to 0 of 0 Loans",
										infoFiltered:   "(filtered from _MAX_ total Loans)",
										zeroRecords:    "No matching Loans found",
										processing: '<svg class="d2tspinner-circular" viewBox="25 25 50 50"><circle class="d2tspinner-path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg>'
									},

									ajax: base_url + data.successfilelink,
									"fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
											// if (aData[97] ) {
											// 	$(nRow).css('color', aData[96]);
											// 	$(nRow).css('background-color', aData[97]);
											// }
										}

									} );

								$('#tblfailedentries').DataTable( {
									"scrollX": true,
									"autoWidth": true,
									"processing": true, //Feature control the processing indicator.
									language: {
										sLengthMenu: "Show _MENU_ Loans",
										emptyTable:     "No Loans Found",
										info:           "Showing _START_ to _END_ of _TOTAL_ Loans",
										infoEmpty:      "Showing 0 to 0 of 0 Loans",
										infoFiltered:   "(filtered from _MAX_ total Loans)",
										zeroRecords:    "No matching Loans found",
										processing: '<svg class="d2tspinner-circular" viewBox="25 25 50 50"><circle class="d2tspinner-path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg>'
									},
									ajax: base_url + data.failedfilelink,
									"fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
										var currentindex = aData.length;
										if (aData[currentindex - 1] && isColor(aData[currentindex - 1])) {
											$(nRow).css('color', aData[currentindex - 2]);
											$(nRow).css('background-color', aData[currentindex - 1]);
										}
									}

								} );


								if (data.failedError == 1) {
									
									$( ".notImportTab" ).trigger( "click" );
									$('.importTab').removeClass('active');
									$('.notImportTab').addClass('active');
								}else{
									
								}

								aFileSubmit = [];
								dFileSubmit = [];

								var spliceKeys = [], matching_files = [];

								$.each(data['matching_files'], function (fkey, fvalue) {

									
								});								

								$.each(excelmultiplefileupload_Obj, function (key, value) {

									$.each(data['matching_files'], function (fkey, fvalue) {
										
										if (value.filename == fvalue.DocName) {
											var fFormData = new FormData();
											fFormData.append('DocumentFiles[]', value.file);
											fFormData.append('OrderUID[]', fvalue.OrderUID);
											fFormData.append('UploadType', "Separate");
											fFormData.append('MergeLater', "Yes");
											fFormData.append('Files[]', value.filename);

											aFileSubmit.push(SendFileAsync(fFormData, value.filename));

											spliceKeys.push(key);

										}
									})
								});

								spliceKeys.reverse().forEach(function(value, key){
									excelmultiplefileupload_Obj.splice(value, 1);
								})

								$.each(excelmultiplefileupload_Obj, function (key, value) {

									var fFormData = new FormData();
									fFormData.append('DocumentFiles[]', value.file);
									fFormData.append('UploadType', "Merge");
									fFormData.append('Files[]', value.filename);
									fFormData.append('CustomerUID', $('#bulk_Customers').val());
									fFormData.append('LenderUID', $('#bulk_LenderUID').val());
									fFormData.append('ProjectUID', $('#bulk_ProjectUID').val());
									dFileSubmit.push(SendFileAsync(fFormData, value.filename));

								});
								
								// var _Orders = data['followup_orders'];

								// RaiseFollowForOrders(_Orders);

								if (aFileSubmit.length) {

									Promise.all(aFileSubmit).then(function (response) {

										// make ajax to merge uploaded files.
										MergeFilesLater().then(function (response) {				
											/*Auto Complete Doc CheckIn*/
											$.each(data['matching_files'], function (fkey, fvalue) {
												CheckAutoComplete(fvalue.OrderUID);
											});
											/*End*/
										});
									});
								}

							}

							// Free transaction limit crossed warning
							if (data.FreeTranscationLimit=="Restrict") {
								$("#bulk_save").hide();
								$(".FreeTransactionLimitNotificationContent").html(data.FreeTranscationLimitMessage);
								$(".FreeTransactionLimitNotification").show();
							} else {
								$("#bulk_save").show();
								$(".FreeTransactionLimitNotification").hide();
							}						

						},
						error: function (jqXHR, textStatus, errorThrown) {
							console.log(errorThrown);
							
						},
						failure: function (jqXHR, textStatus, errorThrown) {
							
							console.log(errorThrown);
							
						},
					});
});



/* Excel Bulk Import Order ends */


		//save bulk entry
		$(document).off('click',  '#exceptionimport_save').on('click',  '#exceptionimport_save', function (event) {
			event.preventDefault();
			button = $(this);
			button_val = $(this).val();
			button_text = $(this).html();

			var file_data = $('#fileexceptionimport_entry').prop('files')[0];
			var form_data = new FormData();
			form_data.append('file', file_data);



			$.each(excelmultiplefileupload_Obj, function (key, value) {
				// form_data.append('DOCFILES[]', value.file);
				form_data.append('FILENAMES[]', value.filename);
			});



			$.ajax({
				type: "POST",
				url: base_url + 'Orderentry/save_exceptionentry',
				data: form_data,
				processData: false,
				contentType: false,
				cache:false,
				dataType:'json',
				beforeSend: function(){
					button.attr("disabled", true);
					button.html('Loading ...'); 
				},
				success: function(data)
				{
					button.html('save'); 
					button.removeAttr('disabled');

					if (data.error==1) {
						//$.notify({icon:"icon-bell-check",message:data['message']},{type:"danger",delay:3000 });
						swal({
							title: "",
							text: data['message'],
							icon: "error",
							closeOnClickOutside: false,
						    allowOutsideClick: false,
							showCancelButton: false,
							dangerMode: true,
						})
						.catch(swal.noop);
					}
					else if (data.error==0) {
						$('#exception-table').hide();
						$('#exceptionimported-table').html(data.html);
						$('#exceptionimport-previewtable').html('');

						/* Datatable initialization for excel, pdf export */
						if ( $.fn.DataTable.isDataTable( '.datatable' ) ) {
							$('.datatable').dataTable().fnClearTable();
							$('.datatable').dataTable().fnDestroy();
						}

						$('.datatable').DataTable( {
							dom: 'Bfrtip',
							buttons: [
							'excel', 'pdf'
							],
							"scrollX": true
						} );

						aFileSubmit = [];

						var spliceKeys = [];
						$.each(excelmultiplefileupload_Obj, function (key, value) {

							$.each(data['matching_files'], function (fkey, fvalue) {
								
								if (value.filename == fvalue.DocName) {
									var fFormData = new FormData();
									fFormData.append('DocumentFiles[]', value.file);
									fFormData.append('OrderUID[]', fvalue.OrderUID);
									fFormData.append('UploadType', "Merge");
									fFormData.append('Files[]', value.filename);

									aFileSubmit.push(SendFileAsync(fFormData, value.filename));

									spliceKeys.push(key);

								}
							})
						});

						spliceKeys.reverse().forEach(function(value, key){
							excelmultiplefileupload_Obj.splice(value, 1);
						})

						$.each(excelmultiplefileupload_Obj, function (key, value) {

							var fFormData = new FormData();
							fFormData.append('DocumentFiles[]', value.file);
							fFormData.append('UploadType', "Merge");
							fFormData.append('Files[]', value.filename);
							fFormData.append('CustomerUID', $('#bulk_Customers').val());
							fFormData.append('LenderUID', $('#bulk_LenderUID').val());
							fFormData.append('ProjectUID', $('#bulk_ProjectUID').val());
							aFileSubmit.push(SendFileAsync(fFormData, value.filename));

						});

						// var _Orders = data['followup_orders'];

						// RaiseFollowForOrders(_Orders);
						
						if (aFileSubmit.length) {

							Promise.all(aFileSubmit).then(function (response) {

								// make ajax to merge uploaded files.
								MergeFilesLater();

							});
						}



					}						

				},
				error: function (jqXHR, textStatus, errorThrown) {
					console.log(errorThrown);

				},
				failure: function (jqXHR, textStatus, errorThrown) {

					console.log(errorThrown);

				},
			});
		});




		/*For ordersummary*/
		$(document).off('submit', '#frmordersummary').on('submit', '#frmordersummary', function(event) {
			/* Act on the event */
			event.preventDefault();
			event.stopPropagation();
			button = $(".single_submit");
			button_val = $(".single_submit").val();
			button_text = $(".single_submit").html();
			var OrderUID = $('#OrderUID').val();
			var DocsCount = $('#DocsCount').val();

			console.log(button);
				// var LoanAmount = $('#LoanAmount').val();
				// LoanAmount = LoanAmount.replace(/[,$]/g , ''); 
				// var LoanAmount = Number(LoanAmount);
				// var formData = $('#frmordersummary').serialize()+'&'+$.param({ 'LoanAmount': LoanAmount });

				var progress=$('.progress-bar');


				$('#DocumentUpload').val('');
				var formData = new FormData($(this)[0]);
				



				if (filetoupload.length > 0 && DocsCount > 0) {

					const wrapper = document.createElement('span');
					wrapper.innerHTML = `<div class="form-check mb-3" style="text=align:left;">
					<input class="form-check-input" type="radio" name="flexRadioDefault" id="mergeupload" value="Merge" checked>
					<label style="display: flex;" class="form-check-label" for="flexRadioDefault1">
					Upload and Merge to Classification Document
					</label>
					</div>
					<div class="form-check mb-3">
					<input class="form-check-input" type="radio" name="flexRadioDefault" id="seperateupload" value="Seperate">
					<label style="display: flex;" class="form-check-label" for="flexRadioDefault2">
					Upload as Separate Document
					</label>
					</div>`;

					swal({
						title: 'Choose Upload Type',
						content: wrapper,
						buttons: {
							confirm: {
								text: "Upload File",
								value: true,
								visible: true,
								className: "btn btn-success",
								closeModal: true
							},
							cancel: {
								text: "Cancel",
								value: false,
								visible: true,
								className: "btn btn-danger",
								closeModal: true,
							}
						},
						dangerMode: true,
					})
					.then(function (result) {

						if (result) {
							if ($('#seperateupload').prop('checked') ) {
								formData.append('UploadType', "Seperate");
							}
							else {
								formData.append('UploadType', "Merge");
							}	
							frmSubmit(formData, filetoupload, button, progress, OrderUID, button_text);
						} else {

						}


					}).catch(swal.noop)

          /*swal({
            title: 'Choose Upload Type',
            text:
            `
            <div class="text-left ml-20 mt-30" style="font-size:16px;">
            <div class="form-check">
            <label class="form-check-label">
            <input id="mergeupload" type="radio" class="form-check-input uploadtype" name="radio-uploadtype" value="Merge" checked> Upload and Merge to Classification  Document
            <span class="circle">
            <span class="check"></span>
            </span>
            </label>
            </div>` +
            `<div class="form-check">
            <label class="form-check-label">
            <input id="seperateupload" type="radio" class="form-check-input uploadtype" name="radio-uploadtype" value="Seperate"> Upload as Separate Document
            <span class="circle">
            <span class="check"></span>
            </span>
            </label>
            </div>
            </div>`,
            showCancelButton: true,
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: "btn btn-danger",
            confirmButtonText: "Upload Files",
            cancelButtonText: "Cancel",
            closeOnConfirm: false,
            closeOnCancel: true,
            showLoaderOnConfirm: true,
            buttonsStyling: false,
            preConfirm: function () {
              return new Promise(function (resolve, reject) {

                if ($('#seperateupload').prop('checked') ) {

                  formData.append('UploadType', "Seperate");

                }
                else {
                  formData.append('UploadType', "Merge");
                }
                resolve("true");
              })
            },
            onOpen: function () {
              $('#mergeupload').focus()
            }
          }).then(function (result) {
            frmSubmit(formData, filetoupload, button, progress, OrderUID, button_text);
        }).catch(swal.noop)*/
    }
    else{
    	formData.append('UploadType', "Merge");
    	frmSubmit(formData, filetoupload, button, progress, OrderUID, button_text);

    }
});


function frmSubmit(formData, filetoupload, button, progress, OrderUID, button_text) {

	var init_url = window.location.href;
	$.ajax({
		type: "POST",
		url: base_url + 'Ordersummary/insert',
		data: formData, 
		dataType:'json',
		cache: false,
		processData:false,
		contentType:false,
		beforeSend: function(){
			$('.page_loader_div').show();
			button.attr("disabled", true);
			button.html('Loading ...'); 
			if (filetoupload.length) {
				$("#orderentry-progressupload").show();
			}
		},
		xhr: function () {
			var xhr = new window.XMLHttpRequest();
			if (filetoupload.length) {
				xhr.upload.addEventListener("progress", function (evt) {
					if (evt.lengthComputable) {
						var percentComplete = evt.loaded / evt.total;
						percentComplete = parseInt(percentComplete * 100);
						$(progress).width(percentComplete + '%');
						$(progress).text('Uploading ' + percentComplete + '%');
					}
				}, false);
			}
			return xhr;
		},
		success: function(data)
		{
			if(data['validation_error'] == 0){

				$.toast({
					heading: data.heading,
					text: data['message'],
					position: "top-right",
					loaderBg: "#5ba035",
					icon: "success",
					hideAfter: 3e3,
					stack: 1
				});

				var aFileSubmit = [];
				var files = [];
				var respOrderUIDs = data['id'];

				$.each(filetoupload, function (key, value) {
					files.push(value.filename);
				})


				$.each(filetoupload, function (key, value) {

					var fFormData = new FormData();

					fFormData.append('module_name', 'Loan Info');
					fFormData.append('OrderUID[]', data['OrderUID']);



					var fileextension = value.filename.split('.').pop();
					if(fileextension == 'zip'){
						fFormData.append('ZipFiles[]', value.file);
					}
					else if(fileextension == 'pdf'){
						fFormData.append('DocumentFiles[]', value.file);
					}
					else{
						return;
					}

					$.each(files, function (fKey, fValue) {
						var fileextension = value.filename.split('.').pop();
						if(fileextension == 'zip' || fileextension == 'pdf'){
							fFormData.append('Files[]', value);
						}
						else{
							return;
						}

					})

                // fFormData.append('DocumentFiles[]', value.file);
                fFormData.append('UploadType', data['UploadType']);

                if (data['UploadType'] == 'Merge') {
                	fFormData.append('UploadType', "Separate");
                	fFormData.append('MergeLater', "Yes");
                }



                aFileSubmit.push(SendFileAsync(fFormData, value.filename,'new'));
            });


				Promise.all(aFileSubmit).then(function (response) {

				// make ajax to merge uploaded files.
				MergeFilesLater(data['OrderUID'],'new','Loan Info').then(function (response) {
					/*Auto Complete Doc CheckIn*/
					CheckAutoComplete(data['OrderUID']);
					/*End*/
					$('.page_loader_div').hide();
					$("#orderentry-progressupload").hide();
						/*$.notify({icon:"icon-bell-check",message:data['message']},{type:"success",delay:1000 });
						setTimeout(function(){ 
						location.reload();
					}, 2000);*/
					setTimeout(function(){ 
						location.reload();
					}, 2000);
				});

              	// if (init_url == window.location.href) {
               //  	triggerpage(init_url);
              	// }
              // if(button_val == 1)
              // {
              // }

          });

			}else if(data['validation_error'] == 1){

              // removecardspinner('#Orderentrycard');

              //$.notify({icon:"icon-bell-check",message:data['message']},{type:"danger",delay:1000 });

              $.toast({
              	heading: data.heading,
              	text: data['message'],
              	position: "top-right",
              	loaderBg: "#5ba035",
              	icon: "danger",
              	hideAfter: 3e3,
              	stack: 1
              });

              $.each(data, function(k, v) {
              	$('#'+k).addClass("is-invalid").closest('.form-group').removeClass('has-success').addClass('has-danger');
              	$('#'+ k +'.select2picker').next().find('span.select2-selection').addClass('errordisplay');

              });
          }


      },
      error: function (jqXHR, textStatus, errorThrown) {

      	console.log(errorThrown);

      },
      failure: function (jqXHR, textStatus, errorThrown) {

      	console.log(errorThrown);

      },
  })
.always(function() {		
	button.html(button_text);
	button.removeAttr("disabled");
});


}

/*######## Orderentry and ordersummary form submit ends #########*/




/*######## Single Order Entry File UPload ajax starts #####*/

function SendFileAsync(formdata, filename, action = '') {

	console.log(formdata);
	console.log(filename);

	return new Promise(function (resolve, reject) {

		if($('#uploadPane-Card').hasClass('hide'))
		{
			$('#uploadPane-Card').removeClass('hide');
			$("#uploadPane-Card").toast("show");
		}
		hash = Date.now();
/*			li_element = '<li data-hash="'+ hash +'" style="list-style-type: none;"><span class="up_status fa fa-spin fa-spinner" aria-hidden="true"></span> '+filename+'<span class="filesize pull-right" data-filename="'+filename+'"><span hash="'+ hash +'" class="pma_drop_file_status" task="info"><span class="underline" style="margin-left:160px;">Uploading...</span></span></span><br><progress max="100" value="10"></progress><span class="upload-percent"></span></li>';
*/


li_element ='<li data-hash="'+ hash +'" style="list-style-type: none;"><span><div class="px-0 py-1 d-flex align-items-center small text-gray-600 justify-content-start position-relative"><span class="position-relative start-0" style="word-break:break-all;">'+filename+'</span><span style="white-space: nowrap;"class="ms-auto"><span class="up_status"></span><span class="upload-percent ms-3"></span></span></div><div class="progress" id="removeprogressbar" style="height: 6px;"><div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div></div></span></li>';



$('#uploadPane-CardBody').append(li_element);
var progress = $('#uploadPane-CardBody').find('[data-hash="'+ hash +'"]');

/*@Desc For single entry call uploadfile_new function @Author SathishKumar @Added on Sep 28 2021*/
var ajax_url = 'Orderentry/uploadfile';
if (action == 'new') {
	ajax_url = 'Orderentry/uploadfile_new';
}

$.ajax({
	url: base_url + ajax_url,
	type: 'POST',
	dataType: 'json',
	data: formdata,
	contentType: false,
	processData: false,
	beforeSend: function () {
		console.log("send");
	},
	xhr: function () {
		xhr = new window.XMLHttpRequest();

		xhr.upload.addEventListener("progress", function (evt) {
			if (evt.lengthComputable) {

				var percentComplete = evt.loaded / evt.total;
				percentComplete = parseInt(percentComplete * 100);
				console.log(percentComplete);
				$(progress).find('.progress-bar').css("width", percentComplete + "%")
				$(progress).find('progress').val(percentComplete);
				$(progress).find('.upload-percent').html(percentComplete + '%')
			}
		}, false);
		return xhr;

	}
})
.done(function(response) {
				// $(progress).find('.underline').html('Success');
				// $(progress).find('.up_status').removeClass('fa-spin');
				// $(progress).find('.up_status').addClass('fa-check');
				// $(progress).find('.up_status').addClass('text-success');


				$(progress).find('#removeprogressbar').addClass('invisible');
				$(progress).find('.up_status').html('<span class="ms-3"><svg class="me-1" data-name="icons/tabler/check-heavy" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16"><rect data-name="Icons/Tabler/Check Heavy background" width="16" height="16" fill="none"></rect><path d="M5.434,11.7.234,6.5a.8.8,0,0,1,0-1.131L1.366,4.234a.8.8,0,0,1,1.131,0L6,7.737l7.5-7.5a.8.8,0,0,1,1.131,0l1.131,1.131a.8.8,0,0,1,0,1.131l-9.2,9.2a.8.8,0,0,1-1.131,0Z" transform="translate(0 2.003)" fill="#0D6EFD"></path></svg>Success</span>');
				$(progress).find('.progress-bar').hide();
				$(progress).find('.upload-percent').hide();
				resolve('Success');
				console.log("success");
			})
.fail(function(jqXHR) {
				// $(progress).find('.underline').html('Failed');
				// $(progress).find('.up_status').removeClass('fa-spin');
				// $(progress).find('.up_status').removeClass('fa-spinner');
				// $(progress).find('.up_status').addClass('fa-exclamation-circle');
				// $(progress).find('.up_status').addClass('text-danger');
				$(progress).find('#removeprogressbar').addClass('invisible');
				$(progress).find('.up_status').html('<span class="ms-3"><svg width="12" height="12" viewBox="0 0 16 16" class="bi bi-info-circle me-1" fill="red" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"></path><circle cx="8" cy="4.5" r="1"></circle></svg>Failed</span>');
				$(progress).find('.progress-bar').hide();
				$(progress).find('.upload-percent').hide();

				console.log(jqXHR);
				/*reject("error");*/
			})
.always(function() {
	$(progress).find('progress').hide();
	console.log("complete");
});

});
}
/*######## Single Order Entry File UPload ajax ends #####*/


	// Raise Follow up for document missing orders in bulk entry.
	function RaiseFollowForOrders(_Orders) {
		
		return new Promise(function (resolve, reject) {

			$.ajax({
				url: 'Orderentry/RaiseFollowUp',
				type: 'POST',
				dataType: 'json',
				data: {'Orders':_Orders},
			})
			.done(function(response) {
				if (response.validation_error == 0) {
					console.log("Follow Up Raised Successfully");
				}
				else{
					console.log("Unable to Raise Follow Up");	
				}
			})
			.fail(function() {
				console.log("Error", "Unable to Raise Follow Up");	
			})
			.always(function() {
				console.log("complete");
			});
		});

		
	}

	function MergeFilesLater(respOrderUIDs = '', action = '', module_name = '') {
		
		return new Promise(function (resolve, reject) {

			/*@Desc For single entry call MergeFilesLater_New function @Author SathishKumar @Added on Sep 28 2021*/
			var ajax_url = 'Orderentry/MergeFilesLater';
			if (action == 'new') {
				ajax_url = 'Orderentry/MergeFilesLater_New';
			}

			$.ajax({
				url:  base_url +ajax_url,
				type: 'POST',
				data: {
					"OrderUIDs": respOrderUIDs,
					"module_name": module_name
				},
				dataType: 'json',
			})
			.done(function(response) {
				if (response.success == 0) {
					console.log(response.messge);
				}
				else{
					console.log(response.messge);	
				}
				resolve('Merged');
			})
			.fail(function(jqXHR) {
				console.log("Error", "Unable to Raise Follow Up");	
				console.log(jqXHR);
			})
			.always(function() {
				console.log("complete");
			});
		});

	}


	function Fetch_Product_DocType(object) {

		$.ajax({
			type: "POST",
			url: base_url + "CommonController/GetCustomerSubProducts",
			data: object,
			dataType: 'json',
			beforeSend: function () {
				// addcardspinner('#Orderentrycard');
				$('#lblinputdoctype').not('.hide').addClass('hide');
				$('#lblinputdoctype').find('span').html('');
				$('#pricingimport').slideUp('fast');
			},

			success: function (response) {
				console.table(response);

				var ProjectCustomer = response.ProjectCustomer;
				var SubProducts = response.SubProducts;
				// var ProductTypeDoc = response.ProductTypeDoc;

				var SubProduct_Select = "";

				console.log(typeof ProjectCustomer);


				Project_select = ProjectCustomer.reduce((accumulator, value) => {
					var projectnametext = '';
					if (value.ProjectCode) {
						projectnametext = value.ProjectCode+' / '+value.ProjectName;
					} else {
						projectnametext = value.ProjectName;
					}
					return accumulator + '<Option value="' + value.ProjectUID + '">' + projectnametext + '</Option>';
				}, '');


				$('#Single-ProjectUID').html(Project_select);
				$('#Single-ProjectUID').val($('#Single-ProjectUID').find('option:first').val()).trigger('change');

				/*var DocTypes_HTML = '';

				if (ProductTypeDoc.length) {

					DocTypes_HTML = ProductTypeDoc.reduce((accumulator, value, index) => {

						return accumulator + `<tr>
						<td class="text-center">

						<input type="hidden" name="DocType[`+index+`]" value="`+value.InputDocTypeUID+`" />
						`+value.DocTypeName+`
						
						</td>

						<td class="text-center">
						
						<div class="form-group bmd-form-group">
						<input type="text" class="form-control" id="AltOrderNumber`+index+`" name="AltOrderNumber[`+index+`]" />
						</div>
						
						</td>

						<td class="text-center">
						
						<button type="button" class="btn btn-sm btn-social btn-reddit btn-doctype" data-doctypeuid="`+value.InputDocTypeUID+`" data-doctypename="`+value.DocTypeName+`" style="font-size: 9px;">
						<i class="icon-upload4 pr-10"></i>Upload File(s)
						<div class="ripple-container"></div>
						</button>
						
						</td>
						</tr>`;
					}, '<div class="col-md-12"><table class="table table-bordered" id="tbl-singledoctype"><thead><tr><th class="text-center">Doc Type</th><th class="text-center">Alt Order Number</th><th class="text-center">Priority</th><th class="text-center" width="20%">Upload Files</th></thead><tbody>');

					DocTypes_HTML += '</tbody></table></div>';
				}
				$('#row-doctypes').html(DocTypes_HTML);
				$('#row-doctypes').removeClass('hide');*/
				// callselect2();
				// removecardspinner('#Orderentrycard');
			}
		});

	}
	//make followup start
	$(document).off('click','#BtnFollowup,#BtnFollowupEmail').on('click','#BtnFollowup,#BtnFollowupEmail',function(e)
	{ 
		//Getting theme details New/old
		var themeVal = $('#themeId').val();
		if(themeVal=="new"){//new theme
			themeFlag 	= "new";
		}else{
			themeFlag 	= "old";
		}
		e.preventDefault();
		var OrderUID = $('#OrderUID').val();
		var SendMail = $(this).val();
		var comments = $('#RaiseFollow').find('.comments').val();
		var Followuptype_raise = $('#RaiseFollow').find('#Followuptype_raise').val();
		var Followupduration = $('#RaiseFollow').find('#Followupduration').val();
		var FollowupNextRemainder = $('#RaiseFollow').find('#FollowupRemainder').val();
		if(Followupduration =='' || Followuptype_raise ==''){
			//$.notify({icon:"icon-bell-check",message:'Please fill all fields'},{type:"danger",delay:3000 });
			swal({
				title: "",
				text: "Please fill all fields",
				icon: "error",
				closeOnClickOutside: false,
			    allowOutsideClick: false,
				showCancelButton: false,
				dangerMode: true,
			})
			.catch(swal.noop);
			return false;	
		}
		$(this).attr("disabled", true);
		$.ajax({
			type: "POST",
			url: base_url + "Followup/audit_faild_followup",
			data: {
				"SendMail": SendMail,"OrderUID": OrderUID,"themeFlag":themeFlag,"comments" : comments,"Followuptype_raise":Followuptype_raise,"Followupduration":Followupduration,"FollowupNextRemainder":FollowupNextRemainder},
				success : function(data)
				{
					if(data == 1 && SendMail == 1)
					{

						swal({
							title: 'Success',
							text: "Follow-up Started and Mail Send",
							type: 'success',
							timer: 5000,
							confirmButtonText: 'ok',

						});
								// window.location = base_url+'Followup';								
								setTimeout(function(){ location.reload(); }, 2000);							
							}
							else if(data == 1)
							{

								swal({
									title: 'Success',
									icon: "success",
									text: "Follow-up Started",
									type: 'success',
									timer: 5000,
									confirmButtonText: 'ok',

								});
								// window.location = base_url+'Followup';
								setTimeout(function(){ location.reload(); }, 2000);	
							}
							else
							{
								swal({
									title: 'Failed',
									icon: "warning",
									text: "Follow-up Not Started",
									type: 'error',
									timer: 1000,
									confirmButtonClass: "btn btn-success",

								});
							}
						}
					});

	});

	$(document).off('click','.BtnFollowupEmailQuestion').on('click','.BtnFollowupEmailQuestion',function(e)
	{ 
		//Getting theme details New/old
		var themeVal = $('#themeId').val();
		if(themeVal=="new"){//new theme
			themeFlag 	= "new";
		}else{
			themeFlag 	= "old";
		}
		e.preventDefault();
		var OrderUID = $('#OrderUID').val();
		var SendMail = $(this).val();
		var comments = $('#RaiseFollow').find('.comments').val();
		var Followuptype_raise = $('#RaiseFollow').find('#Followuptype_raise').val();
		var Followupduration = $('#RaiseFollow').find('#Followupduration').val();
		var FollowupNextRemainder = $('#RaiseFollow').find('#FollowupRemainder').val();
		var ansUID = $('#QuestionExceptionUID').val();
		var AuditOrderUID = $('#newAuditOrderUID').val();
		var AuditQuestionUID = $('#newAuditQuestionUID').val();
		var AuditDocumentTypeUID = $ ('#newAuditDocumentTypeUID').val();
		if(Followupduration =='' || Followuptype_raise ==''){
			$.notify({icon:"icon-bell-check",message:'Please fill all fields'},{type:"danger",delay:3000 });
			return false;	
		}
		$(this).attr("disabled", true);
		$.ajax({
			type: "POST",
			url: base_url + "Followup/ExceptionQuestion_followup",
			data: {
				"SendMail": SendMail,"OrderUID": OrderUID,"themeFlag":themeFlag,
				"comments" : comments,"Followuptype_raise":Followuptype_raise,
				"Followupduration":Followupduration,"FollowupNextRemainder":FollowupNextRemainder,
				"AuditOrderUID":AuditOrderUID,"AuditQuestionUID":AuditQuestionUID,
				"AuditDocumentTypeUID":AuditDocumentTypeUID,"ansUID":ansUID},
				success : function(data)
				{
					if(data == 1 && SendMail == 1)
					{

						swal({
							title: 'Success',
							icon: "success",
							text: "Follow-up Started and Mail Send",
							type: 'success',
							timer: 5000,
							confirmButtonText: 'ok',

						});
								// window.location = base_url+'Followup';								
								setTimeout(function(){ location.reload(); }, 2000);							
							}
							else if(data == 1)
							{

								swal({
									title: 'Success',
									icon: "success",
									text: "Follow-up Started",
									type: 'success',
									timer: 5000,
									confirmButtonText: 'ok',

								});
								// window.location = base_url+'Followup';
								setTimeout(function(){ location.reload(); }, 2000);	
							}
							else
							{
								swal({
									title: 'Failed',
									icon: "warning",
									text: "Follow-up Not Started",
									type: 'error',
									timer: 1000,
									confirmButtonClass: "btn btn-success",

								});
							}
						}
					});

	});
	/*@Desc Edit Followup Details @Author Jainulabdeen @Since April 20 2021*/
	$(document).off('click','#Edit_BtnFollowup').on('click','#Edit_BtnFollowup',function(e)
	{
		e.preventDefault();
		var FollowUpUID = $('#EditRaiseFollow').find('#Edit_FollowUpUID').val();
		var comments = $('#EditRaiseFollow').find('#Edit_comments').val();
		var Followuptype_raise = $('#EditRaiseFollow').find('#Edit_Followuptype_raise').val();
		var Followupduration = $('#EditRaiseFollow').find('#Edit_Followupduration').val();
		var FollowupNextRemainder = $('#EditRaiseFollow').find('#Edit_FollowupRemainder').val();
		if(Followupduration =='' || Followuptype_raise ==''){
			//$.notify({icon:"icon-bell-check",message:'Please fill all fields'},{type:"danger",delay:3000 });
			swal({
				title: "",
				text: "Please fill all fields",
				icon: "error",
				closeOnClickOutside: false,
			    allowOutsideClick: false,
				showCancelButton: false,
				dangerMode: true,
			})
			.catch(swal.noop);
			return false;	
		}
		$(this).attr("disabled", true);
		$.ajax({
			type: "POST",
			url: base_url + "Followup/EditFollowup",
			data: {
				"FollowUpUID": FollowUpUID,"comments" : comments,"Followuptype_raise":Followuptype_raise,"Followupduration":Followupduration,"FollowupNextRemainder":FollowupNextRemainder},
				success : function(data)
				{
					if(data == 1)
					{							
						swal({
							title: 'Success',
							icon: "success",
							text: "Follow-up Updated",
							type: 'success',
							timer: 5000,
							confirmButtonText: 'ok',

						});
						setTimeout(function(){ location.reload(); }, 2000);								
					}
					else
					{
						swal({
							title: 'Failed',
							icon: "warning",
							text: "Follow-up Not Updated",
							type: 'error',
							timer: 1000,
							confirmButtonClass: "btn btn-success",							
						});
					}
				}
			});
	});
//followup complete button click event

$(document).off('click','#BtnFollowupComplete').on('click','#BtnFollowupComplete',function(e)
{

	e.preventDefault();
	var OrderUID = $('#OrderUID').val();
	var Followuptype = $('.popover').find('.Followuptype').children("option:selected").val();
	var comments = $('.popover').find('.completecomments').val();
	$(this).attr("disabled", true);
	$.ajax({
		type: "POST",
		url: base_url + "Followup/CompleteFollowup",
		data: {
			"OrderUID": OrderUID,"Followuptype" :Followuptype,"Comments":comments},
			success : function(data)
			{
				if(data == 1)
				{
					swal({
						title: 'Success',
						text: "Followup Completed",
						type: 'success',
						timer: 5000,
						confirmButtonText: 'ok',

					});
								// window.location = base_url+'DocumentCheckInOrders';
								setTimeout(function(){ location.reload(); }, 2000);
							}
							else
							{
								swal({
									title: 'Failed',
									text: "Followup Not Completed",
									type: 'error',
									timer: 1000,
								});
							}
						}
					});
});


// Check is hex color

function isColor(strColor){
	var regex = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
	if(regex.test(strColor)){
		return true;
	}
	return false;
}


// Madhuri Maxex client

/*^^^^ Data Entry Complete Starts ^^^^^*/
$(document).off('click', '#DataEntryComplete').on("click", '#DataEntryComplete', function(e){

	e.preventDefault();
	var button = $(this);
	var button_text = $(this).html();

	/*SWEET ALERT CONFIRMATION*/
	swal({
		title: 'Are you sure ?',
		text: 'Do you want to complete Data Extraction ?',
		icon: "warning",
		// buttons: true,
		showCancelButton: true,
		confirmButtonClass: 'btn btn-success',
		cancelButtonClass: 'btn btn-danger',
		buttonsStyling: false,
		closeOnClickOutside: false,
		allowOutsideClick: false,
		showLoaderOnConfirm: true,
		position: 'top-end',
		className: "swal_auto_width",
		buttons: {
			cancel: "Cancel",
			catch: {
				text: "Complete & Go to My Loans!",
				value: "catch",
				className:"btn-success",
			},
			//defeat: "Complete",
		},
	}).then(function (confirm) {	
		if (confirm == "defeat" || confirm == "catch") {

			var complete_action = 0;
			if (confirm == "catch") {
				var complete_action = "Transactions";
			}

			var OrderUID = $('#OrderUID').val();
			$.ajax({
				type: "POST",
				url: base_url+'OrderComplete/DataEntryComplete',
				data: {
					'OrderUID': OrderUID
				},
				dataType: 'json',
				cache: false,
				beforeSend: function () {
				// addcardspinner('#Orderentrycard');
				$(button).html('<i class="fa fa-spin fa-spinner"></i> Completing...');
				$(button).prop('disabled', true);

			},
			success: function(data)
			{
				if (data.validation_error == 0) {
					/*$(".toast-body-Success").html(data['message']);
					$("#liveToastSuccess").toast("show");*/
					swal({
						title: "",
						text: data['message'],
						icon: "success",
						closeOnClickOutside: false,
					    allowOutsideClick: false,
						showCancelButton: false, 
					}).then(function(confirm) {	
						disposepopover();
						setTimeout(function(){
							if (complete_action) {
								window.location.href = base_url + complete_action;
							} else {
								location.reload();
							}
						},500);
					});

				} else {
					swal({
						title: "",
						text: data.message,
						icon: "error",
						closeOnClickOutside: false,
					    allowOutsideClick: false,
						showCancelButton: false,
					}).catch(swal.noop);
				}
				$(button).prop('disabled', false);
				$(button).html(button_text);
			}
		})
			.always(function () {
				$(button).html(button_text);
				$(button).prop('disabled', false);

			});
		}
	}, function (dismiss) {});
});


function checkDataExtraction(ProjectUID){
	if(ProjectUID != ""){
		$.ajax({
			url: base_url + "CommonController/getProjectDataExtraction",
			type : 'POST',
			data: {
				"ProjectUID": ProjectUID
			},
			success : function(response){
				if(response == 1){
					// $(".togglebutton").css('display','block');
					$('#DataExtractionEnable').prop('checked',true);
				}else{
					// $(".togglebutton").css('display','none');
					$('#DataExtractionEnable').prop('checked',false);
				}
			}
		});
	}
}

/*^^^^ Data Entry Complete Ends ^^^^^*/
/*@Desc Missing Loan packages @Author Jainulabdeenb @Added on Dec 16 2020*/
$(document).off('click', '#UploadFiles').on("click", '#UploadFiles', function(event){
	event.preventDefault();
	event.stopPropagation();	
	var IsError = '';

	$('#PDFsortable .AbstractorFileRow').each(function(key, element){
		if($(element).find('.action select').val() == ''){
			IsError = 1;
			$(element).find('.action span.select2-container').css('border','1px solid red');
		}
	});

	/*validation for actions*/
	if(IsError == 1){
		$(".toast-body-Error").html('Please select actions for all documents');
		$("#liveToastError").toast("show");
		return false;
	}
	/*files already uploaded*/
	if(filetouploadnew2.length == 0 && fileupload.length == 0 && fileuploaderror.length == 0){
		$(".toast-body-Error").html('Please upload new files');
		$("#liveToastError").toast("show");
		// $.notify({icon:"icon-bell-check",message:'Please upload new files'},{type:"danger",delay:3000 });
		return false;
	}

	UploadType = 'Merge';

	/*create new loan and attach doc*/
	if(filetouploadnew2.length >0){

		$.each(filetouploadnew2, function (key, value) {
			const foodBar = filetouploadnew2.find(item => item.filename == value.filename);
			filetouploadnew2 = filetouploadnew2.filter(function(el) { return el.filename != value.filename; });
			filetouploadnew = [];
			filetouploadnew.push({file: foodBar.file, filename: foodBar.filename , is_stacking: foodBar.is_stacking});

			var formData= new FormData();
			var LoanNo = foodBar.filename.split('.').slice(0, -1).join('.');
			formData.append('Customer', $('#Customer').val());
			formData.append('ProductUID', $('#Single-ProductUID').val());
			formData.append('ProjectUID', $('#Single-ProjectUID').val());
			formData.append('LoanNumber', LoanNo);
			// formData.append('DocType[]', ["8"]);
			// formData.append('PriorityUID[]', ["2"]);
			// formData.append('DataExtractionEnable', 'on');
			formData.append('LoansInsertedVia', 'MissingLoanPackages');
			var data1 = InsertDataLoans(formData,filetouploadnew);
			filetouploadnew = [];
		});
	}

	/*attach documents on existing loans*/
	if(fileupload.length > 0){
		var aFileSubmit = [];
		var files = [];

		$.each(fileupload, function (key, value) {
			files.push(value.filename);
		})

		$.each(fileupload, function (key, value) {

			var fFormData = new FormData();

			fFormData.append('OrderUID[]', value.orderuid);
			fFormData.append('DocumentFiles[]', value.file);
			fFormData.append('Files[]', value);
			fFormData.append('UploadType', UploadType);

			if (UploadType == 'Merge') {
				fFormData.append('UploadType', "Separate");
				fFormData.append('MergeLater', "Yes");
			}

			aFileSubmit.push(SendFileAsync(fFormData, value.filename));

			$('#PDFsortable').find('.AbstractorFileRow[data-docname="'+value.filename+'"]').find('.action').html('');
			$('#PDFsortable').find('.AbstractorFileRow[data-docname="'+value.filename+'"]').find('.action').append("<span class='Found'>Upload Success</span>");

		});

		Promise.all(aFileSubmit).then(function (response) {
			MergeFilesLater().then(function (response) {				
				/*Auto Complete Doc CheckIn*/
				$.each(fileupload, function (key, value) {
					CheckAutoComplete(value.orderuid);
					fileupload = fileupload.filter(function(el) { return el.filename != value.filename; });
				});
				/*End*/
			});
		});
	}

	/*merge documents on existing loans*/

	if(fileuploaderror.length > 0){
		var aFileSubmit = [];
		var files = [];

		$.each(fileuploaderror, function (key, value) {
			files.push(value.filename);
		})

		$.each(fileuploaderror, function (key, value) {
			var fFormData = new FormData();

			fFormData.append('OrderUID[]', value.orderuid);
			fFormData.append('DocumentFiles[]', value.file);
			fFormData.append('Files[]', value);

			if(value.is_override == 1){
				fFormData.append('UploadType', 'Override');			
			} else {
				fFormData.append('UploadType', 'Merge');
			}

			aFileSubmit.push(SendFileAsyncNew(fFormData, value.filename));				

			$('#PDFsortable').find('.AbstractorFileRow[data-docname="'+value.filename+'"]').find('.action').html('');
			$('#PDFsortable').find('.AbstractorFileRow[data-docname="'+value.filename+'"]').find('.action').append("<span class='Found'>Upload Success</span>");
			
		});
		/*Reverse Loan*/
		$.each(fileuploaderror, function (key, value) {
			var WorkflowUID = '2';
			ReverseLoan(value.orderuid,WorkflowUID);
		});
		/*End*/
		/*Auto Complete Doc CheckIn*/
		$.each(fileuploaderror, function (key, value) {
			CheckAutoComplete(value.orderuid);
		});
		/*End*/
		fileuploaderror = [];
	}	
	$(".toast-body-Success").html('Missing document uploaded successfully');
	$("#liveToastSuccess").toast("show");


});
/*End*/
/*@Desc Existing Loan doc merge or override @Author jainulabdeenb @Added on Dec 21 2020*/
function SendFileAsyncNew(formdata, filename) {

	return new Promise(function (resolve, reject) {

		if($('#uploadPane-Card').hasClass('hide'))
		{
			$('#uploadPane-Card').removeClass('hide');
			$("#uploadPane-Card").toast("show");
		}
		hash = Date.now();
		/*			li_element = '<li data-hash="'+ hash +'" style="list-style-type: none;"><span class="up_status fa fa-spin fa-spinner" aria-hidden="true"></span> '+filename+'<span class="filesize pull-right" data-filename="'+filename+'"><span hash="'+ hash +'" class="pma_drop_file_status" task="info"><span class="underline">Uploading...</span></span></span><br><progress max="100" value="10"></progress><span class="upload-percent"></span></li>';*/
		li_element ='<li data-hash="'+ hash +'" style="list-style-type: none;"><span><div class="px-3 py-1 d-flex align-items-center small text-gray-600 justify-content-end position-relative"><span class="position-absolute start-0">'+filename+'</span><span><span class="up_status"></span><span class="upload-percent"></span></span></div><div class="progress" id="removeprogressbar" style="height: 6px;"><div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div></div></span></li>';
		// $('#uploadPane-CardBody').append(li_element);
				// li_element = ' <div class="pb-2"><span><div class="px-3 py-1 d-flex align-items-center small text-gray-600 justify-content-end position-relative"><span class="position-absolute start-0">'+filename+'</span><span>75%</span></div><div class="progress" style="height: 6px;"><div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div></div></span>';

				$('.toast-body').append(li_element);
				$("#uploadPane-Card").toast("show");
				var progress = $('#uploadPane-CardBody').find('[data-hash="'+ hash +'"]');
				$.ajax({
					url: base_url + 'Orderentry/uploadfileoverride',
					type: 'POST',
					dataType: 'json',
					data: formdata,
					contentType: false,
					processData: false,
					beforeSend: function () {
						console.log("send");
					},
					xhr: function () {
						xhr = new window.XMLHttpRequest();

						xhr.upload.addEventListener("progress", function (evt) {
							if (evt.lengthComputable) {

								var percentComplete = evt.loaded / evt.total;
								percentComplete = parseInt(percentComplete * 100);
								console.log(percentComplete);
								$(progress).find('.progress-bar').css("width", percentComplete + "%")
								$(progress).find('progress').val(percentComplete);
								$(progress).find('.upload-percent').html(percentComplete + '%')
							}
						}, false);
						return xhr;

					}
				})
				.done(function(response) {
				// $(progress).find('.underline').html('Success');
				// $(progress).find('.up_status').removeClass('fa-spin');
				// $(progress).find('.up_status').removeClass('fa-spinner');
				// $(progress).find('.up_status').addClass('fa-check');
				// $(progress).find('.up_status').addClass('text-success');
				// $(progress).find('progress').hide();
				// $(progress).find('.upload-percent').hide();
				$(progress).find('#removeprogressbar').addClass('invisible');
				$(progress).find('.up_status').html('<span class="ms-3"><svg class="me-1" data-name="icons/tabler/check-heavy" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16"><rect data-name="Icons/Tabler/Check Heavy background" width="16" height="16" fill="none"></rect><path d="M5.434,11.7.234,6.5a.8.8,0,0,1,0-1.131L1.366,4.234a.8.8,0,0,1,1.131,0L6,7.737l7.5-7.5a.8.8,0,0,1,1.131,0l1.131,1.131a.8.8,0,0,1,0,1.131l-9.2,9.2a.8.8,0,0,1-1.131,0Z" transform="translate(0 2.003)" fill="#0D6EFD"></path></svg>Success</span>');
				$(progress).find('.progress-bar').hide();
				$(progress).find('.upload-percent').hide();
				resolve('Success');
				console.log("success");
			})
				.fail(function(jqXHR) {
				// $(progress).find('.underline').html('Failed');
				// $(progress).find('.up_status').removeClass('fa-spin');
				// $(progress).find('.up_status').removeClass('fa-spinner');
				// $(progress).find('.up_status').addClass('fa-exclamation-circle');
				// $(progress).find('.up_status').addClass('text-danger');
				// $(progress).find('progress').hide();
				// $(progress).find('.upload-percent').hide();
				$(progress).find('#removeprogressbar').addClass('invisible');
				$(progress).find('.up_status').html('<span class="ms-3"><svg width="12" height="12" viewBox="0 0 16 16" class="bi bi-info-circle me-1" fill="red" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"></path><circle cx="8" cy="4.5" r="1"></circle></svg>Failed</span>');
				$(progress).find('.progress-bar').hide();
				$(progress).find('.upload-percent').hide();

				console.log(jqXHR);
				/*reject("error");*/
			})
				.always(function() {
					$(progress).find('progress').hide();
					console.log("complete");
				});

			});
}
/*Check Auto Complete Enable*/
function CheckAutoComplete(OrderUID){
	$.ajax({
		type: "POST",
		url: base_url + "CommonController/Check_AutoCompleteDocCheckIn",
		data: {'OrderUID': OrderUID},
		dataType: 'json',
		beforeSend: function () {				
		},
		success: function (response) {
			console.log(response);
			if(response['AutoComplete'] == 1){
				return AutoCompleteDocCheckIn(OrderUID);
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			console.log(errorThrown);
			return false;
		},
		failure: function (jqXHR, textStatus, errorThrown) {
			console.log(errorThrown);
			return false;
		},
	});
}
/*Auto Complete Doc ChecIn*/
function AutoCompleteDocCheckIn(OrderUID){
	$.ajax({
		type: "POST",
		url: base_url+'OrderComplete/DocumentCheckInComplete',
		data: {
			'OrderUID': OrderUID
		},
		dataType: 'json',
		cache: false,
		beforeSend: function () {},
		success: function(data)
		{
			if (data.validation_error == 0) {
				console.log('Trailing Docs Completed');
				return true;
			} else {
				console.log('Trailing Docs Not Completed');
				return false;
			}
		}
	})
	.always(function () {
		return true;
	});
}



//For display email and document by group selected <By Raveena> Start
$(document).on('change','#ExportGroupId',function(){  
	ShowEmailIds();
	if($(this).val() != ""){
		$('#error_group').html("");
		var attr = $('.change_text_name').attr('disabled');
		if (typeof attr !== typeof undefined && attr !== false) {
			$('.change_text_name').removeClass('swal2-loading');
			$('.change_text_name').prop("disabled", false);
			$('.btn-danger').prop("disabled", false);
		}
	}
	else{  
		//$('#error_group').html('Please select group name');
		$('.EmailIds').val('').trigger('change'); 
		$('.EmailIds').append("<option>No User Found</option>");   
	}		  
});
//End

// For Show Email id's by select any group
function ShowEmailIds(){   
	ExportGroupId = $('#ExportGroupId').val();
	if(ExportGroupId != ""){
		$('.EmailIds').find('option').remove();
		$('.EmailIds').val('').trigger('change');
		$("#export_table input[type=checkbox]").each(function () {                      
			$(this).prop('checked',false);
		});
		$.ajax({
			url : base_url+'Completed/getEmailIdsByGroup' , 
			type : "POST",  
			data:{ExportGroupId:ExportGroupId}, 
			dataType: 'json',
			success : function(response) { 

				if(response!=""){
					var arr = [];
					i=0;
					$.each(response.emailid, function(key, value) {   
						$('.EmailIds').append('<option value="'+value.EmailID+'">'+value.EmailID+'</option>'); 
						arr[i++] = value.EmailID;
					});
					$('.EmailIds').val(arr).trigger('change');

					$('.attachment-limit-info').hide();

					$.each(response.document, function(key, value) {   
						$("#export_table input[type=checkbox]").each(function () {                      
							if($(this).attr("doc-id")==value.DocumentUID){
								$(this).prop('checked',true);
								$(this).trigger('change')
							}
						});
					});
				}  
				else{  
					$('.EmailIds').append("<option>No User Found</option>");   
				}           
			}  
		})  
	}
	else{  
    //$('#error_group').html('Please select group name');
    $('.EmailIds').val('').trigger('change'); 
    $('.EmailIds').append("<option>No User Found</option>");   
}    
} 

// For Filter in table <By Raveena>
$(document).on('keyup','#search',function(){  
	var searchTerm = $(this).val();
	var listItem = $('.export_tablecls tbody').children('tr');
	var searchSplit = searchTerm.replace(/ /g, "'):containsi('")

	$.extend($.expr[':'], {'containsi': function(elem, i, match, array){
		return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
	}
});
	$(".export_tablecls tbody tr").not(":containsi('" + searchSplit + "')").each(function(e){
		$(this).attr('visible','false');
	});
	$(".export_tablecls tbody tr:containsi('" + searchSplit + "')").each(function(e){
		$(this).attr('visible','true');
	});
	var jobCount = $('.export_tablecls tbody tr[visible="true"]').length;
	if(jobCount == '0') {$('.no-result').show();}
	else {$('.no-result').hide();}
});
/*@Desc Reverse Loan to Classification fror Merge or Override Loan @Author Jainulabdeenb @Added on Dec 23 2020*/
function ReverseLoan(OrderUID,WorkflowUID){
	$.ajax({
		type:"POST",
		url : base_url + 'OrderComplete/WorkflowOrderReverse',
		data:{OrderUID:OrderUID,WorkflowUID:WorkflowUID,VerifyBinOrder:''},
		dataType :"json",
		cache: false,
		beforeSend: function () {
		},
		success :function(response){
			console.log(response);
			$.ajax({
				type:"POST",
				url : base_url + 'Orderentry/DeleteStackedPages',
				data:{OrderUID:OrderUID},
				dataType :"json",
				cache: false,
				beforeSend: function () {
				},
				success :function(res){
					// if (response.validation_error == 1) {
					// 	$.notify(
					// 	{
					// 		icon:"icon-bell-check",
					// 		message:response.message
					// 	},
					// 	{
					// 		type:"success",
					// 		delay:1000 
					// 	});
					// }
				}
			});
		}
	})
}

// Workflows advanced filter
$(document).off("click", ".advancesearchbtn").on("click", ".advancesearchbtn", function() {
	$("#advancedsearch").slideToggle();
	if ($('#adv_PackageUID option').length == 1) {
		$('#adv_ProjectUID').trigger('change');
	}
});


//sidebar click function 

$('body').on('click','.minimizeSidebar',function(event){

	$("body").hasClass("sidebar-mini") ?  $("body").removeClass("sidebar-mini") : $("body").addClass("sidebar-mini");

	var SidebarCollapse = $("body").hasClass("sidebar-mini") ?  0 : 1;

	$.ajax({
		type:"POST",
		url : base_url + 'Profile/SaveSidebarCollapse',
		data:{'SidebarCollapse':SidebarCollapse},
		success :function(res){
		}
	});
});

// Automatically Logout from all Open Tabs When User Logout in One of them
$(document).ready(function(){
	if (window.localStorage){
		$('a._linkLogout').on('click', function(){
			localStorage.setItem("app-logout", 'logout' + Math.random());
			return true;
		});
	}

	window.addEventListener('storage', function(event){
		if (event.key == "app-logout") {
			window.location = base_url+"Login/Logout";
			// window.location = $('a._linkLogout').attr('href');
		}
	}, false);

	// A Function to Get a Cookie
	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
	// A Function to Get a Cookie End

	if (window.localStorage){
		localStorage.setItem("Check_Is_Logged_In", getCookie("login_session"));
	}

	function myTrim(x) {
		return x.replace(/^\s+|\s+$/gm,'');
	}

	var CheckUserSessionInterval = setInterval(function(){
		var login_session = myTrim(getCookie("login_session"));
		var Check_Is_Logged_In = myTrim(localStorage.getItem("Check_Is_Logged_In"));
		if (login_session == Check_Is_Logged_In) {

		} else {
			$.ajax({
				type: "POST",
				url: base_url + "CommonController/CheckUserSession",
				dataType: 'html',
				success: function (response) {			
					if (response.search("script") == -1) {
						localStorage.setItem("Check_Is_Logged_In", myTrim(response));
					} else {
						// Clear Interval
						clearInterval(CheckUserSessionInterval);
						localStorage.setItem("app-logout", 'logout' + Math.random());
						window.location = base_url+"Login/Logout";
					}
				}
			});
		}
	}, 3000);

});
// Automatically Logout from all Open Tabs When User Logout in One of them end

/*@Desc Check pdf file is password protected or not @Author SathishKumar @Added on March 04 2021*/
function PDFFileValidate(file) {

	if (file.type != "application/pdf") {
		return false;
	}

	return new Promise(function(myResolvePDFJS, myRejectPDFJS) {

    // var file = evt.target.files[0];

    //Read the file using file reader
    var fileReader = new FileReader();

    fileReader.onload = function () {

      //Turn array buffer into typed array
      var typedarray = new Uint8Array(this.result);

      //calling function to read from pdf file
      getText(typedarray).then(function (text) {

      	/*Selected pdf file content is in the variable text. */
          // $("#content").html(text);
          myResolvePDFJS("OK");
        }, function (reason) //Execute only when there is some error while reading pdf file
        {
          // alert('Seems this file is broken, please upload another file');
          console.log(reason);
          myResolvePDFJS("Error");
      });

      //getText() function definition. This is the pdf reader function.
      function getText(typedarray) {

        //PDFJS should be able to read this typedarray content

        var pdf = PDFJS.getDocument(typedarray);
        return pdf.then(function (pdf) {

          // get all pages text
          var maxPages = pdf.pdfInfo.numPages;
          var countPromises = [];
          // collecting all page promises
          for (var j = 1; j <= maxPages; j++) {
          	var page = pdf.getPage(j);

          	var txt = "";
          	countPromises.push(page.then(function (page) {
              // add page promise
              var textContent = page.getTextContent();

              return textContent.then(function (text) {
                // return content promise
                return text.items.map(function (s) {
                	return s.str;
                }).join(''); // value page text
            });
          }));
          }

          // Wait for all pages and join text
          return Promise.all(countPromises).then(function (texts) {
          	return texts.join('');
          });
      });
    }
};
    //Read the file as ArrayBuffer
    fileReader.readAsArrayBuffer(file);

});

}

/*End*/
/*@Desc Add Followup Contact @Author Jainulabdeen @Since April 10 2021*/
$(document).off('submit', '#frm_followupcontact').on('submit', '#frm_followupcontact', function (e) {
	e.preventDefault();
	e.stopPropagation();
	var formdatavalue=$('#frm_followupcontact').serialize();
	var formdata = new FormData($('#frm_followupcontact')[0]);
	/*@Decs script to check the unwanted input link HTML Tags*/
      var unwanted=unwanted_input(formdatavalue);
      if(unwanted==true){
  /*End*/
	var OrderUID = $('#OrderUID').val();
	formdata.append('OrderUID', OrderUID);
	$.ajax({
		type: "POST",
		url: base_url + "CommonController/AddFollowupContact",
		data: formdata,
		dataType:'json',
		processData: false,
		contentType: false,
		beforeSend: function () {
		},
		success :function(response){
			if (response.status == 1) {
				swal({
					title: "",
					text: response.message,
					icon: "success",
					confirmButtonClass: "btn btn-success",
					allowOutsideClick: false,
					width: '300px',
					buttonsStyling: false
				}).catch(swal.noop);
				// datatable.destroy();
				document.getElementById("frm_followupcontact").reset();
				$('.select2_selectemail').select2({
					tags: true,
					placeholder: "Select a Email"
				}); 
				var Cont = response.Contacts;
				var ContactUID = response.ContactUID;
				$.each(Cont, function (k, v) {
					var NewRow = '<tr><td>'+v.CompanyName+'</td><td>'+v.ContactName+'</td><td>'+v.EmailID+'</td><td>'+v.Phone+'</td><td><button type="button" data-ContactUID="'+ContactUID+'" class="Deletecontact btn btn-link btn-just-icon btn-xs"><svg width="16" height="16" viewBox="0 0 16 16" class="bi bi-trash" fill="red" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path></svg></button></td></tr>';
					$('.FollowupContactRow').append(NewRow);
				});
				$('#FollowupContactList').show();
				var FollCount = parseInt($('#FollCount').val());
				var NewFollCount = FollCount+1;
				$('#FollCount').val(NewFollCount);
				NewContact();
				/*@Desc for exception manual only enable save and send email button @Author Vishnu @Added on july 28 2021*/
				$('#exception_mail').attr('disabled',false);
				// FollowupContactRow();
			}else{
				swal({
					title: "",
					text: response.message,
					icon: "error",
					confirmButtonClass: "btn btn-success",
					allowOutsideClick: false,
					width: '300px',
					buttonsStyling: false
				}).catch(swal.noop);
				$.each(response, function(k, v) {
                    console.log(k);
                    $('#'+k).addClass("is-invalid");
                    $('#'+ k).closest('#border_id').addClass('select_border');

                  });
				}
		}
	});
    }
});
/*End*/
/*@Desc View Contact Only @Author Jainulabdeen @Since April 19 2021*/
$(document).off('click','#ViewContacts').on('click','#ViewContacts',function (e) {
	e.preventDefault();
	e.stopPropagation();
	$('#modal-Followup #ContactDetailsDiv').show();
	$('#modal-Followup #RaiseFollow').hide();
	$('#modal-Followup #ContactCountDiv').hide();
	$('#modal-Followup .modal-footer').hide();
});
/*End*/
/*@Desc New Followup with Contact @Author Jainulabdeen @Since April 19 2021*/
$(document).off('click','#NewFollowup').on('click','#NewFollowup',function (e) {
	e.preventDefault();
	e.stopPropagation();
	$('#modal-Followup #ContactDetailsDiv').hide();
	$('#modal-Followup #RaiseFollow').show();
	$('#modal-Followup #ContactCountDiv').show();
	$('#modal-Followup .modal-footer').show();
});
/*End*/
function calcTime(city, offset) {
    // create Date object for current location
    var d = new Date();
    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000*offset));

    var hours = nd.getHours();
    var minutes = nd.getMinutes();

                // Check whether AM or PM
                var newformat = hours >= 12 ? 'PM' : 'AM'; 
                
                // Find current hour in AM-PM Format
                hours = hours % 12; 
                
                // To display "0" as "12"
                hours = hours ? hours : 12;
                if (hours.toString().length == 1) {
                  hours = "0" + hours;
                } 
                minutes = minutes < 10 ? '0' + minutes : minutes;

                var month = nd.getMonth()+1;
                 if (month.toString().length == 1) {
                  month = "0" + month;
                } 
                var date =  nd.getDate();
                 if (date.toString().length == 1) {
                  date = "0" + date;
                } 

                dformat = [(month),
                date,
                nd.getFullYear()].join('/') +' ' +
                [hours,
                minutes
                ].join(':')+' ' + newformat;
                console.log(dformat);
                return dformat;
    // return time as a string
    return "The local time for city "+ city +" is "+ nd.toLocaleString();
}
function bytesToSize(bytes) {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes == 0) return '0 Byte';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
};
/* 
	Added to show warning for the Unanswered questions.
	Developed By Aiswarya <aiswarya.villodi@avanzegroup.com> 
	Updated By Aravindhan @Desc Checking Exception Enable or not
	Date :27 July 2021
*/
var fn_AuditScreen_audit_complete = function (button, button_text) {
//var retval = fu_popOutNa_Answer_Comment();
//console.log(button, button_text);
	 
var OrderUID = $('#OrderUID').val();
$.ajax({
	type: "POST",
	url: base_url + "CommonController/getExceptionEnable",
	data: {
		'OrderUID': OrderUID
	},
	dataType: 'json',
	success: function (data) {
	if (data != null) {
	let count =0;
	let QCcount =0;/*for Qc workflow*/
	/*@Desc if function added for Qc flow @Author Jeeva @Edited on April 19 2022*/
	if(button_text == "Quality Review Complete"){
		/*@Desc changes for QC review complete  @Author Jeeva @Added on April 18 2022*/
		/*$('.form-check-input2 > option:selected').each(function() {
			var selectedVal= $(this).val();
			var optionId= $(this).attr("id");

			var divId = optionId.split('-');
			var QuestiinId 			= divId[0];
			var isCommentMandatory  = divId[1];

			var  rowIdPopulate = "#"+QuestiinId + '-' + isCommentMandatory;
			$(rowIdPopulate).css("background","#00800029");

			/*@Desc To get both QC and Audit Response while complete the Quality Reiew 
			@Author Jeeva @Added on May 11 2022*/
			//var Auditval =$('select[name="answer['+QuestiinId+']"]').find('option:selected').val();
			//var Qualityval =$('select[name="qc_answer['+QuestiinId+']"]').find('option:selected').val();

			/*To check the audit and QC Response was not null */
			/*if((Auditval !="")&& (Qualityval=="") ){ QCcount=QCcount+1;
				$(rowIdPopulate).css("border","1px solid #f44336 !important");
				$(rowIdPopulate).css("background","#ff00002e");
			}
		});*/
		/*NormalFlow While QC complete*/
		if(QCcount == 0){
			$('.form-check-input2:visible > option:selected').each(function() {
				var selectedVal= $(this).val();
				var optionId= $(this).attr("id");

				var divId = optionId.split('-');
				var QuestiinId 			= divId[0];
				var isCommentMandatory  = divId[1];

				var  rowIdPopulate = "#"+QuestiinId + '-' + isCommentMandatory;
				$(rowIdPopulate).css("background","#00800029");

				if((selectedVal=="")){ count=count+1;
					$(rowIdPopulate).css("border","1px solid #f44336 !important");
					$(rowIdPopulate).css("background","#ff00002e");/*Populating unanswered Questions*/
				}
			});
		}
	}else{
		$('.fillcmnt:visible > option:selected').each(function() {
			var selectedVal= $(this).val();
			var optionId= $(this).attr("id");

			var divId = optionId.split('-');
			var QuestiinId 			= divId[0];
			var isCommentMandatory  = divId[1];
		// if((isCommentMandatory==1)||(isCommentMandatory==2)){ 
			var  rowIdPopulate = "#"+QuestiinId + '-' + isCommentMandatory;
			$(rowIdPopulate).css("background","#00800029");
		   // if((isCommentMandatory==1)||(isCommentMandatory==2)){ 
		   	if((selectedVal=="")){ count=count+1;
		   		$(rowIdPopulate).css("border","1px solid #f44336 !important");
				$(rowIdPopulate).css("background","#ff00002e");//Populating unanswered Questions
			}
		    // }
	    // }
	});
	}
	console.log(count);
	/* Ends Here.*/
	if(QCcount==0){/*for Qc workflow*/
	const wrapper = document.createElement('span');
	wrapper.innerHTML = "<span style='line-height: 1.7;'>"+count+" Audit Questions Are Unanswered, <br/>Do You Still Need To Continue?</span>"
	if (count != 0) {
		/*SWEET ALERT CONFIRMATION*/	
		swal({
			title: "",
			icon: "warning",
			content: wrapper,
			showCancelButton: true,
			confirmButtonText: "Proceed",
			confirmButtonClass: 'btn btn-success',
			cancelButtonText: 'Close',
			cancelButtonClass: 'btn btn-danger',
			buttonsStyling: false,
			closeOnClickOutside: false,
			allowOutsideClick: false,
			showLoaderOnConfirm: true,
			position: 'top-end',
			buttons: {
				cancel: "Cancel",
				catch: {
					text: "Ok",
					value: "catch",
				}
			},
		}).then(function(confirm) {
			if (confirm == "defeat" || confirm == "catch") {
				$.ajax({
					type: "POST",
					url: base_url + 'Audit/GetListOfQuestionMissingCommentsNew',
					/*@Desc buttontext added for Qc flow @Author Jeeva @Edited on April 19 2022*/
					data: {
						'OrderUID': OrderUID,"buttontext":button_text
					},
					dataType: 'json',
					cache: false,
					beforeSend: function () {
						$(".page_loader_div").show();
					},
					success: function (data) { 
						if(data==0){
							/*@Desc if function added for Qc flow @Author Jeeva @Edited on April 19 2022*/
							if(button_text == "Quality Review Complete"){
								QCsave_QualityScreen(button, button_text);
							}else{
								auditsave_auditingScreen(button, button_text);
							}
						}else{
							$(".page_loader_div").hide();
							$('#error_exceptionChecklist').text("");
							$('#auditChecklist').html(data);   
							$('#auditQuestion_modal').modal('show');
							$('.select2_single_select').select2({

							});
							/*@Desc if function added for Qc flow @Author Jeeva @Edited on April 19 2022*/
							if(button_text == "Quality Review Complete"){
								$('.QCRemarksdiv').html('<label for="exceptionremarks" class="form-label">QC Remarks</label><textarea style="min-height: 30px;" name="exceptionqcremarks" class="form-control"></textarea>');
								$(".QCExceptionSave").attr('id',"QcExceptionautoPopUP");
							}
						}

					},
					error: function (jqXHR) {

					}
				});
			}else{
				disposepopover();
				$(".page_loader_div").hide();
			}
		}).catch(swal.noop)
	}else{
		$.ajax({
			type: "POST",
			url: base_url + 'Audit/GetListOfQuestionMissingCommentsNew',
			/*@Desc Buttontext added for Qc flow @Author Jeeva @Edited on April 19 2022*/
			data: {
				'OrderUID': OrderUID,"buttontext":button_text
			},
			dataType: 'json',
			cache: false,
			beforeSend: function () {
				$(".page_loader_div").show();
			},
			success: function (data) { 
				if(data==0){
					/*@Desc if function added for Qc flow @Author Jeeva @Edited on April 19 2022*/
					if(button_text == "Quality Review Complete"){
						QCsave_QualityScreen(button, button_text);
					}else{
						auditsave_auditingScreen(button, button_text);
					}
				}else{
					$(".page_loader_div").hide();
					$('#error_exceptionChecklist').text("");
					$('#auditChecklist').html(data);   
					$('#auditQuestion_modal').modal('show');
					$('.select2_single_select').select2({

					});
					if(button_text == "Quality Review Complete"){
						$('.QCRemarksdiv').html('<label for="exceptionremarks" class="form-label">QC Remarks</label><textarea style="min-height: 30px;" name="exceptionqcremarks" class="form-control"></textarea>');
						$(".QCExceptionSave").attr('id',"QcExceptionautoPopUP");
					}
				}

			},
			error: function (jqXHR) {

			}
		});
	} }else{
		/*@Desc Alert to show while Audit have value but Qc Response was Null in QC workflow
		 @Author Jeeva @Added on May 11 2022*/
		const wrapper = document.createElement('span');
		wrapper.innerHTML = "<span style='line-height: 1.7;'>"+QCcount+" QC Audit Questions Are Unanswered, <br/>Please Answer all the CheckList.!</span>"

		swal({
			title: "",
			icon: "warning",
			content: wrapper,
			showCancelButton: true,
			confirmButtonText: "Proceed",
			confirmButtonClass: 'btn btn-success',
			cancelButtonText: 'Close',
			cancelButtonClass: 'btn btn-danger',
			buttonsStyling: false,
			closeOnClickOutside: false,
			allowOutsideClick: false,
			showLoaderOnConfirm: true,
			position: 'top-end',
			buttons: {
				catch: {
					text: "Ok",
					value: "catch",
				}
			},
		});
	}
	} else {
		auditsave_auditingScreen(button, button_text);
	}
	}
});
};

/* Function to validate The Form Pop Up &  Audit Complete 
   Condition: If the answer is “NA” then adding comments is mandatory
   If 'Comment Mandatory' is enabled from Admin them comments is mandatory 
   Developed By Aiswarya @since Date :27 July 2021
*/
$(document).off('click', '#autoPopUP').on('click', '#autoPopUP', function (e) {
	$('#error_exceptionChecklist').text("");
	$('#error_exceptionChecklist').css({"display" : "none"});
	var button = $(this);
	var button_text = $(this).html();
		let validation_error		=	0;
	$('.commentValidation:input').each(function() {
		let isCommentMandatoryVal = $(this).val();
		let datauid	 			  = $(this).attr('data-uid');    
		$("#tableRow"+datauid).css('background', '#ffffff');
		//let auditanswer			  = $("#auditanswer"+datauid).val();
		//if((isCommentMandatoryVal==1)|| (auditanswer=="NA")){
		if((isCommentMandatoryVal==1)){
			let auditCommentsVal 	= $("#auditComments"+datauid).val();
			currentid           	="#tableRow"+datauid;
			$(currentid).css('background', '#ffffff');
			if(auditCommentsVal==""){
				$(currentid).css('background', '#ff00002e');
				$("#auditComments"+datauid).focus();
	        	validation_error	=	1;
			}
		}
		let auditanswer			  = $("#auditanswer"+datauid).val();
		/*Added By aiswarya if Anwser is Yes/NA no need the validation of mandatory fields*/
		if ($('#ExceptionList-'+datauid).is(":checked") && (auditanswer!="Yes")&&(auditanswer!="NA")) {
			let ExceptionCategoryVal 	= $("#ExceptionCategory-"+datauid).val();
			let ExceptionTypeVal 	= $("#ExceptionType-"+datauid).val();
			if (ExceptionCategoryVal == '' || ExceptionTypeVal == '') {
				currentid = "#tableRow"+datauid;
				$(currentid).css('background', '#ff00002e');
				$("#ExceptionCategory"+datauid).focus();
	        	validation_error	=	2;
			}
		}
		/*Ends Here */
	});	
	if(validation_error==1){
		$('#error_exceptionChecklist').css({"display" : "block"});
		$('#error_exceptionChecklist').text("Please fill the comments");
	}
	if(validation_error==2){
		$('#error_exceptionChecklist').css({"display" : "block"});
		$('#error_exceptionChecklist').text("Please fill the mandatory fields");
	}
	if(validation_error==0)
	{ 
		$('#auditQuestion_modal').hide();
		$('#error_exceptionChecklist').css({"display" : "none"});
		auditsave_auditingScreen(button, button_text);
	}
});

/*@Desc Exception rise question popup for QC Flow @Author Jeeva @Added on April 19 2022*/
$(document).off('click', '#QcExceptionautoPopUP').on('click', '#QcExceptionautoPopUP', function (e) {
	$('#error_exceptionChecklist').text("");
	$('#error_exceptionChecklist').css({"display" : "none"});
	var button = $(this);
	var button_text = $(this).html();
		let validation_error		=	0;
	$('.commentValidation:input').each(function() {
		let isCommentMandatoryVal = $(this).val();
		let datauid	 			  = $(this).attr('data-uid');    
		$("#tableRow"+datauid).css('background', '#ffffff');
		//let auditanswer			  = $("#auditanswer"+datauid).val();
		//if((isCommentMandatoryVal==1)|| (auditanswer=="NA")){
		if((isCommentMandatoryVal==1)){
			let auditCommentsVal 	= $("#auditComments"+datauid).val();
			currentid           	="#tableRow"+datauid;
			$(currentid).css('background', '#ffffff');
			if(auditCommentsVal==""){
				$(currentid).css('background', '#ff00002e');
				$("#auditComments"+datauid).focus();
	        	validation_error	=	1;
			}
		}
		let auditanswer			  = $("#auditanswer"+datauid).val();
		/*Added By aiswarya if Anwser is Yes/NA no need the validation of mandatory fields*/
		if ($('#ExceptionList-'+datauid).is(":checked") && (auditanswer!="Yes")&&(auditanswer!="NA")) {
			let ExceptionCategoryVal 	= $("#ExceptionCategory-"+datauid).val();
			let ExceptionTypeVal 	= $("#ExceptionType-"+datauid).val();
			if (ExceptionCategoryVal == '' || ExceptionTypeVal == '') {
				currentid = "#tableRow"+datauid;
				$(currentid).css('background', '#ff00002e');
				$("#ExceptionCategory"+datauid).focus();
	        	validation_error	=	2;
			}
		}
		/*Ends Here */
	});	
	if(validation_error==1){
		$('#error_exceptionChecklist').css({"display" : "block"});
		$('#error_exceptionChecklist').text("Please fill the comments");
	}
	if(validation_error==2){
		$('#error_exceptionChecklist').css({"display" : "block"});
		$('#error_exceptionChecklist').text("Please fill the mandatory fields");
	}
	if(validation_error==0)
	{ 
		$('#auditQuestion_modal').hide();
		$('#error_exceptionChecklist').css({"display" : "none"});
		QCsave_QualityScreen(button, button_text);
	}
});

/* Ends Here */
/*  Function Show the 3rd pop up to confirm 
	@author Aiswarya <aiswarya.villodi@avanzegroup.com>	
*/
var auditsave_auditingScreen = function (button, button_text) {
	/*SWEET ALERT CONFIRMATION*/
	swal({
		title: 'Are you sure ?',
		text: 'Do you want to complete the Audit?',
		icon: "warning",
			showCancelButton: true,
			confirmButtonClass: 'btn btn-success',
			cancelButtonClass: 'btn btn-danger',
			buttonsStyling: false,
			closeOnClickOutside: false,
			allowOutsideClick: false,
			showLoaderOnConfirm: true,
			position: 'top-end',
			buttons: {
				cancel: "Cancel",
				catch: {
					text: "Complete & Go to My Loans!",
					value: "catch",
				}
			},}).then(function (confirm) {
			if (confirm == "defeat" || confirm == "catch") {
				var complete_action = 0;
				if (confirm == "catch") {
					var complete_action = "Transactions";
				}

				$(button).prop('disabled', true);
				$(button).html('<i class="fa fa-spin fa-spinner"></i> Completing');
				raiseExceptionBasedQuestion(button, button_text, complete_action);
				var OrderUID = $('#OrderUID').val();

			}else{ 
				disposepopover();
				$(".page_loader_div").hide();
				location.reload(true);
			}
		}, function (dismiss) {
			
	});

	
}

/*@Desc QC save and Complete Function @Author Jeeva @Added on April 19 2022*/
var QCsave_QualityScreen = function (button, button_text) {
	/*SWEET ALERT CONFIRMATION*/
	swal({
		title: 'Are you sure ?',
		text: 'Do you want to complete the Quality Review?',
		icon: "warning",
			showCancelButton: true,
			confirmButtonClass: 'btn btn-success',
			cancelButtonClass: 'btn btn-danger',
			buttonsStyling: false,
			closeOnClickOutside: false,
			allowOutsideClick: false,
			showLoaderOnConfirm: true,
			position: 'top-end',
			buttons: {
				cancel: "Cancel",
				catch: {
					text: "Complete & Go to My Loans!",
					value: "catch",
				}
			},}).then(function (confirm) {
			if (confirm == "defeat" || confirm == "catch") {
				var complete_action = 0;
				if (confirm == "catch") {
					var complete_action = "Transactions";
				}

				$(button).prop('disabled', true);
				$(button).html('<i class="fa fa-spin fa-spinner"></i> Completing');
				raiseExceptionBasedQualityReviewQuestion(button, button_text, complete_action);
				var OrderUID = $('#OrderUID').val();

			}else{ 
				disposepopover();
				$(".page_loader_div").hide();
				location.reload(true);
			}
		}, function (dismiss) {
			
	});

	
}
/* Ends Here */
/*  Function : To Raise the checkList Exception (from Audit Screen POP UP)
	@author Aiswarya <aiswarya.villodi@avanzegroup.com> 
	@since 27th July 2021
*/
var raiseExceptionBasedQuestion = function(button, button_text,complete_action){
	//console.log($('#exceptionsCheckLists').serialize());
	var formdata =$('#exceptionsCheckLists').serialize();
	var url  			= location.pathname;
    var orderId 		= url.split("/").pop();// "orderId" 
	$.ajax({
		type: "POST",
		url: base_url + 'Audit/MoveExceptionCheckList',
		data: formdata,
		dataType: 'json',
		cache: false,
		beforeSend: function () {
			$(".page_loader_div").show();
		},
		
		success: function (response) {
			if(response.status == 1){
		    	var OrderUID = $('#OrderUID').val();
		    	/*@Desc send mail for Exception Details with Question @Author Jeeva Kaleeswar N @Added on July 16 2021*/
				ExceptionDetail_notification(OrderUID);
				
		    }
		    disposepopover();
			fn_autosave_auditing().then(function (response) {

						fn_audit_complete(button, button_text, complete_action);
					}).catch(function (error) {});
			
			// $(".page_loader_div").hide();
		},
		error: function (jqXHR) {
			
		}
		
	});
}

/*@Desc QC responce save function @Author Jeeva @Added on April 19 2022*/
var raiseExceptionBasedQualityReviewQuestion = function(button, button_text,complete_action){
	var formdata =$('#exceptionsCheckLists').serialize();
	var url  			= location.pathname;
    var orderId 		= url.split("/").pop();// "orderId" 
    $.ajax({
    	type: "POST",
    	url: base_url + 'Audit/QualityReviewExceptionRaise',
    	data: formdata,
    	dataType: 'json',
    	cache: false,
    	beforeSend: function () {
    		$(".page_loader_div").show();
    	},

    	success: function (response) {
    		if(response.status == 3){
    			swal({
    				text: response.message,
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
    						value: false,
    						visible: true,
    						className: "btn-sm",
    						closeModal: true,
    					},
    				},
    			}).then(function (confirm) {	
    				disposepopover();

    				setTimeout(function(){
    					if (complete_action) {
    						window.location.href = base_url + complete_action;
    					} else {
    						location.reload();
    					}
    				},3000);
    			});
    		}
    	},
    	error: function (jqXHR) {

    	}

    });
}

/*@Desc send mail for Exception Details With Question @Author Vishnu @Added on june 18 2021*/
function ExceptionDetail_notification(OrderUID)
{
	$.ajax({
		type: "POST",
		url: base_url + 'Audit/ExceptionDetail_notification',
		data: {
			'OrderUID': OrderUID
		},
		dataType: 'json',
		success: function (data) {
		}
	});
}

/*@Desc To Delete the contact in Email Modal Follow-up  @Author Jeeva Kaleeswar N @Added on Aug 03 2021*/
$("body").off('click','.Deletecontact').on("click" , ".Deletecontact" , function(e){
    e.preventDefault();
    var currentrow = $(this);
    var ContactUID = $(currentrow).attr('data-ContactUID');
    var tablename = '#FollowupContactRowException';

    $.ajax({
		type: "POST",
		url: base_url + "CommonController/deletefollowupcontact",
		data: {
			'ContactUID': ContactUID
		},
		dataType: 'json',
		beforeSend: function () {
			$(".page_loader_div").show();
		},
		success: function (data) {
    		$(currentrow).closest('tr').remove();
    		var FollCount = parseInt($('#FollCount').val());
    		var NewFollCount = FollCount-1;
    		$('#FollCount').val(NewFollCount);
    		NewContact();
    		$(".page_loader_div").hide();
		}
	});
  });

/*@Desc phone format @Author Vishnu @Added on August 03 2021*/
$(".PhoneFormat").usPhoneFormat({
  format: '(xxx) xxx-xxxx'
});

			/*@Desc Insert Data @Author Sathishkumar @Added on Sep 29 2021*/
			function InsertData_New(formData,formDataValue){

				button = $(".single_submit[clicked=true]");
				button_val = $(".single_submit[clicked=true]").val();
				button_text = $(".single_submit[clicked=true]").html();
				console.log(button);
				/*@Decs Function Call for validate the unwanted input @Author Aravindhan R @Added on June 25 2021 */
				var unwanted=unwanted_input(formDataValue);
				if(unwanted==true){
				var progress=$('#orderentry-progressupload .progress-bar');

				$.ajax({
					type: "POST",
					url: base_url + 'Orderentry/insert',
					data: formData, 
					dataType:'json',
					cache: false,
					processData:false,
					contentType:false,
					beforeSend: function(){
			// addcardspinner('#Orderentrycard');
			button.attr("disabled", true);
			button.html('Loading ...'); 
			if (filetoupload.length || filetouploadnew.length) {
				$("#orderentry-progressupload").show();
			}
		},
		xhr: function () {
			var xhr = new window.XMLHttpRequest();
			if (filetoupload.length || filetouploadnew.length) {
				xhr.upload.addEventListener("progress", function (evt) {
					if (evt.lengthComputable) {
						var percentComplete = evt.loaded / evt.total;
						percentComplete = parseInt(percentComplete * 100);
						$(progress).width(percentComplete + '%');
						$(progress).text('' + percentComplete + '%');
					}
				}, false);
			}
			return xhr;
		},
		success: function(data)
		{
			if(data['validation_error'] == 0){

				var aFileSubmit = [];
				var files = [];
				var respOrderUIDs = data['id'];

				$.each(filetoupload, function (key, value) {
					files.push(value.filename);
				})

				$.each(data['matching_files'], function (fkey, fvalue) {

					var currentfield = filetoupload.filter(function (element, index) {
						return element.filename == fvalue.FileNames && element.Position == fvalue.Position;
					});

					if (currentfield) {
						var fFormData = new FormData();
						fFormData.append('DocumentFiles[]', currentfield[0].file);
						fFormData.append('OrderUID[]', fvalue.OrderUID);
						fFormData.append('UploadType', "Separate");
						fFormData.append('MergeLater', "Yes");
						fFormData.append('Files[]', currentfield[0].filename);

						aFileSubmit.push(SendFileAsync(fFormData, currentfield[0].filename));

					}
				})
				if (filetouploadnew && filetouploadnew.length > 0) {
					var aFileSubmitNew = [];
					var filesNew = [];
					var respOrderUIDs = data['id'];

					$.each(filetouploadnew, function (key, value) {
						filesNew.push(value.filename);
					})

					$.each(filetouploadnew, function (key, value) {

						var fFormData = new FormData();
						fFormData.append('module_name', 'Single Entry');
						fFormData.append('OrderUID[]', respOrderUIDs);
						fFormData.append('DocumentFiles[]', value.file);

						$.each(filesNew, function (fKey, fValue) {
							var fileextension = value.filename.split('.').pop();
							if(fileextension == 'zip' || fileextension == 'pdf'){
								fFormData.append('Files[]', value);
							}
							else{
								return;
							}

						})

						fFormData.append('UploadType', UploadType);

						if (UploadType == 'Merge') {
							fFormData.append('UploadType', "Separate");
							fFormData.append('MergeLater', "Yes");
						}

						aFileSubmitNew.push(SendFileAsync(fFormData, value.filename, 'new'));
					});
				}
				$(".toast-body-Success").html(data['message']);
				$("#liveToastSuccess").toast("show");
				var mergeavailable = false;
				Promise.all(aFileSubmit).then(function(response) {
						// make ajax to merge uploaded files.
						mergeavailable = true;
						// MergeFilesLater();
					});

				var multiplemergeavailable = false;

				if (aFileSubmitNew && aFileSubmitNew.length > 0) {
					multiplemergeavailable = true;
					Promise.all(aFileSubmitNew).then(function(response) {
							// make ajax to merge uploaded files.

							MergeFilesLater(respOrderUIDs, 'new', 'Single Entry').then(function(response) {
								/*Auto Complete Doc CheckIn*/
								$.when(CheckAutoComplete(data['id'][0])).done(function(a1){

									setTimeout(function() { 
										if (OrderEntryBtnID == 'saveandnew') {
											window.location.href = base_url + "Orderentry/index_new";
										} else {
											/*		window.location.href = base_url + data['Workflow_Controller'];*/
											window.location.href = base_url +"Transactions?e="+data['Workflow_redirection'];
										}						
									}, 1000);

								});
								
								/*End*/
							});
						});
				}

				if(!mergeavailable && !multiplemergeavailable) {

					setTimeout(function() { 
						if (OrderEntryBtnID == 'saveandnew') {
							window.location.href = base_url + "Orderentry/index_new";
						} else {
							/*window.location.href = base_url + data['Workflow_Controller'];*/
							window.location.href = base_url +"Transactions?e="+data['Workflow_redirection'];
						}						
					}, 3000);


				}

			}else if(data['validation_error'] == 1){


						// removecardspinner('#Orderentrycard');
						$(".toast-body-Error").html(data['message']);
						$("#liveToastError").toast("show");
						button.html(button_text);
						button.removeAttr("disabled");


						$.each(data, function(k, v) {
							$('#'+k).addClass("is-invalid").closest('.form-group').removeClass('has-success').addClass('has-danger');
							$('#'+ k +'.select2picker').next().find('span.select2-selection').addClass('errordisplay');

						});
					}else if(data['validation_error'] == 2){
						// removecardspinner('#Orderentrycard');
						$('#duplicate-modal').modal('show');
						$('#Skip_duplicate').val(1);
						$('#button_value').val(button_val);
						$('#insert_html').html(data['html']);	
						$('#insert_order').removeAttr('disabled');									
					}

				},
				error: function (jqXHR, textStatus, errorThrown) {

					console.log(errorThrown);

				},
				failure: function (jqXHR, textStatus, errorThrown) {

					console.log(errorThrown);

				},
			});
	}
}

/*@Desc Check Unlock user in or out of loan Start @Author Vishnu @Added on feb 22 2022*/
$(window).on('load', function() {
	if (typeof UnlockedOrderNumber == 'undefined') {
		CheckOrRemoveUnlockUser("");
	}else{
		CheckOrRemoveUnlockUser(UnlockedOrderNumber);
	}
});

function CheckOrRemoveUnlockUser(UnlockedOrderNumber){
	$.ajax({
		url: base_url +'CommonController/CheckOrRemoveUnlockUser',
		type: "POST",
		dataType: "JSON",
		data: {
			'UnlockedOrderNumber':UnlockedOrderNumber      
		},                                
		success: function (data){

		}
	});
}
/*Check Unlock user in or out of loan End*/

/*@Desc Validate Min & Max value for Sampling Percentage - START @Author Jain @On Mar 9 2022*/
function imposeMinMax(el){
	if(el.value != ""){
		if(parseInt(el.value) < parseInt(el.min)){
			el.value = el.min;
		}
		if(parseInt(el.value) > parseInt(el.max)){
			el.value = el.max;
		}
	}
}
var invalidChars = ["-","+","e"];
var inputBox = document.getElementById("OrderQCSkipPercentage");
inputBox.addEventListener("keydown", function(e) {
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
});
/*@Desc Validate Min & Max value for Sampling Percentage - END @Author Jain @On Mar 9 2022*/

/*@DESC To Get Export Document at DE, PC, Excep, QR Workflows @Karthiga 21/3/2022*/
function ExportStatusUpdateForAllWorkflows(OrderUID,FileType,Tab) {
	return new Promise(function (resolve, reject) {
		console.log('INside ExportStatusUpdateForAllWorkflows');
		$.ajax({
			type: "POST",
			url: base_url+'CommonController/ExportStatusUpdateForAllWorkflows',
			dataType: 'json',
			data: { 'OrderUID': OrderUID, 'FileType':FileType, 'Tab':Tab},
			success: function (data) {
				console.log(data);
				resolve('Success');
			}
		});
	});	
}