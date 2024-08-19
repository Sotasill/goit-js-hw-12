import axios from 'axios';

const API_KEY = '45376910-43038ea3ca87cb1ac327a6384';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function fetchImages(query, page = 1) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${PER_PAGE}&page=${page}`;

    try {
        const response = await axios.get(url);
        return response.data.hits;
    } catch (error) {
        throw new Error('Failed to fetch images');
    }
}


