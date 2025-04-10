import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

export default function AddPackage() {
  const [form, setForm] = useState({
    person: "",
    webshop: "",
    courier: "",
    deadline: "",
    method: "Afgeven",
    status: "Te doen",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("packages").insert([form]);
    if (error) alert("Fout bij opslaan: " + error.message);
    else navigate("/");
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">➕ Nieuw Pakket</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Persoon", name: "person" },
          { label: "Webshop", name: "webshop" },
          { label: "Koerier", name: "courier" },
          { label: "Deadline", name: "deadline", type: "date" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block font-medium mb-1">{label}</label>
            {/* Als het een koerier is, maak een select */}
            {name === "courier" ? (
              <select
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2"
              >
                <option value="">Kies een koerier</option>
                <option value="Bpost">Bpost</option>
                <option value="DHL">DHL</option>
                <option value="UPS">UPS</option>
                <option value="DPD">DPD</option>
                <option value="Mondial Relay">Mondial Relay</option>
              </select>
            ) : (
              <input
                required
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2"
              />
            )}
          </div>
        ))}


<div>
          <label className="block font-medium mb-1">Status</label>
          <select
            name="status"
            value={form.status || ""}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2"
          >
            <option>Te doen</option>
            <option>In behandeling</option>
            <option>Afgewerkt</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-xl hover:opacity-90"
        >
          Opslaan
        </button>
      </form>
    </main>
  );
}
