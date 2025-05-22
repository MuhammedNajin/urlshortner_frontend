import axios from 'axios';
import api from './config';
import { URLEntry } from '../../@types/url';


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

  /**
   * Fetch all shortened URLs
   * @returns Promise with an array of URLEntry objects
   */
  async getUrls(): Promise<URLEntry[]> {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await api.get('/urls', { headers });

      
      const urls = response.data.data.map((item: any) => ({
        id: item.id,
        originalUrl: item.url,
        shortUrl: item.shortId,
        clicks: item.clicks,
        createdAt: new Date(item.createdAt),
        lastClicked: item.lastClicked ? new Date(item.lastClicked) : undefined,
      }));

      return urls;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch URLs');
      }
      throw new Error('Network error. Please try again later.');
    }
  }

  /**
   * Delete a shortened URL
   * @param id The ID of the URL to delete
   * @returns Promise indicating success
   */
  async deleteUrl(id: string): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      await api.delete(`/urls/${id}`, { headers });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to delete URL');
      }
      throw new Error('Network error. Please try again later.');
    }
  }
}

export default new UrlService();