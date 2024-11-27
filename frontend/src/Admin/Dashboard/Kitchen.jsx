import React from 'react'
import PropTypes from 'prop-types'

const OrderItem = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
})

const Order = PropTypes.shape({
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['Onsite', 'Parcel']).isRequired,
  tableNo: PropTypes.string,
  customerName: PropTypes.string.isRequired,
  itemQuantity: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(OrderItem).isRequired,
  cookingRequest: PropTypes.string.isRequired,
  customization: PropTypes.string.isRequired,
})

export default function Kitchen() {
  // Sample data
  const orders = [
    {
      id: '1',
      type: 'Onsite',
      tableNo: '1',
      customerName: 'Ramjibhai',
      itemQuantity: 5,
      items: [
        { id: '01', name: 'Dosa' },
        { id: '02', name: 'Manchurian' },
        { id: '03', name: 'Pav Bhaji' }
      ],
      cookingRequest: 'Make it a little spicy & creamy.',
      customization: '(1) 100% Wheat Crust, (2) Large, (3) Jalapeno'
    },
    {
      id: '2',
      type: 'Parcel',
      customerName: 'MukeshBhai',
      itemQuantity: 2,
      items: [
        { id: '01', name: 'Burger' },
        { id: '02', name: 'Pizza' }
      ],
      cookingRequest: 'Make it a little spicy & creamy.',
      customization: '(1) 100% Wheat Crust, (2) Small, (3) Jalapeno'
    }
    // Add more orders as needed
  ]

  return (
    <div className="min-h-screen bg-[#1a1b26] text-white p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Order Lists</h1>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Order Pending :</span>
          <span className="text-green-400">07</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-[#282a36] border-none text-white">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Order Type</span>
                  <div variant={order.type === 'Onsite' ? 'secondary' : 'success'}>
                    {order.type}
                  </div>
                </div>
              </div>

              {order.tableNo && (
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Table No:</span>
                  <span>{order.tableNo}</span>
                </div>
              )}

              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Customer Name:</span>
                <span>{order.customerName}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Item Quantity</span>
                <span>{order.itemQuantity}</span>
              </div>

              <div className="mb-4">
                <span className="text-gray-400 block mb-2">Item Name:</span>
                <div className="flex flex-wrap gap-2">
                  {order.items.map((item) => (
                    <div key={item.id} variant="outline" className="rounded-full">
                      {item.name} ({item.id})
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <span className="text-gray-400 block mb-1">Cooking Request:</span>
                <p className="text-sm">{order.cookingRequest}</p>
              </div>

              <div>
                <span className="text-gray-400 block mb-1">Customization:</span>
                <p className="text-sm">{order.customization}</p>
              </div>
            </div>

            <div>
              <button className="w-full bg-[#e0a82e] hover:bg-[#c9972a] text-white">
                Accept Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

Kitchen.propTypes = {
  orders: PropTypes.arrayOf(Order)
}

