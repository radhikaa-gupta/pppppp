import React, { useState } from "react";
import { db } from "./firebase";
import { ref, set } from "firebase/database";

const ShoppingListInput = ({ setCategorizedList }) => {
  const [list, setList] = useState("");

  const handleInputChange = (e) => {
    setList(e.target.value);
  };

  const handleSubmit = async () => {
    const listArray = list.split("\n");

    // Save list to Firebase
    await set(ref(db, "shoppingList"), { items: listArray });

    // Send list to Gemini API for categorization
    const categorized = await fetchCategorizedList(listArray);
    setCategorizedList(categorized);
  };

  const fetchCategorizedList = async (listArray) => {
    const response = await fetch("/categorize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ list: listArray }),
    });

    const data = await response.json();
    return data.categorizedList;
  };

  return (
    <div>
      <textarea
        value={list}
        onChange={handleInputChange}
        placeholder="Enter your grocery list, one item per line"
      />
      <button onClick={handleSubmit}>Categorize List</button>
    </div>
  );
};

export default ShoppingListInput;
