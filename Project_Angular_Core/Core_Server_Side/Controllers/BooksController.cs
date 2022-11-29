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
using Core_Server_Side.ViewModels.Input;

namespace Core_Server_Side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private IWebHostEnvironment env;
        IUnitOfWork unitOfWork;
        IGenericRepo<Book> repo;
        public BooksController(IUnitOfWork unitOfWork, IWebHostEnvironment env)
        {
            this.unitOfWork = unitOfWork;
            this.repo = this.unitOfWork.GetRepo<Book>();
            this.env = env;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            var data = await this.repo.GetAllAsync();
            return data.ToList();
        }
        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<BookViewModel>>> GetBookViewModels()
        {
            var data = await this.repo.GetAllAsync(p => p.Include(x => x.SaleDetails).Include(x=>x.Genre));
            return data.ToList().Select(p => new BookViewModel
            {
                BookID = p.BookID,
                BookName = p.BookName,
                Price = p.Price,
                PublishDate = p.PublishDate,
                Available = p.Available,
                GenreName = p.Genre.GenreName,
                CanDelete = p.SaleDetails.Count == 0,
                Picture = p.Picture

            }).ToList();
        }
        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await this.repo.GetAsync(x => x.BookID == id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        // PUT: api/Books/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            if (id != book.BookID)
            {
                return BadRequest();
            }

            await this.repo.UpdateAsync(book);

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
        [HttpPut("{id}/VM")]
        public async Task<IActionResult> PutBookViewModel(int id, BookInputModel book)
        {
            var data = await this.repo.GetAllAsync(p => p.Include(x => x.SaleDetails).Include(x => x.Genre));
            if (id != book.BookID)
            {
                return BadRequest();
            }

            var existing = await this.repo.GetAsync(p => p.BookID == id);
            if (existing != null)
            {
                existing.BookName = book.BookName;
                existing.Price = book.Price;
                existing.PublishDate= book.PublishDate;
                existing.GenreID= book.GenreID;
                existing.Available = book.Available;
                await this.repo.UpdateAsync(existing);
            }

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
        // POST: api/Books
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            await this.repo.GetAllAsync(p => p.Include(x => x.SaleDetails).Include(x => x.Genre));
            await this.repo.AddAsync(book);
            await this.unitOfWork.CompleteAsync();

            return book;
        }
        [HttpPost("VM")]
        public async Task<ActionResult<Book>> PostBookInput(BookInputModel book)
        {
            await this.repo.GetAllAsync(p => p.Include(x => x.SaleDetails).Include(x => x.Genre));
            var newBook = new Book
            {
                BookName = book.BookName,
                Price = book.Price,
                PublishDate = book.PublishDate,
                Available = book.Available,
                GenreID = book.GenreID,
                Picture = "no-product-image-400x400.png"
            };
            await this.repo.AddAsync(newBook);
            await this.unitOfWork.CompleteAsync();

            return newBook;
        }
        [HttpPost("Upload/{id}")]
        public async Task<ImagePathResponse> UploadPicture(int id, IFormFile picture)
        {
            var book = await this.repo.GetAsync(p => p.BookID == id);
            var ext = Path.GetExtension(picture.FileName);
            string fileName = Guid.NewGuid() + ext;
            string savePath = Path.Combine(this.env.WebRootPath, "Pictures", fileName);
            FileStream fs = new FileStream(savePath, FileMode.Create);
            picture.CopyTo(fs);
            fs.Close();
            book.Picture = fileName;
            await this.repo.UpdateAsync(book);
            await this.unitOfWork.CompleteAsync();
            return new ImagePathResponse { PictureName = fileName };
        }

        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await this.repo.GetAsync(p => p.BookID == id);
            if (book == null)
            {
                return NotFound();
            }

            await this.repo.DeleteAsync(book);
            await this.unitOfWork.CompleteAsync();

            return NoContent();
        }

    }
}
