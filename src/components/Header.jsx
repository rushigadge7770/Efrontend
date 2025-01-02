
import React, { useContext, useState, useEffect } from 'react';
import logo from '../assest/media/logo.png';
import { FaSearch } from "react-icons/fa";
import { TbUserHexagon } from "react-icons/tb";
import { BsFillCartPlusFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import role from '../common/role.js';
import Context from '../context/index.js';

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const [search, setSearch] = useState(searchInput?.search?.split("=")[1] || "");

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
          const fetchData = await fetch("http://localhost:8080/api/auth-check", {
              method: "GET",
              credentials: "include",
          });
          const data = await fetchData.json();
          if (data.success) {
              dispatch(setUserDetails(data.user));
          } else {
              dispatch(setUserDetails(null));
          }
      } catch (error) {
          console.error("Auth check failed:", error);
          dispatch(setUserDetails(null));  // Ensure state is cleared on error
      }
  };
    checkAuthentication();
  }, [dispatch]);

  const handleLogOut = async () => {
   
      const fetchData = await fetch("http://localhost:8080/api/user-logout", {
        method: "GET",
        credentials: "include",
      });

      const data = await fetchData.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        navigate("/");
      } 
      else if(data.error) {
        toast.error(data.message);
      }
   
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate(`/search`);
    }
  };

  return (
    <header className="h-20 shadow-md bg-white-100 fixed w-full z-40 bg-slate-200 rounded-2xl border border-violet-500">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to="/">
            <img src={logo} className="w-18 h-8" alt="Logo" />
          </Link>
        </div>

        {/* Search bar */}
        <div className="hidden lg:flex items-center justify-between max-w-lg w-1/4 rounded-full focus-within:shadow-md pl-2 border border-violet-400">
          <input
            type="text"
            className="w-full outline-none bg-slate-200"
            placeholder="Search Product..."
            onChange={handleSearch}
            value={search}
          />
          <div className="bg-violet-400 h-8 flex items-center justify-center min-w-[50px] text-lg rounded-r-full">
            <FaSearch />
          </div>
        </div>

        {/* User menu and cart */}
        <div className="flex items-center gap-2">
          <div className="relative flex justify-center">
            {
              user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img src={user?.profilePic} className="w-8 h-8 rounded-full" alt={user?.name} />
                ) : (
                  <TbUserHexagon className="w-8 h-8 ml-2" />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-slate-200 bottom-0 top-10 h-fit p-2 hidden md:block">
                <nav>
                  {
                    user?.role === role.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hover:bg-white p-2"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Admin panel
                    </Link>
                  )}
                  <Link to={"/order"} className="whitespace-nowrap hover:bg-white p-2">
                    Order
                  </Link>
                </nav>
              </div>
            )}
          </div>

          {user?._id && (
            <Link to={"/cart"} className="relative">
              <span>
                <BsFillCartPlusFill className="w-8 h-8 ml-2" />
              </span>
              <div className="bg-red-600 w-6 flex items-center justify-center rounded-full absolute -top-1.5 left-8">
                <p>{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogOut}
                className="bg-violet-800 w-20 ml-4 text-white flex items-center hover:bg-violet-600 justify-center rounded-full"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-violet-800 w-20 ml-4 text-white flex items-center hover:bg-violet-600 justify-center rounded-full"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

