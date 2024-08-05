import React, { useEffect, useState } from "react";
import Logo from "./logo";
import "./comparepagecss.css";
import Axios from "axios";
import { IoStar } from "react-icons/io5";

function Compare() {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [variationDetails, setVariationDetails] = useState([]);
  const [producttableDetails, setproducttableDetails] = useState([])

  useEffect(() => {
    Axios.get("http://localhost:3000/comparetable?usersid=eq.1")
      .then((res) => {
        console.log("Compare table response:", res.data);
        if (res.data.length > 0) {
          const productIds = res.data.map(item => item.productid);
          setProducts(productIds);
        }
      })
      .catch((error) => {
        console.error("Error fetching compare details:", error);
      });
  }, []);


  useEffect(() => {
    if (products.length > 0) {
      const fetchProductDetails = async () => {

        const productRequests = products.map(productId =>
          Axios.get(`http://localhost:3000/listing?id_listing=eq.${productId}`)
        );
        try {
          const responses = await Promise.all(productRequests);
          const productData = responses.map(res => res.data[0]);
          setProductDetails(productData);

          const variationRequests = productData.map(product =>
            Axios.get(`http://localhost:3000/variation?listing_id=eq.${product.id_listing}`)
          );
          const variationResponses = await Promise.all(variationRequests);
          const variationData = variationResponses.map(res => res.data[0]);
          setVariationDetails(variationData);
        } catch (error) {
          console.error("Error fetching product details or variations:", error);
        }
      };

      fetchProductDetails();
    }
  }, [products]);

  if (products.length === 0 || productDetails.length === 0 || variationDetails.length === 0) {
    return <p>Loading...</p>;
  }

  const handleAddToCompare = (productId) => {
    console.log(`Add to Compare button clicked for product ID: ${productId}`);
  };

  return (
    <>
      <Logo />
      <p className="nav">Home / Compare</p>
      <p className="nav">No. of items: {products.length}</p>
      <h2 className="nav">Your Compare Items:</h2>
      <div className="maindiv">
        {products.map((productId, index) => {
          const product = productDetails[index];
          const variation = variationDetails[index];

          if (!product || !variation) {
            console.log(`Skipping product ${index}:`, { product, variation });
            return null;
          }

          let images;
          try {
            images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images;
          } catch (error) {
            console.error("Error parsing images:", error);
            images = [];
          }

          const productName = product?.name ? product.name.split(",")[0] : "Unknown Product";
          const productRating = product?.avg_rating || "N/A";
          const noOfRatings = product?.num_ratings || "N/A";
          const priceOfProduct = variation?.price || "N/A";

          console.log(`Product ${index}:`, {
            name: product?.name,
            rating: product?.avg_rating,
            noOfRatings: product?.num_ratings,
            price: variation?.price
          });

          return (
            <div className="items" key={index}>
              {images && images.length > 0 && (
                <img src={images[0].large} alt="Product Image" className="product-image" />
              )}
              <div className="product-details">
                <div className="product-info">
                  <p className="coloring">{productName}</p>
                  <div className="ratings">
                    <div className="rating-text">
                      <p><IoStar color="#00A337" /> {productRating}</p>
                      <div className="vertical-line"></div>
                      <p>{noOfRatings}</p>
                    </div>
                  </div>
                </div>
                <div className="price-info">
                  <h2>Least price: ${priceOfProduct}</h2>
                  <button
                    className="compare-button"
                    onClick={() => handleAddToCompare(productId)}
                  >
                    Add to Compare
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Compare;
