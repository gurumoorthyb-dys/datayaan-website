import React from 'react';

interface Video {
    id: number;
    url: string;
    title?: string;
}

interface FooterVideosProps {
    videos: Video[];
}

const FooterVideos: React.FC<FooterVideosProps> = ({ videos }) => {
    if (!videos || videos.length === 0) return null;

    const getEmbedUrl = (url: string) => {
        if (!url) return null;
        // Handle standard YouTube URLs and short URLs
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
    };

    return (
        <div className="w-full py-10 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-6 text-center font-outfit">Featured Videos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {videos.map((video) => {
                        const embedUrl = getEmbedUrl(video.url);
                        if (!embedUrl) return null;
                        return (
                            <div key={video.id} className="aspect-video rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-black">
                                <iframe
                                    src={embedUrl}
                                    title={video.title || "YouTube video"}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    loading="lazy"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FooterVideos;
