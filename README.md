# 📘 Exam Seat Allocation System

A full-stack web application that allocates students to classrooms for examinations based on priority rules.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- TailwindCSS
- Deployed on Vercel

### Backend
- Django
- Django REST Framework
- PostgreSQL / SQLite

---

## 🧠 Allocation Logic

The system allocates students using a greedy strategy:

1. Classrooms are sorted by:
   - `floorNo` (ascending → lower floors first)
   - `capacity` (descending → larger rooms first on same floor)
2. Students are distributed room by room.
3. The last room may be partially filled.
4. If total capacity is insufficient → an error is returned.

### Example Request

```json
{
  "totalStudents": 125
}
