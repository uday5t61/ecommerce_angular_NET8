using API.Errors;
using System.Text.Json;

namespace API.Middleware
{
    public class ExceptionMiddleware(IHostEnvironment env,RequestDelegate next)
    {
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex) 
            {
                await HandleException(context, ex, env);
            }
        }

        private static async Task HandleException(HttpContext context, Exception ex, IHostEnvironment env)
        {
            context.Response.StatusCode = (int)StatusCodes.Status500InternalServerError;
            context.Response.ContentType = "application/json";

            var response = env.IsDevelopment()
                ? new ApiErrorResponse((int)StatusCodes.Status500InternalServerError, ex.Message, ex.StackTrace ?? "")
                : new ApiErrorResponse((int)StatusCodes.Status500InternalServerError, ex.Message, "Internal Server Error");

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var json = JsonSerializer.Serialize(response, options);
            await context.Response.WriteAsJsonAsync(json);
        }
    }
}
