import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import urlService from '../service/api/url';
import HistoryList from '../organisums/HistoryList';
import { URLEntry } from '../@types/url';
import { Heading } from '../atoms/Heading';
import { Text } from '../atoms/Text';
import { AppTemplate } from '../templates/AppTemplate';

const HistoryPage: React.FC = () => {
  const [urlEntries, setUrlEntries] = useState<URLEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        setLoading(true);
        const urls = await urlService.getUrls();
        setUrlEntries(urls);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch URLs');
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);


  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard!');
  };

  const handleDelete = async (id: string) => {
    try {
      await urlService.deleteUrl(id);
      setUrlEntries(urlEntries.filter((entry) => entry.id !== id));
      toast.success('URL deleted successfully!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete URL');
    }
  };

  return (
    <AppTemplate>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Heading level={1} className="text-xl font-bold text-gray-900 mb-2">
              URL History
            </Heading>
            <Text className="text-gray-600">
              Manage and track all your shortened URLs
            </Text>
          </div>

          {loading && (
            <Text className="text-center text-gray-600">Loading URLs...</Text>
          )}
          {error && (
            <Text className="text-center text-red-600">{error}</Text>
          )}
          {!loading && !error && (
            <HistoryList
              entries={urlEntries}
              onCopy={handleCopy}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </AppTemplate>
  );
};

export default HistoryPage;