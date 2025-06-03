'use client';

import {useGoogleLogin} from "@react-oauth/google";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {BASE_API} from "../../lib/environment";

export default function LoginPage() {
    const router = useRouter()

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const accessToken = tokenResponse.access_token;
                

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
                const res = await fetch(BASE_API + '/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({userInfo, accessToken})
                });

              if (res.ok) {
                const data = await res.json();
                
                Cookies.set('authorization', data.token, { expires: 1 / 24 }); // Store access token in cookies
                router.push('/dashboard'); // Redirect to dashboard after login
              } else { 
                alert("Failed to register user");
              }

                // Optional: redirect to dashboard router.push('/dashboard');

            } catch (error) {
                console.error(error);
                alert("Failed to login with Google");
            } 
        },

        onError: (error) => {
            alert("Google login failed");
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
