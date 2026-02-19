import { useEffect, useState } from "react";
import { useApi } from "../api/useApi";
import type { Classroom } from "../types/classroom";
import { apiRequest } from "../api/client";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Link } from "react-router-dom";

export default function ClassroomList() {
    const { callApi, loading, error } = useApi();
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);

    useEffect(() => {
        const fetchClassrooms = async () => {
            const data = await callApi(() =>
                apiRequest<Classroom[]>("/classrooms/")
            );

            if (data) {
                setClassrooms(data);
            }
        };

        fetchClassrooms();
    }, []);

    return (
        <div className="max-w-4xl mx-auto mt-10 space-y-6">
            {/* Header */}
            <h1 className="text-4xl mx-auto w-max">SYMB Assignment - Ashish Kumar</h1>
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Classroom List</h2>
                <div className="space-x-2">
                    <Link to="/add">
                        <Button>Add Classroom</Button>
                    </Link>
                    <Link to="/allocate">
                        <Button variant="secondary">Allocate Exam</Button>
                    </Link>
                </div>
            </div>

            {/* Loading */}
            {loading && <p>Loading classrooms...</p>}

            {/* Error */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Empty State */}
            {!loading && classrooms.length === 0 && (
                <p>No classrooms available. Add one to get started.</p>
            )}

            {/* Classroom Cards */}
            <div className="grid md:grid-cols-2 gap-4">
                {classrooms.map((room) => (
                    <Card key={room.id}>
                        <CardContent className="p-4 space-y-2">
                            <p className="font-semibold text-lg">{room.roomId}</p>
                            <p>Capacity: {room.capacity}</p>
                            <p>Floor: {room.floorNo}</p>
                            <p>
                                Near Washroom:{" "}
                                {room.nearWashroom ? "Yes" : "No"}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
