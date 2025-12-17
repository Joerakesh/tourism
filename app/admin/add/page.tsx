"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPlace() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        location: "",
        image: "", // Simple string for now
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/places", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                images: [form.image], // Convert single string to array
            }),
        });

        if (res.ok) {
            alert("Place Added!");
            router.push("/"); // Go back home to see it
        } else {
            alert("Failed to add place");
        }
    };

    return (
        <div className="max-w-xl mx-auto py-10 px-6">
            <h1 className="text-2xl font-bold mb-6">Add New Destination</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    placeholder="Place Name (e.g. Munnar)"
                    className="w-full p-3 border rounded"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Description"
                    className="w-full p-3 border rounded"
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                />
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="number"
                        placeholder="Price (₹)"
                        className="w-full p-3 border rounded"
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        required
                    />
                    <input
                        placeholder="Location"
                        className="w-full p-3 border rounded"
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        required
                    />
                </div>
                <input
                    placeholder="Image URL (Unsplash link)"
                    className="w-full p-3 border rounded"
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    required
                />
                <button className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700">
                    Create Place
                </button>
            </form>
        </div>
    );
}