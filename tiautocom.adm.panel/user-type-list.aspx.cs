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
	public partial class user_type_list : System.Web.UI.Page
	{
		[WebMethod]
		public static string getTypeUserAll(int company_id)
		{
			UserType userType = new UserType();
			UserTypeBusinessRule userTypeBusinessRule = new UserTypeBusinessRule();

			List<UserType> list = new List<UserType>();

			System.Web.Script.Serialization.JavaScriptSerializer oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();

			list = userTypeBusinessRule.getTypeUserAll(company_id);

			string sJSON = oSerializer.Serialize(list).ToString();

			return sJSON;
		}

		[WebMethod]
		public static string getUserTypeId(int id)
		{
			UserType userType = new UserType();
			UserTypeBusinessRule userTypeBusinessRule = new UserTypeBusinessRule();

			List<UserType> list = userTypeBusinessRule.getUserTypeId(id);

			System.Web.Script.Serialization.JavaScriptSerializer oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();

			string sJSON = oSerializer.Serialize(list).ToString();

			return sJSON;
		}

		[WebMethod]
		public static string updateUserTypes(UserType userType)
		{
			UserTypeBusinessRule userTypeBusinessRule = new UserTypeBusinessRule();

			string sJSON = userTypeBusinessRule.saveUserType(userType);

			return sJSON;
		}
	}
}