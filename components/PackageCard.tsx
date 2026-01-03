export default function PackageCard() {
    return (
        <div className="border rounded-lg p-4 bg-white">
            <h3 className="font-semibold text-lg">
                3 Days Ooty Trip
            </h3>

            <p className="text-gray-600 text-sm mb-2">
                3 Days / 2 Nights
            </p>

            <p className="font-bold text-blue-600 mb-3">
                ₹12,999
            </p>

            <button className="w-full bg-blue-600 text-white py-2 rounded">
                Enquire Now
            </button>
        </div>
    );
}
