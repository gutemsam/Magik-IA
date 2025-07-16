import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [comprasFinalizadas, setComprasFinalizadas] = useState([]);

  const adicionarAoCarrinho = (carta) => {
    setCart((prev) => {
      const existente = prev.find((item) => item.id === carta.id);
      if (existente) {
        return prev.map((item) =>
          item.id === carta.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { ...carta, quantidade: 1 }];
    });
  };

  const alterarQuantidade = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantidade: Math.max(1, item.quantidade + delta) }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };

const finalizarCompra = () => {
  if (cart.length === 0) return;

  // Armazena o carrinho atual como uma compra completa (um array de itens)
  setComprasFinalizadas((prev) => [...prev, [...cart]]); // <- salva como uma nova compra

  // Limpa o carrinho
  setCart([]);
};

  return (
    <CartContext.Provider
      value={{
        cart,
        adicionarAoCarrinho,
        alterarQuantidade,
        finalizarCompra,
        comprasFinalizadas,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
