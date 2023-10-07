export function calculateDiscount(finalPrice, discountPercentage) {
  const discountAmount = finalPrice * (discountPercentage / 100);
  const discountPrice = finalPrice - discountAmount;
  return discountPrice.toFixed(2);
}
