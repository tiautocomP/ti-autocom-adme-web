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
	public partial class type_user_list : System.Web.UI.Page
	{
		[WebMethod]
		public static string getUserAll(int company_id)
		{
			UserBusinessRule userBusinessRule = new UserBusinessRule();

			List<Users> list = userBusinessRule.getUserAll(company_id);

			System.Web.Script.Serialization.JavaScriptSerializer oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();

			string sJSON = oSerializer.Serialize(list).ToString();

			return sJSON;
		}

		[WebMethod]
		public static string getUserId(int id)
		{
			UserBusinessRule userBusinessRule = new UserBusinessRule();

			List<Users> list = userBusinessRule.getUserId(id);

			System.Web.Script.Serialization.JavaScriptSerializer oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();

			string sJSON = oSerializer.Serialize(list).ToString();

			return sJSON;
		}

		[WebMethod]
		public static string updateUser(Users users)
		{
			UserBusinessRule userBusinessRule = new UserBusinessRule();

			string sJSON = userBusinessRule.updateUser(users);

			return sJSON;
		}

		[WebMethod]
		public static string userSearch(string name)
		{
			UserBusinessRule userBusinessRule = new UserBusinessRule();

			List<Users> list = userBusinessRule.userSearch(name);

			System.Web.Script.Serialization.JavaScriptSerializer oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();

			string sJSON = oSerializer.Serialize(list).ToString();

			return sJSON;
		}
	}
}