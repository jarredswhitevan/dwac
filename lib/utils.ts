export const formatMoney = (cents?: number | null) => cents ? `$${(cents/100).toLocaleString()}` : "Call for Price";
