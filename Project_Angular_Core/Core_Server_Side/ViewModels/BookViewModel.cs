using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core_Server_Side.ViewModels
{
    public class BookViewModel
    {
		public int BookID { get; set; }
		[Required]
		public string BookName { get; set; } = default!;
        [Required,Column (TypeName = "money"), DisplayFormat(DataFormatString = "{0:0.00}")]
		public decimal Price { get; set; }
		public DateTime PublishDate { get; set; }
		[Required, StringLength(150)]
		public string Picture { get; set; } = default!;
		public bool Available { get; set; }
		public int GenreID { get; set; }
		public string GenreName { get; set; } = default!;
		public bool CanDelete { get; set; }
	}
}
