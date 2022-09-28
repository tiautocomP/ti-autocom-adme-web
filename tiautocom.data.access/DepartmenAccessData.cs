using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tiautocom.transfer.objects;

namespace tiautocom.data.access
{
	public class DepartmenAccessData
	{
		SqlCommand comandoSql = new SqlCommand();
		StringBuilder sql = new StringBuilder();
		DataTable datatable = new DataTable();

		public List<Department> getdepartmentsall()
		{
			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					sql.Append("select * from department order by descricao asc");

					comandoSql.CommandText = sql.ToString();
					comandoSql.Connection = connections;
					datatable.Load(comandoSql.ExecuteReader());

					if (datatable.Rows.Count > 0)
					{
						var list = new List<Department>();

						for (int i = 0; i < datatable.Rows.Count; i++)
						{
							list.Add(new Department
							{
								id = Convert.ToInt32(datatable.Rows[i]["ID"].ToString().Trim()),
								descricao = datatable.Rows[i]["DESCRICAO"].ToString().Trim()
							});
						}

						connections.Close();

						return list;
					}
					else
					{
						return null;
					}
				}
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}
	}
}
