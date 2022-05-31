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
        [HttpGet]
        public async Task<ActionResult> CreateDocument()
        {
            //Create a new PDF document
            PdfDocument doc = new PdfDocument();
            //Naslovna






            //Kreiranje tabele

            //Add a page
            PdfPage page = doc.Pages.Add();
            //Create a PdfGrid
            PdfGrid pdfGrid = new PdfGrid();
            //Create a DataTable
            DataTable dataTable = new DataTable();
            //Add columns to the DataTable
            /*
            dataTable.Columns.Add("Name");
            dataTable.Columns.Add("Category Name");
            dataTable.Columns.Add("Quantity");
            dataTable.Columns.Add("Measuring Unit");
            dataTable.Columns.Add("Price");
            */
            dataTable.Columns.Add("ProductID");
            dataTable.Columns.Add("ProductName");
            dataTable.Columns.Add("Quantity");
            dataTable.Columns.Add("UnitPrice");
            dataTable.Columns.Add("Discount");
            dataTable.Columns.Add("Price");
            //Add rows to the DataTable
            dataTable.Rows.Add(new object[] { "CA-1098", "Queso Cabrales", "12", "14", "1", "167" });
            dataTable.Rows.Add(new object[] { "LJ-0192-M", "Singaporean Hokkien Fried Mee", "10", "20", "3", "197" });
            dataTable.Rows.Add(new object[] { "SO-B909-M", "Mozzarella di Giovanni", "15", "65", "10", "956" });
            //Assign data source
            pdfGrid.DataSource = dataTable;
            //Draw grid to the page of PDF document
            pdfGrid.Draw(page, new PointF(10, 10));

            //Slika charta za tabelu iznad

            PdfPage page2 = doc.Pages.Add();
            //Create PDF graphics for the page
            PdfGraphics graphics = page2.Graphics;
            //Load the image as stream.
            FileStream imageStream = new FileStream("Materials/Logo.png", FileMode.Open, FileAccess.Read);
            PdfBitmap image = new PdfBitmap(imageStream);
            //Draw the image
            graphics.DrawImage(image, new RectangleF(0, 200, 500, 500));
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
