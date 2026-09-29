import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Proof, Promise } from "@/components/Intro";
import Services from "@/components/Services";
import Work from "@/components/Work";
import PackagesSection from "@/components/PackagesSection";
import { Process, Voices, Faq } from "@/components/Content";
import QuoteSection from "@/components/QuoteSection";
import Footer from "@/components/Footer";
import { BookingProvider } from "@/components/Booking";

export default function Page() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Proof />
        <Promise />
        <Services />
        <Work />
        <BookingProvider>
          <PackagesSection />
          <Process />
          <Voices />
          <Faq />
          <QuoteSection />
        </BookingProvider>
      </main>
      <Footer />
    </>
  );
}
