'use client';

import {useGoogleLogin} from "@react-oauth/google";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import { BASE_API } from "../lib/environment";

export default function LoginPage() {
    const router = useRouter()

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const accessToken = tokenResponse.access_token;

                // Optionally store it for reuse (e.g., dashboard page)
                Cookies.set('accessToken', accessToken, {
                    expires: 1 / 24
                });

                // Optionally get user info
                const userInfoRes = await fetch(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    }
                );

                const userInfo = await userInfoRes.json();
                console.log('[✅ User Info]', userInfo);

                // Send to backend
                const res = await fetch(BASE_API + '/youtube/videos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({accessToken})
                });

                const data = await res.json();
                console.log('[✅ Videos from backend]', data);

                // Optional: redirect to dashboard router.push('/dashboard');

            } catch (error) {
                console.error(error);
                toast.error("Failed to login with Google");
            } finally {
                router.push('/dashboard'); // Redirect to dashboard after login
            }
        },

        onError: (error) => {
            toast.error("Google login failed");
        },
        scope: 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/au' +
                'th/youtube.force-ssl'
    });

    return (
        <main>
            <h1>Login</h1>
            <button onClick={handleGoogleLogin}>Login with Google</button>
        </main>
    );
}
