load();

function load() {
	getProductInput();

	window.document.getElementById('input-user-name').value = "";
}

function getProductInput() {
	const respjson = localStorage.getItem("listusers");
	const user = JSON.parse(respjson);

	if (user == null)
		window.location = "login.aspx";

	$.ajax({
		url: "add-user-register.aspx/getTypeUserAll",
		data: '{company_id: ' + user[0].person_id + '}',
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		success: function (responses) {
			var object = JSON.parse(responses.d);
			var values = '';

			if (object !== null) {

				for (var i = 0; i < object.length; i++) {
					values += '<option value="' + object[i].Id + '">' + object[i].description + '</option>';
				}

				var html = '<select class="custom-select" id="company-select">' +
					'<option selected>Selecione Tipo usuário</option>' +
					values +
					'</select>';

				window.document.getElementById('select-user-type').innerHTML = html;

			} else {
				$.notify("Atenção, Não contém dados na tabela Tipo de Usuário", "error");
			}
		}
	});
}

function salvar() {

	const respjson = localStorage.getItem("listusers");
	const user = JSON.parse(respjson);

	if (user == null)
		window.location = "login.aspx";

	let user_name = window.document.getElementById('input-user-name').value;
	let email = window.document.getElementById('input-user-email').value;
	let password = window.document.getElementById('input-user-password').value;
	let user_type_id = window.document.getElementById('company-select').value;

	if (user_type_id.trim() == "Selecione Tipo usuário") {
		$.notify("Atenção, Campo Tipo de usuário não pode ser nulo ou vázio!", "warning ");
	} if (user_name == "") {
		$.notify("Atenção, Campo nome do usuário não pode ser nulo ou vázio!", "warning ");
	} if (email == "") {
		$.notify("Atenção, Campo e-mail do usuário não pode ser nulo ou vázio!", "warning ");
	} if (password == "") {
		$.notify("Atenção, Campo senha do usuário não pode ser nulo ou vázio!", "warning ");
	}
	else {
		var data = {
			users:
			{
				user_name: user_name,
				email: email,
				password: password,
				user_type_id: user_type_id,
				company_id: user[0].company_id,
			}
		};
		$.ajax({
			url: "add-user-register.aspx/saveUserType",
			data: JSON.stringify(data),
			dataType: "json",
			type: "POST",
			contentType: "application/json; charset=utf-8",
			success: function (responses) {
				var object = JSON.parse(responses.d);
				if (object !== null) {
					$.notify("Informação, Um novo usuário foi cadastrado com sucesso!", "success");
					const myTimeout = setTimeout(myGreeting, 5000);
				} else {
					$.notify("Atenção, Não contém dados na tabela usuaários", "error");
				}
			}
		});
	}
}

function myGreeting() {
	location.href = 'user-list.aspx';
}
