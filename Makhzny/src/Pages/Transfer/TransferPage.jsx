import React, { useEffect, useState } from "react";
import axios from "axios";
import TransferRequest from "./TransferRequest"; 
import TransferOrder from "./TransferOrder";    

function TransferPage() {
  const [hasRequests, setHasRequests] = useState(null); 
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const res = await axios.get(
          `https://makhzny.odoo.com/api/transport_requests/${currentUser.id}`
        );
        const requests = res.data?.data || [];
        setHasRequests(requests.length > 0);
      } catch (err) {
        console.error("Error fetching user requests", err);
        setHasRequests(false); 
      }
    };

    fetchUserRequests();
  }, []);

  if (hasRequests === null) return <p>Loading..</p>; 

  return hasRequests ? <TransferOrder /> : <TransferRequest />;
}

export default TransferPage;
