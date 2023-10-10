// Define a constant 'discountPercentage' with a value of 18.
const discountPercentage = 18;

export function calculateDiscount(finalPrice) {
  const discountAmount = finalPrice * (discountPercentage / 100);
  const discountPrice = finalPrice - discountAmount;
  return discountPrice.toFixed(2);
}
