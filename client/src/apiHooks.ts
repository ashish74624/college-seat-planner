import { useState, useEffect } from 'react';

export interface Classroom {
    roomId: string;
    capacity: number;
    floorNo: number;
    nearWashroom: boolean;
}

const BASE_URL = "http://localhost:8000/classrooms/";

// Hook to add a classroom
export const useAddClassroom = () => {
    const addClassroom = async (data: Classroom): Promise<Classroom> => {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error("Failed to add classroom");
        return await res.json();
    };
    return addClassroom;
};

// Hook to get all classrooms
export const useClassrooms = () => {
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchClassrooms = async () => {
        try {
            const res = await fetch(BASE_URL);
            if (!res.ok) throw new Error("Failed to fetch classrooms");
            const data: Classroom[] = await res.json();
            setClassrooms(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClassrooms();
    }, []);

    return { classrooms, loading, error, fetchClassrooms };
};

// Hook to allocate exam seats
export const useAllocateExam = () => {
    const allocateExam = async (totalStudents: number): Promise<Classroom[]> => {
        const res = await fetch(`${BASE_URL}allocate_exam/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ totalStudents })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Allocation failed");
        return data.allocatedClassrooms as Classroom[];
    };

    return allocateExam;
};
