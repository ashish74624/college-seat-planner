import AddClassroom from './pages/AddClassroom';
import AllocateExam from './pages/AllocateExam';
import ClassroomList from './pages/ClassroomList';

export default function App() {
  return (
    <div className=''>
      <h1>College Exam Seat Planner</h1>
      <AddClassroom />
      <ClassroomList />
      <AllocateExam />
    </div>
  );
}
