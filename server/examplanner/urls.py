from django.urls import path
from .views import ClassroomListCreateView, AllocateExamView

urlpatterns = [
    path('classrooms/', ClassroomListCreateView.as_view()),
    path('allocate/', AllocateExamView.as_view()),
]
