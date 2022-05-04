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
using System.Globalization;


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
		public async Task<BillModel> ExecuteFiscalization(BillModel billModel)
		{

			FiscalBillModel fiscalModel = new FiscalBillModel(
				new Zaglavlje(billModel.BillInfo.Number, DateTime.Now),
				new Racun(
					"12345678910",
					true,
					DateTime.Now,
					OznakaSlijednostiType.N.ToString(),
					new BrRac(
						"1",
						"1",
						"1"
					),
					new List<Porez>(),
					billModel.BillItems.Select(el => el.Quantity * el.UnitPrice).Sum(),
					NacinPlacanjaType.G.ToString(),
					"12345678910",
					"225883"
				),
				"jib ovdje ide"
			);
			// Kreiranje računa za za fiskalizaciju
			var invoice = new RacunType()
			{
				BrRac = new BrojRacunaType()
				{
					BrOznRac = fiscalModel.Racun.brojRacuna.BrOznRac,
					OznPosPr = fiscalModel.Racun.brojRacuna.OznPosPr,
					OznNapUr = fiscalModel.Racun.brojRacuna.OznNapUr
				},
				DatVrijeme = DateTime.Now.ToString(Fiscalization.DATE_FORMAT_LONG),
				IznosUkupno = fiscalModel.Racun.IznosUkupno.ToString("N2", CultureInfo.InvariantCulture),
				NacinPlac = NacinPlacanjaType.G,
				NakDost = false,
				Oib = fiscalModel.Racun.OIB,
				OibOper = fiscalModel.Racun.OibOper,
				OznSlijed = OznakaSlijednostiType.N,
				Pdv = fiscalModel.Racun.pDV.Select(porez => new PorezType
				{
					Stopa = porez.Stopa.ToString("N2", CultureInfo.InvariantCulture),
					Osnovica = porez.Osnovica.ToString("N2", CultureInfo.InvariantCulture),
					Iznos = porez.Iznos.ToString("N2", CultureInfo.InvariantCulture)
				}).ToArray(),
				USustPdv = true
			};

			Byte[] cerFileRead = await File.ReadAllBytesAsync(@"..\\Connected Services\\FiskalizacijaService\\cis\\demo2020_sub_ca.cer");

			X509Certificate2 certificate = new X509Certificate2(cerFileRead);

			// Generiraj ZKI, potpiši, pošalji račun i provjeri potpis CIS odgovora
			RacunOdgovor response = await Fiscalization.SendInvoiceAsync(invoice, certificate);

			//u bazu
			await _context.FiscalBillModels.AddAsync(fiscalModel);

			//return onaj objekat
			/*
			return new BillModel(
				new BillInfo(
						"",
						DateTime.Now.ToString(Fiscalization.DATE_FORMAT_LONG),
						"",
						"",
						""
					),
					null,
					new BillSupplier("", "", "")
			);
			*/
			return billModel;
		}


	}
}