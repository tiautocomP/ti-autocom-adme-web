const respjson = localStorage.getItem("listusers");

const user = JSON.parse(respjson);

getmenu();
getnav();
getdate();

function getmenu() {

	var html_menu = '<nav class="vertnav navbar navbar-light">' +
		'<!-- nav bar -->' +
		'<div class="w-100 mb-4 d-flex">' +
		'<a href="index.aspx">' +
		'<img class="img-fluid" src="assets/images/logo.jpg" alt="Italian Trulli" width="75" height="50">' +
		'</a>' +
		'</div>' +
		'<ul class="navbar-nav flex-fill w-100 mb-2">' +
		'<li class="nav-item dropdown">' +
		'<a href="#dashboard" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle nav-link">' +
		'<i class="fe fe-home fe-16"></i>' +
		'<span class="ml-3 item-text">Dashboard</span><span class="sr-only">(current)</span>' +
		'</a>' +
		'<ul class="collapse list-unstyled pl-4 w-100" id="dashboard">' +
		'<li class="nav-item active">' +
		'<a class="nav-link pl-3" href="./index.aspx"><span class="ml-1 item-text">Configurações</span></a>' +
		'</li>' +
		//'<li class="nav-item">' +
		//    '<a class="nav-link pl-3" href="./dashboard-analytics.html"><span class="ml-1 item-text">Analytics</span></a>' +
		//'</li>' +
		//'<li class="nav-item">' +
		//    '<a class="nav-link pl-3" href="./dashboard-sales.html"><span class="ml-1 item-text">E-commerce</span></a>' +
		//'</li>' +
		//'<li class="nav-item">' +
		//    '<a class="nav-link pl-3" href="./dashboard-saas.html"><span class="ml-1 item-text">Saas Dashboard</span></a>' +
		//'</li>' +
		//'<li class="nav-item">' +
		//    '<a class="nav-link pl-3" href="./dashboard-system.html"><span class="ml-1 item-text">Systems</span></a>' +
		//'</li>' +
		'</ul>' +
		'</li>' +
		'</ul>' +
		'<p class="text-muted nav-heading mt-4 mb-1">' +
		'<span>Components</span>' +
		'</p>' +
		'<ul class="navbar-nav flex-fill w-100 mb-2">' +
		'<li class="nav-item dropdown">' +
		'<a href="#ui-elements" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle nav-link">' +
		' <i class="fe fe-box fe-16"></i>' +
		'<span class="ml-3 item-text">Cadastros</span>' +
		'</a>' +
		'<ul class="collapse list-unstyled pl-4 w-100" id="ui-elements">' +
		'<li class="nav-item">' +
		'<a class="nav-link pl-3" href="products-list.aspx"><span class="ml-1 item-text">Produto Unitário</span>' +
		'</a>' +
		'</li>' +
		'<li class="nav-item">' +
		'<a class="nav-link pl-3" href="./ui-typograpy.html"><span class="ml-1 item-text">Produtos XML</span></a>' +
		'</li>' +
		//'<li class="nav-item">' +
		//    '<a class="nav-link pl-3" href="./ui-icons.html"><span class="ml-1 item-text">Usuário</span></a>' +
		//'</li>' +
		//'<li class="nav-item">' +
		//    '<a class="nav-link pl-3" href="./ui-buttons.html"><span class="ml-1 item-text">Buttons</span></a>' +
		//'</li>' +
		//'<li class="nav-item">' +
		//    '<a class="nav-link pl-3" href="./ui-notification.html"><span class="ml-1 item-text">Notifications</span></a>' +
		//'</li>' +
		//'<li class="nav-item">' +
		//    '<a class="nav-link pl-3" href="./ui-modals.html"><span class="ml-1 item-text">Modals</span></a>' +
		//'</li>' +
		//'<li class="nav-item">' +
		//    '<a class="nav-link pl-3" href="./ui-tabs-accordion.html"><span class="ml-1 item-text">Tabs & Accordion</span></a>' +
		//'</li>' +
		//'<li class="nav-item">' +
		//    '<a class="nav-link pl-3" href="./ui-progress.html"><span class="ml-1 item-text">Progress</span></a>' +
		//'</li>' +
		'</ul>' +
		'</li>' +
		'<li class="nav-item dropdown">' +
		'<a href="#forms" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle nav-link">' +
		'<i class="fe fe-credit-card fe-16"></i>' +
		'<span class="ml-3 item-text">Pesquisas</span>' +
		'</a>' +
		'<ul class="collapse list-unstyled pl-4 w-100" id="forms">' +
		'<li class="nav-item">' +
		'<a class="nav-link pl-3" href="input-product-list.aspx"><span class="ml-1 item-text">Entrada de Produtos</span></a>' +
		'</li>' +
		//'<li class="nav-item">' +
		//'<a class="nav-link pl-3" href="./form_advanced.html"><span class="ml-1 item-text">Advanced Elements</span></a>' +
		//'</li>' +
		//'<li class="nav-item">' +
		//'<a class="nav-link pl-3" href="./form_validation.html"><span class="ml-1 item-text">Validation</span></a>' +
		//'</li>' +
		//'<li class="nav-item">' +
		//'<a class="nav-link pl-3" href="./form_wizard.html"><span class="ml-1 item-text">Wizard</span></a>' +
		//'</li>' +
		//'<li class="nav-item">' +
		//'<a class="nav-link pl-3" href="./form_layouts.html"><span class="ml-1 item-text">Layouts</span></a>' +
		//'</li>' +
		//'<li class="nav-item">' +
		//'<a class="nav-link pl-3" href="./form_upload.html"><span class="ml-1 item-text">File upload</span></a>' +
		//'</li>' +
		//'</ul>' +
		//'</li>' +
		//'<li class="nav-item dropdown">' +
		//'<a href="#tables" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle nav-link">' +
		//'<i class="fe fe-grid fe-16"></i>' +
		//'<span class="ml-3 item-text">Tables</span>' +
		//'</a>' +
		//'<ul class="collapse list-unstyled pl-4 w-100" id="tables">' +
		//'<li class="nav-item">' +
		//'<a class="nav-link pl-3" href="./table_basic.html"><span class="ml-1 item-text">Basic Tables</span></a>' +
		//'</li>' +
		//'<li class="nav-item">' +
		//'<a class="nav-link pl-3" href="./table_advanced.html"><span class="ml-1 item-text">Advanced Tables</span></a>' +
		//'</li>' +
		//'<li class="nav-item">' +
		//'<a class="nav-link pl-3" href="./table_datatables.html"><span class="ml-1 item-text">Data Tables</span></a>' +
		//'</li>' +
		//'</ul>' +
		//'</li>' +
		//'<li class="nav-item dropdown">' +
		//'<a href="#charts" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle nav-link">' +
		//'<i class="fe fe-pie-chart fe-16"></i>' +
		//'<span class="ml-3 item-text">Charts</span>' +
		//'</a>' +
		//'<ul class="collapse list-unstyled pl-4 w-100" id="charts">' +
		//'<li class="nav-item">' +
		//'<a class="nav-link pl-3" href="./chart-inline.html"><span class="ml-1 item-text">Inline Chart</span></a>' +
		//'</li>' +
		//'<li class="nav-item">' +
		//'<a class="nav-link pl-3" href="./chart-chartjs.html"><span class="ml-1 item-text">Chartjs</span></a>' +
		//'</li>' +
		//'<li class="nav-item">' +
		//'<a class="nav-link pl-3" href="./chart-apexcharts.html"><span class="ml-1 item-text">ApexCharts</span></a>' +
		//'</li>' +
		//'<li class="nav-item">' +
		//'<a class="nav-link pl-3" href="./datamaps.html"><span class="ml-1 item-text">Datamaps</span></a>' +
		//'</li>' +
		//'</ul>' +
		//'</li>' +
		//'</ul>' +
		//'<p class="text-muted nav-heading mt-4 mb-1">' +
		//'<span>Apps</span>' +
		//'</p>' +
		//'<ul class="navbar-nav flex-fill w-100 mb-2">' +
		//'<li class="nav-item w-100">' +
		//'<a class="nav-link" href="calendar.html">' +
		//'<i class="fe fe-calendar fe-16"></i>' +
		//'<span class="ml-3 item-text">Calendar</span>' +
		//'</a>' +
		//'</li>' +
		//'<li class="nav-item dropdown">' +
		//'<a href="#contact" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle nav-link">' +
		//'<i class="fe fe-book fe-16"></i>' +
		//'<span class="ml-3 item-text">Contacts</span>' +
		//'</a>' +
		//'<ul class="collapse list-unstyled pl-4 w-100" id="contact">' +
		//'<a class="nav-link pl-3" href="./contacts-list.html"><span class="ml-1">Contact List</span></a>' +
		//'<a class="nav-link pl-3" href="./contacts-grid.html"><span class="ml-1">Contact Grid</span></a>' +
		//'<a class="nav-link pl-3" href="./contacts-new.html"><span class="ml-1">New Contact</span></a>' +
		//'</ul>' +
		//'</li>' +
		//'<li class="nav-item dropdown">' +
		//'<a href="#profile" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle nav-link">' +
		//'<i class="fe fe-user fe-16"></i>' +
		//'<span class="ml-3 item-text">Profile</span>' +
		//'</a>' +
		//'<ul class="collapse list-unstyled pl-4 w-100" id="profile">' +
		//'<a class="nav-link pl-3" href="./profile.html"><span class="ml-1">Overview</span></a>' +
		//'<a class="nav-link pl-3" href="./profile-settings.html"><span class="ml-1">Settings</span></a>' +
		//'<a class="nav-link pl-3" href="./profile-security.html"><span class="ml-1">Security</span></a>' +
		//'<a class="nav-link pl-3" href="./profile-notification.html"><span class="ml-1">Notifications</span></a>' +
		//'</ul>' +
		//'</li>' +
		//'<li class="nav-item dropdown">' +
		//'<a href="#fileman" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle nav-link">' +
		//'<i class="fe fe-folder fe-16"></i>' +
		//'<span class="ml-3 item-text">File Manager</span>' +
		//'</a>' +
		//'<ul class="collapse list-unstyled pl-4 w-100" id="fileman">' +
		//'<a class="nav-link pl-3" href="./files-list.html"><span class="ml-1">Files List</span></a>' +
		//'<a class="nav-link pl-3" href="./files-grid.html"><span class="ml-1">Files Grid</span></a>' +
		//'</ul>' +
		//'</li>' +
		//'<li class="nav-item dropdown">' +
		//'<a href="#support" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle nav-link">' +
		//'<i class="fe fe-compass fe-16"></i>' +
		//'<span class="ml-3 item-text">Help Desk</span>' +
		//'</a>' +
		//'<ul class="collapse list-unstyled pl-4 w-100" id="support">' +
		//'<a class="nav-link pl-3" href="./support-center.html"><span class="ml-1">Home</span></a>' +
		//'<a class="nav-link pl-3" href="./support-tickets.html"><span class="ml-1">Tickets</span></a>' +
		//'<a class="nav-link pl-3" href="./support-ticket-detail.html"><span class="ml-1">Ticket Detail</span></a>' +
		//'<a class="nav-link pl-3" href="./support-faqs.html"><span class="ml-1">FAQs</span></a>' +
		//'</ul>' +
		//'</li>' +
		//'</ul>' +
		//'<p class="text-muted nav-heading mt-4 mb-1">' +
		//'<span>Extra</span>' +
		//'</p>' +
		//'<ul class="navbar-nav flex-fill w-100 mb-2">' +
		//'<li class="nav-item dropdown">' +
		//'<a href="#pages" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle nav-link">' +
		//'<i class="fe fe-file fe-16"></i>' +
		//'<span class="ml-3 item-text">Pages</span>' +
		//'</a>' +
		//'<ul class="collapse list-unstyled pl-4 w-100 w-100" id="pages">' +
		//'<li class="nav-item">' +
		//'<a class="nav-link pl-3" href="./page-orders.html">' +
		//'<span class="ml-1 item-text">Orders</span>' +
		//'</a>' +
		//'</li>' +
		//'<li class="nav-item">' +
		//'<a class="nav-link pl-3" href="./page-timeline.html">' +
		//'<span class="ml-1 item-text">Timeline</span>' +
		//'</a>' +
		//'</li>' +
		//'<li class="nav-item">' +
		//'<a class="nav-link pl-3" href="./page-invoice.html">' +
		//'<span class="ml-1 item-text">Invoice</span>' +
		//'</a>' +
		//'</li>' +
		//'<li class="nav-item">' +
		//'<a class="nav-link pl-3" href="./page-404.html">' +
		//'<span class="ml-1 item-text">Page 404</span>' +
		//'</a>' +
		//'</li>' +
		//'<li class="nav-item">' +
		//'<a class="nav-link pl-3" href="./page-500.html">' +
		//'<span class="ml-1 item-text">Page 500</span>' +
		//'</a>' +
		//'</li>' +
		//'<li class="nav-item">' +
		//'<a class="nav-link pl-3" href="./page-blank.html">' +
		//'<span class="ml-1 item-text">Blank</span>' +
		//'</a>' +
		//'</li>' +
		//'</ul>' +
		//'</li>' +
		'</ul>' +
		'</nav>';

	window.document.getElementById('divmenuhtml').innerHTML = html_menu;
}

function getnav() {
	var photo = ""

	if (photo === "")
		photo = "./assets/avatars/sem-image.png";

	var html = '<ul class="nav">' +
		'<li class="nav-item">' +
		//'<a class="nav-link text-muted my-2" href="./#" data-toggle="modal" data-target=".modal-shortcut">' +
		//    '<span class="fe fe-grid fe-16"></span>' +
		//'</a>' +
		'</li>' +
		'<li class="nav-item nav-notif">' +
		//'<a class="nav-link text-muted my-2" href="./#" data-toggle="modal" data-target=".modal-notif">' +
		//    '<span class="fe fe-bell fe-16"></span>' +
		//    '<span class="dot dot-md bg-success"></span>' +
		//'</a>' +
		'</li>' +
		'<li class="nav-item dropdown">' +
		'<a class="nav-link dropdown-toggle text-muted pr-0" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
		'<span class="avatar avatar-sm mt-2">' +
		'<img src="assets\avatars\sem-image.png" alt="" class="avatar-img rounded-circle">' +
		'</span>' +
		'</a>' +
		'<div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">' +
		'<a class="dropdown-item" href="#">Perfil</a>' +
		'<a class="dropdown-item" href="#">Configurações</a>' +
		'<a class="dropdown-item" href="#">Atividades</a>' +
		'<a class="dropdown-item" onclick="logaut()">Log Aut</a>' +
		'</div>' +
		'</li>' +
		'</ul>';

	window.document.getElementById('getnav').innerHTML = html;
}

function getdate() {
	dayName = new Array("domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado");
	monName = new Array("janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "stembro", "outubro", "novembro", "dezembro");
	now = new Date;

	$('#reportrange span').html(dayName[now.getDay()] + ", " + now.getDate() + " de " + monName[now.getMonth()] + " de " + now.getFullYear() + " - " + user[0].user_name);

	var html_title = '<h2 class="h5 page-title">' + user[0].name_reason + '</h2>';

	window.document.getElementById('title-html').innerHTML = html_title;
}

function logaut() {
	localStorage.removeItem('listusers');
	window.location = "login.aspx";
}