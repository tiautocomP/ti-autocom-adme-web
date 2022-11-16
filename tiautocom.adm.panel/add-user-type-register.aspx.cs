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
	public partial class add_user_type_register : System.Web.UI.Page
	{
        [WebMethod]
        public static string saveUserTypes(UserType userType)
        {
            UserTypeBusinessRule userTypeBusinessRule = new UserTypeBusinessRule();

            string sJSON = userTypeBusinessRule.saveUserType(userType);

            return sJSON;
        }
    }
}