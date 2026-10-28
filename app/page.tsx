import { Hero } from "@/components/sections/Hero";
import { Booking } from "@/components/sections/Booking";
import { Features } from "@/components/sections/Features";
import { Steps } from "@/components/sections/Steps";
import { Occasions } from "@/components/sections/Occasions";
import { InstagramTeaser } from "@/components/sections/InstagramTeaser";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { getBookedDates } from "@/lib/availability";
import { bookingWindow } from "@/lib/window";

// Heutiges Datum fließt in den Kalender ein, daher pro Anfrage rendern.
export const dynamic = "force-dynamic";

export default async function Home() {
  const bookedDates = await getBookedDates();
  const { minIso, baseYear, baseMonth } = bookingWindow();
  return (
    <>
      <Hero />
      <Booking bookedDates={bookedDates} minIso={minIso} baseYear={baseYear} baseMonth={baseMonth} />
      <Features />
      <Steps />
      <Occasions />
      <InstagramTeaser />
      <Faq />
      <CtaBand />
    </>
  );
}
