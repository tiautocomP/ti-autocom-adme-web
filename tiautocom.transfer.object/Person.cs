using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace tiautocom.transfer.objects
{
	public class Person
	{
		public int id { get; set; }
		public string name_reason { get; set; }
		public string cpf_cnpj { get; set; }
		public string rg_ie { get; set; }
		public DateTime registration_date { get; set; }
	}
}
