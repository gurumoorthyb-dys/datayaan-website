"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

interface Location {
  name: string;
  lat: number;
  lng: number;
}

interface GlobalPresenceMapProps {
  globalPresence?: string;
}

// Locations
const defaultLocations: Location[] = [
  { name: "Chennai, India", lat: 13.0827, lng: 80.2707 },
  { name: "Bangalore, India", lat: 12.9716, lng: 77.5946 },
  { name: "Dubai, UAE", lat: 25.2048, lng: 55.2708 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "USA", lat: 37.0902, lng: -95.7129 },
];

// Dynamic import for Leaflet (avoid SSR issues)
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

export default function GlobalPresenceMap({
  globalPresence,
}: GlobalPresenceMapProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const locations = defaultLocations;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 bg-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Global Presence
          </h2>
          <p className="text-slate-600 text-base">
            Delivering excellence across continents
          </p>
        </div>

        {/* Map + Locations */}
        <div
          className={`flex flex-col lg:flex-row gap-6 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Map */}
          <div className="flex-1 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            {isClient ? (
              <>
                <link
                  rel="stylesheet"
                  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                  integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                  crossOrigin=""
                />
                <style>{`
                  .leaflet-popup-content-wrapper { border-radius: 10px; }
                  .leaflet-popup-tip { display: none; }
                `}</style>
                <MapContainer
                  center={[25, 10]}
                  zoom={1}
                  minZoom={1}
                  maxZoom={10}
                  style={{ height: "280px", width: "100%" }}
                  scrollWheelZoom={false}
                  attributionControl={false}
                  worldCopyJump={true}
                >
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                  {locations.map((location, index) => (
                    <Marker key={index} position={[location.lat, location.lng]}>
                      <Popup>
                        <div className="p-1">
                          <span className="font-semibold text-slate-900 text-sm">
                            {location.name}
                          </span>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </>
            ) : (
              <div className="w-full h-[280px] bg-slate-100 flex items-center justify-center">
                <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Locations List */}
          <div className="lg:w-64 space-y-2">
            {locations.map((location, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 bg-slate-50 rounded-xl transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                }`}
                style={{ transitionDelay: `${300 + index * 80}ms` }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                <span className="font-medium text-slate-700 text-sm">
                  {location.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
