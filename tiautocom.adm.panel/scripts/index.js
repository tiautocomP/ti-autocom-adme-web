listInput();

function listInput() {

	const respjson = localStorage.getItem("listusers");
	const user = JSON.parse(respjson);

	if (user == null)
		window.location = "login.aspx";
	$.ajax({
		url: "index.aspx/getInformations",
		data: '{' + user[0].cpf_cnpj + '}',
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		success: function (responses) {

		}
	});
}