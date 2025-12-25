import { render, screen } from '@testing-library/react';
import { VirtualList } from './VirtualList';

describe('VirtualList Molecule', () => {
  const mockItems = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
  ];

  it('renders visible items based on slice', () => {
    render(
      <VirtualList
        items={mockItems}
        itemHeight={50}
        containerHeight={100}
        startIndex={0}
        endIndex={1}
        offsetY={0}
        onScroll={() => {}}
        renderItem={(item: any) => <div key={item.id}>{item.name}</div>}
      />,
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});
