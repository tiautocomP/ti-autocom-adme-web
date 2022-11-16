using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using tiautocom.transfer.objects;

namespace tiautocom.data.access
{
	public class CompanyAcessDatas
	{
		SqlCommand comandoSql = new SqlCommand();
		StringBuilder sql = new StringBuilder();
		DataTable datatable = new DataTable();

		public string CompanySave(Company company)
		{
			try
			{
				using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsCfe))
				{
					connections.Open();

					var user_id = 0;

					string pattern = @"(?i)[^0-9a-záéíóúàèìòùâêîôûãõç\s]";
					Regex regex = new Regex(pattern);

					#region PERSON

					sql.Append("insert into person (name_reason, cpf_cnpj, rg_ie, registration_date, person_type_id)");
					sql.Append(" values ");
					sql.Append("(@name_reason, @cpf_cnpj, @rg_ie, @registration_date, @person_type_id)");

					comandoSql.Parameters.AddWithValue("@name_reason", company.company_name.ToUpper());
					comandoSql.Parameters.AddWithValue("@cpf_cnpj", regex.Replace(company.cpf_cnpj, ""));
					comandoSql.Parameters.AddWithValue("@rg_ie", regex.Replace(company.rg_ie, ""));
					comandoSql.Parameters.AddWithValue("@registration_date", DateTime.Now);
					comandoSql.Parameters.AddWithValue("@person_type_id", company.person_type_id);

					comandoSql.CommandText = sql.ToString();
					comandoSql.Connection = connections;
					comandoSql.ExecuteNonQuery();

					#endregion

					try
					{
						#region PERSON ID

						comandoSql.CommandText = "select max(id) from person";

						user_id = Convert.ToInt32(comandoSql.ExecuteScalar());

						#endregion

						#region COMAPNY

						sql = new StringBuilder();
						comandoSql = new SqlCommand();

						sql.Append("insert into companys (person_id, logo, company_name, crt, phone, cell)");
						sql.Append(" values ");
						sql.Append("(@person_id, @logo, @company_name, @crt, @phone, @cell)");

						comandoSql.Parameters.AddWithValue("@person_id", user_id);
						comandoSql.Parameters.AddWithValue("@company_name", company.company_name.ToUpper());
						comandoSql.Parameters.AddWithValue("@logo", company.logo);
						comandoSql.Parameters.AddWithValue("@crt", company.crt.ToUpper());
						comandoSql.Parameters.AddWithValue("@phone", regex.Replace(company.phone, ""));
						comandoSql.Parameters.AddWithValue("@cell", regex.Replace(company.cell, ""));

						comandoSql.CommandText = sql.ToString();
						comandoSql.Connection = connections;
						comandoSql.ExecuteNonQuery();

						#endregion

						#region ANDRESS

						sql = new StringBuilder();
						comandoSql = new SqlCommand();

						sql.Append("insert into address(person_id, public_place, number, district, zip_code, city,state, complement)");
						sql.Append("values");
						sql.Append("(@person_id, @public_place, @number, @district, @zip_code, @city, @state, @complement)");

						comandoSql.Parameters.AddWithValue("@person_id", user_id);
						comandoSql.Parameters.AddWithValue("@public_place", company.public_place.ToUpper());
						comandoSql.Parameters.AddWithValue("@number", company.number);
						comandoSql.Parameters.AddWithValue("@district", company.district.ToUpper() ?? null ?? "");
						comandoSql.Parameters.AddWithValue("@zip_code", regex.Replace(company.zip_code, ""));
						comandoSql.Parameters.AddWithValue("@city", company.city.ToUpper());
						comandoSql.Parameters.AddWithValue("@state", regex.Replace(company.state, ""));
						comandoSql.Parameters.AddWithValue("@complement", company.complement.ToUpper());


						comandoSql.CommandText = sql.ToString();
						comandoSql.Connection = connections;
						comandoSql.ExecuteNonQuery();

						#endregion
					}
					catch (Exception ex)
					{
						return null;
					}
					finally
					{
						connections.Close();
					}

					return user_id.ToString();
				}
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}
	}
}
