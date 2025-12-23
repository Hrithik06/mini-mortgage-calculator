import ProductInfo from "@/components/ProductInfo";
import MortgageCalculator from "../components/MortgageCalculator";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <MortgageCalculator />
      <ProductInfo />
    </div>
  );
}
