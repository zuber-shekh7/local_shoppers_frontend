import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../../actions/orderActions";
import { Button } from "../../components/buttons";
import { Card } from "../../components/cards";
import { Loader } from "../../components/loaders";
import { Error } from "../../components/messages";
import Breadcrumb from "../../components/shared/Breadcrumb";
import HeaderContainer from "../../components/shared/HeaderContainer";
import routes, { generateRoute } from "../../utils/routes";

const OrderSummaryPage = () => {
  const { cartItems, shippingAddress, paymentMethod, businessId } = useSelector(
    (state) => state.cart
  );

  const { user } = useSelector((state) => state.userLogin);
  const { loading, order, error } = useSelector((state) => state.createOrder);

  const navigate = useNavigate();

  useEffect(() => {
    if (!paymentMethod) {
      navigate.push(routes.payments);
    } else if (cartItems.length === 0) {
      navigate(routes.cart);
    }
  }, [paymentMethod, cartItems, navigate]);

  const subTotal = Number(
    cartItems.reduce((acc, item) => acc + item.discountPrice * item.qty, 0)
  );
  const taxAmount = 0;
  const shippingAmount = 100;
  const totalAmount = Number(subTotal + taxAmount + shippingAmount).toFixed(2);

  const dispatch = useDispatch();

  const handlePlaceOrder = () => {
    dispatch(
      createOrder({
        userId: user._id,
        businessId: businessId,
        orderItems: cartItems,
        shippingInfo: shippingAddress,
        paymentMethod,
        paymentInfo: {
          status: "Pending",
        },
        taxAmount,
        shippingAmount,
        totalAmount,
      })
    );
  };

  if (order) {
    navigate(generateRoute(routes.orderPayment, { ":orderId": order._id }));
  }

  return (
    <main>
      <HeaderContainer>
        <h1>Order Summary</h1>
      </HeaderContainer>
      <section className="container">
        <Breadcrumb
          links={[
            {
              name: "Back to cart",
              to: routes.cart,
            },
            {
              name: "shipping",
              to: routes.checkout,
            },
            {
              name: "payments",
              to: routes.payments,
            },
            {
              name: "order summary",
              to: routes.orderSummary,
            },
          ]}
        />
        <div className="flex justify-center">
          {loading && <Loader />}
          {error && <Error />}
        </div>
        <Card className="border shadow-lg">
          {cartItems && cartItems.length > 0 ? (
            <div className="grid grid-cols-12">
              <div className="col-span-12 md:col-span-4">
                <h2>
                  Shipping Address{" "}
                  <sub>
                    <Link
                      className="text-indigo-600 text-xs"
                      to={routes.checkout}
                    >
                      <span>Change</span>
                    </Link>
                  </sub>
                </h2>
                <hr />
                <p>
                  {shippingAddress.fullName}, {shippingAddress.city},{" "}
                  {shippingAddress.state}, {shippingAddress.pincode}
                </p>
                <p>{shippingAddress.mobileNumber}</p>
              </div>
              <div className="col-span-12 md:col-span-4">
                <h2>
                  Payment Method{" "}
                  <sub>
                    <Link
                      className="text-indigo-600 text-xs"
                      to={routes.payments}
                    >
                      <span>Change</span>
                    </Link>
                  </sub>
                </h2>
                <hr />
                <p>{paymentMethod}</p>
              </div>
              <div className="col-span-12 md:col-span-4">
                <h2>Order Summary</h2>
                <hr />
                {cartItems.length > 0 && (
                  <div>
                    <div>
                      <div className="flex justify-between">
                        <strong>Total items</strong>
                        <p>
                          {cartItems.reduce(
                            (acc, item) => acc + Number(item.qty),
                            0
                          )}
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <strong>Subtotal</strong>
                        <p>₹ {subTotal}/-</p>
                      </div>

                      <div className="flex justify-between">
                        <strong>Shipping Charges</strong>
                        <p>₹ {shippingAmount}/-</p>
                      </div>
                      <div className="flex justify-between">
                        <strong>Tax</strong>
                        <p>₹ {taxAmount}/-</p>
                      </div>
                      <hr />
                      <div className="flex justify-between">
                        <p className="text-3xl font-semibold">Total</p>
                        <p className="text-3xl font-semibold text-indigo-600">
                          ₹ {totalAmount}/-
                        </p>
                      </div>
                      <Button
                        onClick={handlePlaceOrder}
                        disabled={cartItems.length === 0}
                        className="w-full"
                      >
                        Place your order
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <h3 className="text-center mt-5">
              There are no items in your cart.
            </h3>
          )}
        </Card>
      </section>
    </main>
  );
};

export default OrderSummaryPage;
