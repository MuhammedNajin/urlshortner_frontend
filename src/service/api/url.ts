import axios from 'axios';
import api from './config';

class UrlService {

  /**
 * Create a short URL
 * @param longUrl The original long URL to shorten
 * @returns Promise with short URL data
 */
async createShortUrl(longUrl: string): Promise<string> {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const response = await api.post(
        '/urls/shorten', 
        { url: longUrl },
        { headers }
      );
      
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to create short URL');
      }
      throw new Error('Network error. Please try again later.');
    }
  }
}

export default new UrlService();