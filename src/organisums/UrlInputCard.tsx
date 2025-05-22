import  { useState } from 'react';
import { z } from 'zod';
import { urlSchema } from '../@types/zodValidationSchema';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import urlModule from '../service/api/url';


const URLShortenerCard = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);


  const shortenUrl = async () => {
    setError('');
    setShortenedUrl('');
    setCopied(false);

    try {

      urlSchema.parse(originalUrl);

      setIsLoading(true);
      
      const response = await urlModule.createShortUrl(originalUrl)
      setShortenedUrl(response);
      setIsLoading(false);
    } catch (validationError) {
      console.error('Validation error:', validationError);
      if (validationError instanceof z.ZodError) {
        setError(validationError.errors[0].message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        setError('Failed to copy URL');
      });
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 border border-gray-300 rounded-md ">    
      <div className="mb-6">
        <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-2">
          Enter your long URL
        </label>
        <div className="flex">
          <Input 
            id="url-input"
            type="text"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="https://example.com/your-very-long-url-that-needs-shortening"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:ring-green-500 focus:border-green-500"

          />
          <Button
            onClick={shortenUrl}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-r-md transition duration-150 ease-in-out disabled:opacity-50" 
          >{isLoading ? 'Shortening...' : 'Shorten'}</Button>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
      
      {shortenedUrl && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your shortened URL
          </label>
          <div className="flex">
            <Input
              type="text"
              value={shortenedUrl}
              readOnly
              className="flex-grow px-4 py-2 bg-white border border-gray-300 rounded-l-md text-green-600"
            />
            <Button
              onClick={copyToClipboard}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-r-md transition duration-150 ease-in-out"
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Share this link with anyone you want!
          </p>
        </div>
      )}
    </div>
  );
};

export default URLShortenerCard;