import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "./supabase";

export default function EditPackage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    async function loadPackage() {
      const { data, error } = await supabase
        .from("packages")
        .select("*")
        .eq("id", id)
        .single();

      if (error) alert("Fout bij ophalen: " + error.message);
      else setForm(data);
    }

    loadPackage();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("packages")
      .update(form)
      .eq("id", id);

    if (error) alert("Fout bij updaten: " + error.message);
    else navigate("/");
  };

  if (!form) return <p className="p-6">⏳ Laden...</p>;

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">✏️ Pakket Bewerken</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Persoon", name: "person" },
          { label: "Webshop", name: "webshop" },
          { label: "Koerier", name: "courier" },
          { label: "Deadline", name: "deadline", type: "date" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block font-medium mb-1">{label}</label>
            {/* Koerier als select */}
            {name === "courier" ? (
              <select
                name={name}
                value={form[name] || ""}
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
                value={form[name] || ""}
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
