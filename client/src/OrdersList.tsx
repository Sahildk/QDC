import React from 'react';
import type { Order } from './App';
import type { SelectedStatus } from './App';

interface Props {
  orders: Order[];
  selectedStatus: SelectedStatus;
}

const statusLabel: Record<string, string> = {
  received: 'Received',
  in_cleaning: 'In Cleaning',
  ready: 'Ready for Pickup',
  delivered: 'Delivered',
};

export const OrdersList: React.FC<Props> = ({ orders, selectedStatus }) => {
  if (orders.length === 0) {
    return <p>No active orders.</p>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {orders.map((order) => {
        const visibleGarments =
          selectedStatus === 'all'
            ? order.garments
            : order.garments.filter((g) => g.status === selectedStatus);

        return (
          <div
            key={order.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: 4,
              padding: '0.75rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{order.id}</strong>
              <span>{order.customerName}</span>
            </div>
            <small>Created: {new Date(order.createdAt).toLocaleString()}</small>
            {visibleGarments.length === 0 ? (
              <p style={{ margin: '0.5rem 0 0', color: '#888', fontSize: '0.875rem' }}>
                No garments with status &ldquo;{statusLabel[selectedStatus] ?? selectedStatus}&rdquo; in this order.
              </p>
            ) : (
              <ul>
                {visibleGarments.map((g) => (
                  <li key={g.id}>
                    {g.description} - <em>{statusLabel[g.status] ?? g.status}</em>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};
