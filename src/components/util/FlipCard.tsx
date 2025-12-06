"use client";

export default function FlipCard({ front, back }: any) {
    return (
        <div className="relative w-full h-full flip-container">
            <div className="flip-inner w-full h-full">
                <div className="flip-front absolute inset-0 backface-hidden">
                    {front}
                </div>
                <div className="flip-back absolute inset-0 rotate-y-180 backface-hidden">
                    {back}
                </div>
            </div>
        </div>
    );
}
