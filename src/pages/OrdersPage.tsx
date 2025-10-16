<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Orders</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        .order-card {
            transition: all 0.3s ease;
        }
        .order-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .status-indicator {
            position: relative;
            padding-left: 20px;
        }
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
        .order-details {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s ease;
        }
        .order-details.active {
            max-height: 1000px;
        }
        .progress-bar {
            height: 6px;
            background-color: #e5e7eb;
            border-radius: 3px;
            overflow: hidden;
        }
        .progress-fill {
            height: 100%;
            transition: width 0.5s ease;
        }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
            <p class="text-gray-600">Track your orders and view order history</p>
        </div>

        <!-- Search and Filter Section -->
        <div class="bg-white rounded-lg shadow p-4 mb-6">
            <div class="flex flex-col md:flex-row gap-4">
                <div class="flex-1">
                    <div class="relative">
                        <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                        <input type="text" id="searchInput" placeholder="Search by order ID or product" class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    </div>
                </div>
                <div class="flex gap-2">
                    <select id="statusFilter" class="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="all">All Status</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <button id="clearFilters" class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition duration-200">Clear</button>
                </div>
            </div>
        </div>

        <!-- Orders List -->
        <div id="ordersList">
            <!-- Orders will be dynamically inserted here -->
        </div>

        <!-- Empty State -->
        <div id="emptyState" class="hidden text-center py-12">
            <i class="fas fa-shopping-bag text-gray-300 text-6xl mb-4"></i>
            <h3 class="text-xl font-semibold text-gray-700 mb-2">No orders found</h3>
            <p class="text-gray-500 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
            <button id="resetFilters" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200">Reset Filters</button>
        </div>
    </div>

    <script>
        // Sample order data
        const orders = [
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

        // Function to render orders
        function renderOrders(filteredOrders) {
            const ordersList = document.getElementById('ordersList');
            const emptyState = document.getElementById('emptyState');
            
            if (filteredOrders.length === 0) {
                ordersList.classList.add('hidden');
                emptyState.classList.remove('hidden');
                return;
            }
            
            ordersList.classList.remove('hidden');
            emptyState.classList.add('hidden');
            
            ordersList.innerHTML = '';
            
            filteredOrders.forEach(order => {
                const orderCard = document.createElement('div');
                orderCard.className = 'order-card bg-white rounded-lg shadow mb-6 overflow-hidden';
                
                // Calculate progress percentage for tracking
                const completedSteps = order.tracking.steps.filter(step => step.completed).length;
                const progressPercentage = (completedSteps / order.tracking.steps.length) * 100;
                
                orderCard.innerHTML = `
                    <div class="p-6">
                        <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900">Order ${order.id}</h3>
                                <p class="text-gray-500 text-sm">Placed on ${new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <div class="mt-2 md:mt-0">
                                <span class="status-indicator status-${order.status} font-medium capitalize">${order.status}</span>
                            </div>
                        </div>
                        
                        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                            <div class="mb-4 md:mb-0">
                                <p class="text-gray-700">${order.items.length} item${order.items.length > 1 ? 's' : ''}</p>
                                <p class="text-gray-900 font-semibold">$${order.total.toFixed(2)}</p>
                            </div>
                            <button class="view-details-btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center">
                                <span>View Details</span>
                                <i class="fas fa-chevron-down ml-2 transition-transform duration-300"></i>
                            </button>
                        </div>
                        
                        <!-- Tracking Progress Bar -->
                        <div class="mt-4">
                            <div class="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Order Progress</span>
                                <span>${completedSteps} of ${order.tracking.steps.length} steps</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill bg-blue-600" style="width: ${progressPercentage}%"></div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Order Details (Hidden by default) -->
                    <div class="order-details border-t border-gray-200">
                        <div class="p-6">
                            <h4 class="font-semibold text-gray-900 mb-4">Order Details</h4>
                            
                            <!-- Items List -->
                            <div class="mb-6">
                                <h5 class="font-medium text-gray-700 mb-2">Items</h5>
                                <div class="space-y-3">
                                    ${order.items.map(item => `
                                        <div class="flex justify-between items-center py-2 border-b border-gray-100">
                                            <div>
                                                <p class="text-gray-900">${item.name}</p>
                                                <p class="text-gray-500 text-sm">Qty: ${item.quantity}</p>
                                            </div>
                                            <p class="text-gray-900 font-medium">$${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            
                            <!-- Tracking Information -->
                            <div class="mb-6">
                                <h5 class="font-medium text-gray-700 mb-2">Tracking Information</h5>
                                <p class="text-gray-600 mb-3">Tracking Number: <span class="font-mono">${order.tracking.number}</span></p>
                                
                                <div class="space-y-4">
                                    ${order.tracking.steps.map(step => `
                                        <div class="flex items-start">
                                            <div class="flex-shrink-0 mt-1">
                                                <div class="w-4 h-4 rounded-full ${step.completed ? 'bg-blue-600' : 'bg-gray-300'}"></div>
                                            </div>
                                            <div class="ml-3">
                                                <p class="text-gray-900 capitalize">${step.status}</p>
                                                <p class="text-gray-500 text-sm">${step.date ? new Date(step.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Pending'}</p>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                            
                            <!-- Order Summary -->
                            <div class="bg-gray-50 rounded-lg p-4">
                                <h5 class="font-medium text-gray-700 mb-2">Order Summary</h5>
                                <div class="flex justify-between py-1">
                                    <span class="text-gray-600">Subtotal</span>
                                    <span class="text-gray-900">$${order.total.toFixed(2)}</span>
                                </div>
                                <div class="flex justify-between py-1">
                                    <span class="text-gray-600">Shipping</span>
                                    <span class="text-gray-900">$0.00</span>
                                </div>
                                <div class="flex justify-between py-1">
                                    <span class="text-gray-600">Tax</span>
                                    <span class="text-gray-900">$0.00</span>
                                </div>
                                <div class="flex justify-between pt-2 mt-2 border-t border-gray-200">
                                    <span class="font-semibold text-gray-900">Total</span>
                                    <span class="font-semibold text-gray-900">$${order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                ordersList.appendChild(orderCard);
                
                // Add event listener to toggle order details
                const viewDetailsBtn = orderCard.querySelector('.view-details-btn');
                const orderDetails = orderCard.querySelector('.order-details');
                const chevronIcon = viewDetailsBtn.querySelector('i');
                
                viewDetailsBtn.addEventListener('click', () => {
                    orderDetails.classList.toggle('active');
                    chevronIcon.classList.toggle('fa-chevron-down');
                    chevronIcon.classList.toggle('fa-chevron-up');
                    
                    // Close other open order details
                    document.querySelectorAll('.order-details').forEach(details => {
                        if (details !== orderDetails && details.classList.contains('active')) {
                            details.classList.remove('active');
                            const otherBtn = details.closest('.order-card').querySelector('.view-details-btn');
                            const otherIcon = otherBtn.querySelector('i');
                            otherIcon.classList.remove('fa-chevron-up');
                            otherIcon.classList.add('fa-chevron-down');
                        }
                    });
                });
            });
        }

        // Function to filter orders
        function filterOrders() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const statusFilter = document.getElementById('statusFilter').value;
            
            let filtered = orders.filter(order => {
                const matchesSearch = order.id.toLowerCase().includes(searchTerm) || 
                                     order.items.some(item => item.name.toLowerCase().includes(searchTerm));
                
                const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
                
                return matchesSearch && matchesStatus;
            });
            
            renderOrders(filtered);
        }

        // Initialize the page
        document.addEventListener('DOMContentLoaded', () => {
            renderOrders(orders);
            
            // Add event listeners for search and filter
            document.getElementById('searchInput').addEventListener('input', filterOrders);
            document.getElementById('statusFilter').addEventListener('change', filterOrders);
            
            // Clear filters button
            document.getElementById('clearFilters').addEventListener('click', () => {
                document.getElementById('searchInput').value = '';
                document.getElementById('statusFilter').value = 'all';
                filterOrders();
            });
            
            // Reset filters button (in empty state)
            document.getElementById('resetFilters').addEventListener('click', () => {
                document.getElementById('searchInput').value = '';
                document.getElementById('statusFilter').value = 'all';
                filterOrders();
            });
        });
    </script>
</body>
</html>
