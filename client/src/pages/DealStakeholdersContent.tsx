import { useState, useCallback } from 'react';
import ReactFlow, { 
  Node, 
  Edge, 
  Controls, 
  Background,
  MarkerType,
  Position,
  useNodesState,
  useEdgesState,
  Handle
} from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';
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

// Update StakeholderNode with fixed dimensions
const StakeholderNode = ({ data }: any) => {
  const { stakeholder } = data;
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        style={{ background: '#64748b' }}
      />
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 w-[280px]">
        <div className="flex items-center gap-3">
          {stakeholder.avatar ? (
            <img
              src={toAbsoluteUrl(`/media/avatars/${stakeholder.avatar}`)}
              className="size-10 rounded-full"
              alt={stakeholder.name}
            />
          ) : (
            <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium">
              {stakeholder.name.charAt(0)}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h4 className="font-medium text-gray-900 truncate">{stakeholder.name}</h4>
            <p className="text-sm text-gray-600 truncate">{stakeholder.title}</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${
            stakeholder.influence === 'high' 
              ? 'bg-success/10 text-success' 
              : stakeholder.influence === 'medium'
              ? 'bg-warning/10 text-warning'
              : 'bg-danger/10 text-danger'
          }`}>
            {stakeholder.influence.toUpperCase()}
          </span>
          <span className="text-xs text-gray-500 truncate">{stakeholder.department}</span>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ background: '#64748b' }}
      />
    </>
  );
};

// Keep nodeTypes outside
const nodeTypes = {
  stakeholderNode: StakeholderNode,
};

const DealStakeholdersContent = () => {
  const [showList, setShowList] = useState(false);

  const [stakeholders] = useState([
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

  const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    
    // Increase node spacing
    dagreGraph.setGraph({ 
      rankdir: 'TB', 
      nodesep: 100,  // Increased from 70
      ranksep: 120   // Increased from 100
    });

    // Use consistent node dimensions
    const nodeWidth = 280;
    const nodeHeight = 120;

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      return {
        ...node,
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        },
      };
    });

    return { nodes: layoutedNodes, edges };
  };

  // Create initial nodes and edges
  const initialNodes = stakeholders.map((stakeholder) => ({
    id: stakeholder.id,
    type: 'stakeholderNode',
    data: { stakeholder },
    position: { x: 0, y: 0 },
  }));

  const initialEdges = stakeholders
    .filter((s) => s.reportsTo)
    .map((stakeholder) => ({
      id: `${stakeholder.reportsTo}-${stakeholder.id}`,
      source: stakeholder.reportsTo!,
      target: stakeholder.id,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#64748b', strokeWidth: 2, strokeDasharray: '5,5' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#64748b',
      },
    }));

  // Get layouted elements
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
  );

  // Use ReactFlow state hooks
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  return (
    <div className="card h-[calc(100vh-200px)]">
      <div className="card-header border-b border-gray-200">
        <h3 className="card-title">Stakeholders Map</h3>
        <div className="flex items-center gap-4">
          <button 
            className="btn btn-light btn-sm"
            onClick={() => setShowList(!showList)}
          >
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
        >
          <Background />
          <Controls />
        </ReactFlow>

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
                        {stakeholder.name.charAt(0)}
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