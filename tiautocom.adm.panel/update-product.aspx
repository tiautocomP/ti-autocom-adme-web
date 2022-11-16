<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="update-product.aspx.cs" Inherits="tiautocom.adm.panel.update_product" %>

<!doctype html>
<html lang="pt-br">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="">
	<meta name="author" content="">
	<link rel="icon" href="favicon.ico">
	<title>Rede Sete - Alteração de Produtos</title>
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
						<h2 class="page-title">Cadastro de Produto Unitário</h2>
						<p class="text-muted">Cadastre o um novo produto com seus atributos. - (**) Campos Obrigatórios</p>
						<div class="card shadow mb-4">
							<div class="card-body">
								<div class="row">
									<div class="col-md-12">
										<form class="needs-validation" novalidate>
											<br />
											<div class="form-row">
												<div class="col-md-2 mb-3">
													<label for="input-cpf-cnpj">*CNPJ</label>
													<input type="text" id="input-cpf-cnpj" class="form-control" readonly="readonly">
												</div>
												<div class="form-group col-md-10 mb-3">
													<label for="inputState">**Fornecedores</label>
													<select id="input-provider" class="form-control">
														<option selected>Selecione Fornecedor...</option>
														<option>...</option>
													</select>
												</div>
												<div class="col-md-2 mb-3">
													<label for="input-number-int">Código</label>
													<input type="text" id="input-number-int" class="form-control" readonly="readonly" value="0">
												</div>
												<div class="col-md-2 mb-3">
													<label for="product-price">*Código de barras</label>
													<input type="text" id="input-barcode" class="form-control" maxlength="14">
												</div>

												<div class="col-md-8 mb-3">
													<label for="product-description">*Descrição do Produto</label>
													<input type="text" id="input-description" class="form-control">
												</div>
												<div class="form-group col-md-7 mb-3">
													<label for="select-departament">**Departamentos</label>
													<div id="select-departament"></div>
												</div>
												<div class="col-md-2 mb-3">
													<label for="product-validations">Validade 3 digitos</label>
													<input type="text" id="product-validations" class="form-control" value="000">
												</div>
												<div class="form-group col-md-3 mb-3">
													<label for="select-granel">Desconto Automatica</label>
													<div id="select-quantity-discount"></div>
												</div>
												<div class="form-group col-md-4 mb-3">
													<label for="select-granel">**Granel</label>
													<div id="select-granel"></div>
												</div>
												<div class="form-group col-md-4 mb-3">
													<label for="select-sector-id">**Setor</label>
													<div id="select-sector-id"></div>
												</div>
												<div class="form-group col-md-4 mb-3">
													<label for="select-input-trib">**Trib</label>
													<div id="select-trib">
													</div>
												</div>
												<div class="col-md-2 mb-3">
													<label for="input-unity">*Unidade</label>
													<input type="text" id="input-unity" class="form-control">
												</div>

												<div class="col-md-2 mb-3">
													<label for="product-prive-cost">*R$ Custo</label>
													<input type="text" id="input-price-cost" class="form-control" value="0,00" style="text-align: right" onkeyup="formatarMoedaCusto();">
												</div>
												<div class="col-md-2 mb-3">
													<label for="product-price input-money">* R$ Preço</label>
													<input type="text" id="input-price" class="form-control" value="0,00" style="text-align: right" onkeyup="formatarMoedaPreco();">
												</div>
												<div class="col-md-2 mb-3">
													<label for="input-invetory-min">Estoque Minimo</label>
													<input type="text" id="input-invetory-min" class="form-control" value="0,00" style="text-align: right">
												</div>
												<div class="col-md-2 mb-3">
													<label for="percentagem-prive">% Margem Lucro</label>
													<input type="text" id="percentagem-prive" class="form-control" value="0,00" style="text-align: right" onkeyup="formatarMoedaCusto();">
												</div>
												<div class="col-md-2 mb-3">
													<label for="product-price">Estoque</label>
													<input type="text" id="input-invetotory" class="form-control" value="0,00" style="text-align: right">
												</div>
									<%--			<div class="col-md-2 mb-3">
													<label for="input-qtde">*Quantidade Entrada</label>
													<input type="text" id="input-qtde" class="form-control" placeholder="" value="0,00" style="text-align: right" onkeyup="formatarMoedaQuantidade();">
												</div>--%>
												<div class="col-md-2 mb-3">
													<label for="input-price-promotion">R$ Promoção</label>
													<input type="text" id="input-price-promotion" class="form-control" value="0,00" style="text-align: right">
												</div>
												<div class="col-md-2 mb-3">
													<label for="input-discount">R$ Desconto</label>
													<input type="text" id="input-discount" class="form-control" value="0,00" style="text-align: right">
												</div>
												<div class="col-md-2 mb-3">
													<label for="input-cash-cost">R$ Custo Caixa</label>
													<input type="text" id="input-cash-cost" class="form-control" value="0,00" style="text-align: right">
												</div>
											</div>
										</form>

										<form class="needs-validation" novalidate>
											<br />
											<label for="product-price">**TRIBUTAÇÃO DO PRODUTO</label>
											<div class="form-row">

												<div class="col-md-2 mb-3">
													<label for="input-cfop">**CFOP</label>
													<input type="text" id="input-cfop" class="form-control" maxlength="4" value="">
												</div>
												<div class="col-md-2 mb-3">
													<label for="input-ncm">**NCM</label>
													<input type="text" id="input-ncm" class="form-control" maxlength="8">
												</div>
												<div class="col-md-2 mb-3">
													<label for="input-cest">**CEST</label>
													<input type="text" id="input-cest" class="form-control" maxlength="7">
												</div>
												<div class="col-md-6 mb-3">
													<label for="input-anp">ANP</label>
													<input type="text" id="input-anp" class="form-control">
												</div>
												<div class="form-group col-md-12 mb-3">
													<label for="select-origem">**ORIGEM DO PRODUTO</label>
													<div id="select-origem"></div>
												</div>
												<div class="form-group col-md-10 mb-3">
													<label for="select-mod-bc">**MODALIDADE DE REDUÇÃO BASE DE CALCULO</label>
													<div id="select-mod-bc"></div>
												</div>
												<div class="col-md-2 mb-3">
													<label for="input-valor-red-bc">** % REDUÇÃO BC</label>
													<input type="text" id="input-valor-red-bc" class="form-control" value="0,00" style="text-align: right" onkeyup="formatarMoedaCusto();">
												</div>
												<div class="form-group col-md-10 mb-3">
													<label for="select-icms-st">** ICMS CST</label>
													<div id="select-icms-st"></div>
												</div>
												<div class="col-md-2 mb-3">
													<label for="input-price-icms">% ICMS</label>
													<input type="text" id="input-price-icms" class="form-control" value="0,00" style="text-align: right" onkeyup="formatarMoedaCusto();">
												</div>

												<div class="form-group col-md-10 mb-3">
													<label for="select-cst-pis">**PIS CST</label>
													<div id="select-cst-pis"></div>
												</div>
												<div class="col-md-2 mb-3">
													<label for="product-prive-cost">** % PIS</label>
													<input type="text" id="product-prive-cost-update" class="form-control" value="0,00" style="text-align: right" onkeyup="formatarMoedaCusto();">
												</div>
												<div class="form-group col-md-10 mb-3">
													<label for="select-cst-cofins">** COFINS CST</label>
													<div id="select-cst-cofins"></div>
												</div>
												<div class="col-md-2 mb-3">
													<label for="input-price-cofins">** % COFINS</label>
													<input type="text" id="input-price-cofins" class="form-control" value="0,00" style="text-align: right" onkeyup="formatarMoedaCusto();">
												</div>
												<div class="form-group col-md-10 mb-3">
													<label for="select-cst-ipi">** IPI CST</label>
													<div id="select-cst-ipi"></div>
												</div>
												<div class="col-md-2 mb-3">
													<label for="input-price-ipi">** % IPI</label>
													<input type="text" id="input-price-ipi" class="form-control" value="0,00" style="text-align: right" onkeyup="formatarMoedaCusto();">
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- .col-12 -->
				</div>
				<button class="btn btn-primary" type="button" onclick="SaveInpuProduto()">Alterar</button>
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
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-56159088-1"></script>
	<script>
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
	</style>
	<script src="scripts/notify.js"></script>
	<script src="scripts/menu-html.js"></script>
	<script src="scripts/update-product.js"></script>
</body>
</html>
