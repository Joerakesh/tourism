import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function GuideDashboard() {
    const session = await getServerSession(authOptions);

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold">Guide Dashboard</h1>
            <p className="mt-2 text-gray-600">
                Hello Guide, {session?.user.name}
            </p>
        </div>
    );
}
