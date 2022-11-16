using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using tiautocom.transfer.objects;
using tiautocom.business.rule;

namespace tiautocom.adm.panel
{
	public partial class add_company : System.Web.UI.Page
	{
		[WebMethod]
		public static string CompanysSave(Company company)
		{
			CompanyBusinessRule companyBusinessRule = new CompanyBusinessRule();

			var resp = companyBusinessRule.CompanySave(company);

			return resp.ToString();
		}
	}
}