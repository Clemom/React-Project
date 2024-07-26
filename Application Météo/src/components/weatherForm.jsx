import { useState } from "react";

export default function WeatherForm({ onChangeCity }) {
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);

  function onChange(e) {
    const value = e.target.value;
    setCity(value);
    if (value) {
      setError(null);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (city.trim() === "") {
      setError("Le champ de la ville ne peut pas être vide.");
      return;
    }
    onChangeCity(city);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={onChange} />
      <button type="submit">Rechercher</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}
