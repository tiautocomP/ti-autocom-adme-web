using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using tiautocom.data.access;
using tiautocom.transfer.objects;

namespace tiautocom.business.rule
{
	public class InputBusinessRule
	{
		InputAccessData inputAccessData;
		public string postproductInput(Inputs inputs)
		{
			try
			{
				inputAccessData = new InputAccessData();
				return inputAccessData.postproductInput(inputs);
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}

		public List<Inputs> getInformations(string documents)
		{
			throw new NotImplementedException();
		}

		public List<Inputs> getProductsInput(Inputs inputs)
		{
			try
			{
				inputAccessData = new InputAccessData();
				return inputAccessData.getProductsInput(inputs);
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}

		public List<Inputs> getProductsInputId(int id)
		{
			try
			{
				inputAccessData = new InputAccessData();
				return inputAccessData.getProductsInputId(id);
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}

		public List<Inputs> productsInputUpdate(Inputs inputs)
		{
			try
			{
				inputAccessData = new InputAccessData();
				return inputAccessData.productsInputUpdate(inputs);
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}

		public string InputDeleteId(Products products)
		{
			try
			{
				inputAccessData = new InputAccessData();
				return inputAccessData.InputDeleteId(products);
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}

		public string ImportInput(Inputs inputs)
		{
			try
			{
				inputAccessData = new InputAccessData();
				return inputAccessData.ImportInput(inputs);
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}
	}
}
