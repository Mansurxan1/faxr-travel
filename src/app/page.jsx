import Navbar from "@/components/Navbar";
import Banner from "@/components/Banner";
import CompanyInfo from "./components/ComponyInfo";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <CompanyInfo />
      <Footer />
    </div>
  );
}
