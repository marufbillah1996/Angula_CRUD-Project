using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core_Server_Side.Models;
using Core_Server_Side.Repositories;
using Core_Server_Side.Repositories.Interfaces;
using Core_Server_Side.ViewModels;

namespace Core_Server_Side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        IUnitOfWork unitOfWork;
        IGenericRepo<Author> repo;

        public AuthorsController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repo =this.unitOfWork.GetRepo<Author>();
        }

        // GET: api/Authors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Author>>> GetAuthors()
        {
            var data = await this.repo.GetAllAsync();
            return data.ToList();
        }
        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<AuthorViewModel>>> GetAuthorViewModels()
        {
            var data = await this.repo.GetAllAsync(x => x.Include(c => c.BookAuthors));
            return data.Select(c => new AuthorViewModel
            {
                AuthorID = c.AuthorID,
                AuthorName = c.AuthorName,
                AuthorAddress = c.AuthorAddress,
                Gender = c.Gender,
                CanDelete = c.BookAuthors.Count == 0
            }).ToList();
        }
        /// <summary>
        /// to get all authors with books entries
        /////////////////////////////////////////////
        [HttpGet("WithBooks")]
        public async Task<ActionResult<IEnumerable<Author>>> GetAuthorWithBooks()
        {
            var data = await this.repo.GetAllAsync(x => x.Include(c => c.BookAuthors));
            return data.ToList();
        }
        // GET: api/Authors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Author>> GetAuthor(int id)
        {
            var author = await this.repo.GetAsync(c => c.AuthorID == id);

            if (author == null)
            {
                return NotFound();
            }

            return author;
        }
        /// <summary>
        /// to get single author with order entries
        /////////////////////////////////////////////
        [HttpGet("{id}/WithBooks")]
        public async Task<ActionResult<Author>> GetCustomerWithOrders(int id)
        {
            var customer = await this.repo.GetAsync(c => c.AuthorID == id, x => x.Include(c => c.BookAuthors));

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }
        // PUT: api/author/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAuthor(int id, Author author)
        {
            if (id != author.AuthorID)
            {
                return BadRequest();
            }

            await this.repo.UpdateAsync(author);

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

        // POST: api/author
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Author>> PostAuthor(Author author)
        {
            await this.repo.AddAsync(author);
            await unitOfWork.CompleteAsync();

            return author;
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuthor(int id)
        {
            var author = await repo.GetAsync(c => c.AuthorID == id);
            if (author == null)
            {
                return NotFound();
            }

            await this.repo.DeleteAsync(author);
            await unitOfWork.CompleteAsync();

            return NoContent();
        }

    }
}
