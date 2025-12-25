import type { Meta, StoryObj } from '@storybook/react';
import { VirtualList } from './VirtualList';

// Define the type for your mock items
interface MockItem {
  id: number;
  name: string;
}

const meta: Meta<typeof VirtualList> = {
  title: 'Molecules/VirtualList',
  component: VirtualList,
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of items to render',
    },
    itemHeight: {
      control: 'number',
      description: 'Height of each item in pixels',
    },
    containerHeight: {
      control: 'number',
      description: 'Height of the container in pixels',
    },
    startIndex: {
      control: 'number',
      description: 'Index of the first visible item',
    },
    endIndex: {
      control: 'number',
      description: 'Index of the last visible item',
    },
    offsetY: {
      control: 'number',
      description: 'Vertical offset for positioning',
    },
    renderItem: {
      description: 'Function to render each item',
    },
  },
};

export default meta;
type Story = StoryObj<typeof VirtualList<MockItem>>;

// Generate mock items
const mockItems: MockItem[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
}));

export const Default: Story = {
  args: {
    items: mockItems,
    itemHeight: 50,
    containerHeight: 300,
    startIndex: 0,
    endIndex: 10,
    offsetY: 0,
    renderItem: (item: MockItem, index: number) => (
      <div
        key={item.id}
        style={{
          height: 50,
          borderBottom: '1px solid #ccc',
          padding: '12px',
          backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span style={{ fontWeight: 500 }}>{item.name}</span>
        <span style={{ marginLeft: 'auto', color: '#666', fontSize: '14px' }}>
          ID: {item.id}
        </span>
      </div>
    ),
  },
};

// Additional story with different configuration
export const LargeDataset: Story = {
  args: {
    items: Array.from({ length: 10000 }, (_, i) => ({
      id: i + 1,
      name: `Large Dataset Item ${i + 1}`,
    })),
    itemHeight: 40,
    containerHeight: 400,
    startIndex: 50,
    endIndex: 70,
    offsetY: 2000, // 50 items * 40px each
    renderItem: (item: MockItem) => (
      <div
        style={{
          height: 40,
          borderBottom: '1px solid #e5e5e5',
          padding: '8px 12px',
          fontSize: '14px',
        }}
      >
        {item.name}
      </div>
    ),
  },
};

// Story with scroll handler
export const WithScroll: Story = {
  args: {
    items: mockItems,
    itemHeight: 50,
    containerHeight: 300,
    startIndex: 0,
    endIndex: 10,
    offsetY: 0,
    onScroll: (event: React.UIEvent<HTMLDivElement>) => {
      const target = event.currentTarget;
      console.log('Scroll position:', {
        scrollTop: target.scrollTop,
        scrollHeight: target.scrollHeight,
        clientHeight: target.clientHeight,
      });
    },
    renderItem: (item: MockItem, index: number) => (
      <div
        style={{
          height: 50,
          borderBottom: '1px solid #ccc',
          padding: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontWeight: 500 }}>{item.name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Index: {index}</div>
        </div>
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            backgroundColor:
              index % 3 === 0
                ? '#4CAF50'
                : index % 3 === 1
                  ? '#2196F3'
                  : '#FF9800',
          }}
        />
      </div>
    ),
  },
};

// Story with custom styling
export const StyledList: Story = {
  args: {
    items: mockItems.slice(0, 20),
    itemHeight: 60,
    containerHeight: 360,
    startIndex: 0,
    endIndex: 5,
    offsetY: 0,
    className: 'custom-virtual-list',
    renderItem: (item: MockItem) => (
      <div
        style={{
          height: 60,
          margin: '4px',
          padding: '16px',
          borderRadius: '8px',
          backgroundColor: '#f0f7ff',
          border: '1px solid #d1e7ff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#e1f0ff';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#f0f7ff';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <div style={{ fontWeight: 600, color: '#0066cc' }}>{item.name}</div>
        <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
          This is a custom styled item
        </div>
      </div>
    ),
  },
};

// Generic story template that can handle any type
export const GenericExample: StoryObj<typeof VirtualList> = {
  args: {
    items: mockItems,
    itemHeight: 50,
    containerHeight: 300,
    startIndex: 0,
    endIndex: 10,
    offsetY: 0,
    renderItem: (item: unknown, index: number) => {
      // Type guard to handle the item
      if (typeof item === 'object' && item !== null && 'name' in item) {
        const typedItem = item as { name: string; id?: number };
        return (
          <div
            style={{
              height: 50,
              borderBottom: '1px solid #ccc',
              padding: '12px',
            }}
          >
            {typedItem.name} {typedItem.id ? `(ID: ${typedItem.id})` : ''}
          </div>
        );
      }

      // Fallback for generic items
      return (
        <div
          style={{
            height: 50,
            borderBottom: '1px solid #ccc',
            padding: '12px',
          }}
        >
          Item {index + 1}: {JSON.stringify(item)}
        </div>
      );
    },
  },
};
