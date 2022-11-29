namespace Core_Server_Side.ViewModels
{
    public class CustomerViewModel
    {
        public int CustomerID { get; set; }
        public string CustomerName { get; set; } = default!;
        public string CustomerPhone { get; set; } = default!;
        public decimal OrderValue { get; set; }
    }
}
