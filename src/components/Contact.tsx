"use client";
import { useState } from "react";
export default function Contact() {
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      propertyValue: formData.get("propertyValue"),
      monthlySalary: formData.get("monthlySalary"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      setStatusMessage(data?.message);
    } else {
      setStatusMessage("Something went wrong");
    }

    form.reset();
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        // className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      >
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-2xl">Contact</legend>
          <label className="label" htmlFor="nameInput">
            Name
          </label>
          <input
            name="name"
            type="text"
            className="input validator"
            required
            placeholder="John Doe"
            id="nameInput"
          />
          <p className="validator-hint">Name is required</p>
          <label className="label" htmlFor="emailInput">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="input validator"
            required
            placeholder="Email"
            id="emailInput"
          />
          <p className="validator-hint">Enter a valid email</p>
          <label className="label" htmlFor="phoneInput">
            Phone
          </label>
          <input
            name="phone"
            type="tel"
            className="input validator tabular-nums"
            required
            placeholder="Phone"
            pattern="[0-9]*"
            //   minlength="10"
            maxLength={10}
            title="Must be 10 digits"
            id="phoneInput"
          />
          <p className="validator-hint">Must be 10 digits</p>
          <label className="label" htmlFor="propertyValueInput">
            Property Value
          </label>
          <input
            name="propertyValue"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="input validator tabular-nums"
            required
            id="propertyValueInput"
            placeholder="1000000"
          />
          <p className="validator-hint">Enter a numeric value</p>
          <label className="label" htmlFor="monthlySalaryInput">
            Monthly Salary
          </label>
          <input
            name="monthlySalary"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="input validator tabular-nums"
            required
            id="monthlySalaryInput"
            placeholder="10000"
          />
          <p className="validator-hint">Enter a numeric value</p>
          <button className="btn btn-primary mt-4">Submit</button>
        </fieldset>
      </form>
      {statusMessage && (
        <p className="text-sm text-green-500 mt-2">{statusMessage}</p>
      )}
    </div>
  );
}
