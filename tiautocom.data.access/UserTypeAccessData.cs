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

					sql.Append("select ut.Id, ut.description, ut.company_Id, ut.action_save, ut.action_update, ut.action_delete, ut.active from user_type ut ");
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
								id = Convert.ToInt32(datatable.Rows[i]["id"].ToString().Trim()),
								description = datatable.Rows[i]["description"].ToString().Trim(),
								company_Id = Convert.ToInt32(datatable.Rows[i]["company_Id"].ToString().Trim()),
								action_save = datatable.Rows[i]["action_save"].ToString().Trim(),
								action_update = datatable.Rows[i]["action_update"].ToString().Trim(),
								action_delete = datatable.Rows[i]["action_delete"].ToString().Trim(),
								active = datatable.Rows[i]["active"].ToString().Trim()
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

		public List<UserType> getUserTypeId(int id)
		{
			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					sql.Append("select ut.Id, ut.description, ut.company_Id, ut.action_save, ut.action_update, ut.action_delete, ut.active from user_type ut ");
					sql.Append($"where ut.id={id} order by ut.description asc;");

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
								id = Convert.ToInt32(datatable.Rows[i]["id"].ToString().Trim()),
								description = datatable.Rows[i]["description"].ToString().Trim(),
								company_Id = Convert.ToInt32(datatable.Rows[i]["company_Id"].ToString().Trim()),
								action_save = datatable.Rows[i]["action_save"].ToString().Trim(),
								action_update = datatable.Rows[i]["action_update"].ToString().Trim(),
								action_delete = datatable.Rows[i]["action_delete"].ToString().Trim(),
								active = datatable.Rows[i]["active"].ToString().Trim()
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

		public string saveUserType(UserType users)
		{
			try
			{
				var user_id = 0;

				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					if (Convert.ToInt32(users.id) == 0)
					{
						sql.Append("insert into user_type (description, active, action_update, action_delete, action_save, company_id)");
						sql.Append("values");
						sql.Append("(@description, @active, @action_update, @action_delete, @action_save, @company_id)");

						comandoSql.CommandText = sql.ToString();
						comandoSql.Connection = connections;

						comandoSql.Parameters.AddWithValue("@description", users.description.ToUpper());
						comandoSql.Parameters.AddWithValue("@active", true);
						comandoSql.Parameters.AddWithValue("@action_update", Convert.ToBoolean(users.action_save.Replace("1", "True").Replace("Sim", "True").Replace("0", "False").Replace("Não", "False")));
						comandoSql.Parameters.AddWithValue("@action_delete", Convert.ToBoolean(users.action_delete.Replace("1", "True").Replace("Sim", "True").Replace("0", "False").Replace("Não", "False")));
						comandoSql.Parameters.AddWithValue("@action_save", Convert.ToBoolean(users.action_update.Replace("1", "True").Replace("Sim", "True").Replace("0", "False").Replace("Não", "False")));
						comandoSql.Parameters.AddWithValue("@company_id", Convert.ToInt32(users.company_Id));
						comandoSql.ExecuteNonQuery();

						try
						{
							comandoSql.CommandText = "select max(id) FROM user_type";

							user_id = Convert.ToInt32(comandoSql.ExecuteScalar());
						}
						catch (Exception)
						{
							return null;
						}
						finally
						{
							connections.Close();
						}
					}
					else
					{
						sql.Append("update user_type set description=@description, action_update=@action_update, action_delete=@action_delete, action_save=@action_save, active=@active where id=@id");

						comandoSql.CommandText = sql.ToString();
						comandoSql.Connection = connections;

						comandoSql.Parameters.AddWithValue("@description", users.description.ToUpper());
						comandoSql.Parameters.AddWithValue("@active", Convert.ToBoolean(users.active.Replace("1", "True").Replace("Ativo", "True").Replace("0", "False").Replace("Inativo", "False")));
						comandoSql.Parameters.AddWithValue("@action_update", Convert.ToBoolean(users.action_save.Replace("1", "True").Replace("Sim", "True").Replace("0", "False").Replace("Não", "False")));
						comandoSql.Parameters.AddWithValue("@action_delete", Convert.ToBoolean(users.action_delete.Replace("1", "True").Replace("Sim", "True").Replace("0", "False").Replace("Não", "False")));
						comandoSql.Parameters.AddWithValue("@action_save", Convert.ToBoolean(users.action_update.Replace("1", "True").Replace("Sim", "True").Replace("0", "False").Replace("Não", "False")));
						comandoSql.Parameters.AddWithValue("@id", Convert.ToInt32(users.id));
						comandoSql.ExecuteNonQuery();

						try
						{
							user_id = Convert.ToInt32(-1);
						}
						catch (Exception)
						{
							return null;
						}
						finally
						{
							connections.Close();
						}
					}

					return user_id.ToString();
				}
			}
			catch (Exception ex)
			{
				return ex.Message;
			}
		}

		public bool converterBol(string valor)
		{
			if (valor == "1")
				return true;
			else
				return false;
		}
	}
}
