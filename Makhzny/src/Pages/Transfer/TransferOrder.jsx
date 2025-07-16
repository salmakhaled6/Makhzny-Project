import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../Styles/TransferOrder.css';

function TransferOrder() {
  const [orders, setOrders] = useState([]);
  const [cities, setCities] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resOrders = await axios.get('https://makhzny.odoo.com/api/transport_requests/4202');

        const resCities = await axios.get('https://makhzny.odoo.com/api/get_cities');
        const cityMap = {};
        resCities.data.data.forEach(city => {
          cityMap[city.id] = city.name;
        });

        setCities(cityMap);

        const formatted = resOrders.data.data.map(order => ({
          number: `ORD${order.id}`,
          date: order.date || 'N/A',
          status: order.status || 'Pending',
          content: `From: ${order.detailed_address_from || 'N/A'}\nTo: ${cityMap[order.city_id] || 'Unknown City'}\nNotes: ${order.notes || 'None'}`,
        }));

        setOrders(formatted);
      } catch (error) {
        console.error('Failed to fetch transport orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="transfer-order-container">
      <div className="transfer-request">
        <div className="transfer-request-box">
          <h2>Moving request</h2>
          <p>
            "We ensure safe and fast transfer of your belongings. Professional moving service – Punctual & fully insured"
          </p>
        </div>
      </div>

      <h3 className="orders-heading">Current Orders</h3>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No transfer requests found.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Order Date</th>
              <th>Order Status</th>
              <th>Order Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.number}</td>
                <td>{order.date}</td>
                <td>{order.status}</td>
                <td>
                  <button className="view-btn" onClick={() => handleViewDetails(order)}>
                    View details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isModalOpen && selectedOrder && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Order {selectedOrder.number}</h3>
            <pre>{selectedOrder.content}</pre>
            <button onClick={closeModal} className="close-modal-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransferOrder;
