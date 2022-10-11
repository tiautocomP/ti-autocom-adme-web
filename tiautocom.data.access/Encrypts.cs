using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace tiautocom.data.access
{
    public class Encrypts
    {
        public string Encrypt(string text, string pk, string sk)
        {
            try
            {
                string textToEncrypt = text;
                string ToReturn = "";
                string publickey = pk;
                string secretkey = sk;
                byte[] secretkeyByte = { };
                secretkeyByte = System.Text.Encoding.UTF8.GetBytes(secretkey);
                byte[] publickeybyte = { };
                publickeybyte = System.Text.Encoding.UTF8.GetBytes(publickey);
                MemoryStream ms = null;
                CryptoStream cs = null;
                byte[] inputbyteArray = System.Text.Encoding.UTF8.GetBytes(textToEncrypt);
                using (DESCryptoServiceProvider des = new DESCryptoServiceProvider())
                {
                    ms = new MemoryStream();
                    cs = new CryptoStream(ms, des.CreateEncryptor(publickeybyte, secretkeyByte), CryptoStreamMode.Write);
                    cs.Write(inputbyteArray, 0, inputbyteArray.Length);
                    cs.FlushFinalBlock();
                    ToReturn = Convert.ToBase64String(ms.ToArray());
                }
                return ToReturn;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
        }

        public string Decrypt(string text, string pk, string sk)
        {
            try
            {
                if (text != "")
                {


                    string textToDecrypt = text;
                    string ToReturn = "";
                    string publickey = pk;
                    string secretkey = sk;
                    byte[] privatekeyByte = { };
                    privatekeyByte = System.Text.Encoding.UTF8.GetBytes(secretkey);
                    byte[] publickeybyte = { };
                    publickeybyte = System.Text.Encoding.UTF8.GetBytes(publickey);
                    MemoryStream ms = null;
                    CryptoStream cs = null;
                    byte[] inputbyteArray = new byte[textToDecrypt.Replace(" ", "+").Length];
                    inputbyteArray = Convert.FromBase64String(textToDecrypt.Replace(" ", "+"));
                    using (DESCryptoServiceProvider des = new DESCryptoServiceProvider())
                    {
                        ms = new MemoryStream();
                        cs = new CryptoStream(ms, des.CreateDecryptor(publickeybyte, privatekeyByte), CryptoStreamMode.Write);
                        cs.Write(inputbyteArray, 0, inputbyteArray.Length);
                        cs.FlushFinalBlock();
                        Encoding encoding = Encoding.UTF8;
                        ToReturn = encoding.GetString(ms.ToArray());
                    }
                    return ToReturn;
                }
				else
				{
                    return "";
				}
             
            }
            catch (Exception ae)
            {
                throw new Exception(ae.Message, ae.InnerException);
            }
        }
    }
}
