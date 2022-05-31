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

            //Draw the text.
            graphicsnaslovna.DrawString("Product report for Bingo shop", font, PdfBrushes.Black, new Syncfusion.Drawing.PointF(110, 450));

            PdfFont font2 = new PdfStandardFont(PdfFontFamily.TimesRoman, 15);
            graphicsnaslovna.DrawString("Sarajevo, " + DateTime.Now, font2, PdfBrushes.Black, new Syncfusion.Drawing.PointF(150, 725));



            //Kreiranje tabele

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
            dataTable.Columns.Add("Quantity");
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

            foreach (var product in productList)
                dataTable
                .Rows
                .Add(new object[] { product.Name, product.CategoryName, product.Quantity.ToString(), product.MeasuringUnit, product.Price.ToString() });
            //Assign data source
            pdfGrid.DataSource = dataTable;
            //Draw grid to the page of PDF document
            pdfGrid.Draw(page, new PointF(0, 50));

            //Slika charta za tabelu iznad
            //Create PDF graphics for the page
            PdfGraphics graphics = page.Graphics;
            //Load the image as stream.
            FileStream imageStream = new FileStream("Materials/Piechart.jpg", FileMode.Open, FileAccess.Read);
            PdfBitmap image = new PdfBitmap(imageStream);
            //Draw the image
            graphics.DrawImage(image, new RectangleF(50, 150, 400, 300));

            FileStream imageStream2 = new FileStream("Materials/Barchart.jpg", FileMode.Open, FileAccess.Read);
            PdfBitmap image2 = new PdfBitmap(imageStream2);
            //Draw the image
            graphics.DrawImage(image2, new RectangleF(50, 435, 400, 300));
            //Save the PDF document to stream

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
            string fileName = "Proba.pdf";
            //Creates a FileContentResult object by using the file contents, content type, and file name.
            return File(stream, contentType, fileName);
        }
    }
}
