let inventory_minus = 0;
let inventory_plus = 0;
let inventory_zero = 0;
let inventory_tot = 0;
let inventory_all = 0;
let html_descripitions;

getdepartment();

function getdepartment() {
	$.ajax({
		url: "products-list.aspx/getdepartmentsall",
		data: "",
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		success: function (responses) {
			var object = JSON.parse(responses.d);

			var action;

			if (object !== null) {

				for (var i = 0; i < object.length; i++) {
					action += '<option value="' + object[i].id + '">' + object[i].descricao + '</option>';
				}

				//get id departamento
				getproducts(parseInt(object[0].id));

				postdepartment(action);

				localStorage.setItem("department_list", JSON.stringify(object));

			} else {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Não contém dados na tabela produto!',
					footer: '<a href="">Token de acesso está inválido!</a>'
				})
			}
		}
	});
}

function getproducts(department_id) {
	var data = {
		produtcs:
		{
			departamento_id: department_id
		}
	};
	$.ajax({
		url: "products-list.aspx/getproductsall",
		data: JSON.stringify(data),
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		success: function (responses) {
			var object = JSON.parse(responses.d);

			let tag_html;
			let tag_estatus;

			inventory_zero = 0;
			inventory_minus = 0;
			inventory_plus = 0;
			inventory_all = 0;

			if (object !== null) {
				inventory_tot = object.length;
				inventory_all = object.length;

				for (var i = 0; i < inventory_tot; i++) {

					if (parseFloat(object[i].estoque) < 0) {
						inventory_minus++;
						tag_estatus = '<td><span class="dot dot-lg bg-danger mr-2"></span></td >';
					} else if (parseFloat(object[i].estoque) == 0) {
						inventory_zero++;
						tag_estatus = '<td><span class="dot dot-lg bg-warning mr-2"></span></td >';
					} else {
						tag_estatus = '<td><span class="dot dot-lg bg-success mr-2"></span></td >';
						inventory_plus++;
					}

					tag_html +=
						'<tr>' +
						'<td class="align-center" >' +
						'<div class="custom-control custom-checkbox" >' +
						'<input type="checkbox" class="custom-control-input">' +
						'<label class="custom-control-label"></label>' +
						'</div>' +
						'</td>' +
						'<td>#' + object[i].id + '</td>' +
						'<td>' + object[i].codigo_barras + '</td>' +
						'<td>' + object[i].descricao + '</td>' +
						'<td>' + object[i].preco + '</td>' +
						'<td>' + object[i].estoque + '</td>' +
						'<td>' + object[i].unidade + '</td>' +
						'<td>' + object[i].custo + '</td>' +
						tag_estatus +
						'<td>' +
						'<div class="dropdown">' +
						'<button class="btn btn-sm dropdown-toggle more-vertical" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
						'<span class="text-muted sr-only">Action</span>' +
						'</button>' +
						'<div class="dropdown-menu dropdown-menu-right">' +
						'<a class="dropdown-item" data-toggle="modal" data-target="#" onclick="showmodalproduct(' + object[i].id + ')">Entrada</a>' +
						'<a class="dropdown-item" href="#">Remover</a>' +
						'<a class="dropdown-item" href="#">Alterar</a>' +
						'</div>' +
						'</div>' +
						'</td>' +
						'</tr>';
				}

				let html = '<table class="table border table-hover bg-white">' +
					'<thead>' +
					'<tr role="row">' +
					'<th> ' +
					'<div class="custom-control custom-checkbox">' +
					'<input type="checkbox" class="custom-control-input" id="all">' +
					'<label class="custom-control-label" for="all"></label>' +
					'</div>' +
					'</th>' +
					'<th>ID</th>' +
					'<th>Codigo Barras</th>' +
					'<th>Nome Produto</th>' +
					'<th>Preço</th>' +
					'<th>Estoque</th>' +
					'<th>Unidade</th>' +
					'<th>Custo</th>' +
					'<th>Status</th>' +
					'<th>Action</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody>' +
					tag_html +
					'</tbody>' +
					'</table> ';

				window.document.getElementById('table-products').innerHTML = html;

				get_html_descripitions();

				localStorage.setItem("products_list", JSON.stringify(object));

			} else {
				tableclean();
				$.notify("Atenção, Não contém dados na tabela produto com departamento " + $('#multi-select-department').find(":selected").text().trim().toLowerCase() + "!", "error");
			}
		}
	});
}

function tableclean() {
	inventory_zero = 0;
	inventory_minus = 0;
	inventory_plus = 0;
	inventory_tot = 0;

	window.document.getElementById('table-products').innerHTML = "";
	get_html_descripitions();
}

function get_html_descripitions() {
	
	let html_descripitions = '<ul class="nav nav-pillsa justify-content-start" style="color: #000000">' +
		'<li class="nav-item">' +
		'<a class="nav-link active bg-transparent pr-2 pl-0 text-primary" onclick="getestoque(200)">Todos <span class="badge badge-pill bg-primary text-white ml-2">' + inventory_all + '</span></a>' +
		'</li >' +
		'<li class="nav-item">' +
		'<a class="nav-link text-muted px-2" onclick="getestoque(1)">Estoque positivo <span class="badge badge-pill bg-white border text-muted ml-2">' + inventory_plus + '</span></a>' +
		'</li>' +
		'<li class="nav-item">' +
		'<a class="nav-link text-muted px-2" onclick="getestoque(0)">Estoque Zero <span class="badge badge-pill bg-white border text-muted ml-2">' + inventory_zero + '</span></a>' +
		'</li>' +
		'<li class="nav-item">' +
		'<a class="nav-link text-muted px-2" onclick="getestoque(-1)">Estoque Negativo <span class="badge badge-pill bg-white border text-muted ml-2">' + inventory_minus + '</span></a>' +
		'</li>' +
		'</ul>';

	window.document.getElementById('html_descripitions').innerHTML = html_descripitions;
}

function postdepartment(action) {
	var html_action = '<select class="form-control select2-multi" id="multi-select-department">' +
		'<optgroup label = "Selecione um departamento desejado">' +
		action
	'</optgroup >' +
		'</select >';

	window.document.getElementById('multi-select-department').innerHTML = html_action;
}

function getprodutctsdepartament() {

	var option = $('#multi-select-department').find(":selected").val();

	getproducts(option);
}

function getestoque(_status) {
	department_id = $('#multi-select-department').find(":selected").val();

	var data = {
		produtcs:
		{
			departamento_id: department_id,
			status: _status
		}
	};
	$.ajax({
		url: "products-list.aspx/getproductsstatus",
		data: JSON.stringify(data),
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		success: function (responses) {
			var object = JSON.parse(responses.d);

			let tag_html;
			let tag_estatus;

			inventory_zero = 0;
			inventory_minus = 0;
			inventory_plus = 0;

			if (object !== null) {
				inventory_tot = object.length;

				for (var i = 0; i < object.length; i++) {

					if (parseFloat(object[i].estoque) < 0) {
						inventory_minus++;
						tag_estatus = '<td><span class="dot dot-lg bg-danger mr-2"></span></td >';
					} else if (parseFloat(object[i].estoque) == 0) {
						inventory_zero++;
						tag_estatus = '<td><span class="dot dot-lg bg-warning mr-2"></span></td >';
					} else {
						tag_estatus = '<td><span class="dot dot-lg bg-success mr-2"></span></td >';
						inventory_plus++;
					}

					tag_html +=
						'<tr>' +
						'<td class="align-center" >' +
						'<div class="custom-control custom-checkbox" >' +
						'<input type="checkbox" class="custom-control-input">' +
						'<label class="custom-control-label"></label>' +
						'</div>' +
						'</td>' +
						'<td>#' + object[i].id + '</td>' +
						'<td>' + object[i].codigo_barras + '</td>' +
						'<td>' + object[i].descricao + '</td>' +
						'<td>' + object[i].preco + '</td>' +
						'<td>' + object[i].estoque + '</td>' +
						'<td>' + object[i].unidade + '</td>' +
						'<td>' + object[i].custo + '</td>' +
						tag_estatus +
						'<td>' +
						'<div class="dropdown">' +
						'<button class="btn btn-sm dropdown-toggle more-vertical" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
						'<span class="text-muted sr-only">Action</span>' +
						'</button>' +
						'<div class="dropdown-menu dropdown-menu-right">' +
						'<a class="dropdown-item" data-toggle="modal" data-target="#" onclick="showmodalproduct(' + object[i].id + ')">Entrada</a>' +
						'<a class="dropdown-item" href="#">Remover</a>' +
						'<a class="dropdown-item" href="#">Entrada</a>' +
						'</div>' +
						'</div>' +
						'</td>' +
						'</tr>';
				}

				let html = '<table class="table border table-hover bg-white">' +
					'<thead>' +
					'<tr role="row">' +
					'<th> ' +
					'<div class="custom-control custom-checkbox">' +
					'<input type="checkbox" class="custom-control-input" id="all">' +
					'<label class="custom-control-label" for="all"></label>' +
					'</div>' +
					'</th>' +
					'<th>ID</th>' +
					'<th>Codigo Barras</th>' +
					'<th>Nome Produto</th>' +
					'<th>Preço</th>' +
					'<th>Estoque</th>' +
					'<th>Unidade</th>' +
					'<th>Custo</th>' +
					'<th>Status</th>' +
					'<th>Action</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody>' +
					tag_html +
					'</tbody>' +
					'</table> ';

				window.document.getElementById('table-products').innerHTML = html;

				get_html_descripitions();

				localStorage.setItem("products_list", JSON.stringify(object));

			} else {
				tableclean();

				$.notify("Atenção, Não contém dados na tabela produto com departamento " + $('#multi-select-department').find(":selected").text().trim().toLowerCase() + "!", "error");
			}
		}
	});
}

function showmodalproduct(id, codigo, produto) {
	$.ajax({
		url: "products-list.aspx/getproductId",
		data: '{id: ' + id + '}',
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		success: function (responses) {

			var produtcts = JSON.parse(responses.d);

			var html_title = '<h5 class="modal-title">ENTRADA PRODUTO: ' + produtcts[0].descricao + '</h5>';
			var html_modal_footer = '<button type="button" class="btn mb-2 btn-primary" onclick="inputProduct(' + produtcts[0].id + ')">Entrada</button>';

			window.document.getElementById('modal-footer').innerHTML = html_modal_footer;

			window.document.getElementById('modal-title').innerHTML = html_title;
			window.document.getElementById('product-description').value = produtcts[0].descricao;
			window.document.getElementById('product-code').value = produtcts[0].codigo_barras;
			window.document.getElementById('product-price').value = produtcts[0].preco;
			window.document.getElementById('product-inventory').value = produtcts[0].estoque;
			window.document.getElementById("product-prive-cost").value = produtcts[0].custo;

			$('#mySmallModalLabel').modal('toggle');

			window.document.getElementById('product-input').value = "0,00";
			window.document.getElementById('product-input').focus();
		}
	});
}

