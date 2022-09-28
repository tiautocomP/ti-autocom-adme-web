input_clear();
getProductInput();

function inputProduct(id) {

	const respjson = localStorage.getItem("listusers");
	const user = JSON.parse(respjson);

	var qtde = parseFloat(window.document.getElementById('product-input').value);
	var description = window.document.getElementById('product-description').value;

	if (parseFloat(qtde) == 0 || qtde == null) {
		$.notify("Atenção, Informe Quanitdade desejada de Entrada do produto: " + description + "  !", "info");

		input_clear();
	} else {
		var data = {
			inputs:
			{
				produto_id: id,
				quantity: qtde,
				usuario_id: user[0].person_id,
				cpf_cnpj: user[0].cpf_cnpj,
				company_id: user[0].company_id,
			}
		}; $.ajax({
			url: "products-list.aspx/postproductInput",
			data: JSON.stringify(data),
			dataType: "json",
			type: "POST",
			contentType: "application/json; charset=utf-8",
			success: function (responses) {

				if (parseInt(id) > 0) {

					$.notify("Sucesso, Entrada do produto: " + description.toUpperCase() + " foi realizado com sucess!", "success");

					$('#mySmallModalLabel').modal('hide');

					input_clear();
				}
				else {
					$.notify("Error, Erro ao inserir um novo item da entrada do produto: " + description + "  !", "error");
				}
			}
		});
	}
}

function input_clear() {
	window.document.getElementById('product-input').value = "0,00";
	window.document.getElementById('product-input').focus();
}

function getProductInput() {
	const respjson = localStorage.getItem("listusers");
	const user = JSON.parse(respjson);

	$.ajax({
		url: "input-product-list.aspx/getProductsInput",
		data: '{documents: ' + user[0].cpf_cnpj + '}',
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

					if (user[0].input_open == 0) {
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
						'<td>' + object[i].barcode + '</td>' +
						'<td>' + object[i].description + '</td>' +
						'<td>' + object[i].unity + '</td>' +
						'<td>' + object[i].price + '</td>' +
						'<td>' + object[i].quantity + '</td>' +
						tag_estatus +
						'<td>' +
						'<div class="dropdown">' +
						'<button class="btn btn-sm dropdown-toggle more-vertical" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
						'<span class="text-muted sr-only">Action</span>' +
						'</button>' +
						'<div class="dropdown-menu dropdown-menu-right">' +
						/*	'<a class="dropdown-item" data-toggle="modal" data-target="#" onclick="#">Entrada</a>' +*/
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
					'<th>Unidade</th>' +
					'<th>Preço</th>' +
					'<th>Entrada</th>' +
					'<th>Status</th>' +
					'<th>Action</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody>' +
					tag_html +
					'</tbody>' +
					'</table> ';

				window.document.getElementById('table-input-products').innerHTML = html.replace('undefined', 'Tabela de Entarda de Produtos');

				/*	get_html_descripitions();*/

				localStorage.setItem("products_input_list", JSON.stringify(object));

			} else {
				tableclean();
				$.notify("Atenção, Não contém dados na tabela produto com departamento " + $('#multi-select-department').find(":selected").text().trim().toLowerCase() + "!", "error");
			}

		}
	});
}

function exportProduct() {
	const respjson = localStorage.getItem("listusers");
	const user = JSON.parse(respjson);

	const swalWithBootstrapButtons = Swal.mixin({
		customClass: {
			confirmButton: 'btn btn-success',
			cancelButton: 'btn btn-danger'
		},
		buttonsStyling: false
	})

	swalWithBootstrapButtons.fire({
		title: user[0].name_reason,
		text: "Entrada de produto para empresa " + user[0].name_reason + "!",
		icon: 'question',
		showCancelButton: true,
		confirmButtonText: 'sim, Importar it!',
		cancelButtonText: 'Não, cancelar!',
		reverseButtons: true
	}).then((result) => {
		if (result.isConfirmed) {
			if (importProduct() == true) {
				swalWithBootstrapButtons.fire(
					'Importado com sucesso!',
					'Lista de produtos selecionado foi iportado com sucesso.',
					'success'
				)
			}

		} else if (
			/* Read more about handling dismissals below */
			result.dismiss === Swal.DismissReason.cancel
		) {
			swalWithBootstrapButtons.fire(
				'Cancelado',
				'Operação de Exportação de produto soi cancelado :)',
				'error'
			)
		}
	})
}

function importProduct() {
	return true;
}