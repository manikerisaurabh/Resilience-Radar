import axios from 'axios';

export const getLocationData = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    const response = await axios.get(url);
    return response.data.address;
};