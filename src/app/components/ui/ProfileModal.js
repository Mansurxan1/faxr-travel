"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";
import Cookies from "js-cookie";
import useUserStore from "@s/store/userStore";
import { useTranslation } from "react-i18next";

const CustomModal = ({ isOpen, onClose, message, isSuccess = true }) => {
  if (!isOpen) return null;
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3
            className={`text-lg font-semibold ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {isSuccess ? t("succes") : t("error")}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="text-gray-700 text-center mb-6">{message}</p>
        <button
          onClick={onClose}
          className={`w-full py-2 rounded-md font-semibold text-white transition duration-200 shadow-md ${
            isSuccess
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          OK
        </button>
      </div>
    </div>
  );
};

const ProfilePage = ({ user: initialUser, onClose, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalSuccess, setModalSuccess] = useState(true);
  const { t } = useTranslation();
  const { user, token, setUser, clearUser } = useUserStore();
  const currentUser = user || initialUser;

  const saveUserToLocalStorage = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const showModal = (message, success = true) => {
    setModalMessage(message);
    setModalSuccess(success);
    setModalOpen(true);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const authToken = token || Cookies.get("token");
      if (!authToken) {
        setError("Authentication token not found");
        return;
      }
      const requestData = { currentPassword, newPassword };
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      };
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/update-password`,
        requestData,
        config
      );
      if (response.status === 200) {
        const updatedUser = response.data.user || currentUser;
        saveUserToLocalStorage(updatedUser);
        setUser(updatedUser, authToken);
        setIsEditing(false);
        setCurrentPassword("");
        setNewPassword("");
        setError(null);
        showModal("Password successfully changed!");
      }
    } catch (error) {
      setError(
        error.response?.data.message ||
          "An error occurred while changing the password"
      );
      console.error("Password change error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const authToken = token || Cookies.get("token");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            ...(authToken && { Authorization: `Bearer ${authToken}` }),
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        Cookies.remove("token");
        localStorage.removeItem("user");
        clearUser();
        onLogout();
        showModal("Successfully logged out!");
        setTimeout(() => {
          onClose(); 
        }, 1500);
      }
    } catch (error) {
      setError(
        error.response?.data.message || "An error occurred during logout"
      );
      console.error(error);
    }
  };

  const fetchBookings = async () => {
    setLoadingBookings(true);
    try {
      const authToken = token || Cookies.get("token");
      if (!authToken) {
        setError("Authentication token not found");
        return;
      }
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/my-bookings`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.status === "success") {
        setBookings(response.data.data);
      }
    } catch (error) {
      setError(error.response?.data.message || "Failed to load bookings");
      console.error("Error fetching bookings:", error);
    } finally {
      setLoadingBookings(false);
    }
  };

  useEffect(() => {
    if (currentUser && !localStorage.getItem("user")) {
      saveUserToLocalStorage(currentUser);
    }
    fetchBookings();
  }, [currentUser]);

  return (
    <>
      <div className="fixed inset-0 z-50 w-[100vw] h-[100vh] bg-gray-900/80 backdrop-blur-sm overflow-y-auto">
        <div className="max-w-4xl mx-auto py-12 px-6 relative min-h-[100vh] bg-gray-50 rounded-xl shadow-2xl my-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
            {t("yourprofile")}
          </h1>

          <div className="space-y-12">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("email")}
              </label>
              <p className="w-full p-3 bg-gray-100 rounded-md text-gray-800 font-medium">
                {currentUser?.email || "Unknown"}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("password")}
              </label>
              {isEditing ? (
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                    placeholder="Enter current password"
                    required
                  />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                    placeholder="Enter new password"
                    required
                  />
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition duration-200 shadow-md"
                    >
                      {t("save")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-gray-500 text-white font-semibold py-2 rounded-md hover:bg-gray-600 transition duration-200 shadow-md"
                    >
                      {t("cencel")}
                    </button>
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                </form>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="w-full p-3 bg-gray-100 rounded-md text-gray-800 font-medium">
                    ********
                  </p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="ml-4 text-green-600 hover:text-green-700 font-semibold transition-colors"
                  >
                    {t("changepasword")}
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
                {t("mytour")}
              </h2>
              {loadingBookings ? (
                <p className="text-gray-500 text-center text-lg animate-pulse">
                  {t("loading")}
                </p>
              ) : bookings.length === 0 ? (
                <p className="text-gray-500 text-center text-lg">
                  You haven’t made any bookings yet.{t("bron")}
                </p>
              ) : (
                <ul className="space-y-8">
                  {bookings.map((booking) => (
                    <li
                      key={booking._id}
                      className="relative bg-gradient-to-r from-gray-50 to-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {booking.tour.name}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                        <div className="space-y-2">
                          <p>
                            <span className="font-medium text-gray-900">
                              Passengers:
                            </span>{" "}
                            {booking.passengers}
                          </p>
                          <p>
                            <span className="font-medium text-gray-900">
                              Total Price:
                            </span>{" "}
                            <span className="text-green-600 font-semibold">
                              {booking.totalPrice} {booking.tour.price.currency}
                            </span>
                          </p>
                          <p>
                            <span className="font-medium text-gray-900">
                              Start Date:
                            </span>{" "}
                            {new Date(
                              booking.tour.startDate
                            ).toLocaleDateString()}
                          </p>
                          <p>
                            <span className="font-medium text-gray-900">
                              Duration:
                            </span>{" "}
                            {booking.tour.duration} days
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p>
                            <span className="font-medium text-gray-900">
                              Destinations:
                            </span>{" "}
                            <span className="text-gray-600">
                              {booking.tour.destinations
                                .map((d) => `${d.city} (${d.nights} nights)`)
                                .join(", ")}
                            </span>
                          </p>
                          <p>
                            <span className="font-medium text-gray-900">
                              Included:
                            </span>{" "}
                            <span className="text-gray-600">
                              {booking.tour.included.join(", ")}
                            </span>
                          </p>
                          <p>
                            <span className="font-medium text-gray-900">
                              Booked On:
                            </span>{" "}
                            {new Date(booking.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-bl-full" />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white font-semibold py-3 rounded-md hover:bg-red-700 transition duration-200 shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Custom Modal for Success Messages */}
      <CustomModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        message={modalMessage}
        isSuccess={modalSuccess}
      />
    </>
  );
};

export default ProfilePage;
