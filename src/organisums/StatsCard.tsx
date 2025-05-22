import { Heading } from "../atoms/Heading";
import { Text } from "../atoms/Text";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-white rounded-md border border-gray-300 p-6">
      <div className="flex items-center justify-between">
        <div>
          <Text className="text-sm font-medium text-gray-600">{title}</Text>
          <Heading level={3} className="text-3xl font-bold text-gray-900 mt-2">
            {value}
          </Heading>
          {trend && (
            <Text className="text-sm text-green-600 mt-1">{trend}</Text>
          )}
        </div>
        <div className="w-12 h-12 bg-blue-50 rounded-md flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
