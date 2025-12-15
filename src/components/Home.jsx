import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import AppContext from "../Context/Context";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { data, isError, refreshData } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
      setIsDataFetched(true);
    }
  }, [refreshData, isDataFetched]);

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8080/api/products"
          );
          setProducts(response.data);
          console.log(products);
          
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [data]);

  if (isError) {
    return (
      <h2 className="text-center" style={{ padding: "10rem" }}>
        Something went wrong...
      </h2>
    );
  }

return (
    <div className="grid">
      {products.map((product) => (
        <div
          className="card mb-3"
          key={product.Id}
          style={{
            width: "18rem",
            height: "14rem",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 2px 3px",
            margin: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 className="card-title">
                {product.name.toUpperCase()}
              </h5>
              <span>
                by <i>{product.brand}</i>
              </span>
            </div>

            <div>
              <h5>${product.price}</h5>

              <button
                className="btn btn-outline-secondary w-100 mb-2"
                onClick={() => navigate(`/product/${product.Id}`)}
              >
                View Details
              </button>

              <button
                className="btn btn-primary w-100"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;