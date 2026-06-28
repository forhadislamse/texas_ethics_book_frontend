import Navbar from "@/components/Common/Navbar/Navbar";
import Footer from "@/components/Common/Footer/Footer";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
