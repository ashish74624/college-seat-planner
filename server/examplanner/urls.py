from django.urls import path
from .views import ClassroomListCreateView, AllocateExamView, TestView

urlpatterns = [
    path('classrooms/', ClassroomListCreateView.as_view()),
    path('allocate/', AllocateExamView.as_view()),
    path('test/',TestView.as_view())
]
