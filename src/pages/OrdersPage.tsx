import { useState, useEffect } from 'react';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface TrackingStep {
  status: string;
  date: string | null;
  completed: boolean;
}

interface TrackingInfo {
  number: string;
  steps: TrackingStep[];
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  tracking: TrackingInfo;
}

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Sample order data
  const sampleOrders: Order[] = [
    {
      id: "ORD-7852",
      date: "2023-10-15",
      total: 149.99,
      status: "delivered",
      items: [
        { name: "Wireless Headphones", price: 99.99, quantity: 1 },
        { name: "Phone Case", price: 25.00, quantity: 2 }
      ],
      tracking: {
        number: "TRK78521463",
        steps: [
          { status: "ordered", date: "2023-10-15", completed: true },
          { status: "processed", date: "2023-10-16", completed: true },
          { status: "shipped", date: "2023-10-17", completed: true },
          { status: "delivered", date: "2023-10-19", completed: true }
        ]
      }
    },
    {
      id: "ORD-6391",
      date: "2023-10-20",
      total: 87.50,
      status: "shipped",
      items: [
        { name: "Smart Watch", price: 87.50, quantity: 1 }
      ],
      tracking: {
        number: "TRK63918725",
        steps: [
          { status: "ordered", date: "2023-10-20", completed: true },
          { status: "processed", date: "2023-10-21", completed: true },
          { status: "shipped", date: "2023-10-22", completed: true },
          { status: "delivered", date: null, completed: false }
        ]
      }
    },
    {
      id: "ORD-4521",
      date: "2023-10-25",
      total: 234.75,
      status: "processing",
      items: [
        { name: "Gaming Mouse", price: 59.99, quantity: 1 },
        { name: "Mechanical Keyboard", price: 119.99, quantity: 1 },
        { name: "Mouse Pad", price: 24.99, quantity: 1 }
      ],
      tracking: {
        number: "TRK45219834",
        steps: [
          { status: "ordered", date: "2023-10-25", completed: true },
          { status: "processed", date: null, completed: false },
          { status: "shipped", date: null, completed: false },
          { status: "delivered", date: null, completed: false }
        ]
      }
    },
    {
      id: "ORD-1987",
      date: "2023-10-10",
      total: 45.00,
      status: "cancelled",
      items: [
        { name: "USB Cable", price: 15.00, quantity: 3 }
      ],
      tracking: {
        number: "TRK19876543",
        steps: [
          { status: "ordered", date: "2023-10-10", completed: true },
          { status: "cancelled", date: "2023-10-11", completed: true }
        ]
      }
    }
  ];

  useEffect(() => {
    setOrders(sampleOrders);
    setFilteredOrders(sampleOrders);
  }, []);

  useEffect(() => {
    filterOrders();
  }, [searchTerm, statusFilter, orders]);

  const filterOrders = () => {
    let filtered = orders.filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
    
    setFilteredOrders(filtered);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getProgressPercentage = (order: Order) => {
    const completedSteps = order.tracking.steps.filter(step => step.completed).length;
    return (completedSteps / order.tracking.steps.length) * 100;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Pending';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track your orders and view order history</p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                <input 
                  type="text" 
                  placeholder="Search by order ID or product" 
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select 
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button 
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition duration-200"
                onClick={handleClearFilters}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const progressPercentage = getProgressPercentage(order);
              const completedSteps = order.tracking.steps.filter(step => step.completed).length;
              
              return (
                <div 
                  key={order.id} 
                  className="bg-white rounded-lg shadow overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Order {order.id}</h3>
                        <p className="text-gray-500 text-sm">
                          Placed on {new Date(order.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                      <div className="mt-2 md:mt-0">
                        <span className={`status-indicator status-${order.status} font-medium capitalize relative pl-5`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                      <div className="mb-4 md:mb-0">
                        <p className="text-gray-700">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </p>
                        <p className="text-gray-900 font-semibold">${order.total.toFixed(2)}</p>
                      </div>
                      <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center"
                        onClick={() => toggleOrderDetails(order.id)}
                      >
                        <span>View Details</span>
                        <i 
                          className={`fas fa-chevron-${expandedOrder === order.id ? 'up' : 'down'} ml-2 transition-transform duration-300`}
                        ></i>
                      </button>
                    </div>
                    
                    {/* Tracking Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Order Progress</span>
                        <span>{completedSteps} of {order.tracking.steps.length} steps</span>
                      </div>
                      <div className="progress-bar h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="progress-fill h-full bg-blue-600 transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Details */}
                  <div 
                    className={`border-t border-gray-200 transition-all duration-500 overflow-hidden ${
                      expandedOrder === order.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Order Details</h4>
                      
                      {/* Items List */}
                      <div className="mb-6">
                        <h5 className="font-medium text-gray-700 mb-2">Items</h5>
                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                              <div>
                                <p className="text-gray-900">{item.name}</p>
                                <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                              </div>
                              <p className="text-gray-900 font-medium">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Tracking Information */}
                      <div className="mb-6">
                        <h5 className="font-medium text-gray-700 mb-2">Tracking Information</h5>
                        <p className="text-gray-600 mb-3">
                          Tracking Number: <span className="font-mono">{order.tracking.number}</span>
                        </p>
                        
                        <div className="space-y-4">
                          {order.tracking.steps.map((step, index) => (
                            <div key={index} className="flex items-start">
                              <div className="flex-shrink-0 mt-1">
                                <div className={`w-4 h-4 rounded-full ${
                                  step.completed ? 'bg-blue-600' : 'bg-gray-300'
                                }`}></div>
                              </div>
                              <div className="ml-3">
                                <p className="text-gray-900 capitalize">{step.status}</p>
                                <p className="text-gray-500 text-sm">{formatDate(step.date)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Order Summary */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-medium text-gray-700 mb-2">Order Summary</h5>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="text-gray-900">${order.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Shipping</span>
                          <span className="text-gray-900">$0.00</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Tax</span>
                          <span className="text-gray-900">$0.00</span>
                        </div>
                        <div className="flex justify-between pt-2 mt-2 border-t border-gray-200">
                          <span className="font-semibold text-gray-900">Total</span>
                          <span className="font-semibold text-gray-900">${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <i className="fas fa-shopping-bag text-gray-300 text-6xl mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
              onClick={handleClearFilters}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .status-indicator::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .status-processing::before {
          background-color: #3b82f6;
        }
        .status-shipped::before {
          background-color: #f59e0b;
        }
        .status-delivered::before {
          background-color: #10b981;
        }
        .status-cancelled::before {
          background-color: #ef4444;
        }
      `}</style>
    </div>
  );
};

export default MyOrders;
