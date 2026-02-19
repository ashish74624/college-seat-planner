import { useState } from "react";
import { useApi } from "../api/useApi";
import type { Classroom } from "../types/classroom";
import { apiRequest } from "../api/client";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function AddClassroom() {
    const { callApi, loading, error } = useApi();

    const [form, setForm] = useState<Omit<Classroom, "id">>({
        roomId: "",
        capacity: 0,
        floorNo: 0,
        nearWashroom: false,
    });

    const handleSubmit = async () => {
        await callApi(() =>
            apiRequest<Classroom>("/classrooms/", "POST", form)
        );
        alert("Classroom Added");
    };

    return (
        <div className="max-w-md mx-auto mt-10 space-y-4">
            <Input
                placeholder="Room ID"
                onChange={(e) => setForm({ ...form, roomId: e.target.value })}
            />
            <Input
                type="number"
                placeholder="Capacity"
                onChange={(e) =>
                    setForm({ ...form, capacity: Number(e.target.value) })
                }
            />
            <Input
                type="number"
                placeholder="Floor No"
                onChange={(e) =>
                    setForm({ ...form, floorNo: Number(e.target.value) })
                }
            />
            <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Adding..." : "Add Classroom"}
            </Button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}
