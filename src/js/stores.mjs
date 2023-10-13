import { writable } from "svelte/store";
import { getCartAmount} from "./utils.mjs";

export const cartCount = writable(getCartAmount());