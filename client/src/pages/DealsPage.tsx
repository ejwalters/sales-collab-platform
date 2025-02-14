import { useState } from "react";
import { useNavigate } from 'react-router-dom';

interface Deal {
  name: string;
  value: string;
  owner: string;
  stage: string;
  lastUpdated: string;
}

const DealsPage = () => {
  const navigate = useNavigate();
  // Sample data - replace with your actual data source
  const [deals] = useState<Deal[]>([
    {
      name: "Acme Corp",
      value: "$50,000",
      owner: "John Doe",
      stage: "Discovery",
      lastUpdated: "2024-03-20",
    },
    {
      name: "Beta LLC",
      value: "$30,000",
      owner: "Alice Smith",
      stage: "Validation",
      lastUpdated: "2024-03-19",
    },
    // Add more sample deals as needed
  ]);

  const handleDealClick = (dealId: string) => {
    navigate(`/deals/${dealId}`);
  };

  return (
    <div className="container mx-auto p-5">
      <div className="card">
        <div className="card-header flex justify-between items-center">
          <h3 className="card-title">All Deals</h3>
          <button className="btn btn-primary">New Deal</button>
        </div>
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deal Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {deals.map((deal, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleDealClick(deal.name.toLowerCase().replace(/\s+/g, '-'))}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {deal.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{deal.value}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{deal.owner}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {deal.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {deal.lastUpdated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DealsPage };