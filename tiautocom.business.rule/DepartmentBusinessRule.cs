using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tiautocom.data.access;
using tiautocom.transfer.objects;

namespace tiautocom.business.rule
{
	public class DepartmentBusinessRule
	{
        DepartmenAccessData departmenAccessData;

        public List<Department> getdepartmentsall()
		{
            try
            {
                departmenAccessData = new DepartmenAccessData();
                return departmenAccessData.getdepartmentsall();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

	}
}
