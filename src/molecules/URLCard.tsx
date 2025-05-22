import { Calendar, Copy, ExternalLink, Trash2 } from "lucide-react";
import { Text } from "../atoms/Text";
import { Icon } from "../atoms/Icon";
import { URLEntry } from "../@types/url";

interface URLCardProps {
  entry: URLEntry;
  onCopy: (url: string) => void;
  onDelete: (id: string) => void;
}

const URLCard: React.FC<URLCardProps> = ({ entry, onCopy, onDelete }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
 <div className="bg-white rounded-md border border-gray-300 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <Text className="text-sm font-medium text-gray-900 truncate mb-1">
            {entry.originalUrl}
          </Text>
          <Text className="text-sm text-blue-600 font-mono">
            {`${import.meta.env.VITE_BASE_URL || 'http://localhost:3002'}/urls/${entry.shortUrl}`}
          </Text>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <Icon
            onClick={() => onCopy(`${import.meta.env.VITE_BASE_URL || 'http://localhost:3002'}/urls/${entry.shortUrl}`)}
            
            ariaLabel="Copy URL"
            className="text-gray-500 hover:text-gray-700"
          >
            <Copy className="w-4 h-4" />
          </Icon>
          <Icon
            onClick={() => window.open(entry.originalUrl, '_blank')}
            ariaLabel="Open URL"
            className="text-gray-500 hover:text-gray-700"
          >
            <ExternalLink className="w-4 h-4" />
          </Icon>
          <Icon
            onClick={() => onDelete(entry.id)}
           
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Icon>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <Text className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            Created {formatDate(entry.createdAt)}
          </Text>
        </div>
       
      </div>
    </div>
  );
}

export default URLCard;