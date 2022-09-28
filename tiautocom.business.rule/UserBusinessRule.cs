using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tiautocom.data.access;
using tiautocom.transfer.objects;

namespace tiautocom.business.rule
{
    public class UserBusinessRule
    {
        UserAccessDatas userAcessDatas;

        public List<Users> userlogin(Users user)
        {
            try
            {
                userAcessDatas = new UserAccessDatas();
                return userAcessDatas.userlogin(user);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
