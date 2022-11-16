let action = "";

getUser();

getDepartament();

function getUser() {

	const respjson = localStorage.getItem("listusers");
	const user = JSON.parse(respjson);

	window.document.getElementById('input-cpf-cnpj').value = user[0].cpf_cnpj;
}

function getDepartament() {
	const respjson = localStorage.getItem("department_list");
	const departaments = JSON.parse(respjson);

	action = '<option value="0" Selecione um departamento desejado</option>';
	for (var i = 0; i < departaments.length; i++) {
		action += '<option value="' + departaments[i].id + '">' + departaments[i].descricao + '</option>';
	}

	var html_action = '<select class="form-control select2-multi" id="multi-select-department">' +
		'<optgroup label = "Selecione um departamento desejado">' +
		action
	'</optgroup >' +
		'</select >';

	window.document.getElementById('select-departament').innerHTML = html_action;
}

function SaveInpuProduto() {

	let cnpj = window.document.getElementById('input-cpf-cnpj').value;
	let codigo_barras = window.document.getElementById('input-barcode').value;
	let descricao = window.document.getElementById('input-description').value;
	let num_interno = document.getElementById('input-number-int').value;
	let num_departam = $("#multi-select-department option:selected").val();
	let departamento = $("#multi-select-department option:selected").text();
	let departamento_id = window.document.getElementById('multi-select-department').value;
	let validade = window.document.getElementById('product-validations').value;
	let margem = "0.00";
	let desc_automatico = false;
	let est_min = window.document.getElementById('input-invetory-min').value;
	let granel = $("#select-granel option:selected").val();
	let qtde_desconto = window.document.getElementById('input-quantity-discount').value;
	let setor_id = $("#select-sector-id option:selected").val();
	let trib = window.document.getElementById('select-input-trib').value;
	let unidade = window.document.getElementById('input-unity').value;
	let custo = window.document.getElementById('input-price-cost').value;
	let preco = window.document.getElementById('input-price').value;
	let estoque_minimos = window.document.getElementById('input-invetory-min').value;
	let estoque = window.document.getElementById('input-qtde').value;
	let quantidade_entrada = window.document.getElementById('input-qtde').value;
	let valor_promocao = window.document.getElementById('input-price-promotion').value ?? null ?? 0;
	let desc = window.document.getElementById('input-discount').value;
	let custo_caixa = window.document.getElementById('input-cash-cost').value;
	let cfop = window.document.getElementById('input-cfop').value;
	let ncm = window.document.getElementById('input-ncm').value;
	let cest = window.document.getElementById('input-cest').value;
	let anp = window.document.getElementById('input-anp').value;
	let valor_red_bc = window.document.getElementById('input-valor-red-bc').value;
	let origem = window.document.getElementById('select-origem').value;
	let mod_red_bc = window.document.getElementById('select-mod-bc').value;
	let red_bc_calc = window.document.getElementById('input-valor-red-bc').value;
	let valor_icms = window.document.getElementById('input-price-icms').value ?? null ?? "0.00";
	let cst_icms = window.document.getElementById('select-icms-st').value ?? null ?? "";
	let valor_pis = window.document.getElementById('select-cst-pis').value ?? null ?? "0.00";
	let cst_pis = window.document.getElementById('select-cst-pis').value ?? null ?? "";
	let valor_cofins = window.document.getElementById('input-price-cofins').value;
	let cst_cofins = window.document.getElementById('select-cst-cofins').value;
	let cst_ipi = window.document.getElementById('select-cst-ipi').value;
	let valor_ipi = window.document.getElementById('input-price-ipi').value;

	if (!codigo_barras) {
		$.notify("Atenção, Campo código de barras não pode ser nulo ou vázio.", "warn");
		$("#input-barcode").focus();
	} else if (!descricao) {
		$.notify("Atenção, Campo descrição do produto não pode ser nulo ou vázio.", "warn");
		$("#input-description").focus();
	} else if (departamento_id <= 0) {
		$.notify("Atenção, Campo departamento não pode ser nulo ou vázio.", "warn");
		$("#multi-select-department").focus();
	} else if (!validade) {
		$.notify("Atenção, Campo validade não pode ser nulo ou vázio.", "warn");
		$("#product-validations").focus();
	} else if (validade.length < 3) {
		$.notify("Atenção, Campo validade não pode ser menor que 03 digitos.", "warn");
		$("#select-granel").focus();
	} else if (parseInt(granel) === 0) {
		$.notify("Atenção, Campo granel não pode ser nulo ou vázio.", "warn");
		$("#select-granel").focus();
	} else if (setor_id <= 0) {
		$.notify("Atenção, Campo setor não pode ser nulo ou vázio.", "warn");
		$("#select-sector-id").focus();
	} else if (trib <= 0) {
		$.notify("Atenção, Campo trib não pode ser nulo ou vázio.", "warn");
		$("#select-input-trib").focus();
	} else if (!unidade) {
		$.notify("Atenção, Campo unidade não pode ser nulo ou vázio.", "warn");
		$("#input-unity").focus();
	} else if (parseFloat(custo) <= 0) {
		$.notify("Atenção, Campo custo não pode ser nulo ou Zero.", "warn");
		$("#input-price-cost").focus();
	} else if (parseFloat(preco) <= 0) {
		$.notify("Atenção, Campo preço não pode ser nulo ou vázio.", "warn");
		$("#input-price").focus();
	} else if (parseFloat(quantidade_entrada) <= 0) {
		$.notify("Atenção, Campo quantidade de entrada não pode ser nulo ou Zero.", "warn");
		$("#input-qtde").focus();
	} else if (!cfop) {
		$.notify("Atenção, Campo cfop não pode ser nulo ou vázio.", "warn");
		$("#input-cfop").focus();
	} else if (!ncm) {
		$.notify("Atenção, Campo ncm não pode ser nulo ou vázio.", "warn");
		$("#input-ncm").focus();
	} else if (!cest) {
		$.notify("Atenção, Campo  cest não pode ser nulo ou vázio.", "warn");
		$("#input-cest").focus();
	} else if (parseInt(origem) === -1) {
		$.notify("Atenção, Campo origem do produto não pode ser nulo ou vázio.", "warn");
		$("#select-origem").focus();
	} else if (parseInt(mod_red_bc) < 0) {
		$.notify("Atenção, Campo modalidade de base calculos não pode ser nulo ou vázio.", "warn");
		$("#select-mod-bc").focus();
	} else if (valor_red_bc == 0) {
		$.notify("Atenção, Campo % Redução base de calculo não pode ser nulo ou vázio.", "warn");
		$("#input-valor-red-bc").focus();
	} else if (parseInt(cst_icms) < 0) {
		$.notify("Atenção, Icms cst do produto não pode ser nulo ou vázio.", "warn");
		$("#select-icms-st").focus();
	} else if (parseInt(cst_pis) < 0) {
		$.notify("Atenção, pis cst do produto não pode ser nulo ou vázio.", "warn");
		$("#select-cst-pis").focus();
	} else if (parseInt(cst_cofins) < 0) {
		$.notify("Atenção, cofins do produto não pode ser nulo ou vázio.", "warn");
		$("#select-cst-cofins").focus();
	} else if (parseInt(cst_ipi) < 0) {
		$.notify("Atenção, Campo ipi cst do produto não pode ser nulo ou vázio.", "warn");
		$("#select-cst-ipi").focus();
	} else {
		var data =
		{
			produtcs:
			{
				cnpj,
				codigo_barras,
				descricao,
				num_interno,
				num_departam,
				departamento,
				departamento_id,
				validade,
				margem,
				desc,
				est_min,
				granel,
				qtde_desconto,
				setor_id,
				trib,
				unidade,
				custo,
				preco,
				estoque_minimos,
				quantidade_entrada,
				valor_promocao,
				estoque,
				desc,
				custo_caixa,
				cfop,
				ncm,
				cest,
				anp,
				cst_icms,
				valor_icms,
				origem,
				mod_red_bc,
				red_bc_calc,
				cst_pis,
				valor_pis,
				cst_cofins,
				valor_cofins,
				cst_ipi,
				valor_ipi,
			}
		}
		$.ajax({
			url: "add-product.aspx/SaveProduct",
			data: JSON.stringify(data),
			dataType: "json",
			type: "POST",
			contentType: "application/json; charset=utf-8",
			success: function (responses) {
				var resp = JSON.parse(responses.d);
				if (resp != null) {
					$.notify("Informação, Um novo produto foi cadastrado com sucesso.", "success");
					const myTimeout = setTimeout(myGreeting, 5000);
				} else {
					$.notify("Erro, Erro ao cadastrar um novo produto.", "error");
				}
			}
		});
	}
};

function myGreeting() {
	location.href = 'add-product.aspx';
}
