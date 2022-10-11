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
		UserAccessData userAcessDatas;

		public List<Users> userlogin(Users user)
		{
			try
			{
				userAcessDatas = new UserAccessData();
				return userAcessDatas.userlogin(user);
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}

		public List<Users> getUserAll(int company_id)
		{
			try
			{
				userAcessDatas = new UserAccessData();
				return userAcessDatas.getUserAll(company_id);
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}

		public string saveUserType(Users users)
		{
			try
			{
				userAcessDatas = new UserAccessData();
				return userAcessDatas.saveUserType(users);
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}

		public List<Users> getUserId(int id)
		{
			try
			{
				userAcessDatas = new UserAccessData();
				return userAcessDatas.getUserId(id);
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}

		public string updateUser(Users users)
		{
			try
			{
				userAcessDatas = new UserAccessData();
				return userAcessDatas.updateUser(users);
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}

		public List<Users> userSearch(string name)
		{
			try
			{
				userAcessDatas = new UserAccessData();
				return userAcessDatas.userSearch(name);
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}
	}
}
