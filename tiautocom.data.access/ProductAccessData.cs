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

		public List<Products> GetProdutoAll(Products produtcs)
		{
			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					sql.Append("select * from product where num_depar=" + produtcs.num_departam + " and ativo=1 order by descricao asc");

					comandoSql.CommandText = sql.ToString();
					comandoSql.Connection = connections;
					datatable.Load(comandoSql.ExecuteReader());

					if (datatable.Rows.Count > 0)
					{
						var list = new List<Products>();

						for (int i = 0; i < datatable.Rows.Count; i++)
						{
							list.Add(new Products
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
								margem = Convert.ToDecimal(datatable.Rows[i]["MARGEM"].ToString().Trim() ?? null ?? "0").ToString("N3"),
								valor_pis = Convert.ToDecimal(datatable.Rows[i]["VALOR_PIS"].ToString().Trim() ?? null ?? "0").ToString("N3"),
								cst_pis = datatable.Rows[i]["CST_PIS"].ToString().Trim(),
								valor_cofins = Convert.ToDecimal(datatable.Rows[i]["VALOR_PIS"].ToString().Trim()).ToString("N3"),
								cfop = datatable.Rows[i]["CFOP"].ToString().Trim(),
								cst_cofins = datatable.Rows[i]["CST_COFINS"].ToString().Trim(),
								origem = datatable.Rows[i]["ORIGEM_PRODUTO"].ToString().Trim().ToString(),
								valor_icms = datatable.Rows[i]["CST_COFINS"].ToString().Trim(),
								cst_icms = datatable.Rows[i]["ICMS_CST"].ToString().Trim() ?? null ?? "0",
								ncm = datatable.Rows[i]["NCM"].ToString().Trim(),
								cest = datatable.Rows[i]["CEST"].ToString().Trim(),
								valor_ipi = datatable.Rows[i]["IPI"].ToString().Trim(),
								cst_ipi = datatable.Rows[i]["CST_IPI"].ToString().Trim(),
								mod_red_bc = datatable.Rows[i]["MOD_BC"].ToString().Trim(),
								red_bc_calc = datatable.Rows[i]["RED_BC"].ToString().Trim(),
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

		public List<Products> getproductsallDesc(Products produtcs)
		{
			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					try
					{
						int des = Convert.ToInt32(produtcs.descricao.Substring(0, 5));

						sql.Append($"select * from product where cod_barra like '%{produtcs.descricao}%' and ativo=1 order by descricao asc");
					}
					catch
					{
						sql.Append($"select * from product where descricao like '%{produtcs.descricao}%' and ativo=1 order by descricao asc");
					}

					comandoSql.CommandText = sql.ToString();
					comandoSql.Connection = connections;
					datatable.Load(comandoSql.ExecuteReader());

					if (datatable.Rows.Count > 0)
					{
						var list = new List<Products>();

						for (int i = 0; i < datatable.Rows.Count; i++)
						{
							list.Add(new Products
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
								margem = Convert.ToDecimal(datatable.Rows[i]["MARGEM"].ToString().Trim() ?? null ?? "0").ToString("N3"),
								valor_pis = Convert.ToDecimal(datatable.Rows[i]["VALOR_PIS"].ToString().Trim() ?? null ?? "0").ToString("N3"),
								cst_pis = datatable.Rows[i]["CST_PIS"].ToString().Trim(),
								valor_cofins = Convert.ToDecimal(datatable.Rows[i]["VALOR_PIS"].ToString().Trim()).ToString("N3"),
								cfop = datatable.Rows[i]["CFOP"].ToString().Trim(),
								cst_cofins = datatable.Rows[i]["CST_COFINS"].ToString().Trim(),
								origem = datatable.Rows[i]["ORIGEM_PRODUTO"].ToString().Trim().ToString(),
								valor_icms = datatable.Rows[i]["CST_COFINS"].ToString().Trim(),
								cst_icms = datatable.Rows[i]["ICMS_CST"].ToString().Trim() ?? null ?? "0",
								ncm = datatable.Rows[i]["NCM"].ToString().Trim(),
								cest = datatable.Rows[i]["CEST"].ToString().Trim(),
								valor_ipi = datatable.Rows[i]["IPI"].ToString().Trim(),
								cst_ipi = datatable.Rows[i]["CST_IPI"].ToString().Trim(),
								mod_red_bc = datatable.Rows[i]["MOD_BC"].ToString().Trim(),
								red_bc_calc = datatable.Rows[i]["RED_BC"].ToString().Trim(),
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

		public string DeleteProduct(Products products)
		{
			using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
			{
				connections.Open();

				#region pesquisar produto id

				int id = products.id;

				sql.Append($"select * from product where cod_int={products.id} and cnpj={products.cnpj}");

				comandoSql.CommandText = sql.ToString();
				comandoSql.Connection = connections;
				datatable.Load(comandoSql.ExecuteReader());

				if (datatable.Rows.Count > 0)
				{
					products = new Products();

					try
					{
						int i = 0;

						products.id = Convert.ToInt32(datatable.Rows[i]["COD_INT"].ToString().Trim());
						products.codigo_barras = datatable.Rows[i]["COD_BARRA"].ToString().Trim();
						products.departamento = datatable.Rows[i]["DEPARTAM"].ToString().Trim();
						products.descricao = datatable.Rows[i]["DESCRICAO"].ToString().Trim();
						products.estoque = Convert.ToDecimal(datatable.Rows[i]["ESTOQUE"].ToString().Trim()).ToString("N3").Replace(".", "").Replace(",", ".");
						products.preco = Convert.ToDecimal(datatable.Rows[i]["PRECO"].ToString().Trim()).ToString("N3").Replace(".", "").Replace(",", ".");
						products.unidade = datatable.Rows[i]["UNID"].ToString().Trim();
						products.custo = Convert.ToDecimal(datatable.Rows[i]["CUSTO"].ToString().Trim()).ToString("N3").Replace(".", "").Replace(",", ".");
						products.trib = datatable.Rows[i]["TRIB"].ToString().Trim();
						products.setor_id = Convert.ToInt32(datatable.Rows[i]["SETOR"].ToString().Trim());
						products.margem = Convert.ToDecimal(datatable.Rows[i]["MARGEM"].ToString().Trim() ?? null ?? "0").ToString("N3").Replace(",", ".");
						products.valor_pis = Convert.ToDecimal(datatable.Rows[i]["VALOR_PIS"].ToString().Trim() ?? null ?? "0").ToString("N3").Replace(",", ".");
						products.cst_pis = datatable.Rows[i]["CST_PIS"].ToString().Trim();
						products.valor_cofins = Convert.ToDecimal(datatable.Rows[i]["VALOR_PIS"].ToString().Trim()).ToString("N3").Replace(",", ".");
						products.cfop = datatable.Rows[i]["CFOP"].ToString().Trim();
						products.cst_cofins = datatable.Rows[i]["CST_COFINS"].ToString().Trim();
						products.origem = datatable.Rows[i]["ORIGEM_PRODUTO"].ToString().Trim().ToString();
						products.valor_icms = datatable.Rows[i]["CST_COFINS"].ToString().Trim();
						products.cst_icms = datatable.Rows[i]["ICMS_CST"].ToString().Trim() ?? null ?? "0";
						products.ncm = datatable.Rows[i]["NCM"].ToString().Trim();
						products.cest = datatable.Rows[i]["CEST"].ToString().Trim();
						products.valor_ipi = Convert.ToDecimal(datatable.Rows[i]["IPI"].ToString().Trim()).ToString("N2");
						products.cst_ipi = datatable.Rows[i]["CST_IPI"].ToString().Trim();
						products.mod_red_bc = datatable.Rows[i]["MOD_BC"].ToString().Trim();
						products.red_bc_calc = datatable.Rows[i]["RED_BC"].ToString().Trim();
						products.anp = datatable.Rows[i]["ANP"].ToString().Trim();
						products.news = 3;
					}
					catch
					{
						return null;
					}

					#region insert into produto

					try
					{
						sql = new StringBuilder();
						comandoSql = new SqlCommand();

						sql.Append($"update product set cod_barra='{products.codigo_barras}', ");
						sql.Append($"departam='{products.departamento}', ");
						sql.Append($"descricao='{products.descricao}', ");
						sql.Append($"estoque={products.estoque}, ");
						sql.Append($"preco={products.preco}, ");
						sql.Append($"unid='{products.unidade}', ");
						sql.Append($"custo={products.custo}, ");
						sql.Append($"trib='{products.trib}', ");
						sql.Append($"setor={products.setor_id}, ");
						sql.Append($"margem={products.margem}, ");
						sql.Append($"valor_pis={products.valor_pis}, ");
						sql.Append($"cst_pis={products.cst_pis}, ");
						sql.Append($"valor_confins={products.valor_cofins}, ");
						sql.Append($"cfop={products.cfop}, ");
						sql.Append($"cst_cofins={products.cst_cofins}, ");
						sql.Append($"origem_produto='{products.origem}', ");
						sql.Append($"icms_cst={products.cst_icms}, ");
						sql.Append($"icms={products.valor_icms}, ");
						sql.Append($"ncm={products.ncm}, ");
						sql.Append($"cest={products.cest}, ");
						sql.Append($"cst_ipi='{products.cst_ipi}', ");
						sql.Append($"ipi='{products.valor_ipi}', ");
						sql.Append($"mod_bc='{products.mod_red_bc}', ");
						sql.Append($"red_bc='{products.red_bc_calc}', ");
						sql.Append($"anp='{products.anp}', ");
						sql.Append($"ativo=0, new={products.news} where cod_int={id}");

						comandoSql.CommandText = sql.ToString();
						comandoSql.Connection = connections;
						comandoSql.ExecuteNonQuery();
					}
					catch
					{
						return null;
					}

					#endregion
				}
				#endregion

				return "{\"id\":\"1\"}";
			}
		}

		public List<Products> SaveProduct(Products products)
		{
			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					List<Products> list = new List<Products>();

					var id_product = 0;

					sql.Append("insert into product (cnpj, cod_barra, num_depar, departam, descricao, estoque, preco, unid, custo, trib, [desc], est_min, granel, desc_auto, qtde_desc, validade, margem, setor, vencimento, dt_ajuste, valor_pis, cst_pis, valor_confins, cfop, cst_cofins, origem_produto, icms, icms_cst, ncm, cest, ipi, cst_ipi, mod_bc, red_bc, anp, new, ativo)");
					sql.Append(" values ");
					sql.Append("(@cnpj, @cod_barra, @num_depar, @departam, @descricao, @estoque, @preco, @unid, @custo, @trib, @desc, @est_min, @granel, @desc_auto, @qtde_desc, @validade, @margem, @setor, @vencimento, @dt_ajuste, @valor_pis, @cst_pis, @valor_confins, @cfop, @cst_cofins, @origem_produto, @icms, @icms_cst, @ncm, @cest, @ipi, @cst_ipi, @mod_bc, @red_bc, @anp, @new, @ativo)");

					comandoSql.Parameters.AddWithValue("@cnpj", products.cnpj);
					comandoSql.Parameters.AddWithValue("@cod_barra", products.codigo_barras.PadLeft(13, '0'));
					comandoSql.Parameters.AddWithValue("@num_depar", products.num_departam);
					comandoSql.Parameters.AddWithValue("@departam", products.departamento);
					comandoSql.Parameters.AddWithValue("@descricao", products.descricao.ToUpper());
					comandoSql.Parameters.AddWithValue("@estoque", decimal.Parse(products.estoque));
					comandoSql.Parameters.AddWithValue("@preco", decimal.Parse(products.preco));
					comandoSql.Parameters.AddWithValue("@unid", products.unidade.ToUpper());
					comandoSql.Parameters.AddWithValue("@custo", float.Parse(products.custo));
					comandoSql.Parameters.AddWithValue("@trib", products.trib);
					comandoSql.Parameters.AddWithValue("@desc", float.Parse(products.desc));
					comandoSql.Parameters.AddWithValue("@est_min", float.Parse(products.estoque_min ?? null ?? "0"));
					comandoSql.Parameters.AddWithValue("@granel", products.granel);
					comandoSql.Parameters.AddWithValue("@desc_auto", products.desc_automatico);
					comandoSql.Parameters.AddWithValue("@qtde_desc", products.qtde_desconto);
					comandoSql.Parameters.AddWithValue("@setor", Convert.ToInt32(products.setor_id));
					comandoSql.Parameters.AddWithValue("@validade", products.validade);
					comandoSql.Parameters.AddWithValue("@margem", products.margem);
					comandoSql.Parameters.AddWithValue("@vencimento", "");
					comandoSql.Parameters.AddWithValue("@dt_ajuste", DateTime.Now);
					comandoSql.Parameters.AddWithValue("@valor_pis", products.valor_pis);
					comandoSql.Parameters.AddWithValue("@cst_pis", products.cst_pis);
					comandoSql.Parameters.AddWithValue("@valor_confins", products.valor_cofins);
					comandoSql.Parameters.AddWithValue("@cfop", products.cfop);
					comandoSql.Parameters.AddWithValue("@cst_cofins", products.cst_cofins);
					comandoSql.Parameters.AddWithValue("@origem_produto", products.origem);
					comandoSql.Parameters.AddWithValue("@icms", products.valor_icms);
					comandoSql.Parameters.AddWithValue("@icms_cst", products.cst_icms);
					comandoSql.Parameters.AddWithValue("@ncm", products.ncm);
					comandoSql.Parameters.AddWithValue("@cest", products.cest);
					comandoSql.Parameters.AddWithValue("@ipi", float.Parse(products.valor_ipi));
					comandoSql.Parameters.AddWithValue("@cst_ipi", products.cst_ipi);
					comandoSql.Parameters.AddWithValue("@mod_bc", int.Parse(products.mod_red_bc));
					comandoSql.Parameters.AddWithValue("@red_bc", int.Parse(products.red_bc_calc.Replace(",", "")));
					comandoSql.Parameters.AddWithValue("@anp", products.anp);
					comandoSql.Parameters.AddWithValue("@new", 0);
					comandoSql.Parameters.AddWithValue("@ativo", 1);

					try
					{
						connections.Open();
						comandoSql.CommandText = sql.ToString();
						comandoSql.Connection = connections;
						comandoSql.ExecuteNonQuery();

						comandoSql.CommandText = "select max(cod_int) FROM product";

						id_product = Convert.ToInt32(comandoSql.ExecuteScalar());

						if (id_product > 0)
						{
							list.Add(new Products
							{
								id = products.id,
								cnpj = products.cnpj.Trim(),
								codigo_barras = products.codigo_barras.Trim(),
								num_departam = products.num_departam,
								departamento = products.departamento.Trim(),
								descricao = products.descricao.Trim(),
								estoque = Convert.ToDecimal(products.estoque).ToString("N3"),
								preco = Convert.ToDecimal(products.preco).ToString("N3"),
								unidade = products.unidade.Trim(),
								custo = Convert.ToDecimal(products.custo).ToString("N3"),
								trib = products.trib.Trim(),
								setor_id = Convert.ToInt32(products.setor_id),
								margem = Convert.ToDecimal(products.margem).ToString("N3"),
								valor_pis = Convert.ToDecimal(products.valor_pis).ToString("N3'"),
								cst_pis = products.cst_pis.Trim(),
								valor_cofins = Convert.ToDecimal(products.valor_cofins).ToString("N3'"),
								cfop = products.cfop.Trim(),
								cst_cofins = products.cst_cofins.Trim(),
								origem = Convert.ToInt32(products.origem).ToString(),
								valor_icms = products.valor_icms.Trim(),
								cst_icms = products.cst_icms.Trim() ?? null ?? "0",
								ncm = products.ncm.Trim(),
								cest = products.cest.Trim(),
								valor_ipi = products.valor_ipi.Trim(),
								cst_ipi = products.cst_ipi.Trim(),
								mod_red_bc = products.mod_red_bc.Trim(),
								red_bc_calc = products.red_bc_calc.Trim(),
								anp = products.anp.Trim(),
							});
						}
					}
					catch (Exception ex)
					{
						return null;
					}
					finally
					{
						connections.Close();
					}

					return list;
				}
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}
		public List<Products> getproductId(int id)
		{
			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					sql.Append("select cod_int, cnpj, cod_barra, num_depar, departam, descricao, estoque, preco, unid, custo, trib, [desc], est_min, granel, desc_auto, qtde_desc, validade, margem, setor, vencimento, dt_ajuste, valor_pis, cst_pis, valor_confins, cfop, cst_cofins, origem_produto, icms, icms_cst, ncm, cest, ipi, cst_ipi, mod_bc, IsNull(red_bc,0) as red_bc, anp, new, custo_cx, IsNull(icms,0) as valor_icms from product where cod_int=" + id + " order by descricao asc");

					comandoSql.CommandText = sql.ToString();
					comandoSql.Connection = connections;
					datatable.Load(comandoSql.ExecuteReader());

					if (datatable.Rows.Count > 0)
					{
						var list = new List<Products>();

						for (int i = 0; i < datatable.Rows.Count; i++)
						{
							list.Add(new Products
							{
								id = Convert.ToInt32(datatable.Rows[i]["COD_INT"].ToString().Trim()),
								codigo_barras = datatable.Rows[i]["COD_BARRA"].ToString().Trim(),
								num_departam = int.Parse(datatable.Rows[i]["NUM_DEPAR"].ToString()),
								departamento = datatable.Rows[i]["DEPARTAM"].ToString().Trim(),
								descricao = datatable.Rows[i]["DESCRICAO"].ToString().Trim(),
								estoque = Convert.ToDecimal(datatable.Rows[i]["ESTOQUE"].ToString().Trim()).ToString("N3"),
								preco = Convert.ToDecimal(datatable.Rows[i]["PRECO"].ToString().Trim()).ToString("N3"),
								unidade = datatable.Rows[i]["UNID"].ToString().Trim(),
								custo = Convert.ToDecimal(datatable.Rows[i]["CUSTO"].ToString().Trim()).ToString("N3"),
								trib = datatable.Rows[i]["TRIB"].ToString().Trim(),
								setor_id = Convert.ToInt32(datatable.Rows[i]["SETOR"].ToString().Trim()),
								margem = Convert.ToDecimal(datatable.Rows[i]["MARGEM"].ToString().Trim()).ToString("N3"),
								valor_pis = Convert.ToDecimal(datatable.Rows[i]["VALOR_PIS"].ToString().Trim()).ToString("N2"),
								cst_pis = datatable.Rows[i]["CST_PIS"].ToString().Trim(),
								valor_cofins = Convert.ToDecimal(datatable.Rows[i]["VALOR_PIS"].ToString().Trim()).ToString("N2"),
								cfop = datatable.Rows[i]["CFOP"].ToString().Trim(),
								cst_cofins = datatable.Rows[i]["CST_COFINS"].ToString().Trim(),
								origem = Convert.ToInt32(datatable.Rows[i]["ORIGEM_PRODUTO"].ToString().Trim()).ToString(),
								valor_icms = datatable.Rows[i]["VALOR_ICMS"].ToString().Trim(),
								cst_icms = datatable.Rows[i]["ICMS_CST"].ToString().Trim() ?? null ?? "0",
								ncm = datatable.Rows[i]["NCM"].ToString().Trim(),
								cest = datatable.Rows[i]["CEST"].ToString().Trim(),
								valor_ipi = Convert.ToDecimal(datatable.Rows[i]["IPI"].ToString().Trim()).ToString("N2"),
								cst_ipi = datatable.Rows[i]["CST_IPI"].ToString().Trim(),
								mod_red_bc = datatable.Rows[i]["MOD_BC"].ToString().Trim(),
								red_bc_calc = datatable.Rows[i]["RED_BC"].ToString().Trim().Replace(" ", "0,00") ?? null ?? "0,00",
								anp = datatable.Rows[i]["ANP"].ToString().Trim(),
								validade = datatable.Rows[i]["VALIDADE"].ToString().Trim().PadLeft(3, '0'),
								desc_automatico = bool.Parse(datatable.Rows[i]["DESC_AUTO"].ToString().Trim()),
								granel = datatable.Rows[i]["GRANEL"].ToString().Trim() ?? null ?? "",
								estoque_min = decimal.Parse(datatable.Rows[i]["EST_MIN"].ToString().Trim()).ToString("N2"),
								custo_caixa = datatable.Rows[i]["CUSTO_CX"].ToString().Trim().Replace(" ", "0,00").Replace("null", "0") ?? null ?? "0,00",
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

		public List<Products> getproductsstatus(Products produtcs)
		{
			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					if (Convert.ToInt32(produtcs.status) == 1)
						sql.Append("select * from product p where p.estoque > 0 and p.num_depar=" + produtcs.num_departam + "  order by descricao asc");
					else if (Convert.ToInt32(produtcs.status) == 0)
						sql.Append("select * from product p where p.estoque = 0 and p.num_depar=" + produtcs.num_departam + "  order by descricao asc");
					else if (Convert.ToInt32(produtcs.status) == -1)
						sql.Append("select * from product p where p.estoque < 0 and p.num_depar=" + produtcs.num_departam + "  order by descricao asc");
					else
						sql.Append("select * from product p where p.num_depar=" + produtcs.num_departam + "  order by descricao asc");

					comandoSql.CommandText = sql.ToString();
					comandoSql.Connection = connections;
					datatable.Load(comandoSql.ExecuteReader());

					if (datatable.Rows.Count > 0)
					{
						var list = new List<Products>();

						for (int i = 0; i < datatable.Rows.Count; i++)
						{
							list.Add(new Products
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
								valor_icms = datatable.Rows[i]["CST_COFINS"].ToString().Trim(),
								cst_icms = datatable.Rows[i]["ICMS_CST"].ToString().Trim() ?? null ?? "0",
								ncm = datatable.Rows[i]["NCM"].ToString().Trim(),
								cest = datatable.Rows[i]["CEST"].ToString().Trim(),
								valor_ipi = datatable.Rows[i]["IPI"].ToString().Trim(),
								cst_ipi = datatable.Rows[i]["CST_IPI"].ToString().Trim(),
								mod_red_bc = datatable.Rows[i]["MOD_BC"].ToString().Trim(),
								red_bc_calc = datatable.Rows[i]["RED_BC"].ToString().Trim(),
								anp = datatable.Rows[i]["ANP"].ToString().Trim(),
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

		public List<Products> UpdateProduct(Products products)
		{
			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					List<Products> list = new List<Products>();

					sql.Append("update product set cod_barra=@cod_barra, num_depar=@num_depar, departam=@departam, descricao=@descricao, preco=@preco, ");
					sql.Append("unid=@unid, custo=@custo, trib=@trib, [desc]=@desc, est_min=@est_min, granel=@granel, desc_auto=@desc_auto, qtde_desc=@qtde_desc, setor=@setor, validade=@validade, margem=@margem, ");
					sql.Append("vencimento=@vencimento, valor_pis=@valor_pis, cst_pis=@cst_pis, valor_confins=@valor_confins, cfop=@cfop, cst_cofins=@cst_cofins, origem_produto=@origem_produto, icms=@icms, ");
					sql.Append("icms_cst=@icms_cst, ncm=@ncm, cest=@cest, ipi=@ipi, cst_ipi=@cst_ipi, mod_bc=@mod_bc, red_bc=@red_bc, anp=@anp, new=@new, custo_cx=@custo_cx ");
					sql.Append($"where cod_int={products.id}");

					comandoSql.Parameters.AddWithValue("@cod_barra", products.codigo_barras.PadLeft(13, '0'));
					comandoSql.Parameters.AddWithValue("@num_depar", products.num_departam);
					comandoSql.Parameters.AddWithValue("@departam", products.departamento);
					comandoSql.Parameters.AddWithValue("@descricao", products.descricao.ToUpper());
					comandoSql.Parameters.AddWithValue("@preco", decimal.Parse(products.preco));
					comandoSql.Parameters.AddWithValue("@unid", products.unidade.ToUpper());
					comandoSql.Parameters.AddWithValue("@custo", float.Parse(products.custo));
					comandoSql.Parameters.AddWithValue("@trib", products.trib);
					comandoSql.Parameters.AddWithValue("@desc", float.Parse(products.desc));
					comandoSql.Parameters.AddWithValue("@est_min", float.Parse(products.estoque_min ?? null ?? "0,00"));
					comandoSql.Parameters.AddWithValue("@granel", products.granel);
					comandoSql.Parameters.AddWithValue("@desc_auto", Convert.ToBoolean(products.desc_automatico));
					comandoSql.Parameters.AddWithValue("@qtde_desc", Convert.ToDecimal(products.qtde_desconto));
					comandoSql.Parameters.AddWithValue("@setor", Convert.ToInt32(products.setor_id));
					comandoSql.Parameters.AddWithValue("@validade", products.validade);
					comandoSql.Parameters.AddWithValue("@margem", products.margem);
					comandoSql.Parameters.AddWithValue("@vencimento", "");
					comandoSql.Parameters.AddWithValue("@valor_pis", Convert.ToDecimal(products.valor_pis).ToString("N2"));
					comandoSql.Parameters.AddWithValue("@cst_pis", products.cst_pis);
					comandoSql.Parameters.AddWithValue("@valor_confins", Convert.ToDecimal(products.valor_cofins).ToString("N2"));
					comandoSql.Parameters.AddWithValue("@cfop", products.cfop);
					comandoSql.Parameters.AddWithValue("@cst_cofins", products.cst_cofins);
					comandoSql.Parameters.AddWithValue("@origem_produto", products.origem);
					comandoSql.Parameters.AddWithValue("@icms", Convert.ToDecimal(products.valor_icms).ToString("N2"));
					comandoSql.Parameters.AddWithValue("@icms_cst", products.cst_icms);
					comandoSql.Parameters.AddWithValue("@ncm", products.ncm);
					comandoSql.Parameters.AddWithValue("@cest", products.cest);
					comandoSql.Parameters.AddWithValue("@ipi", float.Parse(products.valor_ipi));
					comandoSql.Parameters.AddWithValue("@cst_ipi", products.cst_ipi);
					comandoSql.Parameters.AddWithValue("@mod_bc", int.Parse(products.mod_red_bc));
					comandoSql.Parameters.AddWithValue("@red_bc", int.Parse(products.red_bc_calc.Replace(",", "")));
					comandoSql.Parameters.AddWithValue("@anp", products.anp);
					comandoSql.Parameters.AddWithValue("@new", 2);
					comandoSql.Parameters.AddWithValue("@custo_cx", float.Parse(products.custo_caixa));

					try
					{
						connections.Open();
						comandoSql.CommandText = sql.ToString();
						comandoSql.Connection = connections;
						comandoSql.ExecuteNonQuery();

						if (products.id > 0)
						{
							list.Add(new Products
							{
								id = products.id,
								cnpj = products.cnpj.Trim(),
								codigo_barras = products.codigo_barras.Trim(),
								num_departam = products.num_departam,
								departamento = products.departamento.Trim(),
								descricao = products.descricao.Trim(),
								estoque = Convert.ToDecimal(products.estoque).ToString("N3"),
								preco = Convert.ToDecimal(products.preco).ToString("N3"),
								unidade = products.unidade.Trim(),
								custo = Convert.ToDecimal(products.custo).ToString("N3"),
								trib = products.trib.Trim(),
								setor_id = Convert.ToInt32(products.setor_id),
								margem = Convert.ToDecimal(products.margem).ToString("N3"),
								valor_pis = Convert.ToDecimal(products.valor_pis).ToString("N2'"),
								cst_pis = products.cst_pis.Trim(),
								valor_cofins = Convert.ToDecimal(products.valor_cofins).ToString("N2"),
								cfop = products.cfop.Trim(),
								cst_cofins = products.cst_cofins.Trim(),
								origem = Convert.ToInt32(products.origem).ToString(),
								valor_icms = Convert.ToDecimal(products.valor_icms).ToString("N2"),
								cst_icms = products.cst_icms.Trim() ?? null ?? "0",
								ncm = products.ncm.Trim(),
								cest = products.cest.Trim(),
								valor_ipi = products.valor_ipi.Trim(),
								cst_ipi = products.cst_ipi.Trim(),
								mod_red_bc = products.mod_red_bc.Trim(),
								red_bc_calc = products.red_bc_calc.Trim(),
								anp = products.anp.Trim(),
								news = products.news
							});
						}
					}
					catch (Exception ex)
					{
						return null;
					}
					finally
					{
						connections.Close();
					}

					return list;
				}
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}
	}
}
