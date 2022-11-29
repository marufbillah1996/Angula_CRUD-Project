using System.ComponentModel.DataAnnotations;

namespace Core_Server_Side.ViewModels
{
    public class GenreViewModel
    {
        public int GenreID { get; set; }
        [Required]
        public string GenreName { get; set; } = default!;
        public bool CanDelete { get; set; }
    }
}
