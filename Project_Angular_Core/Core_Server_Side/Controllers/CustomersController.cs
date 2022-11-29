using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core_Server_Side.Models;
using Core_Server_Side.Repositories.Interfaces;
using Core_Server_Side.ViewModels;

namespace Core_Server_Side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IGenericRepo<Customer> repo;

        public CustomersController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repo = this.unitOfWork.GetRepo<Customer>();
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            var data = await this.repo.GetAllAsync();
            return data.ToList();
        }
        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<CustomerViewModel>>> GetCustomerVMs()
        {

            var data = await this.repo.GetAllAsync(x => x.Include(o => o.SaleDetails).ThenInclude(oi => oi.Book));

            return data.Select(o => new CustomerViewModel
            {
                CustomerID = o.CustomerID,
                CustomerName=o.CustomerName,
                CustomerPhone=o.CustomerPhone,
                OrderValue = o.SaleDetails.Sum(oi => oi.Quantity * oi.Book.Price)
            })
            .ToList();
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await this.repo.GetAsync(o => o.CustomerID == id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }
        [HttpGet("{id}/OI")]
        public async Task<ActionResult<Customer>> GetCustomerWithSaleDetails(int id)
        {
            var order = await this.repo.GetAsync(o => o.CustomerID == id, x => x.Include(o => o.SaleDetails).ThenInclude(oi => oi.Book));

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }
        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
            if (id != customer.CustomerID)
            {
                return BadRequest();
            }

            await this.repo.UpdateAsync(customer);

            try
            {
                await this.unitOfWork.CompleteAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                throw;

            }

            return NoContent();
        }
        [HttpPut("VM/{id}")]
        public async Task<IActionResult> PutOrderWithOrderItem(int id, Customer customer)
        {
            if (id != customer.CustomerID)
            {
                return BadRequest();
            }
            //var exisiting =await this.repo.GetAsync(o => o.OrderID == id, x=> x.Include(y=> y.OrderItems));
            //var items = exisiting.OrderItems.ToList();
            //for(var i=0; i<= items.Count; i++)
            //{
            //    await this.DeleteOrderItem(exisiting.OrderID, items[i].ProductID);
            //}
            //foreach(var x in order.OrderItems)
            //{
            //    exisiting.OrderItems.Add(x);
            //}
            await this.repo.UpdateAsync(customer);

            try
            {
                await this.unitOfWork.CompleteAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                throw;

            }

            return NoContent();
        }
        // POST: api/Customers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {

            await this.repo.AddAsync(customer);
            await this.unitOfWork.CompleteAsync();

            return customer;
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var order = await this.repo.GetAsync(o => o.CustomerID == id);
            if (order == null)
            {
                return NotFound();
            }

            await this.repo.DeleteAsync(order);
            await this.unitOfWork.CompleteAsync();

            return NoContent();
        }

    }
}
