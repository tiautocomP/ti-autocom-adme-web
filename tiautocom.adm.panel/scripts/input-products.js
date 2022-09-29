input_clear();
getProductInput();

function inputProduct(id) {

	const respjson = localStorage.getItem("listusers");
	const user = JSON.parse(respjson);

	var qtde = parseFloat(window.document.getElementById('product-input').value);
	var description = window.document.getElementById('product-description').value;
	var note_number = window.document.getElementById('note-number').value;
	var cnpj = window.document.getElementById('input-cnpj').value;
	var barcode = window.document.getElementById('product-code').value;
	var price = window.document.getElementById('product-price').value;
	var price_cost = window.document.getElementById('product-prive-cost').value;

	if (!note_number) {
		$.notify("Atenção, Informe o numero da nota fiscal!", "info");
		$("#note-number").focus();
	}
	if (!cnpj) {
		$.notify("Atenção, Informe o CNPJ do fornecedor!", "info");
		$("#note-number").focus();
	}
	else if (parseFloat(qtde) == 0 || qtde == null) {
		$.notify("Atenção, Informe Quanitdade desejada de Entrada do produto: " + description + "  !", "info");

		input_clear();
	} else {
		var data = {
			inputs:
			{
				produto_id: id,
				quantity: qtde,
				usuario_id: user[0].person_id,
				cpf_cnpj: cnpj,
				company_id: user[0].company_id,
				note_number: note_number,
				barcode: barcode,
				price: price,
				price_cost: price_cost
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

					$('#defaultModal').modal('hide');

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
			let total = 0;

			inventory_zero = 0;
			inventory_minus = 0;
			inventory_plus = 0;
			inventory_all = 0;

			if (object !== null) {
				inventory_tot = object.length;
				inventory_all = object.length;

				for (var i = 0; i < inventory_tot; i++) {

					total += parseFloat(object[i].total.replace(",", "."));

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
						/*	'<td>#' + object[i].id + '</td>' +*/
						'<td>' + object[i].barcode + '</td>' +
						'<td>' + object[i].description + '</td>' +
						'<td>' + object[i].unity + '</td>' +
						'<td>' + object[i].quantity + '</td>' +
						'<td>' + object[i].price + '</td>' +
						'<td>' + object[i].price_cost + '</td>' +
						'<td>' + object[i].total + '</td>' +
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
					'</div>' +
					'</th>' +
					'<th>Codigo Barras</th>' +
					'<th>Nome Produto</th>' +
					'<th>Unidade</th>' +
					'<th>Qtde Entrada</th>' +
					'<th>R$ Preço</th>' +
					'<th>R$ Custo</th>' +
					'<th>R$ Total</th>' +
					'<th>Status</th>' +
					'<th>Ações</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody>' +
					tag_html +
					'</tbody>' +
					'</table> ';

				window.document.getElementById('table-input-products').innerHTML = html.replace('undefined', 'Tabela de Entrada de Produtos: CNPJ: ' + user[0].cpf_cnpj);

				/*	get_html_descripitions();*/

				localStorage.setItem("products_input_list", JSON.stringify(object));

				window.document.getElementById('total-note').innerHTML = "<h4>R$ Total Nota: " + total.toFixed(2).replace(".", ",");

			} else {
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

function getNumberNote() {
	let text = $('#note-number').val();
	let result = text.substring(2);

	alert(result);
}

const inputEle = document.getElementById('note-number');
inputEle.addEventListener('keyup', function (e) {
	var key = e.which || e.keyCode;
	if (key == 13) { // codigo da tecla enter
		// colocas aqui a tua função a rodar
		let note = this.value.substring(25, 34);
		let cnpj = this.value.substring(6, 20);

		window.document.getElementById('note-number').value = note;
		window.document.getElementById('input-cnpj').value = cnpj;

		var maskCpfOuCnpj = IMask(document.getElementById('input-cnpj'), {
			mask: [
				{
					mask: '000.000.000-00',
					maxLength: 11
				},
				{
					mask: '00.000.000/0000-00'
				}
			]
		});

		$("#product-input").focus();
	}
});

