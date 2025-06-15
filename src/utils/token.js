
import jwtDecode from "jwt-decode";

function getTokenExpiry(accessToken) 
{
    const decoded = jwtDecode(accessToken);
    return decoded.exp * 1000; // Convert to milliseconds
}



function scheduleTokenRefresh(accessToken) 
{
    const expiryTime = getTokenExpiry(accessToken);
    const now = Date.now();

    const timeUntilExpiry = expiryTime - now;

    // Refresh 1 minute before token expires
    const refreshTime = timeUntilExpiry - 60 * 1000;

    if (refreshTime <= 0) {
        // Token already expired or too close to expiry
        refreshAccessToken();
        return;
    }

    setTimeout(() => {
        refreshAccessToken();
    }, refreshTime);
}



// first in body level
const accessToken = localStorage.getItem("accessToken");

if (accessToken) {
    scheduleTokenRefresh(accessToken);
}



// api call is last step
async function refreshAccessToken() {
    try {

        let res = await axios.post("/verify-refresh-token",{},{withCredentials:true})

        if (res.data?.accessToken) 
        {
            // Store the new token and schedule again
            localStorage.setItem("accessToken", data.accessToken);
            scheduleTokenRefresh(data.accessToken);

        } else {
            // Refresh token invalid or expired
            logoutUser();
        }
    } catch (err) {
        console.error("Refresh token failed", err);
        logoutUser();
    }
}