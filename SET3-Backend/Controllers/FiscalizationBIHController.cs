
//POPRAVITI
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Timers;
using System.Threading.Tasks;
using System.Web;
using System.Xml;
using System.Threading;
using SET3_Backend.Models;
using Tring.Fiscal.Driver;

namespace SET3_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public static class FiscalizationBIHController
    {
        public FiscalizationBIHController(Context context)
        {
            static readonly bool init = TringFiskalniPrinter
            public static int ZaglavljeId { get; set; }
            public static int BrojFiskalni { get; set; } = 0;
            public static int BrojReklamirani { get; set; } = 0;
            public static bool _reclamation { get; set; }
            public static void MakeFiscalBillXML(int zaglavljeId, bool reclamation = false)
            {
                _reclamation = reclamation;
                FileSystemWatcher watcher = new FileSystemWatcher();
                watcher.Path = "C:\\Tring\\Xml\\odgovori\\";
                watcher.NotifyFilter = NotifyFilters.LastWrite;
                watcher.Filter = "*.xml";
                watcher.Changed += new FileSystemEventHandler(OnChanged);
                watcher.EnableRaisingEvents = true;

                XmlDocument doc = new XmlDocument();
                XmlDeclaration xmlDeclaration = doc.CreateXmlDeclaration("1.0", "IBM852", null);
                XmlElement root = doc.DocumentElement;
                doc.InsertBefore(xmlDeclaration, root);

                XmlElement RacunZahtjev = doc.CreateElement(string.Empty, "RacunZahtjev", string.Empty);
                RacunZahtjev.SetAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
                RacunZahtjev.SetAttribute("xmlns:xsd", "http://www.w3.org/2001/XMLSchema");
                doc.AppendChild(RacunZahtjev);

                //treba dodaji vrstu zahtjeva
                XmlElement Brojzahtjeva = doc.CreateElement(string.Empty, "Brojzahtjeva", string.Empty);
                Brojzahtjeva.InnerText = reclamation == false ? "233" : context.Zaglavlje.Find(zaglavljeId).FiskalniRacun.ToString();
                RacunZahtjev.AppendChild(Brojzahtjeva);

            XmlElement VrstaZahtjeva = doc.CreateElement(string.Empty, "VrstaZahtjeva", string.Empty);
            VrstaZahtjeva.InnerText = reclamation == false ? "0" : "2";
            RacunZahtjev.AppendChild(VrstaZahtjeva);

            XmlElement NoviObjekat = doc.CreateElement(string.Empty, "NoviObjekat", string.Empty);
            RacunZahtjev.AppendChild(NoviObjekat);

            XmlElement StavkeRacuna = doc.CreateElement(string.Empty, "StavkeRacuna", string.Empty);
            NoviObjekat.AppendChild(StavkeRacuna);

            decimal ukupanIznos = 0;

            foreach (Stavke s in context.Stavke.Where(x => x.ZaglavljeId == zaglavljeId))
            {
                XmlElement StavkaRacuna = doc.CreateElement(string.Empty, "RacunStavka", string.Empty);
                StavkeRacuna.AppendChild(StavkaRacuna);

                XmlElement artikal = doc.CreateElement(string.Empty, "artikal", string.Empty);
                StavkaRacuna.AppendChild(artikal);

                XmlElement Sifra = doc.CreateElement(string.Empty, "Sifra", string.Empty);
                if (s.CijenovnikId != null)
                    Sifra.InnerText = s.Cjenovnik.GrupaId + "-" + s.Cjenovnik.ArtikalId;
                else
                    Sifra.InnerText = "R-" + s.RezervacijaID;
                artikal.AppendChild(Sifra);

                XmlElement Naziv1 = doc.CreateElement(string.Empty, "Naziv", string.Empty);
                if (s.CijenovnikId != null)
                    Naziv1.InnerText = s.Cjenovnik.Artikli.Naziv;
                else
                    Naziv1.InnerText = context.Projections.Find(context.Reservations.Find(s.RezervacijaID).ProjectionID).Movies.Name;
                artikal.AppendChild(Naziv1);

                XmlElement JM = doc.CreateElement(string.Empty, "JM", string.Empty);
                if (s.CijenovnikId != null)
                    JM.InnerText = Regex.Replace(s.Cjenovnik.Artikli.JedMjere, @"\s+", "");
                else
                    JM.InnerText = "kom";
                artikal.AppendChild(JM);

                XmlElement Cijena = doc.CreateElement(string.Empty, "Cijena", string.Empty);
                decimal mpc = s.Cijena;
                Cijena.InnerText = string.Format("{0:0.00}", Math.Round(mpc, 2)).Replace(",", ".");
                artikal.AppendChild(Cijena);

                XmlElement Stopa = doc.CreateElement(string.Empty, "Stopa", string.Empty);
                //"E", u sistemu PDVa, "K" je za izvog gdje se ne obračunava PDV, "A" pravna lica koja nisu u sistemu PDVa 
                Stopa.InnerText = "E";
                artikal.AppendChild(Stopa);

                XmlElement Grupa = doc.CreateElement(string.Empty, "Grupa", string.Empty);
                if (s.CijenovnikId != null)
                    Grupa.InnerText = s.Cjenovnik.Artikli.GrupaId.ToString();
                else
                    Grupa.InnerText = "0";
                artikal.AppendChild(Grupa);

                XmlElement PLU = doc.CreateElement(string.Empty, "PLU", string.Empty);
                PLU.InnerText = "2";
                artikal.AppendChild(PLU);

                XmlElement Kolicina = doc.CreateElement(string.Empty, "Kolicina", string.Empty);
                double kolicina = double.Parse(s.Kolicina.ToString());
                Kolicina.InnerText = string.Format("{0:0.000}", Math.Round(kolicina, 3)).Replace(",", "."); ;
                StavkaRacuna.AppendChild(Kolicina);

                XmlElement Rabat = doc.CreateElement(string.Empty, "Rabat", string.Empty);
                Rabat.InnerText = string.Format("{0:0.00}", 0).Replace(",", ".");
                StavkaRacuna.AppendChild(Rabat);

                ukupanIznos += s.Iznos;
            }

            XmlElement VrstePlacanja = doc.CreateElement(string.Empty, "VrstePlacanja", string.Empty);
            NoviObjekat.AppendChild(VrstePlacanja);


            XmlElement VrstaPlacanja = doc.CreateElement(string.Empty, "VrstaPlacanja", string.Empty);
            VrstePlacanja.AppendChild(VrstaPlacanja);


            XmlElement Oznaka = doc.CreateElement(string.Empty, "Oznaka", string.Empty);
            Oznaka.InnerText = "Gotovina";
            VrstaPlacanja.AppendChild(Oznaka);


            XmlElement Iznos = doc.CreateElement(string.Empty, "Iznos", string.Empty);
            Iznos.InnerText = string.Format("{0:0.00}", ukupanIznos).Replace(",", "."); ;
            VrstaPlacanja.AppendChild(Iznos);

            XmlElement Napomena = doc.CreateElement(string.Empty, "Napomena", string.Empty);
            Napomena.InnerText = "Hvala!";
            NoviObjekat.AppendChild(Napomena);


            XmlElement BrojRacuna = doc.CreateElement(string.Empty, "BrojRacuna", string.Empty);
            BrojRacuna.InnerText = z.ZaglavljeId.ToString();
            NoviObjekat.AppendChild(BrojRacuna);
            if (_reclamation == false)
                doc.Save("C:\\Tring\\Xml\\sfr.xml");
            else
                doc.Save("C:\\Tring\\Xml\\srr.xml");

            doc.Save("C:\\Tring\\Xml\\odgovori\\stvoriOdgovor.xml");

        }

        private static void OnChanged(object sender, FileSystemEventArgs e)
        {
            if (_reclamation == false)
            {
                if (File.Exists("C:\\Tring\\Xml\\odgovori\\sfr.xml"))
                {
                    XmlDocument doc1 = new XmlDocument();
                    doc1.Load("C:\\Tring\\Xml\\odgovori\\sfr.xml");
                    XmlNode node = doc1.DocumentElement.SelectSingleNode("/KasaOdgovor/Odgovori/Odgovor/Vrijednost");
                    BrojFiskalni = int.Parse(node.InnerText);

                }
            }
            else
            {
                if (File.Exists("C:\\Tring\\Xml\\odgovori\\srr.xml"))
                {
                    XmlDocument doc1 = new XmlDocument();
                    doc1.Load("C:\\Tring\\Xml\\odgovori\\srr.xml");
                    XmlNode node = doc1.DocumentElement.SelectSingleNode("/KasaOdgovor/Odgovori/Odgovor/Vrijednost");
                    BrojReklamirani = int.Parse(node.InnerText);

                    _reclamation = false;
                }
            }
        }
    }

}
