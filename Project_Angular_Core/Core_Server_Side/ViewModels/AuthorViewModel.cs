using Core_Server_Side.Models;
using System.ComponentModel.DataAnnotations;

namespace Core_Server_Side.ViewModels
{
    public class AuthorViewModel
    {
		public int AuthorID { get; set; }
		[Required]
		public string AuthorName { get; set; } = default!;
		[Required]
		public string AuthorAddress { get; set; } = default!;
		[EnumDataType(typeof(Gender))]
		public Gender Gender { get; set; }
		public bool CanDelete { get; set; }
	}
}
