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

					sql.Append("insert into input (produto_id, usuario_id, date, quantity, input_open, cpf_cnpj, company_id, note_number, barcode, price, price_cost)");
					sql.Append("values");
					sql.Append("(@produto_id, @usuario_id, @date, @quantity, 1, @cpf_cnpj, @company_id, @note_number, @barcode, @price, @price_cost)");

					comandoSql.CommandText = sql.ToString();
					comandoSql.Connection = connections;

					comandoSql.Parameters.AddWithValue("@produto_id", inputs.produto_id);
					comandoSql.Parameters.AddWithValue("@usuario_id", inputs.usuario_id);
					comandoSql.Parameters.AddWithValue("@date", DateTime.Now);
					comandoSql.Parameters.AddWithValue("@quantity", inputs.quantity);
					comandoSql.Parameters.AddWithValue("@cpf_cnpj", inputs.cpf_cnpj);
					comandoSql.Parameters.AddWithValue("@company_id", inputs.company_id);
					comandoSql.Parameters.AddWithValue("@note_number", inputs.note_number);
					comandoSql.Parameters.AddWithValue("@barcode", inputs.barcode);
					comandoSql.Parameters.AddWithValue("@price", Convert.ToDecimal(inputs.price));
					comandoSql.Parameters.AddWithValue("@price_cost", Convert.ToDecimal(inputs.price_cost));

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

		public string ImportInput()
		{
			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					sql.Append("update input set input_open=@input_open");

					comandoSql.CommandText = sql.ToString();
					comandoSql.Connection = connections;

					comandoSql.Parameters.AddWithValue("@input_open", 0);

					comandoSql.ExecuteNonQuery();
				}

				return "OK";
			}
			catch
			{
				return "NO";
			}
		}

		public string InputDeleteId(int id)
		{
			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					sql.Append("delete from input where id=@id");

					comandoSql.CommandText = sql.ToString();
					comandoSql.Connection = connections;

					comandoSql.Parameters.AddWithValue("@id", id);

					comandoSql.ExecuteNonQuery();
				}

				return id.ToString();
			}
			catch (Exception ex)
			{
				return ex.Message;
			}
		}

		public List<Inputs> productsInputUpdate(Inputs inputs)
		{
			var list = new List<Inputs>();

			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					sql.Append("update input set quantity=@quantity, cpf_cnpj=@cpf_cnpj, note_number=@note_number, barcode=@barcode, price=@price, price_cost=@price_cost where id=@id");

					comandoSql.CommandText = sql.ToString();
					comandoSql.Connection = connections;

					comandoSql.Parameters.AddWithValue("@id", inputs.id);
					comandoSql.Parameters.AddWithValue("@quantity", inputs.quantity);
					comandoSql.Parameters.AddWithValue("@description", inputs.quantity);
					comandoSql.Parameters.AddWithValue("@cpf_cnpj", inputs.cpf_cnpj);
					comandoSql.Parameters.AddWithValue("@note_number", inputs.note_number);
					comandoSql.Parameters.AddWithValue("@barcode", inputs.barcode);
					comandoSql.Parameters.AddWithValue("@price", Convert.ToDecimal(inputs.price));
					comandoSql.Parameters.AddWithValue("@price_cost", Convert.ToDecimal(inputs.price_cost));

					comandoSql.ExecuteNonQuery();

					list = getProductsInput(inputs.cpf_cnpj);
				}

				return list;
			}
			catch
			{
				return list;
			}
		}

		public List<Inputs> getProductsInputId(int id)
		{
			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					sql.Append("select i.id, i.produto_id, usuario_id, i.date, i.quantity, i.input_open, i.cpf_cnpj, i.company_id, i.note_number, i.barcode, i.price, i.price_cost, i.input_open, p.descricao, p.cnpj, p.custo, p.estoque, p.preco, p.unid, sum(i.price_cost * i.quantity) as total ");
					sql.Append("from input i left join product p on i.produto_id = p.cod_int  ");
					sql.Append("where i.id = '" + id + "' ");
					sql.Append("group by i.id, i.produto_id, usuario_id, i.date, i.quantity, i.input_open, i.cpf_cnpj, i.company_id, i.note_number, i.barcode, i.price, i.price_cost, p.descricao, p.cnpj, p.custo, p.estoque, p.preco, p.unid, i.input_open ");
					sql.Append("order by  i.date asc");

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
								barcode = datatable.Rows[i]["BARCODE"].ToString().Trim(),
								description = datatable.Rows[i]["DESCRICAO"].ToString().Trim(),
								price = Convert.ToDecimal(datatable.Rows[i]["PRECO"].ToString().Trim()).ToString("N3"),
								quantity = Convert.ToDecimal(datatable.Rows[i]["QUANTITY"].ToString().Trim()).ToString("N3"),
								unity = datatable.Rows[i]["UNID"].ToString().Trim(),
								price_cost = Convert.ToDecimal(datatable.Rows[i]["PRICE_COST"].ToString().Trim()).ToString("N3"),
								total = Convert.ToDecimal(datatable.Rows[i]["TOTAL"].ToString().Trim()).ToString("N3"),
								inventory = Convert.ToDecimal(datatable.Rows[i]["ESTOQUE"].ToString().Trim()).ToString("N3"),
								cpf_cnpj = datatable.Rows[i]["CPF_CNPJ"].ToString().Trim(),
								note_number = datatable.Rows[i]["NOTE_NUMBER"].ToString().Trim(),
								input_open = Convert.ToBoolean(datatable.Rows[i]["INPUT_OPEN"].ToString().Trim()),
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

		public List<Inputs> getProductsInput(string documents)
		{
			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					sql.Append("select i.id, i.produto_id, usuario_id, i.date, i.quantity, i.input_open, i.cpf_cnpj, i.company_id, i.note_number, i.barcode, i.price, i.price_cost, p.descricao, p.cnpj, p.custo, p.estoque, p.preco, p.unid, sum(i.price_cost * i.quantity) as total ");
					sql.Append("from input i left join product p on i.produto_id = p.cod_int  ");
					sql.Append("where p.cnpj = '" + documents + "' ");
					sql.Append("group by i.id, i.produto_id, usuario_id, i.date, i.quantity, i.input_open, i.cpf_cnpj, i.company_id, i.note_number, i.barcode, i.price, i.price_cost, p.descricao, p.cnpj, p.custo, p.estoque, p.preco, p.unid ");
					sql.Append("order by  i.date asc");

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
								barcode = datatable.Rows[i]["BARCODE"].ToString().Trim(),
								description = datatable.Rows[i]["DESCRICAO"].ToString().Trim(),
								price = Convert.ToDecimal(datatable.Rows[i]["PRECO"].ToString().Trim()).ToString("N3"),
								quantity = Convert.ToDecimal(datatable.Rows[i]["QUANTITY"].ToString().Trim()).ToString("N3"),
								unity = datatable.Rows[i]["UNID"].ToString().Trim(),
								price_cost = Convert.ToDecimal(datatable.Rows[i]["PRICE_COST"].ToString().Trim()).ToString("N3"),
								total = Convert.ToDecimal(datatable.Rows[i]["TOTAL"].ToString().Trim()).ToString("N3"),
								input_open = Convert.ToBoolean(datatable.Rows[i]["INPUT_OPEN"].ToString().Trim()),
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
