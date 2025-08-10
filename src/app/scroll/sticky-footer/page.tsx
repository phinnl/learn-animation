import { Lenis } from "lenis/react";

export default function StickyFooterPage() {
  return (
    <Lenis root options={{ lerp: 0.05 }}>
      <main className="relative bg-black">
        <section className="relative z-10 h-screen bg-red-600 flex items-center justify-center">
          <h1 className="text-4xl text-white">Sticky Footer Example</h1>
        </section>
        <section className="relative z-10 h-screen bg-sky-600 flex items-center justify-center">
          <h1 className="text-4xl text-white">Scroll Down</h1>
        </section>
        <footer className="sticky z-0 bottom-0 h-screen bg-gray-800 text-white p-4 text-center">
          Sticky Footer
        </footer>
      </main>
    </Lenis>
  );
}