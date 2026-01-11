import { useParams, useNavigate } from "react-router-dom";
import { MOCK } from "../data/reports";

export default function ReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const report = MOCK.find((r) => String(r.id) === id);

  if (!report) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold">Report not found</h2>
        <p className="text-gray-600 mt-2">No report matches the id provided.</p>
        <div className="mt-4">
          <button onClick={() => navigate('/reports')} className="px-4 py-2 rounded bg-blue-600 text-white">Back to list</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{report.order} — {report.customer}</h2>
        <button onClick={() => navigate('/reports')} className="px-3 py-1 rounded border">Back</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm text-gray-500">Date</h3>
          <p className="text-gray-800">{report.date}</p>
        </div>

        <div>
          <h3 className="text-sm text-gray-500">Payment status</h3>
          <p className="text-gray-800">{report.paymentStatus}</p>
        </div>

        <div>
          <h3 className="text-sm text-gray-500">Fulfillment</h3>
          <p className="text-gray-800">{report.fulfillment}</p>
        </div>

        <div>
          <h3 className="text-sm text-gray-500">Shipping</h3>
          <p className="text-gray-800">{report.shipping}</p>
        </div>
      </div>

      <div className="pt-4 border-t">
        <h3 className="text-lg font-semibold">Notes</h3>
        <p className="text-gray-600 mt-2">This is a mock detail page for demonstration. Replace with API-driven data as needed.</p>
      </div>
    </div>
  );
}
