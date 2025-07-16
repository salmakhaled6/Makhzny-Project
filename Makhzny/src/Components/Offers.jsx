import React, { useEffect, useState } from 'react';

function Offers() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://makhzny.odoo.com/get_offers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })
      .then(res => res.json())
      .then(data => {
        console.log("Offers response:", data);
        setImages(data?.result || []);
      })
      .catch(err => {
        console.error("Failed to load offers:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="offers-container">

      {loading && <p>Loading...</p>}

      {!loading && images.length === 0 && <p>No offers available.</p>}

      <div className="offers-gallery">
        {images.map((img, index) => (
          <img
            key={index}
            src={`https://makhzny.odoo.com${img.download_url}`}
            alt={img.name || `Offer ${index + 1}`}
            className="offer-image"
          />
        ))}
      </div>
    </div>
  );
}

export default Offers;
