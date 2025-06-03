'use client';
import React, {useEffect, useState} from 'react';
import Card from './Card';
import {auth} from '@/lib/firebase';
import {onAuthStateChanged} from 'firebase/auth';
import Cookies from 'js-cookie';
import { BASE_API } from '../lib/environment';

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                console.warn('❌ No user logged in');
                setLoading(false);
                return;
            }

            try {
                const idToken = await user.getIdToken();
                const accessToken = Cookies.get('accessToken');
                console.log('[🔑 accessToken]', accessToken);

                const res = await fetch(BASE_API + '/youtube/videos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${idToken}`
                    },
                    body: JSON.stringify({accessToken})
                });

                console.log('[📥 response status]', res.status);
                if (!res.ok) {
                    const errText = await res.text();
                    console.warn(`[⚠️ Fetch failed] ${res.status} - ${errText}`);
                    setVideos([]);
                    return;
                }

                const data = await res.json();
                if (Array.isArray(data)) {
                    setVideos(data);
                } else {
                    setVideos([]);
                    console.warn('[⚠️ Invalid response format]', data);
                }
            } catch (err) {
                console.error('❌ Error fetching videos:', err.message);
            } finally {
                setLoading(false);
            }
        });

        return() => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, []);

    if (loading) 
        return <p>Loading videos...</p>;
    
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (<Card key={video.videoId} video={video}/>))}
        </div>
    );
};

export default VideoList;
