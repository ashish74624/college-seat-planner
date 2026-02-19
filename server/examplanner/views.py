from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Classroom
from .serializers import ClassroomSerializer
from .services import allocate_exam

class TestView(APIView):
    def get(self,request):
        return Response("Working !!")

class ClassroomListCreateView(APIView):

    def get(self, request):
        classrooms = Classroom.objects.all()
        serializer = ClassroomSerializer(classrooms, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ClassroomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class AllocateExamView(APIView):

    def post(self, request):
        total_students = request.data.get("totalStudents")

        if not total_students:
            return Response({"error": "totalStudents required"}, status=400)

        allocated = allocate_exam(int(total_students))

        if not allocated:
            return Response(
                {"message": "Not enough seats available"},
                status=400
            )

        serializer = ClassroomSerializer(allocated, many=True)
        return Response(serializer.data)
