import AddClassroom from './components/AddClassroom';
import ClassroomList from './components/ClassroomList';
import AllocateExam from './components/AllocateExam';

export default function App() {
  return (
    <div>
      <h1>College Exam Seat Planner</h1>
      <AddClassroom />
      <ClassroomList />
      <AllocateExam />
    </div>
  );
}
