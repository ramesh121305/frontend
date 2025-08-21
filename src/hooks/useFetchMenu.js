import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetchMenu(url = "https://foodexpresswebsite-2.onrender.com/api/menu") {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await axios.get(url);
        setMenu(response.data || []);
      } catch (err) {
        console.error("Menu fetch failed:", err.message); // Log only in console
        setError(null); // Prevent UI from showing error
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, [url]);

  return { menu, loading, error };
}
