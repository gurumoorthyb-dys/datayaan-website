"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

interface Office {
  id: number;
  country: string;
  city: string;
  address: string;
  phone?: string;
  email?: string;
  order?: number;
  map_x?: number;
  map_y?: number;
}

interface LocationsListProps {
  offices: Office[];
}

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

// Map Coordinates
const locationCoordinates: Record<string, { lat: number; lng: number }> = {
  Chennai: { lat: 13.0827, lng: 80.2707 },
  Dubai: { lat: 25.2048, lng: 55.2708 },
  UAE: { lat: 25.2048, lng: 55.2708 },
  India: { lat: 20.5937, lng: 78.9629 },
  Singapore: { lat: 1.3521, lng: 103.8198 },
  Bangalore: { lat: 12.9716, lng: 77.5946 },
};

const addressOverrides: Record<string, string> = {
  Chennai:
    "Datayaan Solutions Private Limited,\nMEPZ SEZ, Tambaram,\nChennai – 600045,\nTamil Nadu, India.",
  Dubai:
    "Yaanmed Information Technology LLC\nOffice No. 216,\nDubai Real Estate Centre,\nAl Mina Road,\nDubai, United Arab Emirates",
};

export default function LocationsList({ offices }: LocationsListProps) {
  const countries = Array.from(new Set(offices.map((o) => o.country)));
  const [activeCountry, setActiveCountry] = useState<string>(
    countries[0] || ""
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const processedOffices = offices.map((o) => ({
    ...o,
    address:
      addressOverrides[o.city] || addressOverrides[o.country] || o.address,
  }));

  const filtered = processedOffices.filter((o) => o.country === activeCountry);
  const activeOffice = filtered[0];
  const centerCoords = locationCoordinates[activeOffice?.city] ||
    locationCoordinates[activeCountry] || { lat: 20, lng: 0 };

  const zoomLevel = locationCoordinates[activeOffice?.city] ? 12 : 5;

  const groupedByCity = Object.entries(
    filtered.reduce((acc: Record<string, Office[]>, office) => {
      if (!acc[office.city]) acc[office.city] = [];
      acc[office.city].push(office);
      return acc;
    }, {})
  );

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Country Tabs - Significantly Reduced Margin */}
        {countries.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => setActiveCountry(country)}
                className={
                  activeCountry === country
                    ? "pb-1 text-primary border-b-2 border-primary text-base font-bold"
                    : "pb-1 text-neutral-500 hover:text-neutral-800 text-base font-medium transition"
                }
              >
                {country}
              </button>
            ))}
          </div>
        )}

        {/* Compact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* List Size */}
          <div className="space-y-4 flex flex-col justify-center">
            {groupedByCity.map(([city, officeList]) => (
              <div
                key={city}
                className="border-b border-neutral-100 pb-4 last:border-0 last:pb-0"
              >
                <h3 className="text-lg font-bold mb-2 text-slate-900 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  {city}
                </h3>
                <div className="space-y-3 text-neutral-600 leading-snug pl-3.5 border-l border-neutral-100">
                  {officeList.map((o) => (
                    <div key={o.id}>
                      <p className="whitespace-pre-line text-sm font-medium text-slate-700">
                        {o.address}
                      </p>
                      <div className="mt-2 space-y-1 text-xs text-slate-500">
                        {o.phone && (
                          <p className="flex items-center gap-1.5">
                            📞 <span className="text-slate-700">{o.phone}</span>
                          </p>
                        )}
                        {o.email && (
                          <p className="flex items-center gap-1.5">
                            ✉️ <span className="text-slate-700">{o.email}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Map - Reduced Min Height */}
          <div className="h-full min-h-[220px] rounded-xl overflow-hidden shadow-sm border border-slate-200 relative z-0">
            {isClient ? (
              <>
                <link
                  rel="stylesheet"
                  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                  integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                  crossOrigin=""
                />
                <style>{`
                  .leaflet-popup-content-wrapper { border-radius: 6px; }
                  .leaflet-container { font-size: 11px; }
                `}</style>
                <div className="absolute inset-0">
                  <MapContainer
                    key={`${centerCoords.lat}-${centerCoords.lng}`}
                    center={[centerCoords.lat, centerCoords.lng]}
                    zoom={zoomLevel}
                    style={{ height: "100%", width: "100%" }}
                    scrollWheelZoom={false}
                    zoomControl={false} // Remove zoom control for cleaner look
                    dragging={false} // Lock map interactions for "static/neat" feel? Or keep draggable? User said "align properly". Let's keep draggable but disable zoom scroll.
                    attributionControl={false}
                  >
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

                    {filtered.map((office, idx) => {
                      const coords =
                        locationCoordinates[office.city] ||
                        locationCoordinates[office.country];
                      if (!coords) return null;

                      return (
                        <Marker key={idx} position={[coords.lat, coords.lng]}>
                          <Popup>
                            <div className="p-1 min-w-[120px]">
                              <span className="font-bold text-slate-900 block mb-0.5 text-xs">
                                {office.city}
                              </span>
                            </div>
                          </Popup>
                        </Marker>
                      );
                    })}
                  </MapContainer>
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-slate-50 flex items-center justify-center min-h-[200px]">
                <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
