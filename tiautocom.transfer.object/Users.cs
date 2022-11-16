using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace tiautocom.transfer.objects
{
	public class Users
	{
		#region person

		public int person_id { get; set; }
		public string cpf_cnpj { get; set; }
		public string name_reason { get; set; }
		public DateTime person_registration_date { get; set; }
		public string rg_ie { get; set; }

		#endregion

		#region company

		public string company_name { get; set; }
		public int company_id { get; set; }
		public string company_logo { get; set; }
		public string crt { get; set; }

		#endregion

		#region user

		public int user_id { get; set; }
		public string user_name { get; set; }
		public int user_active { get; set; }
		public string email { get; set; }
		public string password { get; set; }
		public string user_registration_date { get; set; }
		public int user_type_id { get; set; }

		#endregion

		#region user type

		public int id_user_type { get; set; }
		public string user_type_description { get; set; }
		public bool user_type_active { get; set; }
		public bool action_insert { get; set; }
		public bool action_update { get; set; }
		public bool action_delete { get; set; }
		public bool action_save { get; set; }

		#endregion

		#region address

		public string city { get; set; }
		public string complement { get; set; }
		public string district { get; set; }
		public string note { get; set; }
		public string number { get; set; }
		public string public_place { get; set; }
		public string state { get; set; }
		public string zip_code { get; set; }

		#endregion
	}
}
