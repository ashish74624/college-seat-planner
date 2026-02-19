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
        setForm({
            roomId: "",
            capacity: 0,
            floorNo: 0,
            nearWashroom: false,
        });
    };

    return (
        <div className="max-w-md mx-auto mt-10 space-y-4">
            <Input
                placeholder="Room ID"
                value={form.roomId}
                onChange={(e) =>
                    setForm({ ...form, roomId: e.target.value })
                }
            />

            <div>
                <label htmlFor="capacity">Capacity</label>
                <Input
                    type="number"
                    placeholder="Capacity"
                    value={form.capacity}
                    onChange={(e) =>
                        setForm({ ...form, capacity: Number(e.target.value) })
                    }
                />
            </div>

            <div>
                <label htmlFor="floor">Floor No</label>
                <Input
                    type="number"
                    placeholder="Floor No"
                    value={form.floorNo}
                    onChange={(e) =>
                        setForm({ ...form, floorNo: Number(e.target.value) })
                    }
                />
            </div>


            {/* Near Washroom Checkbox */}
            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={form.nearWashroom}
                    onChange={(e) =>
                        setForm({ ...form, nearWashroom: e.target.checked })
                    }
                    className="h-4 w-4"
                />
                <label className="text-sm font-medium">
                    Near Washroom
                </label>
            </div>

            <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Adding..." : "Add Classroom"}
            </Button>

            {error && <p className="text-red-500">{error}</p>}
        </div >
    );
}
