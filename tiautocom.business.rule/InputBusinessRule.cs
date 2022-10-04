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

		public List<Inputs> getProductsInput(string documents)
		{
			try
			{
				inputAccessData = new InputAccessData();
				return inputAccessData.getProductsInput(documents);
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

		public string InputDeleteId(int id)
		{
			try
			{
				inputAccessData = new InputAccessData();
				return inputAccessData.InputDeleteId(id);
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}

		public string ImportInput()
		{
			try
			{
				inputAccessData = new InputAccessData();
				return inputAccessData.ImportInput();
			}
			catch (Exception ex)
			{
				throw new Exception(ex.Message);
			}
		}
	}
}
