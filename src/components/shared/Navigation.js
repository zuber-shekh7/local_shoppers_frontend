import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  HiOutlineShoppingCart,
  HiOutlineUserCircle,
  HiOutlineLogin,
  HiOutlineHome,
  HiOutlineLogout,
  HiMenu,
  HiX,
  HiArrowRight,
} from "react-icons/hi";
import { userLogout } from "../../actions/userActions";
import routes from "../../utils/routes";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userLogin);

  const handleUserLogout = () => {
    dispatch(userLogout());
  };

  return (
    <nav className="bg-white text-darkBlue text-bg-indigo-600  border-b border-gray-100 sticky top-0 p-4">
      <section className="relative max-w-6xl mx-auto flex justify-between items-center h-16">
        {/* logo and brand name */}
        <div className="hidden sm:flex items-center justify-between">
          <Link
            to={user ? "/users/account" : "/"}
            className="flex items-center space-x-1"
          >
            <HiOutlineShoppingCart className="h-8 w-8" />

            <span className="text-2xl font-bold ">Local Shoppers</span>
          </Link>
        </div>
        {/* mobile menu button */}
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden space-x-3">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <HiX className="inline md:hidden h-8 w-8" />
            ) : (
              <HiMenu className="inline md:hidden h-8 w-8" />
            )}
          </button>
          <Link
            to={user ? "/users/account" : "/"}
            className="flex items-center space-x-1"
          >
            <HiOutlineShoppingCart className="h-8 w-8" />

            <span className="text-2xl font-bold ">Local Shoppers</span>
          </Link>
        </div>
        {/* desktop menu */}
        <div className="hidden sm:flex space-x-3 items-center">
          {user ? (
            <>
              <Link
                className="flex items-center space-x-1 py-4 px-2 text-lg hover:text-indigo-600 transition duration-300"
                to={routes.dashboard}
              >
                <HiOutlineUserCircle className="h-6 w-6" />
                <span>Account</span>
              </Link>
              <Link
                className="flex items-center space-x-1 py-4 px-2 text-lg hover:text-indigo-600 transition duration-300"
                to={routes.cart}
              >
                <HiOutlineShoppingCart className="h-6 w-6" />
              </Link>
              <button
                className="flex items-center space-x-1 py-2 px-5 text-white  bg-indigo-600 rounded-full  text-lg hover:bg-indigo-700 transition duration-300"
                onClick={handleUserLogout}
              >
                <HiOutlineLogout className="h-6 w-6" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                className="flex items-center space-x-1 py-4 px-2 text-lg hover:text-indigo-600 transition duration-300"
                to={routes.home}
              >
                <HiOutlineHome className="h-6 w-6" />
                <span>Home</span>
              </Link>
              <Link
                className="flex items-center space-x-1 py-4 px-2 text-lg hover:text-indigo-600 transition duration-300"
                to={routes.login}
              >
                <HiOutlineLogin className="h-6 w-6" />
                <span>Login</span>
              </Link>
              <Link
                className="flex items-center space-x-1 py-2 px-5 text-white  bg-indigo-600 rounded-full  text-lg hover:bg-indigo-700 transition duration-300"
                to={routes.signup}
              >
                <span>Signup</span>
                <HiArrowRight className="h-6 w-6" />
              </Link>
              <Link
                className="flex items-center space-x-1 py-4 px-2 text-lg hover:text-indigo-600 transition duration-300"
                to={routes.cart}
              >
                <HiOutlineShoppingCart className="h-6 w-6" />
              </Link>
            </>
          )}
        </div>
      </section>
      {/* mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user ? (
              <>
                <Link
                  className="flex items-center space-x-2 font-bold text-lg hover:text-indigo-500 transition duration-30 rounded py-2 px-3"
                  to={routes.dashboard}
                >
                  <HiOutlineUserCircle className="h-6 w-6" />
                  <p>Account</p>
                </Link>
                <Link
                  className="flex items-center space-x-2 font-bold text-lg hover:text-indigo-500 transition duration-30 rounded py-2 px-3"
                  to={routes.cart}
                >
                  <HiOutlineShoppingCart className="h-6 w-6" />
                  <p>Cart</p>
                </Link>
                <button
                  className="flex items-center space-x-2 font-bold text-lg hover:text-indigo-500 transition duration-30 rounded py-2 px-3"
                  onClick={handleUserLogout}
                >
                  <HiOutlineLogout className="h-6 w-6" />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  className="flex items-center space-x-1 font-bold text-lg hover:text-indigo-600 transition duration-300 py-2 px-3"
                  to={routes.home}
                >
                  <HiOutlineHome className="h-6 w-6" />
                  <span>Home</span>
                </Link>
                <Link
                  className="flex items-center space-x-1   font-bold text-lg hover:text-indigo-600 transition duration-300 py-2 px-3"
                  to={routes.login}
                >
                  <HiOutlineLogin className="h-6 w-6" />
                  <span>Login</span>
                </Link>
                <Link
                  className="flex items-center space-x-1   font-bold text-lg hover:text-indigo-600 transition duration-300 py-2 px-3"
                  to={routes.signup}
                >
                  <HiOutlineUserCircle className="h-6 w-6" />
                  <span>Register</span>
                </Link>
                <Link
                  className="flex items-center space-x-1   font-bold text-lg hover:text-indigo-600 transition duration-300 py-2 px-3"
                  to={routes.cart}
                >
                  <HiOutlineShoppingCart className="h-6 w-6" />
                  <p>Cart</p>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
