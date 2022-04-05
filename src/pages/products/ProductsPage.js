import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategory } from "../../actions/categoryActions";
import { getProducts } from "../../actions/productActions";
import { Error } from "../../components/messages";
import {
  ProductList,
  ProductListLoader,
} from "../../components/pages/products";
import Breadcrumb from "../../components/shared/Breadcrumb";

const ProductsPage = () => {
  const { businessId, categoryId } = useParams();

  const { loading, products, error } = useSelector(
    (state) => state.getProducts
  );
  const { category } = useSelector((state) => state.getCategory);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(categoryId));
    dispatch(getCategory(categoryId));
  }, [categoryId, dispatch]);

  return (
    <main>
      <section className="bg-indigo-600 text-white p-5">
        <div className="container">
          <h1>Products</h1>
        </div>
      </section>
      <section className="container">
        <Breadcrumb
          links={[
            {
              name: "home",
              to: `/business/${businessId}`,
            },
            {
              name: "categories",
              to: `/business/${businessId}/categories`,
            },
            {
              name: category ? category.name : "category",
              to: `/business/${businessId}/categories/${categoryId}`,
            },
            {
              name: "products",
              to: "",
            },
          ]}
        />
        {error && <Error />}
        {loading && <ProductListLoader />}
        <ProductList products={products} />
      </section>
    </main>
  );
};

export default ProductsPage;
