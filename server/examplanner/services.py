from .models import Classroom

def allocate_exam(total_students: int):
    classrooms = Classroom.objects.all().order_by('floorNo', '-capacity')

    allocated = []
    remaining = total_students
    total_capacity = 0

    for room in classrooms:
        if total_capacity >= total_students:
            break

        allocated.append(room)
        total_capacity += room.capacity

    if total_capacity < total_students:
        return None  # Not enough seats

    return allocated
