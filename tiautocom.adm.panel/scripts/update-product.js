loadPage();

function loadPage() {
	const respjson = localStorage.getItem("listusers");
	const user = JSON.parse(respjson);

	if (user == null)
		window.location = "login.aspx";

	getProductId();
	getDepartament();
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

function getProductId() {

	const respjsonUpdate = localStorage.getItem("product-id-update");
	const id = JSON.parse(respjsonUpdate);

	const respjson = localStorage.getItem("listusers");
	const user = JSON.parse(respjson);

	$.ajax({
		url: "update-product.aspx/getproductId",
		data: '{id: ' + id + '}',
		dataType: "json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		success: function (responses) {

			var produtcts = JSON.parse(responses.d);

			if (produtcts != null) {

				window.document.getElementById('input-cpf-cnpj').value = user[0].cpf_cnpj;
				window.document.getElementById('input-number-int').value = produtcts[0].id;
				window.document.getElementById('input-barcode').value = produtcts[0].codigo_barras;
				window.document.getElementById('input-description').value = produtcts[0].descricao;
				window.document.getElementById('product-validations').value = produtcts[0].validade ?? null ?? "000";
				window.document.getElementById('input-unity').value = produtcts[0].unidade;
				window.document.getElementById("input-price-cost").value = produtcts[0].custo;
				window.document.getElementById("input-price").value = produtcts[0].preco;
				window.document.getElementById("input-invetory-min").value = produtcts[0].estoque_min;
				window.document.getElementById("percentagem-prive").value = produtcts[0].margem;
				window.document.getElementById("input-invetotory").value = produtcts[0].estoque;
				/*				window.document.getElementById("input-qtde").value = produtcts[0].estoque;*/
				window.document.getElementById('input-price-promotion').value = produtcts[0].valor_promocao = '0,00';

				window.document.getElementById('input-ncm').value = produtcts[0].ncm;
				window.document.getElementById('input-cfop').value = produtcts[0].cfop;
				window.document.getElementById('input-cest').value = produtcts[0].cest;
				window.document.getElementById('input-anp').value = produtcts[0].anp;
				window.document.getElementById('input-cash-cost').value = parseFloat(produtcts[0].custo_caixa.replace('', '0,00')).toFixed(2);
				window.document.getElementById('input-valor-red-bc').value = produtcts[0].red_bc_calc.replace('0', '0,00');
				window.document.getElementById('input-price-icms').value = produtcts[0].valor_icms;
				window.document.getElementById('input-price-cofins').value = produtcts[0].valor_cofins;
				window.document.getElementById('input-price-ipi').value = produtcts[0].valor_ipi;

				//departamento
				var html_select_departamento = '<select class="custom-select" id="select-departament">' +
					'<option selected  value="' + produtcts[0].num_departam + '">' + produtcts[0].departamento + '</option>' +
					'</select>';

				//validade
				let desc_auto = produtcts[0].desc_automatico;

				if (desc_auto == true)
					desc_auto = "1 - Sim";
				else
					desc_auto = "1 - Não";

				var html_select_validade = '<select class="custom-select" id="select-departament">' +
					'<option selected  value="' + produtcts[0].desc_automatico + '">' + desc_auto + '</option>' +
					'<option value="1">1 - Sim</option>' +
					'<option value="0">0 - Não</option>' +
					'</select>';

				//granel
				let granel = produtcts[0].granel;
				let granel_id = 0;

				if (granel == "") {
					granel = "01 - Venda";
					granel_id = 01;
				}
				else if (granel == "P") {
					granel = "02 - Preço";
					granel_id = 02;
				}
				else {
					granel = "03 - Total";
					granel_id = 03;
				}

				var html_select_granel = '<select class="custom-select" id="select-departament">' +
					'<option selected  value="' + granel_id + '">' + granel + '</option>' +
					'<option value="1">01 - Venda</option>' +
					'<option value="2">02 - Preço</option>' +
					'<option value="3">03 - Total</option>' +
					'</select>';

				//setor
				let setor = produtcts[0].setor_id;
				let setor_id = 0;

				if (setor == 1) {
					setor = "01 - Conveniencia";
					setor_id = 1;
				} else {
					setor = "02 - Pista";
					setor_id = 2;
				}

				var html_select_setor = '<select class="custom-select" id="select-departament">' +
					'<option selected  value="' + setor_id + '">' + setor + '</option>' +
					'<option value="1">01 - Conveniencia</option>' +
					'<option value="2">02 - Pista</option>' +
					'</select>';

				//trib
				let trib = produtcts[0].trib;
				var html_select_trib = '<select class="custom-select" id="select-input-trib">' +
					'<option selected  value="' + trib + '">' + trib + '</option>' +
					'<option value="NN">NN</option>' +
					'<option value="FF">FF</option>' +
					'<option value="18,00">18,00</option>' +
					'</select>';

				//origem
				var origem = produtcts[0].origem;
				var origem_id = 0;

				if (origem == "0") {
					origem_id = 0;
					origem = "0 - Nacional, exceto as indicadas nos códigos 3, 4, 5 e 8.";
				} else if (origem == "1") {
					origem_id = 1;
					origem = "1 - Estrangeira – Importação direta, exceto a indicada no código 6.";
				} else if (origem == "2") {
					origem_id = 2;
					origem = "2 - Estrangeira – Adquirida no mercado interno, exceto a indicada no código 7.";
				} else if (origem == "3") {
					origem_id = 3;
					origem = "3 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 40% (quarenta por cento) e inferior ou igual a 70% (setenta por cento).";
				} else if (origem == "4") {
					origem_id = 4;
					origem = "4 - Nacional, cuja produção tenha sido feita em conformidade com os processos produtivos básicos (PPB)de que tratam o Decreto-Lei nº 288/1967, e as Leis nºs 8.248/1991, 8.387/1991, 10.176/2001 e 11.484/2007.";
				} else if (origem == "5") {
					origem_id = 5;
					origem = "5 - Nacional, mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40% (quarenta por cento).";
				} else if (origem == "6") {
					origem_id = 6;
					origem = "6 - Estrangeira – Importação direta, sem similar nacional, constante em lista de Resolução CAMEX e gás natural.";
				} else if (origem == "7") {
					origem_id = 7;
					origem = "7 - Estrangeira – Adquirida no mercado interno, sem similar nacional, constante em lista de Resolução CAMEX e gás natural.";
				} else if (origem == 8) {
					origem_id = 8;
					origem = "8 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 70% (setenta por cento).";
				} else {
					origem_id = -1;
					origem = "Selecine Origem do Produto.";
				}

				var html_select_origem = '<select class="custom-select" id="select-origem-id">' +
					'<option selected  value="' + origem_id + '">' + origem + '</option>' +
					'<option value="0">0 - Nacional, exceto as indicadas nos códigos 3, 4, 5 e 8.</option>' +
					'<option value="1">1 - Estrangeira – Importação direta, exceto a indicada no código 6.</option>' +
					'<option value="2">2 - Estrangeira – Adquirida no mercado interno, exceto a indicada no código 7.</option>' +
					'<option value="3">3 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 40% (quarenta por cento) e inferior ou igual a 70% (setenta por cento).</option>' +
					'<option value="4">4 - Nacional, cuja produção tenha sido feita em conformidade com os processos produtivos básicos (PPB)de que tratam o Decreto-Lei nº 288/1967, e as Leis nºs 8.248/1991, 8.387/1991, 10.176/2001 e 11.484/2007.</option>' +
					'<option value="5">5 - Nacional, mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40% (quarenta por cento).</option>' +
					'<option value="6">6 - Estrangeira – Importação direta, sem similar nacional, constante em lista de Resolução CAMEX e gás natural.</option>' +
					'<option value="7">7 - Estrangeira – Adquirida no mercado interno, sem similar nacional, constante em lista de Resolução CAMEX e gás natural.</option>' +
					'<option value="8">8 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 70% (setenta por cento).</option>' +
					'</select>';

				//modalida BC
				var mod = produtcts[0].mod_red_bc;
				var mod_id = 0;

				if (mod == "0") {
					mod_id = 0;
					mod = "0 - Margem Valor Agregado.";
				} else if (mod == "1") {
					mod_id = 1;
					mod = "1 - Pauta ( Valor).";
				} else if (mod == "2") {
					mod_id = 2;
					mod = "2 - Preco Tabelado Max. ( Valor).";
				} else if (mod == "3") {
					mod_id = 3;
					mod = "3 - Valor da Operacao.";
				} else {
					mod_id = -1;
					mod = "Selecione Modalidade Redução BC";
				}

				var html_select_mod = '<select class="custom-select" id="select-mod-bc-id">' +
					'<option selected  value="' + mod_id + '">' + mod + '</option>' +
					'<option value="0">0 - Margem Valor Agregado.</option>' +
					'<option value="1">1 - Pauta ( Valor).</option>' +
					'<option value="2">2 - Preco Tabelado Max. ( Valor).</option>' +
					'<option value="3">3 - Valor da Operacao.</option>' +
					'</select>';

				//icms_cst
				var icms_cst = produtcts[0].cst_icms;
				var icms_id = 0;

				if (icms_cst == "01") {
					icms_id = 01;
					icms_cst = "01 - Operação Tributável com Alíquota Básica.";
				} else if (icms_cst == "02") {
					icms_id = 02;
					icms_cst = "02 - Operação Tributável com Alíquota Diferenciada.";
				} else if (icms_cst == "03") {
					icms_id = 03;
					icms_cst = "03 - Operação Tributável com Alíquota por Unidade de Medida de Produto.";
				} else if (icms_cst == "04") {
					icms_id = 04;
					icms_cst = "04 - Operação Tributável Monofásica - Revenda a Alíquota Zero.";
				} else if (icms_cst == "05") {
					icms_id = 05;
					icms_cst = "05 - Operação Tributável por Substituição Tributária.";
				} else if (icms_cst == "06") {
					icms_id = 06;
					icms_cst = "06 - Operação Tributável a Alíquota Zero.";
				} else if (icms_cst == "07") {
					icms_id = 07;
					icms_cst = "07 - Operação Isenta da Contribuição.";
				} else if (icms_cst == "08") {
					icms_id = 08;
					icms_cst = "08 - Operação sem Incidência da Contribuição.";
				} else if (icms_cst == "09") {
					icms_id = 09;
					icms_cst = "09 - Operação com Suspensão da Contribuição.";
				} else if (icms_cst == "49") {
					icms_id = 49;
					icms_cst = "49 - Outras Operações de Saída.";
				} else if (icms_cst == "50") {
					icms_id = 50;
					icms_cst = "50 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Tributada no Mercado Interno.";
				} else if (icms_cst == "51") {
					icms_id = 51;
					icms_cst = "51 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno.";
				} else if (icms_cst == "52") {
					icms_id = 52;
					icms_cst = "52 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita de Exportação.";
				} else if (icms_cst == "53") {
					icms_id = 53;
					icms_cst = "53 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno.";
				} else if (icms_cst == "54") {
					icms_id = 54;
					icms_cst = "54 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno.";
				} else if (icms_cst == "05") {
					icms_id = 54;
					icms_cst = "55 - Operação com Direito a Crédito - Vinculada a Receitas Não Tributadas no Mercado Interno e de Exportação.";
				} else if (icms_cst == "56") {
					icms_id = 56;
					icms_cst = "56 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno e de Exportação.";
				} else if (icms_cst == "60") {
					icms_id = 60;
					icms_cst = "60 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Tributada no Mercado Interno.";
				} else if (icms_cst == "61") {
					icms_id = 61;
					icms_cst = "61 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno.";
				} else if (icms_cst == "62") {
					icms_id = 62;
					icms_cst = "62 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita de Exportação.";
				} else if (icms_cst == "63") {
					icms_id = 63;
					icms_cst = "63 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno.";
				} else if (icms_cst == "64") {
					icms_id = 64;
					icms_cst = "64 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas no Mercado Interno e de Exportação.";
				} else if (icms_cst == "65") {
					icms_id = 65;
					icms_cst = "65 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação.";
				} else if (icms_cst == "65") {
					icms_id = 66;
					icms_cst = "66 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno e de Exportação.";
				} else if (icms_cst == "67") {
					icms_id = 67;
					icms_cst = "67 - Crédito Presumido - Outras Operações.";
				} else if (icms_cst == "70") {
					icms_id = 70;
					icms_cst = "70 - Operação de Aquisição sem Direito a Crédito.";
				} else if (icms_cst == "71") {
					icms_id = 71;
					icms_cst = "71 - Operação de Aquisição com Isenção.";
				} else if (icms_cst == "72") {
					icms_id = 72;
					icms_cst = "72 - Operação de Aquisição com Suspensão.";
				} else if (icms_cst == "73") {
					icms_id = 73;
					icms_cst = "73 - Operação de Aquisição a Alíquota Zero.";
				} else if (icms_cst == "74") {
					icms_id = 74;
					icms_cst = "74 - Operação de Aquisição sem Incidência da Contribuição.";
				} else if (icms_cst == "75") {
					icms_id = 75;
					icms_cst = "75 - Operação de Aquisição por Substituição Tributária.";
				} else if (icms_cst == "98") {
					icms_id = 98;
					icms_cst = "98 - Outras Operações de Entrada.";
				} else if (icms_cst == "99") {
					icms_id = 99;
					icms_cst = "99 - Outras Operações.";
				} else {
					icms_id = -1;
					icms_cst = "Selecione ICMS CST.";
				}

				var html_select_icms_cst = '<select class="custom-select" id="select-icms-cst-id">' +
					'<option selected  value="' + icms_id + '">' + icms_cst + '</option>' +
					'<option value="01">01 - Operação Tributável com Alíquota Básica.</option>' +
					'<option value="02">02 - Operação Tributável com Alíquota Diferenciada.</option>' +
					'<option value="03">03 - Operação Tributável com Alíquota por Unidade de Medida de Produto.</option>' +
					'<option value="04">04 - Operação Tributável Monofásica - Revenda a Alíquota Zero.</option>' +
					'<option value="05">05 - Operação Tributável por Substituição Tributária.</option>' +
					'<option value="06">06 - Operação Tributável a Alíquota Zero.</option>' +
					'<option value="07">07 - Operação Isenta da Contribuição.</option>' +
					'<option value="08">08 - Operação sem Incidência da Contribuição.</option>' +
					'<option value="09">09 - Operação com Suspensão da Contribuição.</option>' +
					'<option value="49">49 - Outras Operações de Saída.</option>' +
					'<option value="50">50 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Tributada no Mercado Interno.</option>' +
					'<option value="51">51 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno.</option>' +
					'<option value="52">52 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita de Exportação.</option>' +
					'<option value="53">53 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno.</option>' +
					'<option value="54">54 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno.</option>' +
					'<option value="55">55 - Operação com Direito a Crédito - Vinculada a Receitas Não Tributadas no Mercado Interno e de Exportação.</option>' +
					'<option value="56">56 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno e de Exportação.</option>' +
					'<option value="60">60 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Tributada no Mercado Interno.</option>' +
					'<option value="61">61 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno.</option>' +
					'<option value="62">62 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita de Exportação.</option>' +
					'<option value="63">63 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno.</option>' +
					'<option value="64">64 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas no Mercado Interno e de Exportação.</option>' +
					'<option value="65">65 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação.</option>' +
					'<option value="66">66 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno e de Exportação.</option>' +
					'<option value="67">67 - Crédito Presumido - Outras Operações.</option>' +
					'<option value="70">70 - Operação de Aquisição sem Direito a Crédito.</option>' +
					'<option value="71">71 - Operação de Aquisição com Isenção.</option>' +
					'<option value="72">72 - Operação de Aquisição com Suspensão.</option>' +
					'<option value="73">73 - Operação de Aquisição a Alíquota Zero.</option>' +
					'<option value="74">74 - Operação de Aquisição sem Incidência da Contribuição.</option>' +
					'<option value="75">75 - Operação de Aquisição por Substituição Tributária.</option>' +
					'<option value="98">98 - Outras Operações de Entrada.</option>' +
					'<option value="99">99 - Outras Operações.</option>';

				//pis cst
				var pis_cst_id = 0;
				var pis_cst = produtcts[0].cst_pis;

				if (pis_cst == "00" || pis_cst == "0") {
					pis_cst_id = 00;
					pis_cst = "00 – Entrada com recuperação de crédito.";
				} else if (pis_cst == "01" || pis_cst == "0") {
					pis_cst_id = 01;
					pis_cst = "01 – Entrada tributada com alíquota zero.";
				} else if (pis_cst == "02" || pis_cst == "2") {
					pis_cst_id = 02;
					pis_cst = "02 – Entrada isenta.";
				} else if (pis_cst == "03" || pis_cst == "03") {
					pis_cst_id = 03;
					pis_cst = "03 – Entrada não-tributada.";
				} else if (pis_cst == "04" || pis_cst == "4") {
					pis_cst_id = 04;
					pis_cst = "04 – Entrada imune.";
				} else if (pis_cst == "05" || pis_cst == "5") {
					pis_cst_id = 05;
					pis_cst = "05 – Entrada com suspensão.";
				} else if (pis_cst == "49") {
					pis_cst_id = 49;
					pis_cst = "49 – Outras entradas.";
				} else {
					pis_cst_id = -1;
					pis_cst = "Selecione PIS CST.";
				}

				var html_select_pis_cst = '<select class="custom-select" id="select-pis-cst-id">' +
					'<option selected  value="' + pis_cst_id + '">' + pis_cst + '</option>' +
					'<option value="00">00 – Entrada com recuperação de crédito.</option>' +
					'<option value="01">01 – Entrada tributada com alíquota zero.</option>' +
					'<option value="02">02 – Entrada isenta.</option>' +
					'<option value="03">03 – Entrada não-tributada.</option>' +
					'<option value="04">04 – Entrada imune.</option>' +
					'<option value="05">05 – Entrada com suspensão.</option>' +
					'<option value="49">49 – Outras entradas.</option>' +
					'</select>';

				//cofins cst
				var cofins_cst_id = 0;
				var cofins_cst = produtcts[0].cst_cofins;

				if (cofins_cst == "01") {
					cofins_cst_id = "01";
					cofins_cst = "01 - Operação Tributável com Alíquota Básica.";
				} else if (cofins_cst == "02") {
					cofins_cst_id = 02;
					cofins_cst = "02 - Operação Tributável com Alíquota Diferenciada.";
				} else if (cofins_cst == "03") {
					cofins_cst_id = 03;
					cofins_cst = "03 - Operação Tributável com Alíquota por Unidade de Medida de Produto.";
				} else if (cofins_cst == "04") {
					cofins_cst_id = 04;
					cofins_cst = "04 - Operação Tributável Monofásica - Revenda a Alíquota Zero.";
				} else if (cofins_cst == "05") {
					cofins_cst_id = 05;
					cofins_cst = "05 - Operação Tributável por Substituição Tributária.";
				} else if (cofins_cst == "06") {
					cofins_cst_id = 06;
					cofins_cst = "06 - Operação Tributável a Alíquota Zero.";
				} else if (cofins_cst == "07") {
					cofins_cst_id = 07;
					cofins_cst = "07 - Operação Isenta da Contribuição.";
				} else if (cofins_cst == "08") {
					cofins_cst_id = 08;
					cofins_cst = "08 - Operação sem Incidência da Contribuição.";
				} else if (cofins_cst == "09") {
					cofins_cst_id = 09;
					cofins_cst = "09 - Operação com Suspensão da Contribuição.";
				} else if (cofins_cst == "49") {
					cofins_cst_id = 49;
					cofins_cst = "49 - Outras Operações de Saída.";
				} else if (cofins_cst == "50") {
					cofins_cst_id = 50;
					cofins_cst = "50 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Tributada no Mercado Interno.";
				} else if (cofins_cst == "51") {
					cofins_cst_id = 51;
					cofins_cst = "51 - Operação com Direito a Crédito – Vinculada Exclusivamente a Receita Não Tributada no Mercado Interno.";
				} else if (cofins_cst == "52") {
					cofins_cst_id = 52;
					cofins_cst = "52 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita de Exportação.";
				} else if (cofins_cst == "53") {
					cofins_cst_id = 52;
					cofins_cst = "53 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno.";
				} else if (cofins_cst == "54") {
					cofins_cst_id = 54;
					cofins_cst = "54 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas no Mercado Interno e de Exportação.";
				} else if (cofins_cst == "55") {
					cofins_cst_id = 55;
					cofins_cst = "55 - Operação com Direito a Crédito - Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação.";
				} else if (cofins_cst == "56") {
					cofins_cst_id = 56;
					cofins_cst = "56 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno, e de Exportação.";
				} else if (cofins_cst == "60") {
					cofins_cst_id = 60;
					cofins_cst = "60 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Tributada no Mercado Interno.";
				} else if (cofins_cst == "61") {
					cofins_cst_id = 61;
					cofins_cst = "61 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno.";
				} else if (cofins_cst == "62") {
					cofins_cst_id = 62;
					cofins_cst = "62 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita de Exportação.";
				} else if (cofins_cst == "63") {
					cofins_cst_id = 63;
					cofins_cst = "63 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno.";
				} else if (cofins_cst == "64") {
					cofins_cst_id = 64;
					cofins_cst = "64 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas no Mercado Interno e de Exportação.";
				} else if (cofins_cst == "65") {
					cofins_cst_id = 65;
					cofins_cst = "65 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação.";
				} else if (cofins_cst == "66") {
					cofins_cst_id = 66;
					cofins_cst = "66 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno, e de Exportação.";
				} else if (cofins_cst == "67") {
					cofins_cst_id = 67;
					cofins_cst = "67 - Crédito Presumido - Outras Operações.";
				} else if (cofins_cst == "70") {
					cofins_cst_id = 70;
					cofins_cst = "70 - Operação de Aquisição sem Direito a Crédito.";
				} else if (cofins_cst == "71") {
					cofins_cst_id = 71;
					cofins_cst = "71 - Operação de Aquisição com Isenção.";
				} else if (cofins_cst == "72") {
					cofins_cst_id = 72;
					cofins_cst = "72 - Operação de Aquisição com Suspensão.";
				} else if (cofins_cst == "73") {
					cofins_cst_id = 73;
					cofins_cst = "73 - Operação de Aquisição a Alíquota Zero.";
				} else if (cofins_cst == "74") {
					cofins_cst_id = 74;
					cofins_cst = "74 - Operação de Aquisição sem Incidência da Contribuição.";
				} else if (cofins_cst == "75") {
					cofins_cst_id = 75;
					cofins_cst = "75 - Operação de Aquisição por Substituição Tributária.";
				} else if (cofins_cst == "98") {
					cofins_cst_id = 98;
					cofins_cst = "98 - Outras Operações de Entrada.";
				} else if (cofins_cst == "99") {
					cofins_cst_id = 99;
					cofins_cst = "99 -Outras Operações.";
				} else {
					cofins_cst = "Selecione COFINS CST.";
				}

				var html_select_cofins_cst = '<select class="custom-select" id="select-cofins">' +
					'<option selected  value="' + cofins_cst_id + '">' + cofins_cst + '</option>' +
					'<option value="01">01 - Operação Tributável com Alíquota Básica.</option>' +
					'<option value="02">02 - Operação Tributável com Alíquota Diferenciada.</option>' +
					'<option value="03">03 - Operação Tributável com Alíquota por Unidade de Medida de Produto.</option>' +
					'<option value="04">04 - Operação Tributável Monofásica - Revenda a Alíquota Zero.</option>' +
					'<option value="05">05 - Operação Tributável por Substituição Tributária.</option>' +
					'<option value="06">06 - Operação Tributável a Alíquota Zero.</option>' +
					'<option value="07">07 - Operação Isenta da Contribuição.</option>' +
					'<option value="08">08 - Operação sem Incidência da Contribuição.</option>' +
					'<option value="09">09 - Operação com Suspensão da Contribuição.</option>' +
					'<option value="49">49 - Outras Operações de Saída.</option>' +
					'<option value="50">50 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita Tributada no Mercado Interno.</option>' +
					'<option value="51">51 - Operação com Direito a Crédito – Vinculada Exclusivamente a Receita Não Tributada no Mercado Interno.</option>' +
					'<option value="52">52 - Operação com Direito a Crédito - Vinculada Exclusivamente a Receita de Exportação.</option>' +
					'<option value="53">53 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno.</option>' +
					'<option value="54">54 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas no Mercado Interno e de Exportação.</option>' +
					'<option value="55">55 - Operação com Direito a Crédito - Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação.</option>' +
					'<option value="56">56 - Operação com Direito a Crédito - Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno, e de Exportação.</option>' +
					'<option value="60">60 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Tributada no Mercado Interno.</option>' +
					'<option value="61">61 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita Não-Tributada no Mercado Interno.</option>' +
					'<option value="62">62 - Crédito Presumido - Operação de Aquisição Vinculada Exclusivamente a Receita de Exportação.</option>' +
					'<option value="63">63 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno.</option>' +
					'<option value="64">64 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas no Mercado Interno e de Exportação.</option>' +
					'<option value="65">65 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Não-Tributadas no Mercado Interno e de Exportação.</option>' +
					'<option value="66">66 - Crédito Presumido - Operação de Aquisição Vinculada a Receitas Tributadas e Não-Tributadas no Mercado Interno, e de Exportação.</option>' +
					'<option value="67">67 - Crédito Presumido - Outras Operações.</option>' +
					'<option value="70">70 - Operação de Aquisição sem Direito a Crédito.</option>' +
					'<option value="71">71 - Operação de Aquisição com Isenção.</option>' +
					'<option value="72">72 - Operação de Aquisição com Suspensão.</option>' +
					'<option value="73">73 - Operação de Aquisição a Alíquota Zero.</option>' +
					'<option value="74">74 - Operação de Aquisição sem Incidência da Contribuição.</option>' +
					'<option value="75">75 - Operação de Aquisição por Substituição Tributária.</option>' +
					'<option value="98">98 - Outras Operações de Entrada.</option>' +
					'<option value="99">99 - Outras Operações.</option>' +
					'</select>';

				//cofins cst
				var ipi_cst_id = 0;
				var ipi_cst = produtcts[0].cst_ipi;

				if (pis_cst == "00") {
					ipi_cst_id = 00;
					ipi_cst = "00 - Entrada com recuperação de crédito.";
				} else if (ipi_cst == "01") {
					ipi_cst_id = 01;
					ipi_cst = "01 - Entrada tributada com alíquota zero.";
				} else if (ipi_cst == "02") {
					ipi_cst_id = 02;
					ipi_cst = "02 - Entrada isenta.";
				} else if (ipi_cst == "03") {
					ipi_cst_id = 03;
					ipi_cst = "03 - Entrada não tributada.";
				} else if (ipi_cst == "04") {
					ipi_cst_id = 04;
					ipi_cst = "04 - Entrada imune.";
				} else if (ipi_cst == "05") {
					ipi_cst_id = 05;
					ipi_cst = "05 - Entrada com suspensão.";
				} else if (ipi_cst == "49") {
					ipi_cst_id = 49;
					ipi_cst = "49 - Outras Entradas.";
				} else if (ipi_cst == "50") {
					ipi_cst_id = 50;
					ipi_cst = "50 - Saída tributada.";
				} else if (ipi_cst == "51") {
					ipi_cst_id = 51;
					ipi_cst = "51 - Saída tributável com alíquota zero.";
				} else if (ipi_cst == "52") {
					ipi_cst_id = 52;
					ipi_cst = "52 - Saída isenta.";
				} else if (ipi_cst == "53") {
					ipi_cst_id = 53;
					ipi_cst = "53 - Saída não tributada.";
				} else if (ipi_cst == "54") {
					ipi_cst_id = 54;
					ipi_cst = "54 - Saída imune.";
				} else if (ipi_cst == "55") {
					ipi_cst_id = 55;
					ipi_cst = "55 - Saída com suspensão.";
				} else if (ipi_cst == "99") {
					ipi_cst_id = 99;
					ipi_cst = "99 - Outras saídas.";
				} else {
					ipi_cst_id = -1;
					ipi_cst = "Selecione IPI CST.";
				}

				var html_select_ipi_cst = '<select class="custom-select" id="select-ipi-id">' +
					'<option selected  value="' + ipi_cst_id + '">' + ipi_cst + '</option>' +
					'<option value="00">00 - Entrada com recuperação de crédito.</option>' +
					'<option value="01">01 - Entrada tributada com alíquota zero.</option>' +
					'<option value="02">02 - Entrada isenta.</option>' +
					'<option value="03">03 - Entrada não tributada.</option>' +
					'<option value="04">04 - Entrada imune.</option>' +
					'<option value="05">05 - Entrada com suspensão.</option>' +
					'<option value="49">49 - Outras Entradas.</option>' +
					'<option value="50">50 - Saída tributada.</option>' +
					'<option value="51">51 - Saída tributável com alíquota zero.</option>' +
					'<option value="52">52 - Saída isenta.</option>' +
					'<option value="53">53 - Saída não tributada.</option>' +
					'<option value="54">54 - Saída imune.</option>' +
					'<option value="55">55 - Saída com suspensão.</option>' +
					'<option value="99">99 - Outras saídas.</option>' +
					'</select>';

				window.document.getElementById('select-departament').innerHTML = html_select_departamento;
				window.document.getElementById('select-quantity-discount').innerHTML = html_select_validade;
				window.document.getElementById('select-granel').innerHTML = html_select_granel;
				window.document.getElementById('select-sector-id').innerHTML = html_select_setor;
				window.document.getElementById('select-trib').innerHTML = html_select_trib;
				window.document.getElementById('select-origem').innerHTML = html_select_origem;
				window.document.getElementById('select-mod-bc').innerHTML = html_select_mod;
				window.document.getElementById('select-icms-st').innerHTML = html_select_icms_cst;
				window.document.getElementById('select-cst-pis').innerHTML = html_select_pis_cst;
				window.document.getElementById('select-cst-cofins').innerHTML = html_select_cofins_cst;
				window.document.getElementById('select-cst-ipi').innerHTML = html_select_ipi_cst;

			} else {

			}
		}
	});
}

function SaveInpuProduto() {

	let id = window.document.getElementById('input-number-int').value;
	let cnpj = window.document.getElementById('input-cpf-cnpj').value;
	let codigo_barras = window.document.getElementById('input-barcode').value;
	let descricao = window.document.getElementById('input-description').value;
	let num_interno = document.getElementById('input-number-int').value;
	let num_departam = $("#select-departament option:selected").val();
	let departamento = $("#select-departament option:selected").text();
	let departamento_id = window.document.getElementById('select-departament').value;
	let validade = window.document.getElementById('product-validations').value;
	let margem = "0.00";
	let desc_automatico = false;
	let est_min = window.document.getElementById('input-invetory-min').value;
	let granel = $("#select-granel option:selected").val();
	let qtde_desconto = window.document.getElementById('input-discount').value;
	let setor_id = $("#select-sector-id option:selected").val();
	let trib = window.document.getElementById('select-input-trib').value;
	let unidade = window.document.getElementById('input-unity').value;
	let custo = window.document.getElementById('input-price-cost').value;
	let preco = window.document.getElementById('input-price').value;
	let estoque_minimos = window.document.getElementById('input-invetory-min').value;
	/*	let estoque = window.document.getElementById('input-qtde').value;*/
	/*	let quantidade_entrada = window.document.getElementById('input-qtde').value;*/
	let valor_promocao = window.document.getElementById('input-price-promotion').value ?? null ?? 0;
	let desc = window.document.getElementById('input-discount').value;
	let custo_caixa = window.document.getElementById('input-cash-cost').value;
	let cfop = window.document.getElementById('input-cfop').value;
	let ncm = window.document.getElementById('input-ncm').value;
	let cest = window.document.getElementById('input-cest').value;
	let anp = window.document.getElementById('input-anp').value;
	let valor_red_bc = window.document.getElementById('input-valor-red-bc').value;
	let origem = window.document.getElementById('select-origem-id').value;
	let mod_red_bc = window.document.getElementById('select-mod-bc-id').value;
	let red_bc_calc = window.document.getElementById('input-valor-red-bc').value;
	let valor_icms = window.document.getElementById('input-price-icms').value ?? null ?? "0.00";
	let cst_icms = $("#select-icms-cst-id option:selected").val() ?? null ?? "";
	let valor_pis = window.document.getElementById('select-cst-pis').value ?? null ?? "0.00";
	let cst_pis = window.document.getElementById('select-pis-cst-id').value ?? null ?? "";
	let valor_cofins = window.document.getElementById('input-price-cofins').value;
	let cst_cofins = window.document.getElementById('select-cofins').value;
	let cst_ipi = window.document.getElementById('select-ipi-id').value;
	let valor_ipi = window.document.getElementById('input-price-ipi').value;
	alert(cst_icms);

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
				id: id,
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
				valor_promocao,
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
			url: "update-product.aspx/SaveProduct",
			data: JSON.stringify(data),
			dataType: "json",
			type: "POST",
			contentType: "application/json; charset=utf-8",
			success: function (responses) {
				var resp = JSON.parse(responses.d);
				if (resp != null) {
					$.notify("Sucesso, Produto selecionado foi alterado com sucesso.", "success");
					const myTimeout = setTimeout(myGreeting, 5000);
				} else {
					$.notify("Erro, Erro ao alterar produto selecionado.", "error");
				}
			}
		});
	}
};

function myGreeting() {
	location.href = 'products-list.aspx';
}

