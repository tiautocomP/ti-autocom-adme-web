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
	}
}
