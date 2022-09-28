﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace tiautocom.transfer.objects
{
	public class Produtcs
	{
		public int id { get; set; }
		public string codigo_barras { get; set; }
		public string descricao { get; set; }
		public int num_interno { get; set; }
		public string departamento { get; set; }
		public int departamento_id { get; set; }
		public string estoque { get; set; }
		public string preco { get; set; }
		public string unidade { get; set; }
		public string custo { get; set; }
		public string trib { get; set; }
		public string desc { get; set; }
		public string granel { get; set; }
		public bool desc_automatico { get; set; }
		public string qtde_desconto { get; set; }
		public string custo_caixa { get; set; }
		public DateTime data_ajuste { get; set; }
		public int? setor_id { get; set; }
		public string validade { get; set; }
		public string margem { get; set; }
		public string valor_pis { get; set; }
		public string cst_pis { get; set; }
		public string valor_cofins { get; set; }
		public string cst_cofins { get; set; }
		public string cfop { get; set; }
		public string origem { get; set; }
		public string icms_cst { get; set; }
		public string icms { get; set; }
		public string ncm { get; set; }
		public string cest { get; set; }
		public string ipi { get; set; }
		public string ipi_cst { get; set; }
		public string mod_bc { get; set; }
		public string red_bc { get; set; }
		public string anp { get; set; }
		public int status { get; set; }
	}
}
