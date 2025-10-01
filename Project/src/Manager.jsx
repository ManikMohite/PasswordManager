import React, { useEffect, useState, useRef } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [passwordArray, setPasswordArray] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
  });

  // ✅ Fetch all passwords from backend
  const getPasswords = async () => {
    try {
      const response = await fetch("http://localhost:3000/");
      const data = await response.json();
      setPasswordArray(data);
    } catch (err) {
      console.error("Error fetching passwords:", err);
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  // ✅ Save password to backend + update UI
  const savePassword = async () => {
    if (!form.site || !form.username || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      console.log("📩 Server response:", result);

      if (response.ok) {
        const newEntry = { ...form, _id: result.insertedId };
        setPasswordArray((prev) => [...prev, newEntry]);
        setForm({ site: "", username: "", password: "" });
      } else {
        alert(result.error || "Failed to save password");
      }
    } catch (err) {
      console.error("Error saving password:", err);
    }
  };

  // ✅ Delete password (backend + frontend)
  const handleDelete = async (itemToDelete) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(
        `http://localhost :3000/${itemToDelete._id}`,
        { method: "DELETE" }
      );  

      if (response.ok) {
        setPasswordArray((prev) =>
          prev.filter((item) => item._id !== itemToDelete._id)
        );
      } else {
        console.error("Failed to delete password");
      }
    } catch (err) {
      console.error("Error deleting password:", err);
    }
  };

  // ✅ Edit password (load into form)
  const handleEdit = (item) => {
    setForm({ site: item.site, username: item.username, password: item.password });
    handleDelete(item); // delete old entry; new one will be saved on Save
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="Container flex-col width-full min-h-screen bg-gray-800 flex px-5 py-6 items-center">
      <div className="w-full max-w-3xl bg-gray-600 rounded-xl p-6 shadow-lg">
        <div className="flex w-full justify-center gap-2">
          <img src="/public/passman.svg" alt="Icon" className="w-12 h-12" />
          <span className="text-green-400 gap-2 font-bold text-2xl">
            Password Manager
            <p className="text-white text-sm">your own password manager</p>
          </span>
        </div>

        {/* Form */}
        <ul className="flex-row mt-12 items-start">
          <li className="font-bold flex mb-4 gap-2">
            <input
              type="text"
              value={form.site}
              onChange={handleChange}
              name="site"
              placeholder="Enter the website name"
              className="w-full h-10 px-3 text-gray-800 rounded-xl"
            />
          </li>
          <li className="font-bold flex items-center w-full">
            <div className="password text-green-200 w-2/3">
              <input
                type="username"
                value={form.username}
                onChange={handleChange}
                name="username"
                placeholder="Enter the username"
                className="w-full text-gray-800 rounded-full"
              />
            </div>

            <div className="flex items-center md:w-1/2 w-full bg-white rounded-full px-3 md:m-3">
              <input
                ref={ref}
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                name="password"
                placeholder="Enter password"
                className="flex-1 w-full outline-none bg-transparent"
              />
              <img
                src={showPassword ? "./public/view.png" : "./public/hide.png"}
                onClick={togglePassword}
                ref={passwordRef}
                alt="toggle password"
                className="w-6 h-6 cursor-pointer"
              />
            </div>
          </li>
        </ul>

        <div className="mt-6 flex justify-center">
          <button
            onClick={savePassword}
            className="flex items-center gap-2 bg-green-400 px-6 py-2 rounded-full text-black font-bold hover:bg-green-500 transition"
          >
            <img src="/icon.svg" alt="add" className="w-6 h-6" />
            Save
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full max-w-3xl mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-green-400 text-black">
              <th className="p-4 text-center">Site</th>
              <th className="p-4 text-center">Username</th>
              <th className="p-4 text-center">Password</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {passwordArray.map((item) => (
              <tr
                key={item._id}
                className="border-b-2 border-gray-400 bg-green-200 text-black"
              >
                <td className="p-4 text-center">{item.site}</td>
                <td className="p-4 text-center">{item.username}</td>
                <td className="p-4 text-center">{item.password}</td>
                <td className="p-3 text-center flex justify-center gap-3">
                  <PencilSquareIcon
                    className="w-6 h-6 text-blue-600 cursor-pointer hover:scale-110 transition"
                    onClick={() => handleEdit(item)}
                  />
                  <TrashIcon
                    className="w-6 h-6 text-red-600 cursor-pointer hover:scale-110 transition"
                    onClick={() => handleDelete(item)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manager;
