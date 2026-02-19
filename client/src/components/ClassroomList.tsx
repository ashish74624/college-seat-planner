import { useClassrooms } from '../apiHooks';

export default function ClassroomList() {
    const { classrooms, loading, error } = useClassrooms();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>All Classrooms</h2>
            <ul>
                {classrooms.map(c => (
                    <li key={c.roomId}>
                        {c.roomId} - Floor {c.floorNo} - Seats {c.capacity} - Washroom: {c.nearWashroom ? "Yes" : "No"}
                    </li>
                ))}
            </ul>
        </div>
    );
}
