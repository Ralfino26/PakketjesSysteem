// src/Couriers.jsx

export default function Couriers() {
    const data = [
      {
        name: "Bpost",
        rules: [
          "Greenhouse automaat (pakjes automaat): Download de bpost app.",
          "Handmatig verzenden: DAGBLADHANDEL LAMMENS, DE KOERANT.",
          "Meegeven aan bpost leverancier: Als de postbode een pakket bij ons komt leveren.",
        ],
      },
      {
        name: "DHL",
        rules: [
          "LOCKER GREENHOUSE: Pakket inleveren bij de lockers.",
          "Handmatig verzenden: DAGBLADHANDEL LAMMENS, DE KOERANT BVBA.",
        ],
      },
      {
        name: "UPS",
        rules: [
          "Afhaling: https://wwwapps.ups.com/pickup/schedule?loc=nl_BE",
          "Handmatig verzenden: DE KOERANT.",
        ],
      },
      {
        name: "DPD",
        rules: ["Handmatig verzenden: DE KOERANT."],
      },
      {
        name: "Mondial Relay",
        rules: ["Handmatig verzenden: Aqua service"],
      },
    ];
  
    return (
      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🚚 Koeriers & Retourregels</h1>
        <div className="space-y-6">
          {data.map((courier) => (
            <div
              key={courier.name}
              className="bg-white rounded-2xl shadow p-4 border"
            >
              <h2 className="text-xl font-semibold mb-2">{courier.name}</h2>
              <ul className="list-disc pl-6 space-y-1">
                {courier.rules.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
    );
  }
  
  
  // Voeg in main.jsx toe:
  // import Couriers from './Couriers'
  // <Route path="/couriers" element={<Couriers />} />