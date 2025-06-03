'use client';

import Cookies from 'js-cookie';
import {useEffect, useState} from 'react';
import {BASE_API} from '../../lib/environment';

export default function DashboardPage() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVideos();

    }, []);

    const fetchVideos = async () => {
        try {
            const res = await fetch(BASE_API + '/youtube/videos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('authorization')}`
                }
            });

            const data = await res.json();

            if (res.ok && data.videos) {
                setVideos(data.videos);
            } else {
                console.error('Failed to fetch videos:', data.error || data);
            }
        } catch (err) {
            console.error('Error fetching videos:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <h1>Dashboard</h1>
            <ul>
                {
                    videos?.map((video) => (
                        <li
                            key={video.videoId}
                            style={{
                                marginBottom: '20px'
                            }}>
                            <h3>{video.title}</h3>
                            <img src={video.thumbnail} alt={video.title} width={240}/>
                            <p>Video ID: {video.videoId}</p>
                            <p>Published: {new Date(video.publishedAt).toLocaleString()}</p>
                        </li>
                    ))
                }
            </ul>
        </main>
    );
}
