<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="products-list.aspx.cs" Inherits="tiautocom.adm.panel.products_list" %>

<!doctype html>
<html lang="pt-br">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="">
	<meta name="author" content="">
	<link rel="icon" href="favicon.ico">
	<title>Entrada produto simples</title>
	<!-- Simple bar CSS -->
	<link rel="stylesheet" href="css/simplebar.css">
	<!-- Fonts CSS -->
	<link href="https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,100;0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
	<!-- Icons CSS -->
	<link rel="stylesheet" href="css/feather.css">
	<link rel="stylesheet" href="css/select2.css">
	<link rel="stylesheet" href="css/dropzone.css">
	<link rel="stylesheet" href="css/uppy.min.css">
	<link rel="stylesheet" href="css/jquery.steps.css">
	<link rel="stylesheet" href="css/jquery.timepicker.css">
	<link rel="stylesheet" href="css/quill.snow.css">
	<!-- Date Range Picker CSS -->
	<link rel="stylesheet" href="css/daterangepicker.css">
	<!-- App CSS -->
	<link rel="stylesheet" href="css/app-light.css" id="lightTheme">
	<link rel="stylesheet" href="css/app-dark.css" id="darkTheme" disabled="">

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

	<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700" rel="stylesheet">
</head>
<body class="vertical  light  ">
	<div class="wrapper">
		<nav class="topnav navbar navbar-light">
			<button type="button" class="navbar-toggler text-muted mt-2 p-0 mr-3 collapseSidebar">
				<i class="fe fe-menu navbar-toggler-icon"></i>
			</button>
			<form class="form-inline mr-auto searchform text-muted">
				<input class="form-control mr-sm-2 bg-transparent border-0 pl-4 text-muted" type="search" placeholder="Type something..." aria-label="Search">
			</form>
			<%-- div cabeçalho--%>
			<div id="getnav"></div>
		</nav>
		<aside class="sidebar-left border-right bg-white shadow" id="leftSidebar" data-simplebar="">
			<a href="#" class="btn collapseSidebar toggle-btn d-lg-none text-muted ml-2 mt-3" data-toggle="toggle">
				<i class="fe fe-x"><span class="sr-only"></span></i>
			</a>
			<%-- menu scripts--%>
			<div id="divmenuhtml"></div>
		</aside>
		<main role="main" class="main-content">
			<div class="container-fluid">
				<div class="row justify-content-center">
					<div class="col-12">
						<div class="row align-items-center mb-2">
							<div class="col">
								<div id="title-html"></div>
							</div>
							<div class="col-auto">
								<form class="form-inline">
									<div class="form-group d-none d-lg-inline">
										<label for="reportrange" class="sr-only">Date Ranges</label>
										<div id="reportrange" class="px-2 py-2 text-muted">
											<span class="small"></span>
										</div>
									</div>
								</form>
							</div>
						</div>
						<hr />
						<h2 class="h3 mb-3 page-title">Lista de Produtos</h2>
						<div class="row mb-4 items-align-center">
							<div class="col-md">
								<div class="html_descripitions" id="html_descripitions"></div>
							</div>
							<div class="col-md-auto ml-auto text-right">
								<button type="button" class="btn" data-toggle="modal" data-target=".modal-slide"><span class="fe fe-filter fe-16 text-muted"></span></button>
								<button type="button" class="btn" onclick="location.href='products-list.aspx';"><span class="fe fe-refresh-ccw fe-16 text-muted"></span></button>
							</div>
						</div>
						<!-- Slide Modal -->
						<div class="modal fade modal-slide" tabindex="-1" role="dialog" aria-labelledby="defaultModalLabel" aria-hidden="true">
							<div class="modal-dialog" role="document">
								<div class="modal-content">
									<div class="modal-header">
										<h5 class="modal-title" id="defaultModalLabel3">Filtro</h5>
										<button type="button" class="close" data-dismiss="modal" aria-label="Close">
											<i class="fe fe-x fe-12"></i>
										</button>
									</div>
									<div class="modal-body">
										<div class="p-2">
											<div class="form-group my-4">
												<p class="mb-2"><strong>Lista de Departamentos</strong></p>
												<label for="multi-select2" class="sr-only"></label>
												<div id="multi-select-department"></div>
											</div>
											<div class="modal-footer">
												<button type="button" class="btn mb-2 btn-primary btn-block" onclick="getprodutctsdepartament()">Pesquisar Departamento</button>
											</div>

											<!-- form-group -->
											<div class="form-group my-6">
												<p class="mb-6">
													<strong>Descrição/Codigo de barras</strong>
												</p>
												<div>
													<input class="form-control mr-sm-6 bg-transparent border-0 pl-6 text-muted" type="search" placeholder="Descrição Produto..." aria-label="Search">
												</div>
												<div class="modal-footer">
													<button type="button" class="btn mb-2 btn-secondary btn-block">Pesquisar</button>
												</div>
											</div>
										</div>
									</div>

								</div>
							</div>
						</div>

						<div id="table-products"></div>

						<nav aria-label="Table Paging" class="my-3">
							<ul class="pagination justify-content-end mb-0">
								<li class="page-item"><a class="page-link" href="#">Previous</a></li>
								<li class="page-item active"><a class="page-link" href="#">1</a></li>
								<li class="page-item "><a class="page-link" href="#">2</a></li>
								<li class="page-item"><a class="page-link" href="#">3</a></li>
								<li class="page-item"><a class="page-link" href="#">Next</a></li>
							</ul>
						</nav>
					</div>
				</div>
				<!-- .row -->
			</div>
			<!-- .container-fluid -->
			<div class="modal fade modal-notif modal-slide" tabindex="-1" role="dialog" aria-labelledby="defaultModalLabel" aria-hidden="true">
				<div class="modal-dialog modal-sm" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="defaultModalLabel">Notifications</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<div class="list-group list-group-flush my-n3">
								<div class="list-group-item bg-transparent">
									<div class="row align-items-center">
										<div class="col-auto">
											<span class="fe fe-box fe-24"></span>
										</div>
										<div class="col">
											<small><strong>Package has uploaded successfull</strong></small>
											<div class="my-0 text-muted small">Package is zipped and uploaded</div>
											<small class="badge badge-pill badge-light text-muted">1m ago</small>
										</div>
									</div>
								</div>
								<div class="list-group-item bg-transparent">
									<div class="row align-items-center">
										<div class="col-auto">
											<span class="fe fe-download fe-24"></span>
										</div>
										<div class="col">
											<small><strong>Widgets are updated successfull</strong></small>
											<div class="my-0 text-muted small">Just create new layout Index, form, table</div>
											<small class="badge badge-pill badge-light text-muted">2m ago</small>
										</div>
									</div>
								</div>
								<div class="list-group-item bg-transparent">
									<div class="row align-items-center">
										<div class="col-auto">
											<span class="fe fe-inbox fe-24"></span>
										</div>
										<div class="col">
											<small><strong>Notifications have been sent</strong></small>
											<div class="my-0 text-muted small">Fusce dapibus, tellus ac cursus commodo</div>
											<small class="badge badge-pill badge-light text-muted">30m ago</small>
										</div>
									</div>
									<!-- / .row -->
								</div>
								<div class="list-group-item bg-transparent">
									<div class="row align-items-center">
										<div class="col-auto">
											<span class="fe fe-link fe-24"></span>
										</div>
										<div class="col">
											<small><strong>Link was attached to menu</strong></small>
											<div class="my-0 text-muted small">New layout has been attached to the menu</div>
											<small class="badge badge-pill badge-light text-muted">1h ago</small>
										</div>
									</div>
								</div>
								<!-- / .row -->
							</div>
							<!-- / .list-group -->
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary btn-block" data-dismiss="modal">Clear All</button>
						</div>
					</div>
				</div>
			</div>

			<div class="modal fade modal-shortcut modal-slide" tabindex="-1" role="dialog" aria-labelledby="defaultModalLabel" aria-hidden="true" id="modal-fade-modal-shortcut-modal-slide">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="defaultModalLabels">Shortcuts</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body px-5">
							<div class="row align-items-center">
								<div class="col-6 text-center">
									<div class="squircle bg-success justify-content-center">
										<i class="fe fe-cpu fe-32 align-self-center text-white"></i>
									</div>
									<p>Control area</p>
								</div>
								<div class="col-6 text-center">
									<div class="squircle bg-primary justify-content-center">
										<i class="fe fe-activity fe-32 align-self-center text-white"></i>
									</div>
									<p>Activity</p>
								</div>
							</div>
							<div class="row align-items-center">
								<div class="col-6 text-center">
									<div class="squircle bg-primary justify-content-center">
										<i class="fe fe-droplet fe-32 align-self-center text-white"></i>
									</div>
									<p>Droplet</p>
								</div>
								<div class="col-6 text-center">
									<div class="squircle bg-primary justify-content-center">
										<i class="fe fe-upload-cloud fe-32 align-self-center text-white"></i>
									</div>
									<p>Upload</p>
								</div>
							</div>
							<div class="row align-items-center">
								<div class="col-6 text-center">
									<div class="squircle bg-primary justify-content-center">
										<i class="fe fe-users fe-32 align-self-center text-white"></i>
									</div>
									<p>Users</p>
								</div>
								<div class="col-6 text-center">
									<div class="squircle bg-primary justify-content-center">
										<i class="fe fe-settings fe-32 align-self-center text-white"></i>
									</div>
									<p>Settings</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="modal fade modal-right modal-slide" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="mySmallModalLabel">
				<div class="modal-dialog modal-xl" role="document" id="modal-large">
					<div class="modal-header">
						<%--//title--%>
						<div id="modal-title"></div>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-content">
						<div class="modal-body">
							<div class="col-md-12">
								<div class="form-group mb-12">
									<label for="product-description">Descrição do Produto</label>
									<input type="text" id="product-description" class="form-control" readonly="">
								</div>
								<div class="form-group mb-12">
									<label for="product-price">Código de barras</label>
									<input type="text" id="product-code" class="form-control" readonly="">
								</div>
								<div class="form-group mb-12">
									<label for="product-price">R$ Preço</label>
									<input type="text" id="product-price" class="form-control" readonly="" value="0,00" style="text-align: right">
								</div>
								<div class="form-group mb-12">
									<label for="product-price">Estoque</label>
									<input type="text" id="product-inventory" class="form-control" readonly="" value="0,00" style="text-align: right">
								</div>

								<div class="form-group mb-12">
									<label for="product-prive-cost">R$ Custo</label>
									<input type="text" id="product-prive-cost" class="form-control" readonly="" value="0,00" style="text-align: right">
								</div>
								<div class="form-col mb-12">
									<label for="product-input">Quantidade Entrada</label>
									<input type="text" id="product-input" class="form-control" placeholder="" value="0,00" style="text-align: right" onkeyup="formatarMoeda();">
								</div>
							</div>

							<div class="modal-footer">
								<button type="button" class="btn mb-2 btn-secondary" data-dismiss="modal">Sair</button>
								<div id="modal-footer"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
		<!-- main -->
	</div>
	<!-- .wrapper -->
	<script src="js/jquery.min.js"></script>
	<script src="js/popper.min.js"></script>
	<script src="js/moment.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/simplebar.min.js"></script>
	<script src='js/daterangepicker.js'></script>
	<script src='js/jquery.stickOnScroll.js'></script>
	<script src="js/tinycolor-min.js"></script>
	<script src="js/config.js"></script>
	<script src='js/jquery.mask.min.js'></script>
	<script src='js/select2.min.js'></script>
	<script src='js/jquery.steps.min.js'></script>
	<script src='js/jquery.validate.min.js'></script>
	<script src='js/jquery.timepicker.js'></script>
	<script src='js/dropzone.min.js'></script>
	<script src='js/uppy.min.js'></script>
	<script src='js/quill.min.js'></script>
	<script>
		$('.select2').select2(
			{
				theme: 'bootstrap4',
			});
		$('.select2-multi').select2(
			{
				multiple: true,
				theme: 'bootstrap4',
			});
		$('.drgpicker').daterangepicker(
			{
				singleDatePicker: true,
				timePicker: false,
				showDropdowns: true,
				locale:
				{
					format: 'MM/DD/YYYY'
				}
			});
		$('.time-input').timepicker(
			{
				'scrollDefault': 'now',
				'zindex': '9999' /* fix modal open */
			});
		/** date range picker */
		if ($('.datetimes').length) {
			$('.datetimes').daterangepicker(
				{
					timePicker: true,
					startDate: moment().startOf('hour'),
					endDate: moment().startOf('hour').add(32, 'hour'),
					locale:
					{
						format: 'M/DD hh:mm A'
					}
				});
		}
		var start = moment().subtract(29, 'days');
		var end = moment();

		function cb(start, end) {
			$('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
		}
		$('#reportrange').daterangepicker(
			{
				startDate: start,
				endDate: end,
				ranges:
				{
					'Today': [moment(), moment()],
					'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
					'Last 7 Days': [moment().subtract(6, 'days'), moment()],
					'Last 30 Days': [moment().subtract(29, 'days'), moment()],
					'This Month': [moment().startOf('month'), moment().endOf('month')],
					'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
				}
			}, cb);
		cb(start, end);
		$('.input-placeholder').mask("00/00/0000",
			{
				placeholder: "__/__/____"
			});
		$('.input-zip').mask('00000-000',
			{
				placeholder: "____-___"
			});
		$('.input-money').mask("#.##0,00",
			{
				reverse: true
			});
		$('.input-phoneus').mask('(000) 000-0000');
		$('.input-mixed').mask('AAA 000-S0S');
		$('.input-ip').mask('0ZZ.0ZZ.0ZZ.0ZZ',
			{
				translation:
				{
					'Z':
					{
						pattern: /[0-9]/,
						optional: true
					}
				},
				placeholder: "___.___.___.___"
			});
		// editor
		var editor = document.getElementById('editor');
		if (editor) {
			var toolbarOptions = [
				[
					{
						'font': []
					}],
				[
					{
						'header': [1, 2, 3, 4, 5, 6, false]
					}],
				['bold', 'italic', 'underline', 'strike'],
				['blockquote', 'code-block'],
				[
					{
						'header': 1
					},
					{
						'header': 2
					}],
				[
					{
						'list': 'ordered'
					},
					{
						'list': 'bullet'
					}],
				[
					{
						'script': 'sub'
					},
					{
						'script': 'super'
					}],
				[
					{
						'indent': '-1'
					},
					{
						'indent': '+1'
					}], // outdent/indent
				[
					{
						'direction': 'rtl'
					}], // text direction
				[
					{
						'color': []
					},
					{
						'background': []
					}], // dropdown with defaults from theme
				[
					{
						'align': []
					}],
				['clean'] // remove formatting button
			];
			var quill = new Quill(editor,
				{
					modules:
					{
						toolbar: toolbarOptions
					},
					theme: 'snow'
				});
		}
		// Example starter JavaScript for disabling form submissions if there are invalid fields
		(function () {
			'use strict';
			window.addEventListener('load', function () {
				// Fetch all the forms we want to apply custom Bootstrap validation styles to
				var forms = document.getElementsByClassName('needs-validation');
				// Loop over them and prevent submission
				var validation = Array.prototype.filter.call(forms, function (form) {
					form.addEventListener('submit', function (event) {
						if (form.checkValidity() === false) {
							event.preventDefault();
							event.stopPropagation();
						}
						form.classList.add('was-validated');
					}, false);
				});
			}, false);
		})();
    </script>
	<script>
		var uptarg = document.getElementById('drag-drop-area');
		if (uptarg) {
			var uppy = Uppy.Core().use(Uppy.Dashboard,
				{
					inline: true,
					target: uptarg,
					proudlyDisplayPoweredByUppy: false,
					theme: 'dark',
					width: 770,
					height: 210,
					plugins: ['Webcam']
				}).use(Uppy.Tus,
					{
						endpoint: 'https://master.tus.io/files/'
					});
			uppy.on('complete', (result) => {
				console.log('Upload complete! We’ve uploaded these files:', result.successful)
			});
		}
    </script>
	<script src="js/apps.js"></script>
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-56159088-1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'UA-56159088-1');

		function formatarMoeda() {
			var elemento = document.getElementById('product-input');
			var valor = elemento.value;

			valor = valor + '';
			valor = parseInt(valor.replace(/[\D]+/g, ''));
			valor = valor + '';
			valor = valor.replace(/([0-9]{3})$/g, ",$1");

			if (valor.length > 6) {
				valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
			}

			elemento.value = valor;
		}
    </script>
	<style>
		td {
			color: #000000;
		}

		th {
			color: #000000;
		}

		col-md {
			color: #000000;
		}

		.col-md {
			color: #000000;
		}

		.html_descripitions {
			color: #000000;
			font-display: block;
		}

		.text-muted {
			color: #000000 !important;
		}

		.table thead th {
			color: #000000;
		}
	</style>
	<script src="scripts/menu-html.js"></script>
	<script src="scripts/products.js"></script>
	<script src="scripts/notify.js"></script>
	<script src="scripts/input-products.js"></script>
</body>
</html>
