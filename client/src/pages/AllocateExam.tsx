import { useState } from "react";
import { useApi } from "../api/useApi";
import type { Classroom } from "../types/classroom";
import { apiRequest } from "../api/client";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function AllocateExam() {
    const { callApi, loading, error } = useApi();
    const [students, setStudents] = useState<number>(0);
    const [allocated, setAllocated] = useState<Classroom[]>([]);

    const handleAllocate = async () => {
        const data = await callApi(() =>
            apiRequest<Classroom[]>("/allocate/", "POST", {
                totalStudents: students,
            })
        );

        if (data) {
            setAllocated(data);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 space-y-4">
            <Input
                type="number"
                placeholder="Total Students"
                onChange={(e) => setStudents(Number(e.target.value))}
            />
            <Button onClick={handleAllocate} disabled={loading}>
                {loading ? "Allocating..." : "Allocate"}
            </Button>

            {error && <p className="text-red-500">{error}</p>}

            <div className="mt-6 space-y-2">
                {allocated.map((room) => (
                    <div key={room.id} className="border p-3 rounded">
                        {room.roomId} | Floor {room.floorNo} | Capacity {room.capacity}
                    </div>
                ))}
            </div>
        </div>
    );
}
