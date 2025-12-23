"use client";

import { useState, useEffect } from "react";

export default function MortgageCalculator() {
  const [propertyPrice, setPropertyPrice] = useState("100000");
  const [downPayment, setDownPayment] = useState("20");
  const [interestRate, setInterestRate] = useState("10");
  const [tenureYears, setTenureYears] = useState(20);
  const [tenuremonths, setTenureMonths] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const handleYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value.replace(/\D/g, ""));
    if (value < 0) return;
    if (value > 30) value = 30;
    setTenureYears(value);
  };

  const handleMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value.replace(/\D/g, ""));
    if (value < 0) value = 0;
    if (value > 11) value = 11;
    if (tenureYears >= 30) value = 0;
    setTenureMonths(value);
  };
  const totalLoanTenure = tenureYears * 12 + tenuremonths;

  const monthlyInterest = Number(interestRate) / 12 / 100;

  const property = Number(propertyPrice);
  const downPaymentPercent = Number(downPayment);

  const downPaymentAmount = (property * downPaymentPercent) / 100;
  const loanAmount = property - downPaymentAmount;

  let emi = 0;
  let totalInterestCalc = 0;
  /**
    EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
    Where:
    P = loanAmount
    r = monthlyInterest
    n = total months
 */

  if (loanAmount > 0 && monthlyInterest > 0 && totalLoanTenure > 0) {
    const pow = Math.pow(1 + monthlyInterest, totalLoanTenure);
    emi = (loanAmount * monthlyInterest * pow) / (pow - 1);
    totalInterestCalc = emi * totalLoanTenure - loanAmount;
  }
  const income = Number(monthlyIncome);
  let eligibilityMessage = "Enter income to check eligibility";

  if (income > 0 && emi > 0) {
    eligibilityMessage =
      emi <= income * 0.4
        ? "You are eligible for this loan"
        : "Loan amount exceeds your eligibility";
  }

  const formatCurrency = (value: number) =>
    Math.round(value).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  useEffect(() => {
    setMonthlyEMI(Math.round(emi));
    setTotalInterest(Math.round(totalInterestCalc));
  }, [propertyPrice, downPayment, interestRate, tenureYears, tenuremonths]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <main>
        <div className="w-xl border border-base-300 rounded-md p-4 ">
          <fieldset className="fieldset ">
            <p className="fieldset-legend text-3xl">
              Simple Mortgage Calculator
            </p>
            <div className="my-2 flex flex-col gap-2">
              <label className="label text-2xl">Property Price</label>

              <label className="input text-xl">
                <input
                  type="text"
                  value={propertyPrice}
                  onChange={(e) =>
                    setPropertyPrice(e.target.value.replace(/\D/g, ""))
                  }
                  inputMode="numeric"
                />
                <span className="label">USD</span>
              </label>
            </div>

            <div className="my-2 flex flex-col gap-2">
              <label className="label text-2xl" htmlFor="downPaymentInput">
                Down Payment
              </label>

              <div className="flex flex-col text-xl">
                <p className="w-full p-2 ">
                  {formatCurrency(downPaymentAmount)}
                </p>
                <div className="flex items-center gap-4 p-2 w-full">
                  <input
                    type="range"
                    min={0}
                    max="80"
                    value={downPayment}
                    className="range w-11/12"
                    id="downPaymentInput"
                    onChange={(e) => setDownPayment(e.target.value)}
                  />
                  <span className="w-1/12 ">{downPayment}%</span>
                </div>
              </div>
            </div>

            <div className="my-2 flex flex-col gap-2">
              <label className="label text-2xl" htmlFor="interestRateInput">
                Interest Rate
              </label>
              <div className=" flex items-center gap-4 p-2 w-full text-xl">
                <input
                  type="range"
                  step={0.1}
                  min={5}
                  max="30"
                  value={interestRate}
                  className="range w-11/12"
                  id="interestRateInput"
                  onChange={(e) => setInterestRate(e.target.value)}
                />
                <span className="w-1/12">{interestRate}%</span>
              </div>
            </div>
            <div className="my-2 flex flex-col gap-2">
              <label
                className="label text-2xl flex items-center mb-2"
                htmlFor="loanTenureInput"
              >
                Loan Tenure
                <span className="text-gray-400 text-xs">(Max 30 Years)</span>
              </label>
              <div className="flex gap-2 w-full ">
                <label className="input text-xl">
                  <input
                    type="text"
                    value={tenureYears}
                    onChange={handleYearsChange}
                    min="1"
                    max="30"
                    className="validator"
                  />
                  <span className="label ">Years</span>
                </label>

                <label className="input text-xl">
                  <input
                    type="text"
                    value={tenuremonths}
                    onChange={handleMonthsChange}
                    min="0"
                    max="11"
                    className="validator"
                  />
                  <span className="label">Months</span>
                </label>
              </div>
            </div>

            <div className="my-2 flex flex-col gap-2">
              <label
                className="label text-2xl mb-2"
                htmlFor="monthlyIncomeInput"
              >
                Monthly Income ($)
              </label>
              <label className="input text-xl">
                <input
                  value={monthlyIncome}
                  onChange={(e) =>
                    setMonthlyIncome(e.target.value.replace(/\D/g, ""))
                  }
                  type="text"
                  inputMode="numeric"
                  id="monthlyIncomeInput"
                />
                <span className="label">USD</span>
              </label>
            </div>
          </fieldset>
          <div className="text-xl">
            <p className="my-2">
              Your monthly payable EMI will be{" "}
              <span className="text-3xl underline">
                {formatCurrency(monthlyEMI)}
              </span>
            </p>
            <p className="my-2">
              Total Interest: {formatCurrency(totalInterest)}
            </p>
            <p className="my-2">{eligibilityMessage}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
// bg-base-200 border-base-300 rounded-box border p-4 w-xl text-xl

// bg-base-200 border-base-300 rounded-box w-xl border p-4
