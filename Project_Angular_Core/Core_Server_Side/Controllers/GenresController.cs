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
    public class GenresController : ControllerBase
    {
        IUnitOfWork unitOfWork;
        IGenericRepo<Genre> repo;

        public GenresController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repo = this.unitOfWork.GetRepo<Genre>();
        }

        // GET: api/Genres
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Genre>>> GetGenres()
        {
            var data = await this.repo.GetAllAsync();
            return data.ToList();
        }
        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<GenreViewModel>>> GetGenreViewModels()
        {
            var data = await this.repo.GetAllAsync(x => x.Include(c => c.Books));
            return data.Select(c => new GenreViewModel
            {
                GenreID = c.GenreID,
                GenreName = c.GenreName,
                CanDelete = c.Books.Count == 0
            }).ToList();
        }

        // GET: api/Genres/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Genre>> GetGenre(int id)
        {
            var genre = await this.repo.GetAsync(c => c.GenreID == id);

            if (genre == null)
            {
                return NotFound();
            }

            return genre;
        }

        // PUT: api/Genres/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGenre(int id, Genre genre)
        {
            if (id != genre.GenreID)
            {
                return BadRequest();
            }

            await this.repo.UpdateAsync(genre);

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

        // POST: api/Genres
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Genre>> PostGenre(Genre genre)
        {
            await this.repo.AddAsync(genre);
            await unitOfWork.CompleteAsync();

            return genre;
        }

        // DELETE: api/Genres/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGenre(int id)
        {
            var genre = await repo.GetAsync(c => c.GenreID == id);
            if (genre == null)
            {
                return NotFound();
            }

            await this.repo.DeleteAsync(genre);
            await unitOfWork.CompleteAsync();

            return NoContent();
        }

    }
}
