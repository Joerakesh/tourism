"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin() {
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.ok) {
            const sessionRes = await fetch("/api/auth/session");
            const session = await sessionRes.json();

            const role = session.user.role;

            if (role === "admin") router.push("/admin/dashboard");
            else if (role === "guide") router.push("/guide/dashboard");
            else router.push("/user/dashboard");
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="bg-white p-8 rounded-xl w-96 shadow">
                <h1 className="text-2xl font-bold mb-6">Login</h1>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <input
                    className="w-full p-2 border rounded mb-3"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="w-full p-2 border rounded mb-4"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    Login
                </button>
            </div>
        </div>
    );
}
