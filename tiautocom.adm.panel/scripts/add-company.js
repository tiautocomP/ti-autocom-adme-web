loadPage();

function loadPage() {
	var respjson = localStorage.getItem("listusers");
	const users = JSON.parse(respjson);

	if (!users)
		window.localStorage = 'login.aspx';
}

function companySave() {
	var respjson = localStorage.getItem("listusers");
	const users = JSON.parse(respjson);

	let logo = "";
	let company_name = window.document.getElementById('input-name-razor').value;
	let cpf_cnpj = window.document.getElementById('input-cpf-cnpj').value;
	let rg_ie = window.document.getElementById('input-rg-ie').value;
	let phone = window.document.getElementById('input-phone').value;
	let cell = window.document.getElementById('input-cell').value;
	let public_place = window.document.getElementById('input-public-place').value;
	let number = window.document.getElementById('input-namber').value;
	let city = window.document.getElementById('input-city').value;
	let state = window.document.getElementById('input-state').value;
	let zip_code = window.document.getElementById('input-zip').value;
	let district = window.document.getElementById('input-district').value;
	let email = window.document.getElementById('input-email').value;
	let complement = window.document.getElementById('input-complement').value;
	let observation = window.document.getElementById('input-observation').value;
	let crt = window.document.getElementById('select-crt').value;
	let person_type_id = 1;

	if (!company_name) {
		$("#input-name-razor").focus();
		$.notify("Atenção, Campo razão social não pode ser vázio.", "info");
		window.document.getElementById('div-name-razor').innerHTML = '**Campo obrigatório.';
	} else if (crt == 0) {
		$("#select-crt").focus();
		$.notify("Atenção, Campo crt não pode ser vázio.", "info");
		window.document.getElementById('div-select-crt').innerHTML = '**Campo obrigatório.';
	} else if (!cpf_cnpj) {
		$("#input-cpf-cnpj").focus();
		$.notify("Atenção, Campo cnpj não pode ser vázio.", "info");
		window.document.getElementById('div-cpf-cnpj').innerHTML = '**Campo obrigatório.';
	} else if (!rg_ie) {
		$("#input-rg-ie").focus();
		$.notify("Atenção, Campo ie não pode ser vázio.", "info");
		window.document.getElementById('div-rg-ie').innerHTML = '**Campo obrigatório.';
	} else if (!cell) {
		$("#input-cell").focus();
		$.notify("Atenção, Campo Celular não pode ser vázio.", "info");
		window.document.getElementById('div-cell').innerHTML = '**Campo obrigatório.';
	} else if (!public_place) {
		$("#input-public-place").focus();
		$.notify("Atenção, Campo logradouro não pode ser vázio.", "info");
		window.document.getElementById('div-public-place').innerHTML = '**Campo obrigatório.';
	} else if (!number) {
		$("#input-namber").focus();
		$.notify("Atenção, Campo numero não pode ser vázio.", "info");
		window.document.getElementById('div-namber').innerHTML = '**Campo obrigatório.';
	} else if (!city) {
		$("#input-city").focus();
		$.notify("Atenção, Campo cidade não pode ser vázio.", "info");
		window.document.getElementById('div-city').innerHTML = '**Campo obrigatório.';
	} else if (!state) {
		$("#input-state").focus();
		$.notify("Atenção, Campo estado não pode ser vázio.", "info");
		window.document.getElementById('div-state').innerHTML = '**Campo obrigatório.';
	} else if (!zip_code) {
		$("#input-zip").focus();
		$.notify("Atenção, Campo Cep não pode ser vázio.", "info");
		window.document.getElementById('div-zip').innerHTML = '**Campo obrigatório.';
	} else if (!district) {
		$("#input-district").focus();
		$.notify("Atenção, Campo bairro não pode ser vázio.", "info");
		window.document.getElementById('div-district').innerHTML = '**Campo obrigatório.';
	} else if (!email) {
		$("#input-email").focus();
		$.notify("Atenção, e-mail bairro não pode ser vázio.", "info");
		window.document.getElementById('div-email').innerHTML = '**Campo obrigatório.';
	} else {
		var datas = {
			company: {
				company_name: company_name,
				logo,
				cpf_cnpj: cpf_cnpj,
				rg_ie: rg_ie,
				phone: phone,
				cell: cell,
				public_place: public_place,
				number: number,
				complement: complement,
				city: city,
				district: district,
				state: state,
				zip_code: zip_code,
				observation: observation,
				email: email,
				crt: crt,
				person_type_id,
			}
		};
		$.ajax({
			url: "add-company.aspx/CompanysSave",
			data: JSON.stringify(datas),
			dataType: "json",
			type: "POST",
			contentType: "application/json; charset=utf-8",
			success: function (responses) {

				if (parseInt(responses.d) > 0) {
					$.notify("Informação, Cadastro de uma nova empresa realizado com suceso.", "success");
					const myTimeout = setTimeout(myGreeting, 5000);
				} else {
					$.notify("Erro, Erro ao cadastrar uma nova empresa.", "error");
				}
			}
		});
	}
}

function myGreeting() {
	location.href = 'add-company.aspx';
}

function pesquisacep() {

	//Nova variável "cep" somente com dígitos.
	var cep = $("#input-zip-search").val().replace(/\D/g, '');

	if (!cep) {
		$.notify("Atenção, Campo CEP deve ser informado !", "info");
		$("#input-zip-search").focus()
	}

	//Verifica se campo cep possui valor informado.
	if (cep != "") {

		//Expressão regular para validar o CEP.
		var validacep = /^[0-9]{8}$/;

		//Valida o formato do CEP.
		if (validacep.test(cep)) {

			//Consulta o webservice viacep.com.br/
			$.getJSON("//viacep.com.br/ws/" + cep + "/json/?callback=?", function (dados) {

				if (!("erro" in dados)) {
					//Atualiza os campos com os valores da consulta.
					$("#input-public-place").val(dados.logradouro);
					$("#input-district").val(dados.bairro);
					$("#input-city").val(dados.localidade);
					$("#input-state").val(dados.uf);
					$("#input-zip").val(cep);
					$("#input-namber").focus();

				} //end if.
				else {
					//CEP pesquisado não foi encontrado.
					$.notify("Atenção, CEP não foi encontrado.", "error");
				}
			});
		} //end if.
		else {
			$.notify("Atenção, Formato do CEP é inválido.", "error");
		}
	} //end if.
};

var maskCpfOuCnpj = IMask(document.getElementById('input-cpf-cnpj'), {
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

function foo() {
	alert("Submit button clicked!");
	return true;
}

function inputClear(input) {
	if (input == 0) {
		window.document.getElementById('div-name-razor').innerHTML = '';
	} else if (input == 2) {
		window.document.getElementById('div-cpf-cnpj').innerHTML = '';
	} else if (input == 3) {
		window.document.getElementById('div-rg-ie').innerHTML = '';
	} else if (input == 4) {
		window.document.getElementById('div-cell').innerHTML = '';
	} else if (input == 5) {
		window.document.getElementById('div-public-place').innerHTML = '';
	} else if (input == 6) {
		window.document.getElementById('div-namber').innerHTML = '';
	} else if (input == 7) {
		window.document.getElementById('div-city').innerHTML = '';
	} else if (input == 8) {
		window.document.getElementById('div-state').innerHTML = '';
	} else if (input == 9) {
		window.document.getElementById('div-zip').innerHTML = '';
	} else if (input == 10) {
		window.document.getElementById('div-district').innerHTML = '';
	} else if (input == 11) {
		window.document.getElementById('div-email').innerHTML = '';
	} else if (input == 11) {
		window.document.getElementById('div-email').innerHTML = '';
	} else if (input == 12) {
		window.document.getElementById('div-select-crt').innerHTML = '';
	}
}
