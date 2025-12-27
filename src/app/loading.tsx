export default function Loading() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Skeleton Header */}
            <div className="h-20 w-full flex items-center justify-center border-b border-grey-100">
                <div className="w-48 h-8 bg-grey-100 rounded-lg animate-pulse" />
            </div>

            {/* Skeleton Navbar */}
            <div className="mt-8 flex justify-center gap-4 px-4 overflow-hidden">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-[100px] h-[80px] bg-grey-100 rounded-xl animate-pulse" />
                ))}
            </div>

            {/* Skeleton Grid */}
            <div className="flex-1 max-w-6xl mx-auto w-full p-8">
                <div className="w-64 h-10 bg-grey-100 rounded-lg animate-pulse mx-auto mb-10" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[280px]">
                    {/* Simulate different sized skeletons */}
                    <div className="col-span-1 row-span-1 bg-grey-100 rounded-3xl animate-pulse" />
                    <div className="col-span-1 sm:col-span-2 row-span-1 bg-grey-100 rounded-3xl animate-pulse" />
                    <div className="col-span-1 row-span-1 bg-grey-100 rounded-3xl animate-pulse" />
                    <div className="col-span-1 sm:col-span-2 row-span-2 bg-grey-100 rounded-3xl animate-pulse" />
                    <div className="col-span-1 row-span-1 bg-grey-100 rounded-3xl animate-pulse" />
                    <div className="col-span-1 row-span-1 bg-grey-100 rounded-3xl animate-pulse" />
                </div>
            </div>
        </div>
    );
}
