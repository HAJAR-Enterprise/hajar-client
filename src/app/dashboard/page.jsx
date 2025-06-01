'use client';

import Cookies from 'js-cookie';
import {useEffect, useState} from 'react';
import { BASE_API } from '../lib/environment';

export default function DashboardPage() {
    const [token, setToken] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const accessToken = Cookies.get('accessToken');

        if (!accessToken) {
            window.location.href = '/login';
        } else {
            setToken(accessToken);
            fetchVideos(accessToken);
        }
    }, []);

    const fetchVideos = async (accessToken) => {
        try {
            const res = await fetch(BASE_API + '/youtube/videos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({accessToken})
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
            {token && <p>Logged in with token: {token.slice(0, 10)}...</p>}

            {
                loading
                    ? (<p>Loading videos...</p>)
                    : videos.length === 0
                        ? (<p>No videos found.</p>)
                        : (
                            <ul>
                                {
                                    videos.map((video) => (
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
                        )
            }
        </main>
    );
}
