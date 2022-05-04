using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SET3_Backend.Database;
using SET3_Backend.Models;
using FiskalizacijaService;
using Cis;
using System.Security.Cryptography.X509Certificates;

namespace SET3_Backend.Controllers
{

	[Route("api/[controller]")]
	[ApiController]
	public class FiscalizationController
	{
		private readonly Context _context;

		public FiscalizationController(Context context)
		{
			_context = context;
		}

		[HttpGet]
		public async Task<BillModel> ExecuteFiscalization(FiscalBillModel fiscalModel)
		{
			// Kreiranje računa za za fiskalizaciju
			var invoice = new RacunType()
			{
				BrRac = new BrojRacunaType()
				{
					BrOznRac = fiscalModel.BrOznRac,
					OznPosPr = fiscalModel.OznPosPr,
					OznNapUr = fiscalModel.OznNapUr
				},
				DatVrijeme = DateTime.Now.ToString(Fiscalization.DATE_FORMAT_LONG),
				IznosUkupno = fiscalModel.IznosUkupno.ToString("N2"),
				NacinPlac = NacinPlacanjaType.G,
				NakDost = false,
				Oib = fiscalModel.Oib,
				OibOper = fiscalModel.OibOper,
				OznSlijed = OznakaSlijednostiType.N,
				Pdv = new[]
				{
					new PorezType
					{
						Stopa = fiscalModel.Stopa.ToString("N2"),
						Osnovica = fiscalModel.Osnovica.ToString("N2"),
						Iznos = fiscalModel.Iznos.ToString("N2")
					}
				},
				USustPdv = true
			};

			X509Certificate2 certificate = new X509Certificate2();

			// Generiraj ZKI, potpiši, pošalji račun i provjeri potpis CIS odgovora
			RacunOdgovor response = await Fiscalization.SendInvoiceAsync(invoice, certificate);

			
			
			return null; 
		}


	}
}