'use client';
import React from 'react';

const Card = ({video}) => {
    const {title, description, thumbnail, videoId} = video;

    return (
        <div
            className="w-full max-w-md p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition">
            <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer">
                <img src={thumbnail} alt={title} className="w-full h-auto rounded-md mb-3"/>
            </a>
            <h3 className="text-lg font-semibold mb-1">{title}</h3>
            <p className="text-sm text-gray-600">
                {
                    description.length > 100
                        ? description.slice(0, 100) + '...'
                        : description
                }
            </p>
        </div>
    );
};

export default Card;
