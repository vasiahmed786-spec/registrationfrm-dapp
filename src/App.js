import React, { useState } from "react";
import { ethers } from "ethers";
import contractABI from "./contractABI.json";

const contractAddress = "0x39ACe7d3CF096c2CaBcda82AE44F19cE1de63d3C";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // connect wallet + register user
  const registerUser = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask not detected!");
        return;
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.register(
        formData.name,
        Number(formData.phone),
        formData.email
      );

      alert("Transaction sent! Waiting for confirmation...");
      await tx.wait();
      alert("✅ Registered successfully on MST Blockchain!");
    } catch (err) {
      console.error(err);
      alert("❌ Error: " + (err.reason || err.message));
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Registration Form</h2>
      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={formData.name}
        onChange={handleChange}
        style={{ width: "100%", margin: "10px 0", padding: "8px" }}
      />
      <input
        type="number"
        name="phone"
        placeholder="Enter Phone"
        value={formData.phone}
        onChange={handleChange}
        style={{ width: "100%", margin: "10px 0", padding: "8px" }}
      />
      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={formData.email}
        onChange={handleChange}
        style={{ width: "100%", margin: "10px 0", padding: "8px" }}
      />
      <button
        onClick={registerUser}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Register
      </button>
    </div>
  );
}

export default App;
