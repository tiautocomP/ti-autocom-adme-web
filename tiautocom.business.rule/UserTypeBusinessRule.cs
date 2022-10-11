using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tiautocom.data.access;
using tiautocom.transfer.objects;

namespace tiautocom.business.rule
{
    public class UserTypeBusinessRule
    {
        UserTypeAccessData userTypeAcessDatas;

        public List<UserType> getTypeUserAll(int company_id)
        {
            try
            {
                userTypeAcessDatas = new UserTypeAccessData();
                return userTypeAcessDatas.getTypeUserAll(company_id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
