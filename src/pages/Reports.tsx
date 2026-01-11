import React, { useMemo, useState } from "react";

type PaymentStatus = "Paid" | "Due" | "Refunded" | "Cancelled";

interface Report {
  id: number;
  order: string;
  date: string;
  customer: string;
  paymentStatus: PaymentStatus;
  fulfillment: string;
  shipping: string;
}

const MOCK: Report[] = [
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

export default function Reports() {
  const [data, setData] = useState<Report[]>(MOCK);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Report | null>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter(
      (r) =>
        r.order.toLowerCase().includes(q) ||
        r.customer.toLowerCase().includes(q) ||
        r.shipping.toLowerCase().includes(q)
    );
  }, [data, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  function handleAdd(newReport: Omit<Report, "id">) {
    const next: Report = { id: Date.now(), ...newReport };
    setData((d) => [next, ...d]);
    setShowAdd(false);
    setPage(1);
  }

  function handleUpdate(updated: Report) {
    setData((d) => d.map((it) => (it.id === updated.id ? updated : it)));
    setEditing(null);
  }

  function handleDelete(id: number) {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    setData((d) => d.filter((it) => it.id !== id));
  }

  function resetPaginationIfNeeded() {
    if (page > totalPages) setPage(totalPages);
  }

  // keep pagination valid when filtered length changes
  React.useEffect(() => {
    resetPaginationIfNeeded();
  }, [filtered.length, totalPages]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Manage orders, payments and shipping details.</p>
        </div>

        <div className="flex gap-3 items-center w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              className="w-full md:w-64 bg-gray-50 border border-gray-200 rounded-lg py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Search order"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {/* magnifier svg */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </div>
          </div>

          <button
            onClick={() => { setShowAdd((s) => !s); setEditing(null); }}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            {/* plus svg */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
            </svg>
            Add Order
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="bg-white border rounded-lg p-4 shadow">
          <AddEditForm
            onCancel={() => setShowAdd(false)}
            onSave={(r) => handleAdd(r)}
          />
        </div>
      )}

      {editing && (
        <div className="bg-white border rounded-lg p-4 shadow">
          <AddEditForm
            initial={editing}
            onCancel={() => setEditing(null)}
            onSave={(r) => handleUpdate({ ...(r as Report), id: editing.id })}
          />
        </div>
      )}

      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Fulfillment</th>
                <th className="px-4 py-3">Shipping</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">No results found</td>
                </tr>
              ) : (
                pageItems.map((r) => (
                  <tr key={r.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3 text-blue-600 font-medium">{r.order}</td>
                    <td className="px-4 py-3 text-gray-600">{r.date}</td>
                    <td className="px-4 py-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center text-white text-xs">{r.customer.split(" ")[0].charAt(0)}</div>
                      <span className="text-gray-700">{r.customer}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${paymentBadgeClass(r.paymentStatus)}`}>{r.paymentStatus}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">{r.fulfillment}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700">{r.shipping}</span>
                    </td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <button
                        onClick={() => { setEditing(r); setShowAdd(false); }}
                        className="p-1 rounded hover:bg-gray-100"
                        title="Edit"
                      >
                        {/* pencil */}
                        <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 11l6 6L7 21l-2-8 4-2z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="p-1 rounded hover:bg-gray-100"
                        title="Delete"
                      >
                        {/* trash */}
                        <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M8 6v12a2 2 0 002 2h4a2 2 0 002-2V6M10 6V4a2 2 0 012-2h0a2 2 0 012 2v2" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-600">Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, filtered.length)} of {filtered.length} items</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-2 rounded hover:bg-gray-100"
              disabled={page === 1}
              aria-label="Previous"
            >
              <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {[...Array(totalPages)].map((_, idx) => {
              const p = idx + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 rounded ${p === page ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
                >
                  {p}
                </button>
              );
            })}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="p-2 rounded hover:bg-gray-100"
              disabled={page === totalPages}
              aria-label="Next"
            >
              <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function paymentBadgeClass(status: PaymentStatus) {
  switch (status) {
    case "Paid":
      return "bg-green-50 text-green-700";
    case "Due":
      return "bg-orange-50 text-orange-700";
    case "Refunded":
      return "bg-gray-50 text-gray-700";
    case "Cancelled":
      return "bg-red-50 text-red-700";
    default:
      return "bg-gray-50 text-gray-700";
  }
}

function AddEditForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Partial<Report> | null;
  onSave: (r: Omit<Report, "id"> | Report) => void;
  onCancel: () => void;
}) {
  const [order, setOrder] = useState(initial?.order ?? "#" + Math.floor(Math.random() * 9000000 + 1000000));
  const [date, setDate] = useState(initial?.date ?? "15 February, 2024");
  const [customer, setCustomer] = useState(initial?.customer ?? "New Customer");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(initial?.paymentStatus as PaymentStatus ?? "Paid");
  const [fulfillment, setFulfillment] = useState(initial?.fulfillment ?? "Fulfilled");
  const [shipping, setShipping] = useState(initial?.shipping ?? "Standard");

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const payload = { order, date, customer, paymentStatus, fulfillment, shipping } as Omit<Report, "id">;
    onSave(initial && (initial as any).id ? { ...(payload as any), id: (initial as any).id } : payload);
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <input value={order} onChange={(e) => setOrder(e.target.value)} className="border rounded-lg px-3 py-2" />
      <input value={customer} onChange={(e) => setCustomer(e.target.value)} className="border rounded-lg px-3 py-2" />
      <input value={date} onChange={(e) => setDate(e.target.value)} className="border rounded-lg px-3 py-2" />

      <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)} className="border rounded-lg px-3 py-2">
        <option>Paid</option>
        <option>Due</option>
        <option>Refunded</option>
        <option>Cancelled</option>
      </select>

      <input value={fulfillment} onChange={(e) => setFulfillment(e.target.value)} className="border rounded-lg px-3 py-2" />
      <input value={shipping} onChange={(e) => setShipping(e.target.value)} className="border rounded-lg px-3 py-2" />

      <div className="md:col-span-3 flex gap-2 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded border">Cancel</button>
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Save</button>
      </div>
    </form>
  );
}
