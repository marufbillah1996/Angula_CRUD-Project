using Core_Server_Side.Models;
using Core_Server_Side.Repositories.Interfaces;

namespace Core_Server_Side.Repositories
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        BookSellerDbContext db;
        public UnitOfWork(BookSellerDbContext db)
        {
            this.db = db;
        }
        public async Task CompleteAsync()
        {
            await db.SaveChangesAsync();
        }

        public void Dispose()
        {
            this.db.Dispose();
        }

        public IGenericRepo<T> GetRepo<T>() where T : class, new()
        {
            return new GenericRepo<T>(this.db);
        }
    }
}
