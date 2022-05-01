#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SET3_Backend.Database;
using SET3_Backend.Models;

namespace SET3_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TableModelsController : ControllerBase
    {
        private readonly Context _context;

        public TableModelsController(Context context)
        {
            _context = context;
        }

        #region DataTransferObjects

        public class ProductDto
        {
            public int ProductId { get; set; }
            public string Name { get; set; }
            public double Quantity { get; set; }
            public float Price { get; set; }
            public string MeasuringUnit { get; set; }

            public ProductDto(int productId, string name, double quantity, float price, string measuringUnit)
            {
                ProductId = productId;
                Name = name;
                Quantity = quantity;
                Price = price;
                MeasuringUnit = measuringUnit;
            }
        }

        public class TableWithProductsDto
        {
            public int TableId { get; set; }
            public string Name { get; set; }
            public int ShopId { get; set; }
            public bool Taken { get; set; }
            public IEnumerable<ProductDto> Products { get; set; }

            public TableWithProductsDto(int tableId, string name, int shopId, bool taken, IEnumerable<ProductDto> products)
            {
                TableId = tableId;
                Name = name;
                ShopId = shopId;
                Taken = taken;
                Products = products;
            }
        }

        #endregion

        private async Task<TableWithProductsDto> GetTableWithProducts(TableModel table, List<UserOrderModel> notFinishedOrders, List<ProductModel> products)
        {
            UserOrderModel order = notFinishedOrders.Where(x => x.TableId == table.Id).FirstOrDefault();
            if (order == null)
                return new TableWithProductsDto(table.Id, table.Name, table.ShopId, table.Taken, new List<ProductDto>());
            List<ProductUserOrderIntertable> userOrders = await _context.ProductUserOrderIntertables.Where(x => x.UserOrderId == order.Id).ToListAsync();

            IEnumerable<ProductDto> productDtos = userOrders.Select(x =>
            {
                ProductModel productModel = products.Where(y => y.Id == x.ProductId).FirstOrDefault();
                return new ProductDto(x.ProductId, productModel.Name, x.Quantity, productModel.Price, productModel.MeasuringUnit);
            });

            return new TableWithProductsDto(table.Id, table.Name, table.ShopId, table.Taken, productDtos);
        }
        

        [HttpGet("tablesWithProductsFromShop/{id}")]
        public async Task<ActionResult<IEnumerable<TableWithProductsDto>>> GetTablesWithProducts(int id)
        {
            List<TableModel> tables = await _context.TableModels.Where(x => x.ShopId == id).ToListAsync();
            List<UserOrderModel> notFinishedOrders = await _context.UserOrderModels.Where(x => x.ShopId == id && x.Done == false).ToListAsync();
            List<ProductModel> products = await _context.ProductModels.ToListAsync();

            IEnumerable<TableWithProductsDto> result = tables.Select(x => 
            {
                return GetTableWithProducts(x, notFinishedOrders, products).Result;
            });

            return Ok(result);
        }

        // GET: api/TableModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TableModel>>> GetTableModel()
        {
            return await _context.TableModels.ToListAsync();
        }

        // GET: api/TableModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TableModel>> GetTableModel(int id)
        {
            var tableModel = await _context.TableModels.FindAsync(id);

            if (tableModel == null)
            {
                return NotFound();
            }

            return tableModel;
        }

        // PUT: api/TableModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTableModel(int id, TableModel tableModel)
        {
            if (id != tableModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(tableModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TableModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TableModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TableModel>> PostTableModel(TableModel tableModel)
        {
            _context.TableModels.Add(tableModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTableModel", new { id = tableModel.Id }, tableModel);
        }

        // DELETE: api/TableModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTableModel(int id)
        {
            var tableModel = await _context.TableModels.FindAsync(id);
            if (tableModel == null)
            {
                return NotFound();
            }

            _context.TableModels.Remove(tableModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TableModelExists(int id)
        {
            return _context.TableModels.Any(e => e.Id == id);
        }
    }
}
