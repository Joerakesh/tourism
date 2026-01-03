"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    async function handleRegister() {
        const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(form),
        });

        if (res.ok) router.push("/login");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="bg-white p-8 rounded-xl w-96 shadow">
                <h1 className="text-2xl font-bold mb-6">Register</h1>

                <input
                    className="w-full p-2 border rounded mb-3"
                    placeholder="Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    className="w-full p-2 border rounded mb-3"
                    placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                    className="w-full p-2 border rounded mb-4"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button
                    onClick={handleRegister}
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    Create Account
                </button>
            </div>
        </div>
    );
}
