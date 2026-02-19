import { useState } from 'react';
import { useAddClassroom, type Classroom } from '../apiHooks';

export default function AddClassroom() {
    const [form, setForm] = useState<Classroom>({
        roomId: '',
        capacity: 0,
        floorNo: 0,
        nearWashroom: false
    });

    const addClassroom = useAddClassroom();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addClassroom(form);
            alert("Classroom added!");
            setForm({ roomId: '', capacity: 0, floorNo: 0, nearWashroom: false });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="roomId" placeholder="Room ID" value={form.roomId} onChange={handleChange} required />
            <input name="capacity" type="number" placeholder="Capacity" value={form.capacity} onChange={handleChange} required />
            <input name="floorNo" type="number" placeholder="Floor No" value={form.floorNo} onChange={handleChange} required />
            <label>
                Near Washroom
                <input name="nearWashroom" type="checkbox" checked={form.nearWashroom} onChange={handleChange} />
            </label>
            <button type="submit">Add Classroom</button>
        </form>
    );
}
