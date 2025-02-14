import { useState } from 'react';
import { useLanguage } from '@/i18n';
import { KeenIcon, Menu, MenuItem, MenuToggle } from '@/components';
import { toAbsoluteUrl } from '@/utils/Assets';
import { DropdownCardItem1 } from '@/partials/dropdowns/general';

interface IAssignee {
  id: string;
  name: string;
  avatar: string;
}

interface IMilestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completed: boolean;
  assignees: IAssignee[];
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  order: number;
}

const DealMilestonesContent = () => {
  const { isRTL } = useLanguage();
  const [milestones, setMilestones] = useState<IMilestone[]>([
    {
      id: '1',
      title: 'Initial Contact & Requirements Gathering',
      description: 'First meeting with client to understand needs and collect requirements',
      targetDate: '2024-03-25',
      completed: true,
      assignees: [
        { id: '1', name: 'Emma Smith', avatar: '300-6.png' },
        { id: '2', name: 'Max Harris', avatar: '300-5.png' }
      ],
      status: 'completed',
      order: 1
    },
    {
      id: '2',
      title: 'Proposal Submission',
      description: 'Submit detailed proposal including pricing and timeline',
      targetDate: '2024-04-01',
      completed: true,
      assignees: [
        { id: '3', name: 'Sean Bean', avatar: '300-1.png' }
      ],
      status: 'completed',
      order: 2
    },
    {
      id: '3',
      title: 'Contract Negotiation',
      description: 'Review and negotiate contract terms with client',
      targetDate: '2024-04-15',
      completed: false,
      assignees: [
        { id: '4', name: 'Brian Cox', avatar: '300-2.png' },
        { id: '5', name: 'Alan Johnson', avatar: '300-3.png' }
      ],
      status: 'in_progress',
      order: 3
    },
    {
      id: '4',
      title: 'Contract Signing',
      description: 'Finalize and sign contract with all parties',
      targetDate: '2024-04-30',
      completed: false,
      assignees: [
        { id: '1', name: 'Emma Smith', avatar: '300-6.png' }
      ],
      status: 'pending',
      order: 4
    },
    {
      id: '5',
      title: 'Initial Payment Receipt',
      description: 'Process and confirm initial payment from client',
      targetDate: '2024-05-15',
      completed: false,
      assignees: [
        { id: '2', name: 'Max Harris', avatar: '300-5.png' }
      ],
      status: 'pending',
      order: 5
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'in_progress':
        return 'text-primary bg-primary/10';
      case 'delayed':
        return 'text-danger bg-danger/10';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return 'check-circle';
      case 'in_progress':
        return 'refresh';
      case 'delayed':
        return 'warning-2';
      default:
        return 'clock';
    }
  };

  const toggleMilestone = (id: string) => {
    setMilestones(milestones.map(milestone => {
      if (milestone.id === id) {
        const newStatus = milestone.status === 'completed' ? 'pending' : 'completed';
        return { ...milestone, status: newStatus, completed: !milestone.completed };
      }
      return milestone;
    }));
  };

  return (
    <div className="card">
      <div className="card-header border-b border-gray-200">
        <h3 className="card-title">Milestones</h3>
        <button className="btn btn-primary btn-sm">
          <KeenIcon icon="plus" className="size-4 me-2" />
          Add Milestone
        </button>
      </div>

      <div className="card-body">
        <div className="flex flex-col gap-4">
          {milestones.map((milestone, index) => (
            <div 
              key={milestone.id} 
              className={`relative flex items-start gap-4 p-4 rounded-lg border ${
                milestone.completed ? 'bg-gray-50' : 'bg-white'
              } border-gray-200`}
            >
              {/* Connection line */}
              {index < milestones.length - 1 && (
                <div className="absolute left-7 top-16 bottom-0 w-0.5 bg-gray-200 -mb-8" />
              )}
              
              {/* Checkbox */}
              <div 
                onClick={() => toggleMilestone(milestone.id)}
                className={`flex-shrink-0 w-6 h-6 mt-1 rounded-full cursor-pointer flex items-center justify-center border
                  ${milestone.completed 
                    ? 'bg-primary border-primary' 
                    : 'bg-white border-gray-300 hover:border-primary'}`}
              >
                {milestone.completed && (
                  <KeenIcon icon="check" className="text-white size-4" />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow gap-2">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <h4 className={`font-medium ${
                      milestone.completed ? 'text-gray-400' : 'text-gray-900'
                    }`}>
                      {milestone.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {milestone.description}
                    </p>
                  </div>
                  
                  <Menu>
                    <MenuItem
                      toggle="dropdown"
                      trigger="click"
                      dropdownProps={{
                        placement: isRTL() ? 'bottom-start' : 'bottom-end'
                      }}
                    >
                      <MenuToggle className="btn btn-sm btn-icon btn-light btn-clear">
                        <KeenIcon icon="dots-vertical" />
                      </MenuToggle>
                      {DropdownCardItem1()}
                    </MenuItem>
                  </Menu>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                      Target: {new Date(milestone.targetDate).toLocaleDateString()}
                    </span>
                    <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${getStatusColor(milestone.status)}`}>
                      <KeenIcon icon={getStatusIcon(milestone.status)} className="size-3" />
                      {milestone.status.replace('_', ' ').charAt(0).toUpperCase() + 
                       milestone.status.slice(1).replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center -space-x-2">
                    {milestone.assignees.map((assignee) => (
                      <img
                        key={assignee.id}
                        src={toAbsoluteUrl(`/media/avatars/${assignee.avatar}`)}
                        alt={assignee.name}
                        className="w-6 h-6 rounded-full border-2 border-white"
                        title={assignee.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { DealMilestonesContent };