using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core_Server_Side.ViewModels.Input
{
    public class BookInputModel
    {
		public int BookID { get; set; }
		[Required, StringLength(30), Display(Name = "Book Name")]
		public string BookName { get; set; } = default!;
		[Required, Column(TypeName = "money"), DisplayFormat(DataFormatString = "{0:0.00}")]
		public decimal Price { get; set; }
		[Required, DataType(DataType.Date)]
		public DateTime PublishDate { get; set; }
		public bool Available { get; set; }
		[Required]
		public int GenreID { get; set; }
	}
}
