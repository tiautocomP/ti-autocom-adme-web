getUserAll();

function getUserAll() {
	const respjson = localStorage.getItem("listusers");
	const user = JSON.parse(respjson);

	if (user == null)
		window.location = "login.aspx";

	$.ajax({
		url: "user-type-list.aspx/getTypeUserAll",
		data: '{company_id: ' + user[0].person_id + '}',
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		success: function (responses) {
			var object = JSON.parse(responses.d);

			var tag_html;
			var tag_estatus;

			////0 - inativo
			////1 - inativo
			////2 - deletador
			if (object !== null) {

				for (var i = 0; i < object.length; i++) {
					if (object[i].active == "True") {
						tag_estatus = '<td><span class="dot dot-lg bg-success mr-2"></span></td >';
					} else {
						tag_estatus = '<td><span class="dot dot-lg bg-danger mr-2"></span></td >';
					}

					tag_html +=
						'<tr>' +
						'<td class="align-center" >' +
						'</div>' +
						'</td>' +
						'<td>#' + object[i].id + '</td>' +
						'<td>' + object[i].description + '</td>' +
						'<td>' + object[i].action_save.replace('True', 'Sim').replace('False', 'Não') + '</td>' +
						'<td>' + object[i].action_delete.replace('True', 'Sim').replace('False', 'Não') + '</td>' +
						'<td>' + object[i].action_update.replace('True', 'Sim').replace('False', 'Não') + '</td>' +
						tag_estatus +
						'<td>' +
						'<div class="dropdown">' +
						'<button class="btn btn-sm dropdown-toggle more-vertical" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
						'<span class="text-muted sr-only">Ações</span>' +
						'</button>' +
						'<div class="dropdown-menu dropdown-menu-right">' +
						'<a class="dropdown-item" data-toggle="modal" data-target="#" onclick="showmodalUser(' + object[i].id + ')">Editar</a>' +
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
					'<th>Descrição</th>' +
					'<th>Salvar</th>' +
					'<th>Deletar</th>' +
					'<th>Alterar</th>' +
					'<th>Status</th>' +
					'<th>Manutenção</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody>' +
					tag_html +
					'</tbody>' +
					'</table>';

				window.document.getElementById('table-users').innerHTML = html.replace('undefined', 'Alteração individual do Tipo de Usuário com CNPJ: ' + user[0].cpf_cnpj);

			} else {
				$.notify("Atenção, Não contém dados na tabela usuário", "error");
			}
		}
	});
}

function showmodalUser(id) {

	$.ajax({
		url: "user-type-list.aspx/getUserTypeId",
		data: '{id: ' + id + '}',
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		success: function (responses) {

			var users = JSON.parse(responses.d);

			var html_title = '<h5 class="modal-title">ALTERAR USUÁRIO:  ' + users[0].description.toUpperCase() + '</h5>';
			var html_modal_footer = '<button type="button" class="btn mb-2 btn-primary" onclick="updateUserType(' + id + ')">Alterar</button>';

			window.document.getElementById('input-number-int').value = id;
			window.document.getElementById('input-description').value = users[0].description;

			var html_select_save = '<select class="custom-select" id="select-save">' +
				'<option selected ' + users[0].action_save.replace("True", "1").replace("False", "0").replace(" ", "-1") + '">' + users[0].action_save.replace("True", "Sim").replace("False", "Não").replace(" ", "Selecionar tipo...") + '</option>' +
				'<option value="1">Sim</option>' +
				'<option value="0">Não</option>' +
				'</select>';

			var html_select_delete = '<select class="custom-select" id="select-save">' +
				'<option values=" ' + users[0].action_delete.replace("True", "1").replace("False", "0").replace(" ", "-1") + '">' + users[0].action_delete.replace("True", "Sim").replace("False", "Não").replace(" ", "Selecionar tipo...") + '</option>' +
				'<option value="1">Sim</option>' +
				'<option value="0">Não</option>' +
				'</select>';


			var html_select_update = '<select class="custom-select" id="select-save">' +
				'<option selected ' + users[0].action_update.replace("True", "1").replace("False", "0").replace(" ", "-1") + '">' + users[0].action_update.replace("True", "Sim").replace("False", "Não").replace(" ", "Selecionar tipo...") + '</option>' +
				'<option value="1">Sim</option>' +
				'<option value="0">Não</option>' +
				'</select>';

			var html_select_active = '<select class="custom-select" id="select-active">' +
				'<option selected ' + users[0].active.replace("True", "1").replace("False", "0").replace(" ", "-1") + '">' + users[0].active.replace("True", "Ativo").replace("False", "Inativo").replace(" ", "Inativo") + '</option>' +
				'<option value="1">Ativo</option>' +
				'<option value="0">Inativo</option>' +
				'</select>';

			window.document.getElementById('modal-title').innerHTML = html_title;
			window.document.getElementById('modal-footer').innerHTML = html_modal_footer;
			window.document.getElementById('select-save').innerHTML = html_select_save;
			window.document.getElementById('select-delete').innerHTML = html_select_delete;
			window.document.getElementById('select-update').innerHTML = html_select_update;
			window.document.getElementById('select-active').innerHTML = html_select_active;

			$('#defaultModal').modal('toggle');
		}
	});
}

function updateUserType(id) {

	var resp = confirm("Confirmação de Alteração de Tipo de Usuário");

	if (resp == true) {
		const respjson = localStorage.getItem("listusers");
		const user = JSON.parse(respjson);

		let company_Id = user[0].company_id;
		let description = window.document.getElementById('input-description').value;
		let action_save = $("#select-save option:selected").val();
		let action_delete = $("#select-delete option:selected").val();
		let action_update = $("#select-update option:selected").val();
		let active = $("#select-active option:selected").val();

		if (!description) {
			$.notify("Atenção, Campo descrição não pode ser nulo ou vázio.", "warn");
			$("#input-description").focus();
		} else if (parseInt(action_save) < 0) {
			$.notify("Atenção, Campo ação salvar pode ser nulo ou vázio.", "warn");
			$("#select-save").focus();
		} else if (parseInt(action_delete) < 0) {
			$.notify("Atenção, Campo ação deletar pode ser nulo ou vázio.", "warn");
			$("#select-delete").focus();
		} else if (parseInt(action_update) < 0) {
			$.notify("Atenção, Campo alterar pode ser nulo ou vázio.", "warn");
			$("#select-update").focus();
		} else {
			var datas = {
				userType:
				{
					id: id,
					company_Id: company_Id,
					description: description,
					action_save: action_save,
					action_delete: action_delete,
					action_update: action_update,
					active: active,
				}
			}
			$.ajax({
				url: "user-type-list.aspx/updateUserTypes",
				data: JSON.stringify(datas),
				dataType: "json",
				type: "POST",
				contentType: "application/json; charset=utf-8",
				success: function (responses) {
					var object = JSON.parse(responses.d);
					if (object !== null) {
						if (parseInt(object.id > 0)) {
							$.notify("Informação, Um novo tipo usuário foi cadastrado com sucesso!", "success");
						} else {
							$.notify("Informação, Tipo usuário selecionado foi alterado com sucesso!", "success");
						}
						const myTimeout = setTimeout(myGreeting, 5000);
					} else {
						$.notify("Atenção, Não contém dados na tabela usuaários", "error");
					}
				}
			});
		}
	}
}

function myGreeting() {
	location.href = 'user-type-list.aspx';
}