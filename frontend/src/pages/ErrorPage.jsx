export default function ErrorPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-red-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
                <p className="text-xl text-gray-700 mb-8">
                    Failed due to some error
                </p>
                <a
                    href="/"
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                    Go Home
                </a>
            </div>
        </div>
    );
}
