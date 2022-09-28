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
    public partial class login : System.Web.UI.Page
    {
        [WebMethod]
        public static string userlogin(Users user)
        {
            List<Users> list = new List<Users>();

            UserBusinessRule userbusinessrule = new UserBusinessRule();

            System.Web.Script.Serialization.JavaScriptSerializer oSerializer = new System.Web.Script.Serialization.JavaScriptSerializer();

            list = userbusinessrule.userlogin(user);

            string sJSON = oSerializer.Serialize(list).ToString();

            return sJSON;
        }
    }
}
