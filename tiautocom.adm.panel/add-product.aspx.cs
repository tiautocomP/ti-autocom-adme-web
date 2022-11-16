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
	public partial class add_product : System.Web.UI.Page
	{
		[WebMethod]
		public static string SaveProduct(Products produtcs)
		{
			Produtcsbusinessrule produtcsbusinessrule = new Produtcsbusinessrule();

			List<Products> list = produtcsbusinessrule.SaveProduct(produtcs);

			System.Web.Script.Serialization.JavaScriptSerializer oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();

			string sJSON = oSerializer.Serialize(list).ToString();

			return sJSON;
		}
	}
}