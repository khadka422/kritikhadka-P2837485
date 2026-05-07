import axios from "axios";

const API_URL = "http://localhost:3000/api/order";

// Place an order
export const placeOrder = async (cartItems, token) => {
  // Map cart items to the API format
  const items = cartItems.map((item) => ({
    productId: item.id, // your product ID
    quantity: item.quantity,
  }));

  const response = await axios.post(
    API_URL,
    { items },
    {
      headers: {
        Authorization: `Bearer ${token}`, // <-- include JWT token
      },
    },
  );

  return response.data;
};
