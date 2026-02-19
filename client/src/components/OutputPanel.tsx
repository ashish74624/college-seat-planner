import { type Classroom } from '../apiHooks';

interface Props {
    output: Classroom[] | string | null;
}

export default function OutputPanel({ output }: Props) {
    if (!output) return null;
    if (typeof output === "string") return <p>{output}</p>;

    return (
        <ul>
            {output.map(room => (
                <li key={room.roomId}>
                    {room.roomId} - Floor {room.floorNo} - Seats {room.capacity}
                </li>
            ))}
        </ul>
    );
}
