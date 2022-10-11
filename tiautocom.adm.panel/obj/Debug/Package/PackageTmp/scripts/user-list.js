load();

function load() {

	getUserAll();
	getUserTyptAll();
}

var values_select_user_type = "";
var html_select_user_type = "";
var html_status_user = "";

function getUserTyptAll() {
	const respjson = localStorage.getItem("listusers");
	const user = JSON.parse(respjson);

	$.ajax({
		url: "add-user-register.aspx/getTypeUserAll",
		data: '{company_id: ' + user[0].person_id + '}',
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		success: function (responses) {
			var object = JSON.parse(responses.d);

			if (object !== null) {

				for (var i = 0; i < object.length; i++) {
					values_select_user_type += '<option value="' + object[i].Id + '">' + object[i].description + '</option>';
				}

				html_select_user_type = '<select class="custom-select" id="company-select">' +
					'<option selected>Selecione Tipo usuário</option>' +
					values_select_user_type +
					'</select>';

				window.document.getElementById('select-user-type').innerHTML = html_select_user_type;

			} else {
				$.notify("Atenção, Não contém dados na tabela Tipo de Usuário", "error");
			}
		}
	});
}

function getUserAll() {
	const respjson = localStorage.getItem("listusers");
	const user = JSON.parse(respjson);

	if (user == null)
		window.location = "login.aspx";

	$.ajax({
		url: "user-list.aspx/getUserAll",
		data: '{company_id: ' + user[0].person_id + '}',
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		success: function (responses) {
			var object = JSON.parse(responses.d);

			var tag_html;
			var tag_estatus;

			//0 - inativo
			//1 - inativo
			//2 - deletador
			if (object !== null) {
				for (var i = 0; i < object.length; i++) {
					if (parseInt(object[i].user_active) == 0) {
						tag_estatus = '<td><span class="dot dot-lg bg-warning mr-2"></span></td >';
					} else if (parseInt(object[i].user_active) == 1) {
						tag_estatus = '<td><span class="dot dot-lg bg-success mr-2"></span></td >';
					} else {
						tag_estatus = '<td><span class="dot dot-lg bg-danger mr-2"></span></td >';
					}

					tag_html +=
						'<tr>' +
						'<td class="align-center" >' +
						'</div>' +
						'</td>' +
						'<td>#' + object[i].user_id + '</td>' +
						'<td>' + object[i].user_name + '</td>' +
						'<td>' + object[i].email + '</td>' +
						'<td>' + object[i].user_registration_date + '</td>' +
						'<td>' + object[i].user_type_description + '</td>' +
						tag_estatus +
						'<td>' +
						'<div class="dropdown">' +
						'<button class="btn btn-sm dropdown-toggle more-vertical" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
						'<span class="text-muted sr-only">Ações</span>' +
						'</button>' +
						'<div class="dropdown-menu dropdown-menu-right">' +
						'<a class="dropdown-item" data-toggle="modal" data-target="#" onclick="showmodalUser(' + object[i].user_id + ')">Editar</a>' +
						/*	'<a class="dropdown-item" href="#">Remover</a>' +*/
						'</div>' +
						'</div>' +
						'</td>' +
						'</tr>';
				}

				var html = '<table class="table border table-hover bg-white">' +
					'<thead>' +
					'<tr role="row">' +
					'<th> ' +
					'</div>' +
					'</th>' +
					'<th>Codigo</th>' +
					'<th>Nome do usuário</th>' +
					'<th>Email</th>' +
					'<th>Data Cadastro</th>' +
					'<th>Tipo</th>' +
					'<th>Ações</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody>' +
					tag_html +
					'</tbody>' +
					'</table>';

				window.document.getElementById('table-users').innerHTML = html.replace('undefined', 'Alteração individual de Usuário CNPJ: ' + user[0].cpf_cnpj);

			} else {
				$.notify("Atenção, Não contém dados na tabela usuário", "error");
			}
		}
	});
}

function showmodalUser(id) {

	$.ajax({
		url: "user-list.aspx/getUserId",
		data: '{id: ' + id + '}',
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		success: function (responses) {

			var users = JSON.parse(responses.d);

			var html_title = '<h5 class="modal-title">ALTERAR USUÁRIO:  ' + users[0].user_name.toUpperCase() + '</h5>';
			var html_modal_footer = '<button type="button" class="btn mb-2 btn-primary" onclick="updateUser(' + id + ')">Alterar</button>';

			window.document.getElementById('input-id').value = id;
			window.document.getElementById('input-name-razor').value = users[0].user_name;
			window.document.getElementById('input-email').value = users[0].email;
			window.document.getElementById('input-password').value = users[0].password;
			window.document.getElementById('input-regitre-date').value = users[0].user_registration_date;
			window.document.getElementById("select-user-type").value = users[0].user_type_description;

			html_select_user_type = '<select class="custom-select" id="company-select">' +
				'<option value="' + users[0].user_type_id + '">' + users[0].user_type_description + '</option>' +
				values_select_user_type
			'</select>';

			var user_active = users[0].user_active;
			var user_active_desc = "";

			if (user_active == 0) {
				user_active_desc = "Inativo";
			} else if (user_active == 1) {
				user_active_desc = "Ativo";
			} else {
				user_active_desc = "Excluido";
			}

			html_status_user = '<select class="custom-select" id="user-type-select">' +
				'<option selected>' + user_active_desc + '</option>' +
				'<option value="0">Inativar</option>' +
				'<option value="1">Ativar</option>' +
				'<option value="2">Excluir</option>' +
				'</select>';

			window.document.getElementById('modal-title').innerHTML = html_title;
			window.document.getElementById('modal-footer').innerHTML = html_modal_footer;
			window.document.getElementById('select-user-type').innerHTML = html_select_user_type;
			window.document.getElementById('status-user').innerHTML = html_status_user;

			$('#defaultModal').modal('toggle');
		}
	});
}

function updateUser(id) {
	const respjson = localStorage.getItem("listusers");
	const user = JSON.parse(respjson);

	var user_name = window.document.getElementById('input-name-razor').value;
	var email = window.document.getElementById('input-email').value;
	var password = window.document.getElementById('input-password').value;
	var user_type_description = window.document.getElementById('user-type-select').value;
	var user_type_id = $('#company-select option:selected').val();
	var user_active = $('#user-type-select option:selected').val();

	if (user_name === "") {
		$.notify("Atenção, Campo nome do usuário não pode ser nulo ou vázio...", "warn");
	} else if (email === "") {
		$.notify("Atenção, Campo e-mail do usuário não pode ser nulo ou vázio...", "warn");
	} else if (password === "") {
		$.notify("Atenção, Campo senha do usuário não pode ser nulo ou vázio...", "warn");
	} else if (user_type_description === "") {
		$.notify("Atenção, Campo Tipo do usuário não pode ser nulo ou vázio...", "warn");
	} else {
		var resp = confirm("Realmente Deseja alterar Dados so usuário selecionado");

		if (resp == true) {

			if (user_active == "Inativo") {
				user_active = 0;
			} else if (user_active == "Ativo") {
				user_active = 1;
			} else if (user_active == "Excluir") {
				user_active = 2;
			}

			var data = {
				users:
				{
					user_id: id,
					user_name: user_name,
					email: email,
					password: password,
					user_type_id: user_type_id,
					user_active: user_active,
				}
			};

			$.ajax({
				url: "user-list.aspx/updateUser",
				data: JSON.stringify(data),
				dataType: "json",
				type: "POST",
				contentType: "application/json; charset=utf-8",
				success: function (responses) {

					if (responses.d == "sucesso") {
						$.notify("Sucesso, Usuário selecionado foi alterado com sucesso!", "success");

						const myTimeout = setTimeout(getUserAll, 5000);

						$('#defaultModal').modal('hide');
					} else {
						$.notify("Atenção, Erro ao alterar usuário selecionado!", "error");
					}
				}
			});
		} else {
			$.notify("Informação, Operação de alteração foi cancelado pelo usuário", "info");
		}
	}
}

function userSearch() {
	const respjson = localStorage.getItem("listusers");
	const user = JSON.parse(respjson);

	const name = window.document.getElementById('input-user-search').value;

	if (name == "") {
		$.notify("Atenção, Informe nome do usuário para realizar a busca na bas de dados...", "warn");
	} else {
		alert(name);
		$.ajax({
			url: "user-list.aspx/userSearch",
			data: '{name: ' + name + '}',
			dataType: "json",
			type: "POST",
			contentType: "application/json; charset=utf-8",
			success: function (responses) {
				var object = JSON.parse(responses.d);

				var tag_html;
				var tag_estatus;

				//0 - inativo
				//1 - inativo
				//2 - deletador
				if (object !== null) {
					for (var i = 0; i < object.length; i++) {
						if (parseInt(object[i].user_active) == 0) {
							tag_estatus = '<td><span class="dot dot-lg bg-warning mr-2"></span></td >';
						} else if (parseInt(object[i].user_active) == 1) {
							tag_estatus = '<td><span class="dot dot-lg bg-success mr-2"></span></td >';
						} else {
							tag_estatus = '<td><span class="dot dot-lg bg-danger mr-2"></span></td >';
						}

						tag_html +=
							'<tr>' +
							'<td class="align-center" >' +
							'</div>' +
							'</td>' +
							'<td>#' + object[i].user_id + '</td>' +
							'<td>' + object[i].user_name + '</td>' +
							'<td>' + object[i].email + '</td>' +
							'<td>' + object[i].user_registration_date + '</td>' +
							'<td>' + object[i].user_type_description + '</td>' +
							tag_estatus +
							'<td>' +
							'<div class="dropdown">' +
							'<button class="btn btn-sm dropdown-toggle more-vertical" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
							'<span class="text-muted sr-only">Ações</span>' +
							'</button>' +
							'<div class="dropdown-menu dropdown-menu-right">' +
							'<a class="dropdown-item" data-toggle="modal" data-target="#" onclick="showmodalUser(' + object[i].user_id + ')">Editar</a>' +
							/*	'<a class="dropdown-item" href="#">Remover</a>' +*/
							'</div>' +
							'</div>' +
							'</td>' +
							'</tr>';
					}

					var html = '<table class="table border table-hover bg-white">' +
						'<thead>' +
						'<tr role="row">' +
						'<th> ' +
						'</div>' +
						'</th>' +
						'<th>Codigo</th>' +
						'<th>Nome do usuário</th>' +
						'<th>Email</th>' +
						'<th>Data Cadastro</th>' +
						'<th>Tipo</th>' +
						'<th>Ações</th>' +
						'</tr>' +
						'</thead>' +
						'<tbody>' +
						tag_html +
						'</tbody>' +
						'</table>';

					window.document.getElementById('table-users').innerHTML = html.replace('undefined', 'Alteração individual de Usuário CNPJ: ' + user[0].cpf_cnpj);

				} else {
					$.notify("Atenção, Não contém dados na tabela usuário", "error");
				}
			}
		});
	}
}

