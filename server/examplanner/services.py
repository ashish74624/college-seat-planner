from .models import Classroom

def allocate_exam(total_students: int):
    classrooms = Classroom.objects.all().order_by('floorNo', '-capacity')

    remaining = total_students
    allocation_result = []

    for room in classrooms:
        if remaining <= 0:
            break

        allocated_here = min(room.capacity, remaining)

        allocation_result.append({
            "id": room.id,
            "roomId": room.roomId,
            "floorNo": room.floorNo,
            "capacity": room.capacity,
            "allocatedStudents": allocated_here
        })

        remaining -= allocated_here

    if remaining > 0:
        return None

    return allocation_result
