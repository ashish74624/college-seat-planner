from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Classroom
from .serializers import ClassroomSerializer

class ClassroomViewSet(viewsets.ModelViewSet):
    queryset = Classroom.objects.all()
    serializer_class = ClassroomSerializer

    @action(detail=False, methods=['post'])
    def allocate_exam(self, request):
        total_students = request.data.get('totalStudents')
        if not total_students:
            return Response({"error": "totalStudents is required"}, status=400)
        
        total_students = int(total_students)
        # Get classrooms sorted by floorNo ascending and capacity descending
        classrooms = Classroom.objects.all().order_by('floorNo', '-capacity')
        allocated = []
        seats_allocated = 0
        
        for room in classrooms:
            allocated.append({
                "roomId": room.roomId,
                "capacity": room.capacity,
                "floorNo": room.floorNo,
                "nearWashroom": room.nearWashroom
            })
            seats_allocated += room.capacity
            if seats_allocated >= total_students:
                return Response({"allocatedClassrooms": allocated})
        
        return Response({"error": "Not enough seats available"}, status=400)
