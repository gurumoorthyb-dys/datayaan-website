'use client';

import { useState } from "react";

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

export default function LocationsList({ offices }: LocationsListProps) {
    const countries = Array.from(new Set(offices.map(o => o.country)));
    const [activeCountry, setActiveCountry] = useState<string>(countries[0] || "");

    const filtered = offices.filter(o => o.country === activeCountry);

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
                {/* Country Tabs */}
                {countries.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-6 mb-12">
                        {countries.map((country) => (
                            <button
                                key={country}
                                onClick={() => setActiveCountry(country)}
                                className={
                                    activeCountry === country
                                        ? "pb-2 text-primary border-b-2 border-primary text-lg font-semibold"
                                        : "pb-2 text-neutral-500 hover:text-neutral-800 text-lg font-medium transition"
                                }
                            >
                                {country}
                            </button>
                        ))}
                    </div>
                )}

                {/* City + Address List */}
                <div className="space-y-12">
                    {groupedByCity.map(([city, officeList]) => (
                        <div key={city} className="border-b border-neutral-200 pb-8 last:border-0">
                            {/* City Title */}
                            <h3 className="text-2xl font-semibold mb-6 text-neutral-900">{city}</h3>

                            {/* Two Columns */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-neutral-700 leading-relaxed">
                                {/* Column 1 */}
                                <div className="space-y-6">
                                    {officeList.slice(0, Math.ceil(officeList.length / 2)).map((o) => (
                                        <div key={o.id}>
                                            <p className="whitespace-pre-line">{o.address}</p>
                                            {o.phone && <p className="mt-2">📞 {o.phone}</p>}
                                            {o.email && <p>✉️ {o.email}</p>}
                                        </div>
                                    ))}
                                </div>

                                {/* Column 2 */}
                                <div className="space-y-6">
                                    {officeList.slice(Math.ceil(officeList.length / 2)).map((o) => (
                                        <div key={o.id}>
                                            <p className="whitespace-pre-line">{o.address}</p>
                                            {o.phone && <p className="mt-2">📞 {o.phone}</p>}
                                            {o.email && <p>✉️ {o.email}</p>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
