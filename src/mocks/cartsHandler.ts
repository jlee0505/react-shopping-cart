import { rest } from "msw";
import { db } from "../store/db";

const CARTS = db.carts;

export const cartsHandlers = [
  rest.get("/cart", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(CARTS));
  }),
  rest.post("/cart", async (req, res, ctx) => {
    const cartItem = await req.json();
    const currentCartItem = { ...cartItem, id: CARTS.length + 1 };
    CARTS.push(currentCartItem);

    return res(ctx.status(200), ctx.json(currentCartItem));
  }),
  rest.delete("/cart/:cardId", (req, res, ctx) => {
    const { cardId } = req.params;
    const cartIndex = CARTS.findIndex((cart) => cart.id === +cardId);

    CARTS.splice(cartIndex, 1);

    return res(
      ctx.json({
        message: "Delete successfully",
      })
    );
  }),
];
