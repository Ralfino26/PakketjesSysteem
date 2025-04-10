// src/Couriers.jsx

const courierRules = {
  Bpost: [
    "Greenhouse Locker",
    "Postbode",
    "Dagbladhandel Lammens",
    "De Koerant",
  ],
  DHL: [
    "Greenhouse Locker",
    "Dagbladhandel Lammens",
  ],
  UPS: [
    "Afhaling via UPS website",
    "De Koerant",
  ],
  DPD: [
    "De Koerant",
  ],
  "Mondial Relay": [
    "Aqua service",
  ],
};

export default function Couriers() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🚚 Koeriers & Retourregels</h1>
      <div className="space-y-6">
        {Object.entries(courierRules).map(([name, rules]) => (
          <div
            key={name}
            className="bg-white rounded-2xl shadow p-4 border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-2">{name}</h2>
            <ul className="list-disc pl-6 space-y-1 text-gray-800">
              {rules.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
