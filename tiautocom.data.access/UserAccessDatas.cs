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
    public class UserAccessDatas
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
                using (SqlConnection connections = new SqlConnection(Connections.stringConnectionsAdme))
                {
                    connections.Open();

                    sql.Append("select p.id as person_id, p.cpf_cnpj, p.name_reason, p.registration_date as person_registration_date, p.rg_ie, ");
                    sql.Append("c.id as company_id, c.logo as company_logo, c.company_name, ");
                    sql.Append("u.active as user_active, u.date_register, u.email, u.id as user_id, u.password, u.user_name, u.date_register as user_registration_date, ");
                    sql.Append("a.city, a.complement, a.district, a.note, a.number, a.public_place, a.state, a.zip_code, ");
                    sql.Append("ut.active as user_type_active, ut.descripition, ut.id as user_type_id, ut.action_insert, ut.action_update, ut.action_delete ");
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
                        var lista = new List<Users>();

                        Encrypts encrypt = new Encrypts();

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

                            //user
                            user_id = Convert.ToInt32(datatable.Rows[0]["user_id"].ToString().Trim()),
                            user_name = datatable.Rows[0]["user_name"].ToString().Trim(),
                            password = encrypt.Encrypt(datatable.Rows[0]["password"].ToString().Trim(), pk, sk),
                            email = encrypt.Encrypt(datatable.Rows[0]["email"].ToString().Trim(), pk, sk),
                            user_active = Convert.ToBoolean(datatable.Rows[0]["user_active"].ToString()),
                            user_registration_date = Convert.ToDateTime(datatable.Rows[0]["user_registration_date"].ToString()),

                            //uer type
                            user_type_id = Convert.ToInt32(datatable.Rows[0]["user_type_id"].ToString()),
                            user_type_description = datatable.Rows[0]["descripition"].ToString().Trim(),
                            action_insert = Convert.ToBoolean(datatable.Rows[0]["action_insert"].ToString()),
                            action_update = Convert.ToBoolean(datatable.Rows[0]["action_update"].ToString()),
                            action_delete = Convert.ToBoolean(datatable.Rows[0]["action_delete"].ToString()),

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
