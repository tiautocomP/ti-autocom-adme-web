using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace tiautocom.transfer.objects
{
	public class UserType
	{
		public int id { get; set; }
		public string description { get; set; }
		public string active { get; set; }
		public int company_Id { get; set; }
		public string action_save { get; set; }
		public string action_delete { get; set; }
		public string action_update { get; set; }
	}
}
