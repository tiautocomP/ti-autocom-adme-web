using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace tiautocom.data.access
{
    public class Connections
    {
        public static string adme = ConfigurationManager.ConnectionStrings["stringConnections"].ToString();
        public static string cfe = ConfigurationManager.ConnectionStrings["stringConnectionsCFe"].ToString();

        //Método acessor de leitura da String de Conexão.
        public static string stringConnectionsAdme
        {
            get { return adme; }
        }

        //Método acessor de leitura da String de Conexão.
        public static string stringConnectionsCfe
        {
            get { return cfe; }
        }

        public static string publickey
        {
            get { return "12345678"; }
        }
        public static string secretkey
        {
            get { return "87654321"; }
        }
    }
}
