using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tiautocom.data.access;
using tiautocom.transfer.objects;

namespace tiautocom.business.rule
{
    public class Produtcsbusinessrule
    {
        ProductAccessData productAccessData = new ProductAccessData();

        public List<Produtcs> GetProdutoAll(Produtcs produtcs)
        {
            try
            {
                productAccessData = new ProductAccessData();
                return productAccessData.GetProdutoAll(produtcs);
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
                productAccessData = new ProductAccessData();
                return productAccessData.getproductsstatus(produtcs);
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
                productAccessData = new ProductAccessData();
                return productAccessData.getproductId(id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
	}
}
