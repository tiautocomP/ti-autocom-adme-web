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
	public partial class products_list : System.Web.UI.Page
	{
		[WebMethod]
		public static string getproductsall(Produtcs produtcs)
		{
			Produtcsbusinessrule produtcsbusinessrule = new Produtcsbusinessrule();

			List<Produtcs> list = new List<Produtcs>();

			System.Web.Script.Serialization.JavaScriptSerializer oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();

			list = produtcsbusinessrule.GetProdutoAll(produtcs);

			string sJSON = oSerializer.Serialize(list).ToString();

			return sJSON;
		}

		[WebMethod]
		public static string getdepartmentsall()
		{
			Department Department = new Department();
			DepartmentBusinessRule departmentBusinessRule = new DepartmentBusinessRule();

			List<Department> list = new List<Department>();

			System.Web.Script.Serialization.JavaScriptSerializer oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();

			list = departmentBusinessRule.getdepartmentsall();

			string sJSON = oSerializer.Serialize(list).ToString();

			return sJSON;
		}


		[WebMethod]
		public static string getproductsstatus(Produtcs produtcs)
		{
			Produtcsbusinessrule produtcsbusinessrule = new Produtcsbusinessrule();

			List<Produtcs> list = produtcsbusinessrule.getproductsstatus(produtcs);

			System.Web.Script.Serialization.JavaScriptSerializer oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();

			string sJSON = oSerializer.Serialize(list).ToString();

			return sJSON;
		}

		[WebMethod]
		public static string getproductId(int id)
		{
			Produtcsbusinessrule produtcsbusinessrule = new Produtcsbusinessrule();

			List<Produtcs> list = produtcsbusinessrule.getproductId(id);

			System.Web.Script.Serialization.JavaScriptSerializer oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();

			string sJSON = oSerializer.Serialize(list).ToString();

			return sJSON;
		}

		[WebMethod]
		public static string postproductInput(Inputs inputs)
		{
			InputBusinessRule inputBusinessRule = new InputBusinessRule();

			string sJSON = inputBusinessRule.postproductInput(inputs);

			return sJSON;
		}
	}
}