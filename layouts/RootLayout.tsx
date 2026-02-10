import React, { useEffect, useRef } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { Outlet, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const RootLayout: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Initialize GSAP animations for page transitions or scroll effects
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-fade-in',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }, mainRef);

    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Header />
        <main 
          ref={mainRef}
          className="flex-1 overflow-y-auto pt-20 px-8 pb-8 scroll-smooth"
        >
          <div className="max-w-7xl mx-auto min-h-[calc(100vh-6rem)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};