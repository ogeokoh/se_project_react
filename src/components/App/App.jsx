/**
 * App.jsx — Root component and application shell.
 *
 * Responsibilities:
 *   - Fetches weather data from OpenWeather API on mount
 *   - Fetches clothing items from json-server (localhost:3001) on mount
 *   - Manages all modal open/close state (add-garment, preview, delete-confirmation)
 *   - Handles add/delete API calls and updates clothingItems state
 *   - Provides CurrentTemperatureUnitContext to the entire tree
 *   - Configures React Router routes: "/" for Main, "/profile" for Profile
 *
 * Two servers must be running for full functionality:
 *   1. React dev server:  npm run dev
 *   2. Mock API server:   json-server --watch db.json --id _id --port 3001
 */

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Utilities
import { coordinates, apiKey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { getItems, addItem, deleteItem } from "../../utils/api";

// Context
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

// Layout components (appear on every route)
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

// Route-specific page components
import Main from "../Main/Main.jsx";
import Profile from "../Profile/Profile.jsx";

// Modal components
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";

function App() {
  // ─── Weather state ──────────────────────────────────────────────────────────
  const [weatherData, setWeatherData] = useState({
    city: "",
    temp: { F: 0, C: 0 },
    type: "cold",
    condition: "",
    isDay: false,
  });

  // ─── Clothing items (fetched from json-server) ──────────────────────────────
  const [clothingItems, setClothingItems] = useState([]);

  // ─── Modal state ────────────────────────────────────────────────────────────
  // Possible values: "" | "add-garment" | "preview" | "delete-confirmation"
  const [activeModal, setActiveModal] = useState("");

  // The card currently being previewed (or queued for deletion)
  const [selectedCard, setSelectedCard] = useState({});

  // ─── Temperature unit ───────────────────────────────────────────────────────
  // "F" by default; toggled by ToggleSwitch via context
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  // ─── Handlers ───────────────────────────────────────────────────────────────

  /** Toggle between Fahrenheit and Celsius */
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  /** Open item preview modal */
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  /** Open add-garment form modal */
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  /**
   * Transition from ItemModal to DeleteConfirmationModal.
   * The selectedCard is already set when ItemModal is open, so we just
   * switch the active modal.
   */
  const handleDeleteClick = () => {
    setActiveModal("delete-confirmation");
  };

  /** Close whichever modal is currently open */
  const closeActiveModal = () => {
    setActiveModal("");
  };

  /**
   * POST a new item to json-server, then prepend it to local state.
   * resetForm is the handleReset from useForm — only called after API success
   * so the form isn't cleared on a failed request.
   *
   * @param {{ name: string, imageUrl: string, weather: string }} itemData
   * @param {function} resetForm — resets AddItemModal fields
   */
  const handleAddItem = (itemData, resetForm) => {
    addItem(itemData)
      .then((newItem) => {
        // New items appear at the top of the list
        setClothingItems((prev) => [newItem, ...prev]);
        resetForm();
        closeActiveModal();
      })
      .catch((err) => console.error("Error adding item:", err));
  };

  /**
   * DELETE the selectedCard from json-server, then remove it from state.
   * After deletion both modals are closed and selectedCard is reset.
   */
  const handleCardDelete = () => {
    deleteItem(selectedCard._id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== selectedCard._id),
        );
        setSelectedCard({});
        closeActiveModal();
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  // ─── Effects ─────────────────────────────────────────────────────────────────

  /** Fetch current weather once on mount */
  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => console.error("Error fetching weather:", err));
  }, []);

  /**
   * Load clothing items from json-server once on mount.
   * The server must be running: json-server --watch db.json --id _id --port 3001
   */
  useEffect(() => {
    getItems()
      .then((items) => setClothingItems(items))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  /** Close the active modal when the user presses Escape */
  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    /*
     * BrowserRouter enables client-side routing.
     * Note: if deploying to GitHub Pages, swap BrowserRouter for HashRouter
     * to avoid 404s on direct URL access.
     */
    <BrowserRouter>
      {/*
       * CurrentTemperatureUnitContext.Provider wraps everything so that
       * WeatherCard, Main, and ToggleSwitch can all subscribe to the unit
       * without prop-drilling through intermediate components.
       */}
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            {/* Header is shown on every route */}
            <Header onAddClick={handleAddClick} weatherData={weatherData} />

            {/* Route definitions */}
            <Routes>
              {/* Root route — weather card + filtered clothing grid */}
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />

              {/* Profile route — user sidebar + full wardrobe */}
              <Route
                path="/profile"
                element={
                  <Profile
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    onAddClick={handleAddClick}
                  />
                }
              />
            </Routes>

            {/* Footer is shown on every route */}
            <Footer />
          </div>

          {/* ── Modals (rendered outside the route content) ─────────────────── */}

          {/* Add garment form — controlled via useForm hook */}
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItem}
            onCloseModal={closeActiveModal}
          />

          {/* Item preview — shows image, name, weather + delete button */}
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteClick={handleDeleteClick}
          />

          {/* Delete confirmation — opens after clicking delete in ItemModal */}
          <DeleteConfirmationModal
            isOpen={activeModal === "delete-confirmation"}
            onClose={closeActiveModal}
            onDeleteConfirm={handleCardDelete}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </BrowserRouter>
  );
}

export default App;
