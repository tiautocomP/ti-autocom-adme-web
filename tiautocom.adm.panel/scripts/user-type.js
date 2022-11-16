load();

function load() {
	getProductInput();
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
					values += '<option value="' + object[i].id + '">' + object[i].description + '</option>';
				}

				var html = '<select class="custom-select" id="select-user-type">' +
					'<option value="0" selected>Selecione Tipo usuário</option>' +
					values +
					'</select>';

				window.document.getElementById('select-user-type').innerHTML = html;

				clear();

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
	let user_type_id = $("#select-user-type option:selected").val();
	let company_id = user[0].company_id;

	if (parseInt(user_type_id) == 0) {
		$.notify("Atenção, Campo Tipo de usuário não pode ser nulo ou vázio!", "warning ");
		$("#select-user-type").focus();
	} else if (user_name == "") {
		$.notify("Atenção, Campo nome do usuário não pode ser nulo ou vázio!", "warning ");
		$("#input-user-name").focus();
	} else if (email == "") {
		$.notify("Atenção, Campo e-mail do usuário não pode ser nulo ou vázio!", "warning ");
		$("#input-user-email").focus();
	} else if (password == "") {
		$.notify("Atenção, Campo senha do usuário não pode ser nulo ou vázio!", "warning ");
		$("#input-user-password").focus();
	}
	else {
		var data = {
			users:
			{
				user_name: user_name,
				email: email,
				password: password,
				user_type_id: user_type_id,
				company_id: company_id,
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

function clear() {
	document.getElementById('input-user-name').value = '';
	document.getElementById('input-user-password').value = '';
}
