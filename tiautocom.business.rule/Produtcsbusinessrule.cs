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

		public List<Products> GetProdutoAll(Products produtcs)
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

		public List<Products> SaveProduct(Products products)
		{
			try
			{
				productAccessData = new ProductAccessData();
				return productAccessData.SaveProduct(products);
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}

		public List<Products> UpdateProduct(Products produtcs)
		{
			try
			{
				productAccessData = new ProductAccessData();
				return productAccessData.UpdateProduct(produtcs);
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
				productAccessData = new ProductAccessData();
				return productAccessData.getproductsstatus(produtcs);
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
				productAccessData = new ProductAccessData();
				return productAccessData.getproductId(id);
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}

		public string DeleteProduct(Products products)
		{
			try
			{
				productAccessData = new ProductAccessData();
				return productAccessData.DeleteProduct(products);
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
				productAccessData = new ProductAccessData();
				return productAccessData.getproductsallDesc(produtcs);
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}
	}
}
