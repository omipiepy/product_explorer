import { describe, it, expect } from "vitest";
import { cartReducer } from "../context/cartReducer";

const phone = { id: 1, title: "Phone", price: 100, thumbnail: "a.jpg", stock: 3 };

describe("cartReducer", () => {
  it("adds a new product with quantity 1", () => {
    const state = cartReducer([], { type: "ADD", product: phone });
    expect(state).toHaveLength(1);
    expect(state[0].quantity).toBe(1);
  });

  it("increases quantity instead of adding a duplicate", () => {
    let state = cartReducer([], { type: "ADD", product: phone });
    state = cartReducer(state, { type: "ADD", product: phone });
    expect(state).toHaveLength(1);
    expect(state[0].quantity).toBe(2);
  });

  it("does not go above stock", () => {
    let state = [];
    for (let i = 0; i < 10; i++) {
      state = cartReducer(state, { type: "ADD", product: phone });
    }
    expect(state[0].quantity).toBe(3);
  });

  it("removes an item", () => {
    const state = cartReducer(
      [{ ...phone, quantity: 1 }],
      { type: "REMOVE", id: 1 }
    );
    expect(state).toHaveLength(0);
  });

  it("changes quantity but never below 1", () => {
    const start = [{ ...phone, quantity: 2 }];

    const up = cartReducer(start, { type: "SET_QUANTITY", id: 1, quantity: 3 });
    expect(up[0].quantity).toBe(3);

    const down = cartReducer(start, { type: "SET_QUANTITY", id: 1, quantity: 0 });
    expect(down[0].quantity).toBe(2);
  });

  it("clears the cart", () => {
    const state = cartReducer([{ ...phone, quantity: 1 }], { type: "CLEAR" });
    expect(state).toEqual([]);
  });
});