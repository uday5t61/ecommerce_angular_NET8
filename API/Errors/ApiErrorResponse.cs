namespace API.Errors
{
    public class ApiErrorResponse(int statusCode,string message,string details)
    {
        public int StatusCode { set; get; } = statusCode;
        public string Message { get; set; } = message;
        public string? Details { get; set; } = details;
    }
}
