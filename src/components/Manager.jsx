import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const copyText = async (text) => {
    toast("🦄 copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };
  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    console.log(passwords);
    setPasswordArray(passwords);
  };
  useEffect(() => {
    getPasswords();
  }, []);
  const deletePassword = async (id) => {
    console.log("Deleting password is id:", id);
    let c = confirm("Do you really want to delete it");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      let res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });

      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passwordArray.filter((item) => item.id !== id))
      // );
      toast("🦄Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };
  const editPassword = (id) => {
    console.log("editing password with id is:", id);
    setForm({ ...passwordArray.filter((i) => i.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    toast("🦄 Password Edited!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  const savePassword = async () => {
    const newPassword = { ...form, id: uuidv4() };
    setPasswordArray([...passwordArray, newPassword]);

    // localStorage.setItem(

    //   "password",
    //   JSON.stringify([...passwordArray, newPassword])
    // );
    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: form.id }),
    });
    setForm({ site: "", username: "", password: "" });
    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: uuidv4() }),
    });
    setForm({ site: "", username: "", password: "" });
    console.log([...passwordArray, form]);
    toast("🦄 Password saved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const passwordRef = useRef();
  const iconRef = useRef();
  const showPassword = () => {
    const input = passwordRef.current;
    const icon = iconRef.current;
    if (input.type === "password") {
      input.type = "text";
      icon.className = "fa-solid fa-eye-slash";
      console.log("Toggling icon:", icon.className);
    } else {
      input.type = "password";
      icon.className = "fa-solid fa-eye";
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-gray-200 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      <div className=" p-2 md:p-0 pt-7  md:mycontainer min-h-[65vh] ">
        <h1 className="text-4xl text font-bold text-center">
          <span className="text-green-700"> &lt;</span>
          <span>Pass</span>
          <span className="text-green-700">Manager</span>
        </h1>
        <p className="text-green-900 text-center text-lg">
          Your own Password Manager
        </p>

        <div className=" flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            onChange={handleChange}
            id="site"
          />
          <div className="  flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              onChange={handleChange}
              id="username"
            />
            <div className="relative">
              {" "}
              <input
                value={form.password}
                ref={passwordRef}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                onChange={handleChange}
                name="password"
                id="password"
              />
              <span
                className="absolute right-1 top-1 cursor-pointer"
                onClick={showPassword}
              >
                <i ref={iconRef} className="fa-solid fa-eye"></i>
              </span>
            </div>
          </div>{" "}
          <button
            className="flex justify-center items-center bg-green-600 rounded-full px-8 gap-2 py-2 w-fit hover:bg-green-500 border-2 border-green-700 text-white"
            onClick={savePassword}
          >
            <i className="fa-solid fa-plus"></i>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show </div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-xl overflow-hidden mb-10">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">username</th>
                  <th className="py-2">password</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 text-center min-w-32 border border-white ">
                      <span> {item.site}</span>

                      <div className="flex justify-center items-center gap-2">
                        <i
                          className="fa-solid fa-copy cursor-pointer"
                          onClick={() => copyText(item.site)}
                        ></i>
                      </div>
                    </td>
                    <td className="py-2 text-center min-w-32 border border-white">
                      <div className="flex justify-center items-center gap-2" onClick={() => copyText(item.site)}>
                        <span >
                          {item.site}
                        </span>
                        <i className="fa-solid fa-copy cursor-pointer"></i>
                      </div>
                    </td>
                    <td className="py-2 text-center min-w-32 border border-white">
                      <div className="flex justify-center items-center gap-2"onClick={() => copyText(item.username)}>
                        <span >
                          {item.username}
                        </span>
                        <i className="fa-solid fa-copy cursor-pointer"></i>
                      </div>
                    </td>
                    <td className="py-2 text-center min-w-32 border border-white">
                      <div className="flex justify-center items-center gap-2"onClick={() => copyText(item.password)}>
                        <span >
                          {item.password}
                        </span>
                        <i className="fa-solid fa-copy cursor-pointer"></i>
                      </div>
                    </td>
                    <td className="py-2 text-center min-w-32 border border-white">
                      <span
                        className="cursor-pointer mx-2"
                        onClick={() => {
                          editPassword(item.id);
                        }}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </span>
                      <span
                        className="cursor-pointer mx-2"
                        onClick={() => {
                          deletePassword(item.id);
                        }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
export default Manager;
