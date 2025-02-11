import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/i18n';
import { KeenIcon, Menu, MenuItem, MenuToggle } from '@/components';
import { toAbsoluteUrl } from '@/utils/Assets';
import { DropdownCardItem1 } from '@/partials/dropdowns/general';

interface ITodoItem {
  id: string;
  task: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  assignee: {
    name: string;
    avatar: string;
  };
  completed: boolean;
}

const ToDoList = () => {
  const { isRTL } = useLanguage();
  const [todos, setTodos] = useState<ITodoItem[]>([
    {
      id: '1',
      task: 'Send follow-up email to Acme Corp',
      dueDate: 'Today',
      priority: 'high',
      assignee: {
        name: 'Emma Smith',
        avatar: '300-6.png'
      },
      completed: false
    },
    {
      id: '2',
      task: 'Schedule product demo with Global Tech',
      dueDate: 'Tomorrow',
      priority: 'medium',
      assignee: {
        name: 'Max Harris',
        avatar: '300-5.png'
      },
      completed: false
    },
    {
      id: '3',
      task: 'Update proposal pricing section',
      dueDate: 'Next Week',
      priority: 'low',
      assignee: {
        name: 'Sean Bean',
        avatar: '300-1.png'
      },
      completed: true
    },
    {
      id: '4',
      task: 'Review contract terms with legal',
      dueDate: 'Today',
      priority: 'high',
      assignee: {
        name: 'Brian Cox',
        avatar: '300-2.png'
      },
      completed: false
    },
    {
      id: '5',
      task: 'Prepare quarterly business review',
      dueDate: 'Next Week',
      priority: 'medium',
      assignee: {
        name: 'Alan Johnson',
        avatar: '300-3.png'
      },
      completed: false
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">To-Do List</h3>
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
          </MenuItem>
        </Menu>
      </div>

      <div className="card-body">
        <div className="flex flex-col gap-2 lg:gap-4">
          {todos.map((todo) => (
            <div key={todo.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
              <div className="flex-shrink-0">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="checkbox"
                />
              </div>
              
              <div className="flex items-center justify-between grow gap-2">
                <div className="flex flex-col">
                  <span className={`text-sm font-medium ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                    {todo.task}
                  </span>
                  <span className="text-xs text-gray-500">Due: {todo.dueDate}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getPriorityColor(todo.priority)}`}>
                    {todo.priority}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <img
                      src={toAbsoluteUrl(`/media/avatars/${todo.assignee.avatar}`)}
                      alt={todo.assignee.name}
                      className="w-6 h-6 rounded-full"
                      title={todo.assignee.name}
                    />
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
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card-footer justify-center">
        <Link to="/tasks" className="btn btn-link">
          View All Tasks
        </Link>
      </div>
    </div>
  );
};

export { ToDoList };