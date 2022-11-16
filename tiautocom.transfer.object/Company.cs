using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace tiautocom.transfer.objects
{
	public class Company
	{
		public int company_id { get; set; }
		public string company_name { get; set; }
		public string logo { get; set; }
		public string name_reason { get; set; }
		public string cpf_cnpj { get; set; }
		public string rg_ie { get; set; }
		public DateTime registration_date { get; set; }
		public string public_place { get; set; }
		public string number { get; set; }
		public string district { get; set; }
		public string zip_code { get; set; }
		public string city { get; set; }
		public string state { get; set; }
		public string complement { get; set; }
		public string crt { get; set; }
		public string phone { get; set; }
		public string cell { get; set; }
		public int person_type_id { get; set; }
	}
}
