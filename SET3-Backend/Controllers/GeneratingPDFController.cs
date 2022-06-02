using Microsoft.AspNetCore.Mvc;
using Syncfusion.Pdf;
using Syncfusion.Pdf.Graphics;
using Syncfusion.Drawing;
using System.IO;
using SET3_Backend.Database;
using Syncfusion.Pdf.Grid;
using Microsoft.AspNetCore.Hosting;
using System.Data;



namespace SET3_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeneratingPDFController : Controller
    {
        private readonly Microsoft.AspNetCore.Hosting.IHostingEnvironment _hostingEnvironment;
        private readonly Context _context;
        private readonly IConfiguration _configuration;

        public GeneratingPDFController(Context context, IConfiguration configuration, Microsoft.AspNetCore.Hosting.IHostingEnvironment hostingEnvironment)
        {
           
            _hostingEnvironment = hostingEnvironment;
            _configuration = configuration;
            _context = context;
            _configuration = configuration;
        }
        [HttpGet("{shopName}")]
        public async Task<ActionResult> CreateProductReportDocument(string shopName)
        {


            
            //Create a new PDF document
            PdfDocument doc = new PdfDocument();
            //Naslovna
            PdfPage naslovna = doc.Pages.Add();
            PdfGraphics graphicsnaslovna = naslovna.Graphics;
            //Load the image as stream.
            FileStream imageStreamnaslovna = new FileStream("Materials/Logo2.png", FileMode.Open, FileAccess.Read);
            PdfBitmap imagenaslovna = new PdfBitmap(imageStreamnaslovna);
            //Draw the image
            graphicsnaslovna.DrawImage(imagenaslovna, new RectangleF(15, -50, 500, 500));

            PdfFont font = new PdfStandardFont(PdfFontFamily.TimesRoman, 25);
            PdfFont font2 = new PdfStandardFont(PdfFontFamily.TimesRoman, 15);
            var shop = _context.ShopModels
                .Where(shop => shop.Name == shopName).First();
            //Draw the text.
            graphicsnaslovna.DrawString("Product and financial report for " + shopName, font, PdfBrushes.Black, new Syncfusion.Drawing.PointF(75, 400));
            graphicsnaslovna.DrawString("Address: " + shop.Adress, font2, PdfBrushes.Black, new Syncfusion.Drawing.PointF(0, 500));
            graphicsnaslovna.DrawString("Receipt type: " + shop.ReceiptType, font2, PdfBrushes.Black, new Syncfusion.Drawing.PointF(0, 525));
            graphicsnaslovna.DrawString("Sarajevo, " + DateTime.Now, font2, PdfBrushes.Black, new Syncfusion.Drawing.PointF(150, 725));


            //Add a page
            PdfPage page = doc.Pages.Add();
            PdfGraphics graphicsprvastr = page.Graphics;
            graphicsprvastr.DrawString("List of all products in shop", font, PdfBrushes.Black, new Syncfusion.Drawing.PointF(0, 0));
            //Create a PdfGrid

            PdfGrid pdfGrid = new PdfGrid();
            //Create a DataTable
            DataTable dataTable = new DataTable();
            //Add columns to the DataTable
           
            dataTable.Columns.Add("Name");
            dataTable.Columns.Add("Category Name");
            dataTable.Columns.Add("Quantity available");
            dataTable.Columns.Add("Measuring Unit");
            dataTable.Columns.Add("Price");

            var productList = _context.ShopModels
                .Where(shop => shop.Name == shopName)
                .Join(_context.ProductShopIntertables,
                        shop => shop.Id,
                        interTable => interTable.ShopId,
                        (shop, interTable) => interTable.ProductId)
                .Join(_context.ProductModels,
                        productId => productId,
                        product => product.Id,
                        (productId, product) => product)
                .ToList();
            //Initialize the pen for drawing pie
            PdfPen pen = new PdfPen(PdfBrushes.Black, 1f);

            //Set the line join style of the pen
            pen.LineJoin = PdfLineJoin.Round;
            var boja1 = 0;
            var boja2 = 0;
            var boja3 = 0;
            Random rnd = new Random();
            var pozicija = 300;
            //Set the bounds for pie
            RectangleF rectangle = new RectangleF(0, 250, 250, 250);
            double ukupanQuantity = 0;
            float brojacStepeni = 0;
            graphicsprvastr.DrawString("Quantity of products in shop:", font2, new PdfSolidBrush(Color.Black), new Syncfusion.Drawing.PointF(325, pozicija - 30));
            foreach (var product in productList)
            {
                ukupanQuantity += product.Quantity;
            }
            foreach (var product in productList)
            {
                dataTable.Rows.Add(new object[] { product.Name, product.CategoryName, product.Quantity.ToString(), product.MeasuringUnit, product.Price.ToString() });
                page.Graphics.DrawPie(pen, new PdfSolidBrush(Color.FromArgb(120, boja1, boja2, boja3)), rectangle, brojacStepeni, (float)(360*product.Quantity/ukupanQuantity));

                graphicsprvastr.DrawString(product.Name + ": " + Math.Round((100* product.Quantity / ukupanQuantity), 2)+ "%", font2, new PdfSolidBrush(Color.FromArgb(boja1, boja2, boja3)), new Syncfusion.Drawing.PointF(325, pozicija));
                brojacStepeni += (float)(360 * product.Quantity / ukupanQuantity);
                boja1 = rnd.Next(0, 220);
                boja2 = rnd.Next(0, 220);
                boja3 = rnd.Next(0, 220);
                pozicija += 30;
            }
            //Assign data source
            pdfGrid.DataSource = dataTable;
            //Draw grid to the page of PDF document
            pdfGrid.Draw(page, new PointF(0, 50));

            FileStream imageStreamprva = new FileStream("Materials/Logo2.png", FileMode.Open, FileAccess.Read);
            PdfBitmap imageprva = new PdfBitmap(imageStreamprva);
            //Draw the image
            graphicsprvastr.DrawImage(imageprva, new RectangleF(420, 680, 100, 100));

            PdfPage page2 = doc.Pages.Add();
            PdfGraphics graphicsdrugastrana = page2.Graphics;
            graphicsdrugastrana.DrawString("List of sold products in shop", font, PdfBrushes.Black, new Syncfusion.Drawing.PointF(0, 0));
            PdfGrid pdfGrid2 = new PdfGrid();
            //Create a DataTable
            DataTable dataTable2 = new DataTable();
            //Add columns to the DataTable
            dataTable2.Columns.Add("Name");
            dataTable2.Columns.Add("Category Name");
            dataTable2.Columns.Add("Quantity sold");
            dataTable2.Columns.Add("Price (BAM)");
            dataTable2.Columns.Add("Taxless revenue (BAM)");
            dataTable2.Columns.Add("Total tax (BAM)");
            dataTable2.Columns.Add("Product revenue (BAM)");


            var orderList = _context.ShopModels
            .Where(shop => shop.Name == shopName)
            .Join(_context.OrderModels,
                        shop => shop.Id,
                        order => order.ShopId,
                        (shop, order) => order)
                .ToList();
           
            float brojacStepeni2 = 0;
            int ukupnasuma = 0;
            int pozicija2 = 300;
            RectangleF rectangle2 = new RectangleF(0, 250, 250, 250);
            graphicsdrugastrana.DrawString("Product revenue chart: ", font2, new PdfSolidBrush(Color.Black), new Syncfusion.Drawing.PointF(325, pozicija2 - 30));
            foreach (var product in productList)
            {
                var ordersProduct = orderList.FindAll(o => o.ProductId == product.Id);
                int quantitySold = Convert.ToInt32(ordersProduct.Select(op => op.Quantity).Sum());
                ukupnasuma += quantitySold;

            }
            foreach (var product in productList)
            {
                var ordersProduct = orderList.FindAll(o => o.ProductId == product.Id);
                var quantitySold = ordersProduct.Select(op => op.Quantity).Sum();
                dataTable2.Rows.Add(new object[] { product.Name, product.CategoryName, ordersProduct.Select(op => op.Quantity).Sum(), product.Price, quantitySold * product.Price, (quantitySold * product.Price * 0.2), quantitySold * product.Price * 1.2});

                page2.Graphics.DrawPie(pen, new PdfSolidBrush(Color.FromArgb(boja1, boja2, boja3)), rectangle2, brojacStepeni2, (float)(360 * quantitySold/ ukupnasuma));
                graphicsdrugastrana.DrawString(product.Name + ": " + Math.Round((100 * quantitySold / ukupnasuma), 2) + "%", font2, new PdfSolidBrush(Color.FromArgb(120, boja1, boja2, boja3)), new Syncfusion.Drawing.PointF(325, pozicija2));

                brojacStepeni2 += (float)Math.Round((360 * quantitySold / ukupnasuma), 2);
                boja1 = rnd.Next(0, 220);
                boja2 = rnd.Next(0, 220);
                boja3 = rnd.Next(0, 220);
                pozicija2 += 30;
            }
            //Assign data source
            pdfGrid.DataSource = dataTable2;

            //Draw grid to the page of PDF document
            pdfGrid.Draw(page2, new PointF(0, 50));
            FileStream imageStreamdruga = new FileStream("Materials/Logo2.png", FileMode.Open, FileAccess.Read);
            PdfBitmap imagedruga = new PdfBitmap(imageStreamdruga);
            //Draw the image
            graphicsdrugastrana.DrawImage(imagedruga, new RectangleF(420, 680, 100, 100));



            PdfPage page3 = doc.Pages.Add();
            PdfGraphics graphicstrecastrana = page3.Graphics;
            graphicstrecastrana.DrawString("Annual revenue", font, PdfBrushes.Black, new Syncfusion.Drawing.PointF(0, 0));


            DataTable dataTable3 = new DataTable();

            dataTable3.Columns.Add("Month");
            dataTable3.Columns.Add("Total Quantity");
            dataTable3.Columns.Add("Total Revenue");
            dataTable3.Columns.Add("Percentage");

            var export = _context.ExportShopModels.ToList();
            export = export.FindAll(x => x.Status == "INPORT" && x.ShopId == shop.Id);

            var totalAnnualRevenue = export.Select(export => export.Quantity * productList.Find(product => export.ProductId == product.Id).Price).Sum();
            float brojacStepeni3 = 0;
            int pozicija3 = 350;
            RectangleF rectangle3 = new RectangleF(0, 300, 250, 250);
            graphicstrecastrana.DrawString("Annual revenue percentage chart: ", font2, new PdfSolidBrush(Color.Black), new Syncfusion.Drawing.PointF(300, pozicija3 - 30));
            for (int i = 1; i <= 12; i++)
            {
                var totalQuantity = export.FindAll(x => x.DateTime.Month == i).Select(x => x.Quantity).Sum();
                var totalRevenue = export.FindAll(x => x.DateTime.Month == i).Select(export => export.Quantity * productList.Find(product => export.ProductId == product.Id).Price).Sum();
                var percentage = Math.Round((totalRevenue * 100 / totalAnnualRevenue),2).ToString() + "%";

                dataTable3.Rows.Add(new object[] { new DateTime(2020, i, 1).ToString("MMM"), totalQuantity, totalRevenue, percentage });
                page3.Graphics.DrawPie(pen, new PdfSolidBrush(Color.FromArgb(boja1, boja2, boja3)), rectangle3, brojacStepeni2, (float)(360 * totalRevenue / totalAnnualRevenue));
                if (totalRevenue / totalAnnualRevenue > 0.0001)
                {
                    graphicstrecastrana.DrawString(new DateTime(2020, i, 1).ToString("MMM") + ": " + Math.Round((100 * totalRevenue / totalAnnualRevenue), 2) + "%", font2, new PdfSolidBrush(Color.FromArgb(120, boja1, boja2, boja3)), new Syncfusion.Drawing.PointF(300, pozicija3));
                    pozicija3 += 30;
                }
                brojacStepeni2 += (float)Math.Round((360 * totalRevenue / totalAnnualRevenue), 2);
                boja1 = rnd.Next(0, 220);
                boja2 = rnd.Next(0, 220);
                boja3 = rnd.Next(0, 220);
            }

            pdfGrid.DataSource = dataTable3;

            //Draw grid to the page of PDF document
            pdfGrid.Draw(page3, new PointF(0, 50));
            FileStream imageStreamtreca = new FileStream("Materials/Logo2.png", FileMode.Open, FileAccess.Read);
            PdfBitmap imagetreca = new PdfBitmap(imageStreamdruga);
            //Draw the image
            graphicstrecastrana.DrawImage(imagetreca, new RectangleF(420, 680, 100, 100));



            //Spasavanje dokumenta
            MemoryStream stream = new MemoryStream();
            doc.Save(stream);
            //If the position is not set to '0' then the PDF will be empty.
            stream.Position = 0;
            //Close the document.
            doc.Close(true);
            //Defining the ContentType for pdf file.
            string contentType = "application/pdf";
            //Define the file name.
            string fileName = shopName + " Shop Report.pdf";
            //Creates a FileContentResult object by using the file contents, content type, and file name.
            return File(stream, contentType, fileName);
        }
    }
}
