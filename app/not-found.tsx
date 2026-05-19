import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center text-center px-6 py-32">
        <p className="font-display text-[10rem] leading-none text-border select-none">404</p>
        <h1 className="font-display text-[clamp(2rem,5vw,4rem)] mt-4 mb-4">
          Offside. Page Not Found.
        </h1>
        <p className="text-muted-foreground max-w-md mb-10 text-lg">
          The page you&apos;re looking for wandered off the pitch. Let&apos;s get you back in play.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/">
            <Button variant="primary" size="xl">Back to Home</Button>
          </Link>
          <Link href="/booking">
            <Button variant="outline" size="xl">Book a Field</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
