export async function fetchImages(query, page) {
    const API_KEY = '45376910-43038ea3ca87cb1ac327a6384';
    const BASE_URL = 'https://pixabay.com/api/';
    const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${page}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('API response data:', data); 
  
      return {
        images: data.hits || [],
        totalHits: data.totalHits || 0,
      };
    } catch (error) {
      console.error('Error fetching images:', error);
      throw error;
    }
  }

