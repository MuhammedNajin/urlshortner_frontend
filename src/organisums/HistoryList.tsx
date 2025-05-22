import React from 'react';
import { BarChart3 } from 'lucide-react';

import { URLEntry } from '../@types/url';
import { Heading } from '../atoms/Heading';
import { Text } from '../atoms/Text';
import URLCard from '../molecules/URLCard';


interface HistoryListProps {
  entries: URLEntry[];
  onCopy: (url: string) => void;
  onDelete: (id: string) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ entries, onCopy, onDelete }) => {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-8 h-8 text-gray-400" />
        </div>
        <Heading level={3} className="text-lg font-medium text-gray-900 mb-2">
          No URLs found
        </Heading>
        <Text className="text-gray-500">
          Start by creating your first shortened URL!
        </Text>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <URLCard
          key={entry.id}
          entry={entry}
          onCopy={onCopy}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default HistoryList;
