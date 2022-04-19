import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import routes from "../../../utils/routes";

const OrderListItem = (props) => {
  const { order } = props;

  return (
    <div
      key={order._id}
      className="flex flex-col border rounded-lg overflow-hidden shadow-md"
    >
      <div className="bg-indigo-50 px-5 py-3">
        <div className="flex justify-between">
          <div>
            <p className="uppercase">order placed</p>
            <p>{moment(order.createdAt).format("Do MMMM YYYY")}</p>
          </div>
          <div>
            <p className="uppercase">total</p>
            <p>&#8377; {order.totalAmount}</p>
          </div>
          <div>
            <p className="uppercase">ship to</p>
            <p>{order.shippingInfo.fullName}</p>
          </div>

          <div className="flex flex-col gap-y-3">
            <p className="uppercase mb-1">ORDER # {order._id}</p>
            <Link
              className="text-darkBlue hover:text-indigo-700 hover:underline uppercase"
              to={`${routes.getOrders}${order._id}`}
            >
              View order details
            </Link>
          </div>
        </div>
      </div>
      <div className="px-5 py-3">
        <div className="flex justify-between">
          <Link to="" className="flex gap-x-5">
            <img
              className="h-24 rounded-lg"
              src={order.orderItems[0].photo}
              alt={order.orderItems[0].name}
            />
            <h4>{order.orderItems[0].name}</h4>
          </Link>
          <div className="flex flex-col gap-y-3">
            <Link
              className="text-center px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              to=""
            >
              Track package
            </Link>
            <Link
              className="text-center px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              to=""
            >
              Write a product review
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderListItem;
