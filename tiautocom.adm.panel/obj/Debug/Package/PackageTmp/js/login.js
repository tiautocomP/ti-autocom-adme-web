function onSubmit() {

	$(document).ready(function () {

		var _email = $("#inputEmail").val();
		var _password = $("#inputPassword").val();
		var _document = $("#inputDocument").val();

		if (_document == "") {
			$.notify("Atenção, Campo CNPJ não pode ser nulo ou vázio!", "warning ");
		} else if (_email == "") {
			$.notify("Atenção, Campo e-mail não pode ser nulo ou vázio!", "warning ");
		} else if (_password == "") {
			$.notify("Atenção, Campo senha não pode ser nulo ou vázio!", "warning ");
		} else {
			var data = {
				user: {
					email: _email,
					password: _password,
					cpf_cnpj: _document
				}
			};
			$.ajax({
				url: "login.aspx/userlogin",
				data: JSON.stringify(data),
				dataType: "json",
				type: "POST",
				contentType: "application/json; charset=utf-8",
				success: function (responses) {
					var object = JSON.parse(responses.d);

					if (object != null) {
						if (parseInt(object[0].user_active) == 1) {
							if (object !== null) {
								localStorage.setItem("listusers", JSON.stringify(object));

								window.location = "index.aspx";
							} else {
								Swal.fire({
									icon: 'error',
									title: 'Oops...',
									text: 'Senha ou login estão incorreto!',
									footer: '<a href="">Token de acesso está inválido!</a>'
								})
							}
						} else if (parseInt(object[0].user_active) == 0) {
							Swal.fire({
								icon: 'error',
								title: 'Oops...',
								text: 'Usuário Inativo!',
								footer: '<a href="">Token de acesso está inválido!</a>'
							})
						} else if (parseInt(object[0].user_active) == 2) {
							Swal.fire({
								icon: 'error',
								title: 'Oops...',
								text: 'Usuário desativado!',
								footer: '<a href="">Token de acesso está inválido!</a>'
							})
						}
					} else {
						$.notify("Atenção, Erro ao logar, caso o problema persistir entre em contato com seu administrador.!", "error ");
					}
				}
			});
		}
	});
}
