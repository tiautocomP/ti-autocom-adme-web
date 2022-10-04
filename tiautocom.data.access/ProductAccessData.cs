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
	public class ProductAccessData
	{
		SqlCommand comandoSql = new SqlCommand();
		StringBuilder sql = new StringBuilder();
		DataTable datatable = new DataTable();
		public List<Produtcs> GetProdutoAll(Produtcs produtcs)
		{
			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					sql.Append("select * from product where num_depar=" + produtcs.departamento_id + " order by descricao asc");

					comandoSql.CommandText = sql.ToString();
					comandoSql.Connection = connections;
					datatable.Load(comandoSql.ExecuteReader());

					if (datatable.Rows.Count > 0)
					{
						var list = new List<Produtcs>();

						for (int i = 0; i < datatable.Rows.Count; i++)
						{
							list.Add(new Produtcs
							{
								id = Convert.ToInt32(datatable.Rows[i]["COD_INT"].ToString().Trim()),
								codigo_barras = datatable.Rows[i]["COD_BARRA"].ToString().Trim(),
								departamento = datatable.Rows[i]["DEPARTAM"].ToString().Trim(),
								descricao = datatable.Rows[i]["DESCRICAO"].ToString().Trim(),
								estoque = Convert.ToDecimal(datatable.Rows[i]["ESTOQUE"].ToString().Trim()).ToString("N3"),
								preco = Convert.ToDecimal(datatable.Rows[i]["PRECO"].ToString().Trim()).ToString("N3"),
								unidade = datatable.Rows[i]["UNID"].ToString().Trim(),
								custo = Convert.ToDecimal(datatable.Rows[i]["CUSTO"].ToString().Trim()).ToString("N3"),
								trib = datatable.Rows[i]["TRIB"].ToString().Trim(),
								setor_id = Convert.ToInt32(datatable.Rows[i]["SETOR"].ToString().Trim()),
								margem = Convert.ToDecimal(datatable.Rows[i]["MARGEM"].ToString().Trim()).ToString("N3"),
								valor_pis = Convert.ToDecimal(datatable.Rows[i]["VALOR_PIS"].ToString().Trim()).ToString("N3'"),
								cst_pis = datatable.Rows[i]["CST_PIS"].ToString().Trim(),
								valor_cofins = Convert.ToDecimal(datatable.Rows[i]["VALOR_PIS"].ToString().Trim()).ToString("N3'"),
								cfop = datatable.Rows[i]["CFOP"].ToString().Trim(),
								cst_cofins = datatable.Rows[i]["CST_COFINS"].ToString().Trim(),
								origem = datatable.Rows[i]["ORIGEM_PRODUTO"].ToString().Trim().ToString(),
								icms = datatable.Rows[i]["CST_COFINS"].ToString().Trim(),
								icms_cst = datatable.Rows[i]["ICMS_CST"].ToString().Trim() ?? null ?? "0",
								ncm = datatable.Rows[i]["NCM"].ToString().Trim(),
								cest = datatable.Rows[i]["CEST"].ToString().Trim(),
								ipi = datatable.Rows[i]["IPI"].ToString().Trim(),
								ipi_cst = datatable.Rows[i]["CST_IPI"].ToString().Trim(),
								mod_bc = datatable.Rows[i]["MOD_BC"].ToString().Trim(),
								red_bc = datatable.Rows[i]["RED_BC"].ToString().Trim(),
								anp = datatable.Rows[i]["ANP"].ToString().Trim()
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
		public List<Produtcs> getproductId(int id)
		{
			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					sql.Append("select * from product where cod_int=" + id + " order by descricao asc");

					comandoSql.CommandText = sql.ToString();
					comandoSql.Connection = connections;
					datatable.Load(comandoSql.ExecuteReader());

					if (datatable.Rows.Count > 0)
					{
						var list = new List<Produtcs>();

						for (int i = 0; i < datatable.Rows.Count; i++)
						{
							list.Add(new Produtcs
							{
								id = Convert.ToInt32(datatable.Rows[i]["COD_INT"].ToString().Trim()),
								codigo_barras = datatable.Rows[i]["COD_BARRA"].ToString().Trim(),
								departamento = datatable.Rows[i]["DEPARTAM"].ToString().Trim(),
								descricao = datatable.Rows[i]["DESCRICAO"].ToString().Trim(),
								estoque = Convert.ToDecimal(datatable.Rows[i]["ESTOQUE"].ToString().Trim()).ToString("N3"),
								preco = Convert.ToDecimal(datatable.Rows[i]["PRECO"].ToString().Trim()).ToString("N3"),
								unidade = datatable.Rows[i]["UNID"].ToString().Trim(),
								custo = Convert.ToDecimal(datatable.Rows[i]["CUSTO"].ToString().Trim()).ToString("N3"),
								trib = datatable.Rows[i]["TRIB"].ToString().Trim(),
								setor_id = Convert.ToInt32(datatable.Rows[i]["SETOR"].ToString().Trim()),
								margem = Convert.ToDecimal(datatable.Rows[i]["MARGEM"].ToString().Trim()).ToString("N3"),
								valor_pis = Convert.ToDecimal(datatable.Rows[i]["VALOR_PIS"].ToString().Trim()).ToString("N3'"),
								cst_pis = datatable.Rows[i]["CST_PIS"].ToString().Trim(),
								valor_cofins = Convert.ToDecimal(datatable.Rows[i]["VALOR_PIS"].ToString().Trim()).ToString("N3'"),
								cfop = datatable.Rows[i]["CFOP"].ToString().Trim(),
								cst_cofins = datatable.Rows[i]["CST_COFINS"].ToString().Trim(),
								origem = Convert.ToInt32(datatable.Rows[i]["ORIGEM_PRODUTO"].ToString().Trim()).ToString(),
								icms = datatable.Rows[i]["CST_COFINS"].ToString().Trim(),
								icms_cst = datatable.Rows[i]["ICMS_CST"].ToString().Trim() ?? null ?? "0",
								ncm = datatable.Rows[i]["NCM"].ToString().Trim(),
								cest = datatable.Rows[i]["CEST"].ToString().Trim(),
								ipi = datatable.Rows[i]["IPI"].ToString().Trim(),
								ipi_cst = datatable.Rows[i]["CST_IPI"].ToString().Trim(),
								mod_bc = datatable.Rows[i]["MOD_BC"].ToString().Trim(),
								red_bc = datatable.Rows[i]["RED_BC"].ToString().Trim(),
								anp = datatable.Rows[i]["ANP"].ToString().Trim()
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

		public List<Produtcs> getproductsstatus(Produtcs produtcs)
		{
			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					if (Convert.ToInt32(produtcs.status) == 1)
						sql.Append("select * from product p where p.estoque > 0 and p.num_depar=" + produtcs.departamento_id + "  order by descricao asc");
					else if (Convert.ToInt32(produtcs.status) == 0)
						sql.Append("select * from product p where p.estoque = 0 and p.num_depar=" + produtcs.departamento_id + "  order by descricao asc");
					else if (Convert.ToInt32(produtcs.status) == -1)
						sql.Append("select * from product p where p.estoque < 0 and p.num_depar=" + produtcs.departamento_id + "  order by descricao asc");
					else
						sql.Append("select * from product p where p.num_depar=" + produtcs.departamento_id + "  order by descricao asc");

					comandoSql.CommandText = sql.ToString();
					comandoSql.Connection = connections;
					datatable.Load(comandoSql.ExecuteReader());

					if (datatable.Rows.Count > 0)
					{
						var list = new List<Produtcs>();

						for (int i = 0; i < datatable.Rows.Count; i++)
						{
							list.Add(new Produtcs
							{
								id = Convert.ToInt32(datatable.Rows[i]["COD_INT"].ToString().Trim()),
								codigo_barras = datatable.Rows[i]["COD_BARRA"].ToString().Trim(),
								departamento = datatable.Rows[i]["DEPARTAM"].ToString().Trim(),
								descricao = datatable.Rows[i]["DESCRICAO"].ToString().Trim(),
								estoque = Convert.ToDecimal(datatable.Rows[i]["ESTOQUE"].ToString().Trim()).ToString("N3"),
								preco = Convert.ToDecimal(datatable.Rows[i]["PRECO"].ToString().Trim()).ToString("N3"),
								unidade = datatable.Rows[i]["UNID"].ToString().Trim(),
								custo = Convert.ToDecimal(datatable.Rows[i]["CUSTO"].ToString().Trim()).ToString("N3"),
								trib = datatable.Rows[i]["TRIB"].ToString().Trim(),
								setor_id = Convert.ToInt32(datatable.Rows[i]["SETOR"].ToString().Trim()),
								margem = Convert.ToDecimal(datatable.Rows[i]["MARGEM"].ToString().Trim()).ToString("N3"),
								valor_pis = Convert.ToDecimal(datatable.Rows[i]["VALOR_PIS"].ToString().Trim()).ToString("N3'"),
								cst_pis = datatable.Rows[i]["CST_PIS"].ToString().Trim(),
								valor_cofins = Convert.ToDecimal(datatable.Rows[i]["VALOR_PIS"].ToString().Trim()).ToString("N3'"),
								cfop = datatable.Rows[i]["CFOP"].ToString().Trim(),
								cst_cofins = datatable.Rows[i]["CST_COFINS"].ToString().Trim(),
								origem = Convert.ToInt32(datatable.Rows[i]["ORIGEM_PRODUTO"].ToString().Trim()).ToString(),
								icms = datatable.Rows[i]["CST_COFINS"].ToString().Trim(),
								icms_cst = datatable.Rows[i]["ICMS_CST"].ToString().Trim() ?? null ?? "0",
								ncm = datatable.Rows[i]["NCM"].ToString().Trim(),
								cest = datatable.Rows[i]["CEST"].ToString().Trim(),
								ipi = datatable.Rows[i]["IPI"].ToString().Trim(),
								ipi_cst = datatable.Rows[i]["CST_IPI"].ToString().Trim(),
								mod_bc = datatable.Rows[i]["MOD_BC"].ToString().Trim(),
								red_bc = datatable.Rows[i]["RED_BC"].ToString().Trim(),
								anp = datatable.Rows[i]["ANP"].ToString().Trim()
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
