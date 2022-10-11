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
    public class UserTypeAccessData
    {
        SqlCommand comandoSql = new SqlCommand();
        StringBuilder sql = new StringBuilder();
        DataTable datatable = new DataTable();

        public List<UserType> getTypeUserAll(int company_id)
        {
            try
            {
                using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
                {
                    connections.Open();

                    sql.Append("select ut.Id, ut.description, ut.company_Id from user_type ut ");
                    sql.Append($"where ut.company_id={company_id} order by ut.description asc;");

                    comandoSql.CommandText = sql.ToString();
                    comandoSql.Connection = connections;
                    datatable.Load(comandoSql.ExecuteReader());

                    if (datatable.Rows.Count > 0)
                    {
                        var lista = new List<UserType>();

                        for (int i = 0; i < datatable.Rows.Count; i++)
                        {
                            lista.Add(new UserType
                            {
                                Id = Convert.ToInt32(datatable.Rows[i]["id"].ToString().Trim()),
                                description = datatable.Rows[i]["description"].ToString().Trim(),
                                Company_Id = Convert.ToInt32(datatable.Rows[i]["company_Id"].ToString().Trim())
                            });

                        }
                        connections.Close();

                        return lista;
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
