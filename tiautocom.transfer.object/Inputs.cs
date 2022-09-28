using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace tiautocom.transfer.objects
{
	public class Inputs
	{
		public int id { get; set; }
		public int produto_id { get; set; }
		public int usuario_id { get; set; }
		public DateTime date { get; set; }
		public string quantity { get; set; }
		public string cpf_cnpj { get; set; }
		public int company_id { get; set; }
		public string barcode { get; set; }
		public string description { get; set; }
		public string price { get; set; }
		public string unity { get; set; }
		public string note_number { get; set; }
		public decimal price_cost { get; set; }
	}
}
