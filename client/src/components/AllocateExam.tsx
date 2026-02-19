import { useState } from 'react';
import { useAllocateExam, type Classroom } from '../apiHooks';
import OutputPanel from './OutputPanel';

export default function AllocateExam() {
    const [totalStudents, setTotalStudents] = useState<number>(0);
    const [output, setOutput] = useState<Classroom[] | string | null>(null);
    const allocateExam = useAllocateExam();

    const handleAllocate = async () => {
        try {
            const result = await allocateExam(totalStudents);
            setOutput(result);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setOutput(err.message);
        }
    };

    return (
        <div>
            <input type="number" placeholder="Total Students" value={totalStudents} onChange={e => setTotalStudents(Number(e.target.value))} />
            <button onClick={handleAllocate}>Allocate Seats</button>
            <OutputPanel output={output} />
        </div>
    );
}
