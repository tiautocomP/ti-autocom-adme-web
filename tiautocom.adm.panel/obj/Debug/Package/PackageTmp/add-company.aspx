<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="add-company.aspx.cs" Inherits="tiautocom.adm.panel.add_company" %>

<!doctype html>
<html lang="pt-br">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="">
	<meta name="author" content="">
	<link rel="icon" href="favicon.ico">
	<title>Contrate - Cadastro de Empresas</title>
	<!-- Simple bar CSS -->
	<link rel="stylesheet" href="css/simplebar.css">
	<!-- Fonts CSS -->
	<link href="https://fonts.googleapis.com/css2?family=Overpass:ital,wght@0,100;0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
	<!-- Icons CSS -->
	<link rel="stylesheet" href="css/feather.css">
	<!-- Date Range Picker CSS -->
	<link rel="stylesheet" href="css/daterangepicker.css">
	<!-- App CSS -->
	<link rel="stylesheet" href="css/app-light.css" id="lightTheme">
	<link rel="stylesheet" href="css/app-dark.css" id="darkTheme" disabled="">
	<link href="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/themes/cupertino/jquery-ui.min.css" rel="stylesheet" />
	<link href="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.1.0/fullcalendar.min.css" rel="stylesheet" />
	<link href="//cdnjs.cloudflare.com/ajax/libs/qtip2/3.0.3/jquery.qtip.min.css" rel="stylesheet" />

	<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
	<script src="https://momentjs.com/downloads/moment.min.js"></script>
	<script src="https://momentjs.com/downloads/moment-timezone-with-data.min.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
	<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700" rel="stylesheet">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
	<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700" rel="stylesheet">
</head>
<body class="vertical  light">
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
									<div class="form-group">
									</div>
								</form>
							</div>
						</div>
						<h2 class="page-title">Cadastro de Empresa e Usuarios</h2>
						<p class="text-muted">Cadastre o uma nova empresa com niveis de acesso.</p>
						<div class="card shadow mb-4">
							<div class="card-body">
								<div class="row">
									<label for="product-price">**DADOS DA EMPRESA</label>
									<div class="col-md-12">

										<form class="needs-validation" novalidate>
											<br />
											<div class="form-row">
												<div class="col-md-7 mb-3">
													<label for="input-name-razor">*Razão social</label>
													<input type="text" class="form-control" id="input-name-razor" required onkeyup="inputClear(0)">
													<div id="div-name-razor" class="invalid"></div>
													<div class="valid-feedback">campo liberado! </div>
												</div>
												<div class="form-group col-md-5 mb-3">
													<label for="select-crt">*CRT</label>
													<select id="select-crt" class="form-control" onclick="inputClear(12)">
														<option value="0" selected>selecione CRT do empresa.</option>
														<option value="1">1 – Simples Nacional</option>
														<option value="2">2 – Simples Nacional – excesso de sublimite da receita bruta.</option>
														<option value="3">3 – Regime Normal.</option>
													</select>
													<div id="div-select-crt" class="invalid"></div>
												</div>
												<div class="col-md-3 mb-3">
													<label for="input-cpf-cnpj">*CNPJ</label>
													<input type="text" class="form-control" id="input-cpf-cnpj" name="input-cpf-cnpj" required placeholder="000.000.000-00" onkeyup="inputClear(2)">
													<div id="div-cpf-cnpj" class="invalid"></div>
													<div class="valid-feedback">campo liberado! </div>
												</div>

												<div class="col-md-3 mb-3">
													<label for="input-rg-ie">*IE</label>
													<input type="text" class="form-control" id="input-rg-ie" required onkeyup="inputClear(3)">
													<div id="div-rg-ie" class="invalid"></div>
													<div class="valid-feedback">campo validado! </div>
												</div>

												<div class="col-md-3 mb-3">
													<label for="input-phone">Telefone</label>
													<input class="form-control input-phoneus" id="input-phone" maxlength="14">
													<div class="invalid"></div>
													<div class="valid-feedback">campo liberado! </div>
												</div>

												<div class="col-md-3 mb-3">
													<label for="input-cell">*Celular</label>
													<input class="form-control input-cells" id="input-cell" maxlength="15" required onkeyup="inputClear(4)">
													<div id="div-cell" class="invalid"></div>
													<div class="valid-feedback">campo validado! </div>
												</div>

												<div class="col-md-4 mb-3">
													<strong class="card-title">Buscar CEP</strong>
													<div class="input-group mb-3">
														<input class="form-control input-zip" id="input-zip-search" autocomplete="off" maxlength="9" required>
														<div class="input-group-prepend">
															<button class="btn btn-outline-primary" type="button" onclick="pesquisacep()">Pesquisar</button>
														</div>
													</div>
												</div>

												<div class="col-md-10 mb-3">
													<label for="input-public-place">*Logradouro</label>
													<input type="text" class="form-control" id="input-public-place" required onkeyup="inputClear(5)">
													<div id="div-public-place" class="invalid"></div>
													<div class="valid-feedback">campo liberado! </div>
												</div>

												<div class="col-md-2 mb-3">
													<label for="input-namber">*Numero</label>
													<input type="text" class="form-control" id="input-namber" required onkeyup="inputClear(6)">
													<div id="div-namber" class="invalid"></div>
													<div class="valid-feedback">campo liberado! </div>
												</div>

												<div class="col-md-12 mb-3">
													<label for="input-complement">Complemento</label>
													<input type="text" class="form-control" id="input-complement">
													<div class="valid-feedback">campo liberado! </div>
												</div>

												<div class="col-md-7 mb-3">
													<label for="input-city">*Cidade</label>
													<input type="text" class="form-control" id="input-city" required onkeyup="inputClear(7)">
													<div id="div-city" class="invalid"></div>
													<div class="valid-feedback">campo liberado! </div>
												</div>

												<div class="col-md-3 mb-3">
													<label for="input-state">*Estado</label>
													<input type="text" class="form-control" id="input-state" required onkeyup="inputClear(8)">
													<div id="div-state" class="invalid"></div>
												</div>

												<div class="col-md-2 mb-3">
													<label for="input-zip">*CEP</label>
													<input class="form-control input-zip" id="input-zip" autocomplete="off" maxlength="9" required onkeyup="inputClear(9)">
													<div id="div-zip" class="invalid"></div>
												</div>

												<div class="col-md-12 mb-3">
													<label for="input-district">*Bairro</label>
													<input type="text" class="form-control" id="input-district" required onkeyup="inputClear(10)">
													<div id="div-district" class="invalid"></div>
													<div class="valid-feedback">campo liberado! </div>
												</div>

												<div class="col-md-12 mb-3">
													<label for="input-observation">Observações</label>
													<textarea class="form-control" id="input-observation" placeholder="ex. ao lado da matriz"></textarea>
													<div class="valid-feedback">campo liberado! </div>
												</div>

												<div class="col-md-12 mb-3">
													<label for="input-email">*E-mail</label>
													<input type="email" class="form-control" id="input-email" aria-describedby="emailHelp" required onkeyup="inputClear(11)">
													<div id="div-email" class="invalid"></div>
													<div class="valid-feedback">campo liberado! </div>
												</div>

											</div>

											<button class="btn btn-primary" type="button" onclick="companySave()">Salvar Empresa</button>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
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

			<div class="modal fade modal-shortcut modal-slide" tabindex="-1" role="dialog" aria-labelledby="defaultModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="defaultModalLabel">Shortcuts</h5>
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

		</main>
		<!-- main -->
	</div>
	<!-- .wrapper -->
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
	<script src="js/apps.js"></script>

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
	<script src="https://unpkg.com/imask"></script>
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-56159088-1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'UA-56159088-1');

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
		$('.input-phoneus').mask('(00) 0000-0000');
		$('.input-cells').mask('(00) 00000-0000');
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

		window.dataLayer = window.dataLayer || [];

		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'UA-56159088-1');
	</script>
	<style>
		.span {
			color: #ff0000;
		}

		input, button, select, optgroup, textarea {
			margin: 4px;
			font-family: inherit;
			font-size: inherit;
			line-height: inherit;
		}

		.invalid {
			color: #ff0000;
		}
	</style>
	<script src="scripts/notify.js"></script>
	<script src="scripts/menu-html.js"></script>
	<script src="scripts/add-company.js"></script>
</body>
</html>
