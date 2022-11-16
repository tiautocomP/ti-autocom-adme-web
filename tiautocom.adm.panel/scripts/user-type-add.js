load();

function load() {
	const respjson = localStorage.getItem("listusers");
	const user = JSON.parse(respjson);

	if (user == null)
		window.location = "login.aspx";

	document.getElementById('input-description').value = ''
	$("#iinput-description").focus();
}

function salvar() {
	const respjson = localStorage.getItem("listusers");
	const user = JSON.parse(respjson);

	let company_Id = user[0].company_id;
	let description = window.document.getElementById('input-description').value;
	let action_save = window.document.getElementById('select-save').value;
	let action_delete = window.document.getElementById('select-delete').value;
	let action_update = window.document.getElementById('select-update').value;

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
				company_Id: company_Id,
				description: description,
				action_save: parseInt(action_save),
				action_delete: action_delete,
				action_update: action_update,
			}
		}
		$.ajax({
			url: "add-user-type-register.aspx/saveUserTypes",
			data: JSON.stringify(datas),
			dataType: "json",
			type: "POST",
			contentType: "application/json; charset=utf-8",
			success: function (responses) {
				var object = JSON.parse(responses.d);
				if (object !== null) {
					$.notify("Informação, Um novo tipo usuário foi cadastrado com sucesso!", "success");
					const myTimeout = setTimeout(myGreeting, 5000);
				} else {
					$.notify("Atenção, Não contém dados na tabela usuaários", "error");
				}
			}
		});
	}
}

function myGreeting() {
	location.href = 'add-user-type-register.aspx';
}