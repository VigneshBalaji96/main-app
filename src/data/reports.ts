export type PaymentStatus = "Paid" | "Due" | "Refunded" | "Cancelled";

export interface Report {
  id: number;
  order: string;
  date: string;
  customer: string;
  paymentStatus: PaymentStatus;
  fulfillment: string;
  shipping: string;
}

export const MOCK: Report[] = [
  { id: 1, order: "#4544321", date: "04 February, 2024", customer: "Yaga Masamichi", paymentStatus: "Paid", fulfillment: "Fulfilled", shipping: "Standard" },
  { id: 2, order: "#1644322", date: "05 February, 2024", customer: "Manami Suda", paymentStatus: "Paid", fulfillment: "Partially Fulfilled", shipping: "Express" },
  { id: 3, order: "#8244323", date: "06 February, 2024", customer: "Okkotsu Yuta", paymentStatus: "Refunded", fulfillment: "Unfulfilled", shipping: "Standard" },
  { id: 4, order: "#6944324", date: "07 February, 2024", customer: "Kugisaki Nobara", paymentStatus: "Paid", fulfillment: "Fulfilled", shipping: "Standard" },
  { id: 5, order: "#1244325", date: "07 February, 2024", customer: "Nanami Kento", paymentStatus: "Cancelled", fulfillment: "Fulfilled", shipping: "Economy" },
  { id: 6, order: "#4844326", date: "08 February, 2024", customer: "Fushiguro Megumi", paymentStatus: "Due", fulfillment: "Partially Fulfilled", shipping: "Express" },
  { id: 7, order: "#2744327", date: "09 February, 2024", customer: "Nitta Akari", paymentStatus: "Paid", fulfillment: "Fulfilled", shipping: "Standard" },
  { id: 8, order: "#3544328", date: "10 February, 2024", customer: "Inumaki Toge", paymentStatus: "Paid", fulfillment: "Fulfilled", shipping: "Economy" },
  { id: 9, order: "#3544330", date: "11 February, 2024", customer: "Itadori Yuji", paymentStatus: "Paid", fulfillment: "Fulfilled", shipping: "Standard" },
  { id: 10, order: "#3544331", date: "12 February, 2024", customer: "Gojo Satoru", paymentStatus: "Paid", fulfillment: "Fulfilled", shipping: "Express" },
  { id: 11, order: "#3544332", date: "13 February, 2024", customer: "Nanami Kento", paymentStatus: "Paid", fulfillment: "Fulfilled", shipping: "Standard" },
  { id: 12, order: "#3544333", date: "14 February, 2024", customer: "Nitta Akari", paymentStatus: "Paid", fulfillment: "Fulfilled", shipping: "Economy" },
];
