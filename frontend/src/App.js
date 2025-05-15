import React from "react";
import Footer from "./components/common/Footer";
import AppRoutes from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { QueryProvider } from "./context/QueryContext";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <QueryProvider>
        
          <AppRoutes />
          <Footer />
        </QueryProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
