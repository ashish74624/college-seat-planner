import { useState } from "react";
import { useApi } from "../api/useApi";
import { apiRequest } from "../api/client";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

interface AllocationResult {
    id: number;
    roomId: string;
    floorNo: number;
    capacity: number;
    allocatedStudents: number;
}

export default function AllocateExam() {
    const { callApi, loading, error } = useApi();

    const [students, setStudents] = useState<number>(0);
    const [allocated, setAllocated] = useState<AllocationResult[]>([]);
    const [summary, setSummary] = useState<{
        totalRooms: number;
        totalAllocated: number;
    } | null>(null);

    const handleAllocate = async () => {
        if (!students || students <= 0) {
            return;
        }

        const data = await callApi(() =>
            apiRequest<AllocationResult[]>("/allocate/", "POST", {
                totalStudents: students,
            })
        );

        if (data) {
            setAllocated(data);

            const totalAllocated = data.reduce(
                (sum, room) => sum + room.allocatedStudents,
                0
            );

            setSummary({
                totalRooms: data.length,
                totalAllocated,
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 space-y-6">
            <h1 className="text-2xl font-bold">Exam Seat Allocation</h1>

            {/* Input Section */}
            <div className="flex gap-4">
                <Input
                    type="number"
                    placeholder="Total Students"
                    value={students || ""}
                    onChange={(e) => setStudents(Number(e.target.value))}
                />
                <Button onClick={handleAllocate} disabled={loading}>
                    {loading ? "Allocating..." : "Allocate"}
                </Button>
            </div>

            {/* Error */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Summary */}
            {summary && (
                <div className="bg-gray-100 p-4 rounded">
                    <p>
                        <span className="font-semibold">Rooms Used:</span>{" "}
                        {summary.totalRooms}
                    </p>
                </div>
            )}

            {/* Allocation List */}
            <div className="space-y-3">
                {allocated.map((room) => {
                    const isPartial =
                        room.allocatedStudents < room.capacity;

                    return (
                        <div
                            key={room.id}
                            className={`border p-4 rounded ${isPartial ? "border-yellow-400" : "border-green-400"
                                }`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-semibold text-lg">
                                        {room.roomId}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Floor {room.floorNo}
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div>
                                        {room.capacity}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Students capacity
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Empty State */}
            {!loading && allocated.length === 0 && summary && (
                <p className="text-gray-500">No allocation available.</p>
            )}
        </div>
    );
}
