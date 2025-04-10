// src/Home.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./supabase";

// Regels per koerier (zoals in Couriers.jsx)
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
    "DE KOERANT",
  ],
  "Mondial Relay": [
    "Aqua service",
  ],
};

function intersectArrays(arrays) {
  if (arrays.length === 0) return [];
  return arrays.reduce((a, b) => a.filter((c) => b.includes(c)));
}

export default function Home() {
  const [packages, setPackages] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  async function fetchPackages() {
    const { data, error } = await supabase.from("packages").select("*");
    if (error) console.error("Fout bij ophalen:", error);
    else setPackages(data);
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Ben je zeker dat je dit pakket wil verwijderen?");
    if (!confirmDelete) return;
    const { error } = await supabase.from("packages").delete().eq("id", id);
    if (error) alert("Fout bij verwijderen: " + error.message);
    else fetchPackages();
  }

  function toggleSelect(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function selectAll() {
    if (selectedIds.length === packages.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(packages.map((p) => p.id));
    }
  }

  const selectedCouriers = packages
    .filter((p) => selectedIds.includes(p.id))
    .map((p) => p.courier)
    .filter((c) => courierRules[c]);

  const selectedRules = selectedCouriers.map((c) => courierRules[c]);
  const sharedRules = intersectArrays(selectedRules);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">📦 Ralfs RetourHub</h1>
        <div className="flex gap-2">
          <Link
            to="/couriers"
            className="bg-gray-200 text-black px-4 py-2 rounded-xl hover:opacity-90"
          >
            📘 Koeriers
          </Link>
          <Link
            to="/add"
            className="bg-black text-white px-4 py-2 rounded-xl hover:opacity-90"
          >
            ➕ Nieuw pakket
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative border rounded-2xl shadow p-4 bg-white flex flex-col justify-between ${selectedIds.includes(pkg.id) ? "ring-2 ring-blue-500" : ""}`}
          >
            <div className="absolute top-3 right-3 flex gap-2">
              <input
                type="checkbox"
                checked={selectedIds.includes(pkg.id)}
                onChange={() => toggleSelect(pkg.id)}
                title="Selecteer voor retour"
              />
              <Link
                to={`/edit/${pkg.id}`}
                className="text-xl hover:opacity-70"
                title="Bewerken"
              >
                ✏️
              </Link>
              <button
                onClick={() => handleDelete(pkg.id)}
                className="text-xl hover:opacity-70"
                title="Verwijderen"
              >
                🗑️
              </button>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">
                {pkg.webshop} → {pkg.courier}
              </h2>
              <p>👤 {pkg.person}</p>
              <p>📅 Deadline: {pkg.deadline}</p>
              <p className="mt-2">🚚 Verzendopties:</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {(courierRules[pkg.courier] || ["Geen regels beschikbaar"]).map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>
            <span
              className={`mt-3 inline-block px-3 py-1 rounded-full text-white text-sm font-medium ${
                pkg.status === "Te doen"
                  ? "bg-red-500"
                  : pkg.status === "In behandeling"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            >
              {pkg.status}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 mb-4">
        <button
          onClick={selectAll}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:opacity-90"
        >
          {selectedIds.length === packages.length ? "Deselecteer alles" : "Selecteer alles"}
        </button>
      </div>

      <div className="mt-4 bg-gray-100 p-4 rounded-xl">
        <h2 className="text-xl font-bold mb-2">🔍 Geoptimaliseerde Retourlocaties</h2>
        {selectedIds.length === 0 ? (
          <p className="text-gray-600">Selecteer pakketten om te optimaliseren.</p>
        ) : sharedRules.length > 0 ? (
          <ul className="list-disc pl-6 text-gray-800">
            {sharedRules.map((r, idx) => (
              <li key={idx}>{r}</li>
            ))}
          </ul>
        ) : (
          <p className="text-red-600 font-medium">
            ❌ Geen gemeenschappelijke verzendlocatie beschikbaar.
          </p>
        )}
      </div>
    </main>
  );
}
