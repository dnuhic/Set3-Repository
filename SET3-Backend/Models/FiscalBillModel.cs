namespace SET3_Backend.Models
{

        public class Zaglavlje
        {
            public String IdPoruke { get; set; }
            public DateTime DatumVrijeme { get; set; }

            public Zaglavlje (String idporuke, DateTime datumivrijemeslanja)
            {
                IdPoruke = idporuke;
                DatumVrijeme = datumivrijemeslanja;
            }
        }
        public class BrRac
        {
            public String BrOznRac { get; set; }
            public String OznPosPr { get; set; }
            public String OznNapUr { get; set; }
            public BrRac (String broznrac, String oznpospr, String oznnapur)
            {
                BrOznRac = broznrac;   
                OznPosPr = oznpospr;
                OznNapUr = oznnapur;
            }
        }
        public class Porez
        {
            public double Stopa { get; set; }
            public double Osnovica { get; set; }
            public double Iznos { get; set; }
            public Porez (double poreznastopa, double osnovica, double iznosporeza)
            {
                Stopa = poreznastopa;
                Osnovica = osnovica;
                Iznos = iznosporeza;
            }
        }
        public class Racun
        {
            public String OIB { get; set; }
            public Boolean? USustPdv { get; set; }
            public DateTime DatVrijeme { get; set; }
            public String OznSlijed { get; set; }
            public BrRac brojRacuna { get; set; }
            public List<Porez> pDV { get; set; }
            public double IznosUkupno { get; set; }
            public String NacinPlac { get; set; }
            public String OibOper { get; set; }
            public String ZastKod { get; set; }
            public Racun (String oib, Boolean usustavupdv, DateTime datumivrijemeizdavanja, String oznakaslijednosti, BrRac brojracuna, List<Porez> pdv, double iznosukupno, String nacinplacanja, String oiboper, String zastkod)
            {
                OIB = oib;
                USustPdv = usustavupdv;
                DatVrijeme = datumivrijemeizdavanja;
                OznSlijed = oznakaslijednosti;
                brojRacuna = brojracuna;
                pDV = pdv;
                IznosUkupno = iznosukupno;
                NacinPlac = nacinplacanja;
                OibOper = oiboper; 
                ZastKod = zastkod;
            }
        }
         public class FiscalBillModel
         {
                public Zaglavlje Zaglavlje { get; set; }
                public Racun Racun { get; set; }
                public String JIR { get; set; }
                public FiscalBillModel (Zaglavlje zaglavlje, Racun racun, String jir)
                {
                    Zaglavlje = zaglavlje;
                    Racun = racun;  
                    this.JIR = jir;
                }
         }
}
