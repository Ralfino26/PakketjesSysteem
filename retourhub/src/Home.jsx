// src/Home.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./supabase";

export default function Home() {
  const [packages, setPackages] = useState([]);

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
            className="relative border rounded-2xl shadow p-4 bg-white flex flex-col justify-between"
          >
            <div className="absolute top-3 right-3 flex gap-2">
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
              <p>🚚 Methode: {pkg.method}</p>
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
    </main>
  );
}
