import axios from 'axios';

const BASE_URL = 'https://makhzny.odoo.com';

export const getBranches = async (filters = {}) => {
  try {
    const payload = {
      ...(filters.company_id && { company_id: filters.company_id }),
      min_price: filters.Min_Price,
      max_price: filters.Max_Price,
      min_size: filters.Min_Size,
      max_size: filters.Max_Size,
    };

    if (filters.Max_Price !== undefined) {
      payload.price = filters.Max_Price;
    }

    if (filters.Max_Size !== undefined) {
      payload.size = filters.Max_Size;
    }

    const res = await axios.post(`${BASE_URL}/get_products`, payload);
    return res.data.result.data || [];
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};
