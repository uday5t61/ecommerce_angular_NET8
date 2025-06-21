using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreateProductDto
    {
        [Required]
        public string Name { get; set; } = "";
        [Required]
        public required string Description { get; set; } = "";
        [Range(0.01,double.MaxValue,ErrorMessage ="Price must be greater than 0")]
        public decimal Price { get; set; }
        [Required]
        public string PictureUrl { get; set; } = "";
        [Required]
        public required string Type { get; set; } = "";
        [Required]
        public required string Brand { get; set; } = "";
        [Required]
        [Range(1,int.MaxValue,ErrorMessage ="Stock must be atleast 1")]
        public int QuantityInStock { get; set; }
    }
}
