export default async function Page({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">User Detail</h1>
                <p className="text-sm text-gray-500">Viewing user information</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
                <p className="text-sm text-gray-500">User ID</p>
                <p className="mt-1 text-lg font-semibold text-gray-900 break-all">{id}</p>
            </div>
        </div>
    );
}