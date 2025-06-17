import { useState } from "react";
import api from "../api";

export default function PatientForm({onPatientAdded, onCancel }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dob: "",
        gender: "male",
        notes: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            gender: formData.gender === "male",
        };
        try {
            await api.post("/patients", payload);
            onPatientAdded();
            setFormData({ name: "", email: "", phone: "", dob: "", gender: "male", notes: "" });
        } catch (err) {
            console.error("Error creating patient", err);
            alert("Failed to create patient. Please login.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded space-y-3">
            <input name="name" value={formData.name} onChange={handleChange} autoComplete="given-name"
                   placeholder="Name" required
                   className="w-full p-2 border" />
            <input name="email" value={formData.email} onChange={handleChange} autoComplete="email" placeholder="Email"
                   type="email" required
                   className="w-full p-2 border" />
            <input name="phone" value={formData.phone} onChange={handleChange} autoComplete="Phone" placeholder="Phone"
                   required
                   className="w-full p-2 border" />
            <input name="dob" value={formData.dob} onChange={handleChange} placeholder="DOB" type="date" required
                   className="w-full p-2 border" />
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Notes"
                      className="w-full p-2 border" />
            <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Patient</button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-500 text-white p-2 rounded"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
