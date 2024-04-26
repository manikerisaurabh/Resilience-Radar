import axios from 'axios';

export const getLocationData = async (latitude, longitude) => {
    try {
        console.log(latitude, longitude);
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
        const response = await axios.get(url);
        console.log("Response data:", response.data);

        // Handle the response data according to its structure
        if (response.data && response.data.address) {
            return response.data.address;
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        console.log("Error in getLocationData:", error);
        throw error; // Rethrow the error for the caller to handle
    }
};
