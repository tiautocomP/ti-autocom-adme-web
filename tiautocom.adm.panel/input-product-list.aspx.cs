using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using tiautocom.business.rule;
using tiautocom.transfer.objects;

namespace tiautocom.adm.panel
{
	public partial class input_product_list : System.Web.UI.Page
	{
		[WebMethod]
		public static string getProductsInput(string documents)
		{
			InputBusinessRule inputBusinessRule = new InputBusinessRule();

			List<Inputs> list = inputBusinessRule.getProductsInput(documents);

			System.Web.Script.Serialization.JavaScriptSerializer oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();

			string sJSON = oSerializer.Serialize(list).ToString();

			return sJSON;
		}
	}
}