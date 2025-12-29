import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [assets, setAssets] = useState([]);
  const [assetName, setAssetName] = useState("");
  const [assetType, setAssetType] = useState("stock");
  const [assetValue, setAssetValue] = useState("");

  const token = localStorage.getItem("token"); // JWT token

  const colors = ["#6a0dad", "#a64ca6", "#e63946", "#f1c40f", "#ff7f50", "#2a9d8f"];

  const fetchAssets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/assets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchAssets();
  }, [token]);

  const addAsset = async (e) => {
    e.preventDefault();
    if (!assetName || !assetValue) return;

    try {
      await axios.post(
        "http://localhost:5000/api/assets",
        {
          assetName,
          assetType,
          buyValue: Number(assetValue),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAssetName("");
      setAssetValue("");
      setAssetType("stock");
      fetchAssets();
    } catch (err) {
      console.error(err);
      alert("Error adding asset");
    }
  };

  const deleteAsset = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/assets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAssets();
    } catch (err) {
      console.error(err);
    }
  };

  // Aggregate assets by type for pie chart
  const chartData = Object.values(
    assets.reduce((acc, a) => {
      const type = (a.assetType || "N/A").toUpperCase();
      if (!acc[type]) acc[type] = { name: type, value: 0 };
      acc[type].value += a.buyValue || 0;
      return acc;
    }, {})
  );

  // Custom label for showing percentage
  const renderLabel = ({ name, value, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`;

  return (
    <div className="dashboard-container">
      <h2>My Assets</h2>

      {/* Add Asset Form */}
      <div className="dashboard-card">
        <h3>Add New Asset</h3>
        <form onSubmit={addAsset}>
          <input
            type="text"
            placeholder="Asset Name"
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
            required
          />
          <select
            value={assetType}
            onChange={(e) => setAssetType(e.target.value)}
          >
            <option value="fd">FD</option>
            <option value="bond">Bond</option>
            <option value="mutualfund">Mutual Fund</option>
            <option value="stock">Stock</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
          </select>
          <input
            type="number"
            placeholder="Buy Value"
            value={assetValue}
            onChange={(e) => setAssetValue(e.target.value)}
            required
          />
          <button type="submit" className="auth-btn">
            Add Asset
          </button>
        </form>
      </div>

      {/* Current Assets List */}
      <div className="dashboard-card asset-list">
        <h3>Current Assets</h3>
        {assets.length === 0 && <p>No assets yet.</p>}
        {assets.map((a, index) => (
          <div key={a._id} className="asset-item">
            <div>
              <strong>{a.assetName || "Unnamed"}</strong> -{" "}
              {(a.assetType || "N/A").toUpperCase()}
            </div>
            <div>
              ₹{a.buyValue || 0}{" "}
              <button
                className="delete-btn"
                onClick={() => deleteAsset(a._id)}
                style={{ backgroundColor: colors[index % colors.length] }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pie Chart */}
      {chartData.length > 0 && (
        <div className="chart-container">
          <h3>Asset Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={renderLabel}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
