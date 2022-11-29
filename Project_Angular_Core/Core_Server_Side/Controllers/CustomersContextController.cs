using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core_Server_Side.Models;

namespace Core_Server_Side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersContextController : ControllerBase
    {
        private readonly BookSellerDbContext _context;

        public CustomersContextController(BookSellerDbContext context)
        {
            _context = context;
        }

        // GET: api/CustomersContext
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            return await _context.Customers.ToListAsync();
        }

        // GET: api/CustomersContext/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        // PUT: api/CustomersContext/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
            if (id != customer.CustomerID)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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
        [HttpPut("VM/{id}")]
        public async Task<IActionResult> PutCustomerWithSaleDetails(int id, Customer customer)
        {
            if (id != customer.CustomerID)
            {
                return BadRequest();
            }
            var existing = await _context.Customers.Include(x => x.SaleDetails).FirstAsync(o => o.CustomerID == id);
            _context.SaleDetails.RemoveRange(existing.SaleDetails);
            foreach (var item in customer.SaleDetails)
            {
                _context.SaleDetails.Add(new SaleDetail { CustomerID = customer.CustomerID, BookID = item.BookID, Quantity = item.Quantity });
            }
            _context.Entry(existing).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                throw ex.InnerException;

            }

            return NoContent();
        }
        // POST: api/CustomersContext
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomer", new { id = customer.CustomerID }, customer);
        }

        // DELETE: api/CustomersContext/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.CustomerID == id);
        }
    }
}
