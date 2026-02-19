import { createBrowserRouter } from "react-router-dom";
import ClassroomList from "../pages/ClassroomList";
import AddClassroom from "../pages/AddClassroom";
import AllocateExam from "../pages/AllocateExam";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ClassroomList />,
    },
    {
        path: "/add",
        element: <AddClassroom />,
    },
    {
        path: "/allocate",
        element: <AllocateExam />,
    },
]);

export default router;
