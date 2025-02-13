import { useState } from 'react';
import { KeenIcon } from '@/components';
import { toAbsoluteUrl } from '@/utils';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: {
    name: string;
    avatar?: string;
  };
  uploadedAt: string;
}

const DealDocumentsContent = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Q2_Proposal.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadedBy: {
        name: 'Emma Smith',
        avatar: '300-1.jpg'
      },
      uploadedAt: '2 hours ago'
    },
    {
      id: '2',
      name: 'Implementation_Timeline.xlsx',
      type: 'Spreadsheet',
      size: '1.2 MB',
      uploadedBy: {
        name: 'Marcus Johnson'
      },
      uploadedAt: '4 hours ago'
    },
    {
      id: '3',
      name: 'Technical_Requirements.docx',
      type: 'Document',
      size: '892 KB',
      uploadedBy: {
        name: 'Alex Hunt',
        avatar: '300-2.jpg'
      },
      uploadedAt: 'Yesterday'
    }
  ]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRandomColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-indigo-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-red-500',
      'bg-orange-500',
      'bg-amber-500',
      'bg-yellow-500',
      'bg-lime-500',
      'bg-green-500',
      'bg-emerald-500',
      'bg-teal-500',
      'bg-cyan-500',
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  const handleDelete = (documentId: string) => {
    setDocuments(documents.filter(doc => doc.id !== documentId));
  };

  return (
    <div className="card">
      <div className="card-header border-b border-gray-200">
        <h3 className="card-title">Documents</h3>
        <button className="btn btn-primary btn-sm">
          Upload Document
        </button>
      </div>

      <div className="card-body">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="border-b border-gray-200 text-gray-600">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Uploaded By</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {documents.map((document) => (
                <tr key={document.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <KeenIcon 
                        icon={
                          document.type === 'PDF' ? 'file-pdf' :
                          document.type === 'Spreadsheet' ? 'file-spreadsheet' :
                          'file-document'
                        }
                        className={`size-5 ${
                          document.type === 'PDF' ? 'text-danger' :
                          document.type === 'Spreadsheet' ? 'text-success' :
                          'text-primary'
                        }`}
                      />
                      <span className="text-sm font-medium text-gray-900">{document.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{document.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{document.size}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {document.uploadedBy.avatar ? (
                        <img
                          src={toAbsoluteUrl(`/media/avatars/${document.uploadedBy.avatar}`)}
                          className="size-6 rounded-full"
                          alt={document.uploadedBy.name}
                        />
                      ) : (
                        <div className={`size-6 rounded-full ${getRandomColor(document.uploadedBy.name)} flex items-center justify-center text-white text-xs font-medium`}>
                          {getInitials(document.uploadedBy.name)}
                        </div>
                      )}
                      <span className="text-sm text-gray-600">{document.uploadedBy.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{document.uploadedAt}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="btn btn-icon btn-sm btn-light">
                        <KeenIcon icon="download" className="size-4" />
                      </button>
                      <button 
                        className="btn btn-icon btn-sm btn-light-danger"
                        onClick={() => handleDelete(document.id)}
                      >
                        <KeenIcon icon="trash" className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export { DealDocumentsContent };
