using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tiautocom.data.access;
using tiautocom.transfer.objects;

namespace tiautocom.business.rule
{
	public class CompanyBusinessRule
	{
		CompanyAcessDatas companyAcessDatas = new CompanyAcessDatas();
		public string CompanySave(Company company)
		{
			try
			{
				companyAcessDatas = new CompanyAcessDatas();
				return companyAcessDatas.CompanySave(company);
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}
	}
}
