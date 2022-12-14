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
		public static string getProductsInput(Inputs inputs)
		{
			InputBusinessRule inputBusinessRule = new InputBusinessRule();

			List<Inputs> list = inputBusinessRule.getProductsInput(inputs);

			System.Web.Script.Serialization.JavaScriptSerializer oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();

			string sJSON = oSerializer.Serialize(list).ToString();

			return sJSON;
		}

		[WebMethod]
		public static string getProductsInputId(int id)
		{
			InputBusinessRule inputBusinessRule = new InputBusinessRule();

			List<Inputs> list = inputBusinessRule.getProductsInputId(id);

			System.Web.Script.Serialization.JavaScriptSerializer oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();

			string sJSON = oSerializer.Serialize(list).ToString();

			return sJSON;
		}

		[WebMethod]
		public static string productsInputUpdate(Inputs inputs)
		{
			InputBusinessRule inputBusinessRule = new InputBusinessRule();

			List<Inputs> list = inputBusinessRule.productsInputUpdate(inputs);

			System.Web.Script.Serialization.JavaScriptSerializer oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();

			string sJSON = oSerializer.Serialize(list).ToString();

			return sJSON;
		}

		[WebMethod]
		public static string InputDeleteId(Products products)
		{
			InputBusinessRule inputBusinessRule = new InputBusinessRule();

			string sJSON = inputBusinessRule.InputDeleteId(products);

			return sJSON;
		}

		[WebMethod]
		public static string ImportInput(Inputs inputs)
		{
			InputBusinessRule inputBusinessRule = new InputBusinessRule();

			string sJSON = inputBusinessRule.ImportInput(inputs);

			return sJSON;
		}
	}
}