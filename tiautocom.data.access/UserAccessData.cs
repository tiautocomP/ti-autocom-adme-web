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
	public class UserAccessData
	{
		SqlCommand comandoSql = new SqlCommand();
		StringBuilder sql = new StringBuilder();
		DataTable datatable = new DataTable();

		public string pk = Connections.publickey;
		public string sk = Connections.secretkey;
		public List<Users> userlogin(Users users)
		{
			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					sql.Append("select p.id as person_id, p.cpf_cnpj, p.name_reason, p.registration_date as person_registration_date, p.rg_ie, ");
					sql.Append("c.id as company_id, c.logo as company_logo, c.company_name,  c.crt, ");
					sql.Append("u.active as user_active, u.date_register, u.email, u.id as user_id, u.password, u.user_name, u.date_register as user_registration_date, ");
					sql.Append("a.city, a.complement, a.district, a.note, a.number, a.public_place, a.state, a.zip_code, ");
					sql.Append("ut.active as user_type_active, ut.description, ut.id as user_type_id, ut.action_update, ut.action_delete, ut.action_save ");
					sql.Append("from person p ");
					sql.Append("left join companys c on p.id = c.person_id ");
					sql.Append("left join user_company uc on c.id = uc.company_id ");
					sql.Append("left join users u  on uc.user_id = u.id ");
					sql.Append("left join address a on p.id = a.person_id ");
					sql.Append("left join user_type ut on u.user_type_id = ut.id ");
					sql.Append("where u.email='" + descryptemail(users.email) + "' and u.password ='" + descryptssword(users.password) + "' and p.cpf_cnpj='" + users.cpf_cnpj + "'");

					comandoSql.CommandText = sql.ToString();
					comandoSql.Connection = connections;
					datatable.Load(comandoSql.ExecuteReader());

					if (datatable.Rows.Count > 0)
					{
						Encrypts encrypt = new Encrypts();

						var lista = new List<Users>();

						lista.Add(new Users
						{
							//person
							person_id = Convert.ToInt32(datatable.Rows[0]["person_id"].ToString().Trim()),
							cpf_cnpj = datatable.Rows[0]["cpf_cnpj"].ToString().Trim(),
							name_reason = datatable.Rows[0]["name_reason"].ToString().Trim(),
							person_registration_date = Convert.ToDateTime(datatable.Rows[0]["person_registration_date"].ToString()),
							rg_ie = datatable.Rows[0]["rg_ie"].ToString().Trim(),

							//comapny
							company_id = Convert.ToInt32(datatable.Rows[0]["company_id"].ToString()),
							company_name = datatable.Rows[0]["company_name"].ToString().Trim(),
							company_logo = datatable.Rows[0]["company_logo"].ToString().Trim(),
							crt = datatable.Rows[0]["crt"].ToString().Trim(),

							//user
							user_id = Convert.ToInt32(datatable.Rows[0]["user_id"].ToString().Trim()),
							user_name = datatable.Rows[0]["user_name"].ToString().Trim(),
							password = encrypt.Encrypt(datatable.Rows[0]["password"].ToString().Trim(), pk, sk),
							email = encrypt.Encrypt(datatable.Rows[0]["email"].ToString().Trim(), pk, sk),
							user_active = Convert.ToInt32(datatable.Rows[0]["user_active"].ToString()),
							user_registration_date = Convert.ToDateTime(datatable.Rows[0]["user_registration_date"]).ToString("dd/MM/yyyy HH:mm:ss"),

							//uer type
							user_type_id = Convert.ToInt32(datatable.Rows[0]["user_type_id"].ToString()),
							user_type_description = datatable.Rows[0]["description"].ToString().Trim(),
							action_update = Convert.ToBoolean(datatable.Rows[0]["action_update"].ToString()),
							action_delete = Convert.ToBoolean(datatable.Rows[0]["action_delete"].ToString()),
							action_save = bool.Parse(datatable.Rows[0]["action_save"].ToString()),

							//address
							city = datatable.Rows[0]["city"].ToString().Trim(),
							complement = datatable.Rows[0]["complement"].ToString().Trim(),
							district = datatable.Rows[0]["district"].ToString().Trim(),
							note = datatable.Rows[0]["note"].ToString().Trim(),
							number = datatable.Rows[0]["number"].ToString().Trim(),
							public_place = datatable.Rows[0]["public_place"].ToString().Trim(),
							state = datatable.Rows[0]["state"].ToString().Trim(),
							zip_code = datatable.Rows[0]["zip_code"].ToString().Trim(),
						});

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

		public List<Users> userSearch(string name)
		{
			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					sql.Append("select u.id as user_id, u.email, u.user_name, u.active, u.date_register, ");
					sql.Append("ut.id as id_type_user, ut.description, ut.company_id ");
					sql.Append("from users u left join user_type ut ");
					sql.Append("on u.user_type_id = ut.id ");
					sql.Append($"where u.user_name like '%' + {name} '%'");
					sql.Append("order by u.active asc");

					comandoSql.CommandText = sql.ToString();
					comandoSql.Connection = connections;
					datatable.Load(comandoSql.ExecuteReader());

					if (datatable.Rows.Count > 0)
					{
						var lista = new List<Users>();

						Encrypts encrypt = new Encrypts();

						for (int i = 0; i < datatable.Rows.Count; i++)
						{
							lista.Add(new Users
							{
								//user
								user_id = Convert.ToInt32(datatable.Rows[i]["user_id"].ToString().Trim()),
								user_name = datatable.Rows[i]["user_name"].ToString().Trim(),
								email = encrypt.Decrypt(datatable.Rows[i]["email"].ToString().Trim(), pk, sk),
								user_active = Convert.ToInt32(datatable.Rows[i]["active"].ToString()),
								user_registration_date = Convert.ToDateTime(datatable.Rows[i]["date_register"]).ToString("dd/MM/yyyy HH:mm:ss"),

								//uer type
								user_type_id = Convert.ToInt32(datatable.Rows[i]["id_type_user"].ToString()),
								user_type_description = datatable.Rows[i]["description"].ToString().Trim(),
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

		public string updateUser(Users users)
		{
			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					sql.Append("update users set email=@email, password=@password, user_name=@user_name, active=@active, user_type_id=@user_type_id where id=@id");

					comandoSql.CommandText = sql.ToString();
					comandoSql.Connection = connections;

					Encrypts encrypt = new Encrypts();

					comandoSql.Parameters.AddWithValue("@email", encrypt.Encrypt(users.email, pk, sk));
					comandoSql.Parameters.AddWithValue("@password", encrypt.Encrypt(users.password, pk, sk));
					comandoSql.Parameters.AddWithValue("@user_name", users.user_name);
					comandoSql.Parameters.AddWithValue("@user_type_id", Convert.ToInt32(users.user_type_id));
					comandoSql.Parameters.AddWithValue("@active", Convert.ToInt32(users.user_active));
					comandoSql.Parameters.AddWithValue("@id", Convert.ToInt32(users.user_id));

					comandoSql.ExecuteNonQuery();

					return "sucesso";
				}
			}
			catch (Exception ex)
			{
				return ex.Message;
			}
		}

		public List<Users> getUserId(int id)
		{
			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					sql.Append("select u.id as user_id, u.email, u.user_name, u.active, u.date_register, u.password, ");
					sql.Append("ut.id as id_type_user, ut.description, ut.company_id ");
					sql.Append("from users u left join user_type ut ");
					sql.Append("on u.user_type_id = ut.id ");
					sql.Append($"where u.id = {id} ");
					sql.Append("order by u.user_name asc");

					comandoSql.CommandText = sql.ToString();
					comandoSql.Connection = connections;
					datatable.Load(comandoSql.ExecuteReader());

					if (datatable.Rows.Count > 0)
					{
						var lista = new List<Users>();

						Encrypts encrypt = new Encrypts();

						lista.Add(new Users
						{
							//user
							user_id = Convert.ToInt32(datatable.Rows[0]["user_id"].ToString().Trim()),
							user_name = datatable.Rows[0]["user_name"].ToString().Trim(),
							email = encrypt.Decrypt(datatable.Rows[0]["email"].ToString().Trim(), pk, sk),
							user_active = Convert.ToInt32(datatable.Rows[0]["active"].ToString()),
							user_registration_date = Convert.ToDateTime(datatable.Rows[0]["date_register"]).ToString("dd/MM/yyyy HH:mm:ss"),
							password = encrypt.Decrypt(datatable.Rows[0]["password"].ToString().Trim(), pk, sk),

							//uer type
							user_type_id = Convert.ToInt32(datatable.Rows[0]["id_type_user"].ToString()),
							user_type_description = datatable.Rows[0]["description"].ToString().Trim(),
						});


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

		public List<Users> getUserAll(int company_id)
		{
			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					sql.Append("select u.id as user_id, u.email, u.user_name, u.active, u.date_register, ");
					sql.Append("ut.id as id_type_user, ut.description, ut.company_id ");
					sql.Append("from users u left join user_type ut ");
					sql.Append("on u.user_type_id = ut.id ");
					sql.Append($"where ut.company_id = {company_id} ");
					sql.Append("order by u.active asc");

					comandoSql.CommandText = sql.ToString();
					comandoSql.Connection = connections;
					datatable.Load(comandoSql.ExecuteReader());

					if (datatable.Rows.Count > 0)
					{
						var lista = new List<Users>();

						Encrypts encrypt = new Encrypts();

						for (int i = 0; i < datatable.Rows.Count; i++)
						{
							lista.Add(new Users
							{
								//user
								user_id = Convert.ToInt32(datatable.Rows[i]["user_id"].ToString().Trim()),
								user_name = datatable.Rows[i]["user_name"].ToString().Trim(),
								email = encrypt.Decrypt(datatable.Rows[i]["email"].ToString().Trim(), pk, sk),
								user_active = Convert.ToInt32(datatable.Rows[i]["active"].ToString()),
								user_registration_date = Convert.ToDateTime(datatable.Rows[i]["date_register"]).ToString("dd/MM/yyyy HH:mm:ss"),

								//uer type
								user_type_id = Convert.ToInt32(datatable.Rows[i]["id_type_user"].ToString()),
								user_type_description = datatable.Rows[i]["description"].ToString().Trim(),
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

		public string saveUserType(Users users)
		{
			try
			{
				var user_id = 0;

				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					sql.Append("insert into users (email, password, user_name, active, date_register, user_type_id)");
					sql.Append("values");
					sql.Append("(@email, @password, @user_name, @active, @date_register, @user_type_id)");

					comandoSql.CommandText = sql.ToString();
					comandoSql.Connection = connections;

					Encrypts encrypt = new Encrypts();

					comandoSql.Parameters.AddWithValue("@email", encrypt.Encrypt(users.email, pk, sk));
					comandoSql.Parameters.AddWithValue("@password", encrypt.Encrypt(users.password, pk, sk));
					comandoSql.Parameters.AddWithValue("@user_name", users.user_name.ToUpper());
					comandoSql.Parameters.AddWithValue("@active", true);
					comandoSql.Parameters.AddWithValue("@date_register", DateTime.Now);
					comandoSql.Parameters.AddWithValue("@user_type_id", users.user_type_id);
					comandoSql.ExecuteNonQuery();

					try
					{
						comandoSql.CommandText = "select max(id) FROM users";

						user_id = Convert.ToInt32(comandoSql.ExecuteScalar());

						StringBuilder sql = new StringBuilder();

						sql.Append("insert into user_company(user_id, company_id) values (@user_id, @company_id)");

						comandoSql.CommandText = sql.ToString();
						comandoSql.Connection = connections;

						comandoSql.Parameters.AddWithValue("@user_id", user_id);
						comandoSql.Parameters.AddWithValue("@company_id", users.company_id);
						comandoSql.ExecuteNonQuery();

						connections.Close();
					}
					catch (Exception)
					{
					}

					return user_id.ToString();
				}
			}
			catch (Exception ex)
			{
				return ex.Message;
			}
		}

		public string descryptemail(string email)
		{
			Encrypts encrypt = new Encrypts();

			if (email.Contains("@"))
			{
				return encrypt.Encrypt(email, pk, sk);
			}

			return email;
		}

		public string descryptssword(string password)
		{
			Encrypts encrypt = new Encrypts();

			if (password.Length < 10)
			{
				return password = encrypt.Encrypt(password, pk, sk);
			}

			return password;
		}
	}
}
