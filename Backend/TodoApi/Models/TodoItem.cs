namespace TodoApi.Models
{
    // ตารางในฐานข้อมูล จะถูกสร้างจากนี้ (Code First)
    public class TodoItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public bool IsCompleted { get; set; }
    }
}
