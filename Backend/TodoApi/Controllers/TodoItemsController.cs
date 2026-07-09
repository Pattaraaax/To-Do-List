using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TodoItemsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/todoitems
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _context.TodoItems.ToListAsync();
            return Ok(items);
        }

        // GET: api/todoitems/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOne(int id)
        {
            var item = await _context.TodoItems.FindAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        // POST: api/todoitems
        [HttpPost]
        public async Task<IActionResult> Create(TodoItem item)
        {
            _context.TodoItems.Add(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }

        // PUT: api/todoitems/1
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TodoItem item)
        {
            var existing = await _context.TodoItems.FindAsync(id);
            if (existing == null) return NotFound();

            existing.Title = item.Title;
            existing.IsCompleted = item.IsCompleted;

            await _context.SaveChangesAsync();
            return Ok(existing);
        }

        // DELETE: api/todoitems/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.TodoItems.FindAsync(id);
            if (item == null) return NotFound();

            _context.TodoItems.Remove(item);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
