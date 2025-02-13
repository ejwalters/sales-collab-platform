import { useState, useCallback } from 'react';
import ReactFlow, { 
  Node, 
  Edge, 
  Controls,
  Background,
  MarkerType,
  Position,
  useNodesState,
  useEdgesState
} from 'reactflow';
import dagre from 'dagre';
import 'reactflow/dist/style.css';
import { KeenIcon } from '@/components';
import { toAbsoluteUrl } from '@/utils';

interface Stakeholder {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  department: string;
  influence: 'high' | 'medium' | 'low';
  reportsTo?: string;
}

const DealStakeholdersContent = () => {
  const [showList, setShowList] = useState(false);
  
  // Create a new dagre graph
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  
  // Set fixed dimensions for all nodes
  const nodeWidth = 250;
  const nodeHeight = 120;
  
  // Configure the graph layout
  dagreGraph.setGraph({ 
    rankdir: 'TB',
    nodesep: 80,
    ranksep: 100 
  });

  // Initial stakeholders data (keep your existing data)
  const [stakeholders] = useState<Stakeholder[]>([
    {
      id: '1',
      name: 'John Smith',
      title: 'Chief Technology Officer',
      avatar: '300-1.png',
      department: 'Technology',
      influence: 'high'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      title: 'VP of Engineering',
      avatar: '300-2.png',
      department: 'Engineering',
      influence: 'high',
      reportsTo: '1'
    },
    {
      id: '3',
      name: 'Michael Chen',
      title: 'Engineering Manager',
      department: 'Engineering',
      influence: 'medium',
      reportsTo: '2'
    },
    {
      id: '4',
      name: 'Emily Davis',
      title: 'Technical Lead',
      avatar: '300-3.png',
      department: 'Engineering',
      influence: 'medium',
      reportsTo: '3'
    },
    {
      id: '5',
      name: 'Robert Wilson',
      title: 'IT Director',
      department: 'Technology',
      influence: 'high',
      reportsTo: '1'
    }
  ]);

  // Convert stakeholders to initial nodes with positions
  const initialNodes: Node[] = stakeholders.map((stakeholder) => ({
    id: stakeholder.id,
    position: { x: 0, y: 0 },
    data: { stakeholder },
    type: 'stakeholderNode',
    draggable: true,
    style: { width: nodeWidth, height: nodeHeight } // Set fixed dimensions
  }));

  // Update the edges creation with more explicit configuration
  const initialEdges: Edge[] = stakeholders
    .filter(s => s.reportsTo)
    .map(stakeholder => ({
      id: `${stakeholder.reportsTo}-${stakeholder.id}`,
      source: stakeholder.reportsTo!,
      target: stakeholder.id,
      type: 'smoothstep',
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#64748b',
      },
      style: {
        strokeWidth: 2,
        stroke: '#64748b',
        strokeDasharray: 5,
      },
      className: 'animated-edge'
    }));

  // Add nodes and edges to the dagre graph
  initialNodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });
  initialEdges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Calculate the layout
  dagre.layout(dagreGraph);

  // Update node positions based on the layout
  const layoutedNodes = initialNodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getInfluenceColor = (influence: string) => {
    switch (influence) {
      case 'high':
        return 'bg-success/10 text-success ring-success/20';
      case 'medium':
        return 'bg-warning/10 text-warning ring-warning/20';
      case 'low':
        return 'bg-danger/10 text-danger ring-danger/20';
      default:
        return 'bg-gray-100 text-gray-600 ring-gray-200';
    }
  };

  // Custom node component with fixed dimensions
  const StakeholderNode = ({ data }: { data: { stakeholder: Stakeholder } }) => {
    const { stakeholder } = data;
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 w-[250px]">
        <div className="flex items-center gap-3">
          {stakeholder.avatar ? (
            <img
              src={toAbsoluteUrl(`/media/avatars/${stakeholder.avatar}`)}
              className="size-10 rounded-full ring-2 ring-gray-100"
              alt={stakeholder.name}
            />
          ) : (
            <div className="size-10 rounded-full bg-gray-100 ring-2 ring-gray-200 flex items-center justify-center text-gray-600 font-medium">
              {getInitials(stakeholder.name)}
            </div>
          )}
          <div>
            <h4 className="font-medium text-gray-900">{stakeholder.name}</h4>
            <p className="text-sm text-gray-600">{stakeholder.title}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getInfluenceColor(stakeholder.influence)}`}>
            {stakeholder.influence.toUpperCase()}
          </span>
          <span className="text-xs text-gray-500">{stakeholder.department}</span>
        </div>
      </div>
    );
  };

  const nodeTypes = {
    stakeholderNode: StakeholderNode
  };

  console.log('Nodes:', nodes);
  console.log('Edges:', edges);

  return (
    <div className="card h-[calc(100vh-200px)]">
      <style>
        {`
          @keyframes flow {
            from {
              stroke-dashoffset: 1000;
            }
            to {
              stroke-dashoffset: 0;
            }
          }
          .animated-edge {
            stroke-dasharray: 5;
            animation: flow 30s linear infinite;
          }
          .animated-edge:hover {
            stroke: #3b82f6;
            stroke-width: 3;
          }
        `}
      </style>
      <div className="card-header border-b border-gray-200">
        <h3 className="card-title">Stakeholders Map</h3>
        <div className="flex items-center gap-4">
          <button 
            className="btn btn-light btn-sm"
            onClick={() => setShowList(!showList)}
          >
            <KeenIcon icon="list" className="size-4 me-2" />
            View List
          </button>
          <button className="btn btn-primary btn-sm">
            Add Stakeholder
          </button>
        </div>
      </div>

      <div className="card-body relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          className="bg-gray-50"
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: true,
            style: {
              stroke: '#64748b',
              strokeWidth: 2,
              strokeDasharray: 5,
            }
          }}
        >
          <Background />
          <Controls />
        </ReactFlow>

        {/* Stakeholder List Sidebar */}
        {showList && (
          <div className="absolute top-0 right-0 w-80 h-full bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-4">
              <h4 className="font-medium text-gray-900 mb-4">Stakeholders List</h4>
              <div className="space-y-4">
                {stakeholders.map((stakeholder) => (
                  <div key={stakeholder.id} className="flex items-center gap-3">
                    {stakeholder.avatar ? (
                      <img
                        src={toAbsoluteUrl(`/media/avatars/${stakeholder.avatar}`)}
                        className="size-8 rounded-full"
                        alt={stakeholder.name}
                      />
                    ) : (
                      <div className="size-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-sm font-medium">
                        {getInitials(stakeholder.name)}
                      </div>
                    )}
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">{stakeholder.name}</h5>
                      <p className="text-xs text-gray-600">{stakeholder.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { DealStakeholdersContent };