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
	public class InputAccessData
	{
		SqlCommand comandoSql = new SqlCommand();
		StringBuilder sql = new StringBuilder();
		DataTable datatable = new DataTable();

		public int id_input;

		public string postproductInput(Inputs inputs)
		{
			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					sql.Append("insert into input (produto_id, usuario_id, date, quantity, input_open, cpf_cnpj, company_id)");
					sql.Append("values");
					sql.Append("(@produto_id, @usuario_id, @date, @quantity, 1, @cpf_cnpj, @company_id)");

					comandoSql.CommandText = sql.ToString();
					comandoSql.Connection = connections;

					comandoSql.Parameters.AddWithValue("@produto_id", inputs.produto_id);
					comandoSql.Parameters.AddWithValue("@usuario_id", inputs.usuario_id);
					comandoSql.Parameters.AddWithValue("@date", DateTime.Now);
					comandoSql.Parameters.AddWithValue("@quantity", inputs.quantity);
					comandoSql.Parameters.AddWithValue("@cpf_cnpj", inputs.cpf_cnpj);
					comandoSql.Parameters.AddWithValue("@company_id", inputs.company_id);

					comandoSql.ExecuteNonQuery();

					comandoSql.CommandText = "select max(id) FROM input";

					id_input = Convert.ToInt32(comandoSql.ExecuteScalar());
				}

				return id_input.ToString();
			}
			catch (Exception ex)
			{
				return ex.Message;
			}
		}

		public List<Inputs> getProductsInput(string documents)
		{
			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					sql.Append("select * from input i left join product p on i.produto_id=p.cod_int where cpf_cnpj='" + documents + "' order by  date asc");

					comandoSql.CommandText = sql.ToString();
					comandoSql.Connection = connections;
					datatable.Load(comandoSql.ExecuteReader());

					if (datatable.Rows.Count > 0)
					{
						var list = new List<Inputs>();

						for (int i = 0; i < datatable.Rows.Count; i++)
						{
							list.Add(new Inputs
							{
								id = Convert.ToInt32(datatable.Rows[i]["ID"].ToString().Trim()),
								produto_id = Convert.ToInt32(datatable.Rows[i]["PRODUTO_ID"].ToString().Trim()),
								usuario_id = Convert.ToInt32(datatable.Rows[i]["USUARIO_ID"].ToString().Trim()),
								date = Convert.ToDateTime(datatable.Rows[i]["DATE"].ToString().Trim()),
								barcode = datatable.Rows[i]["COD_BARRA"].ToString().Trim(),
								description = datatable.Rows[i]["DESCRICAO"].ToString().Trim(),
								price = Convert.ToDecimal(datatable.Rows[i]["PRECO"].ToString().Trim()).ToString("N3"),
								quantity = Convert.ToDecimal(datatable.Rows[i]["QUANTITY"].ToString().Trim()).ToString("N3"),
								unity = datatable.Rows[i]["UNID"].ToString().Trim(),
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
