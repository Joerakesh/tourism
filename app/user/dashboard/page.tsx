import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function UserDashboard() {
    const session = await getServerSession(authOptions);

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold">User Dashboard</h1>
            <p className="mt-2 text-gray-600">
                Vanga, {session?.user.name}
            </p>
        </div>
    );
}
