'use client'


export default function Kitchen() {
  return (
    <div className="h-screen bg-slate-900 text-white p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Order Lists</h1>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Order Pending :</span>
          <span className="text-green-500 text-2xl font-bold">07</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Order Card 1 */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg h-[415px] overflow-hidden">
          <div className="bg-slate-700 p-3 flex justify-between items-center">
            <span className="text-gray-300">Order Type</span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Onsite</span>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white">Table No:</span>
              <span className="bg-gray-700 text-gray-400 px-2 py-1 rounded-md text-sm">1</span>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-base text-white block">Customer Name:</label>
              <p className="text-gray-400">Ramjibhai</p>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-base text-white block">Item Quantity:</label>
              <p className="bg-gray-700 text-blue-400 px-2 py-1 rounded-md text-sm">5</p>
            </div>
            <div>
              <label className="text-base text-white block mb-1">Item Name:</label>
              <div className="flex gap-1">
                <span className="bg-slate-700  text-gray-400 px-2 py-1 rounded-xl text-sm flex items-center">
                  Pizza(01)
                </span>
                <span className="bg-slate-700 text-gray-400 px-2 py-1 rounded-xl text-sm flex items-center">
                  Manchurian(02)
                </span>
                <span className="bg-slate-700 text-gray-400 px-2 py-1 rounded-xl text-sm flex items-center">
                  PavBhaji(02)
                </span>
              </div>
            </div>
            <div>
              <label className="text-sm text-white block">Cooking Request:</label>
              <p className="text-sm text-gray-400">Make it a little spicy & creamy.</p>
            </div>
            <div>
              <label className="text-sm text-white block">Customization:</label>
              <p className="text-sm text-gray-400">(1)100% Wheat Crust,(2)Large,(3) Jalapeno</p>
            </div>
            <a 
               href="/deliver" 
               className="w-full bg-amber-500 hover:bg-amber-600 text-black py-2 rounded-md mt-2 text-center block"
             >
               Accept Order
             </a>
          </div>
        </div>

        {/* Order Card 2 */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg h-[395px] overflow-hidden">
          <div className="bg-slate-700 p-3 flex justify-between items-center">
            <span className="text-gray-300">Order Type</span>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">Parcel</span>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-base text-white block">Customer Name:</label>
              <p className="text-gray-400">MukeshBhai</p>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-base text-white block">Item Quantity:</label>
              <p className="bg-gray-700 text-blue-400 px-2 py-1 rounded-md text-sm">2</p>
            </div>
            <div>
              <label className="text-base text-white block mb-1">Item Name:</label>
              <div className="flex gap-1">
                <span className="bg-slate-700  text-gray-400 px-2 py-1 rounded-xl text-sm flex items-center">
                   Burger (01)
                </span>
                <span className="bg-slate-700  text-gray-400 px-2 py-1 rounded-xl text-sm flex items-center">
                     Pizza (01)
                </span>
              </div>
            </div>
            <div>
              <label className="text-sm text-white block">Cooking Request:</label>
              <p className="text-sm text-gray-400">Make it a little spicy & creamy.</p>
            </div>
            <div>
              <label className="text-sm text-white block">Customization:</label>
              <p className="text-sm text-gray-400 block">(1) 100% Wheat Crust, (2) Small, (3) Jalapeno</p>
            </div>
            <a 
               href="/deliver" 
               className="w-full bg-amber-500 hover:bg-amber-600 text-black py-2 rounded-md mt-2 text-center block"
             >
               Accept Order
             </a>
          </div>
        </div>

        {/* Order Card 3 */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <div className="bg-slate-700 p-3 flex justify-between items-center">
            <span className="text-gray-300">Order Type</span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Onsite</span>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Table No:</span>
              <span className="bg-gray-700 text-white px-2 py-1 rounded-md text-sm">2</span>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-base text-white block">Customer Name:</label>
              <p className="text-gray-400">Rajubhai</p>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-base text-white block">Item Quantity:</label>
              <p className="bg-gray-700 text-blue-400 px-2 py-1 rounded-md text-sm">3</p>
            </div>
            <div>
              <label className="text-base text-white block mb-1">Item Name:</label>
              <div className="flex gap-1">
                <span className="bg-slate-700  text-gray-400 px-2 py-1 rounded-xl text-sm flex items-center">
                   Burger (01)
                </span>
                <span className="bg-slate-700  text-gray-400 px-2 py-1 rounded-xl text-sm flex items-center">
                     Pizza (02)
                </span>
              </div>
            </div>
            <div>
              <label className="text-sm text-white block">Cooking Request:</label>
              <p className="text-sm text-gray-400">Make it a little spicy & creamy.</p>
            </div>
            <div>
              <label className="text-sm text-white block">Customization:</label>
              <p className="text-sm text-gray-400">(1) 100% Wheat Crust, (2) Small, (3) Jalapeno</p>
            </div>
            <a 
               href="/deliver" 
               className="w-full bg-amber-500 hover:bg-amber-600 text-black py-2 rounded-md mt-2 text-center block"
             >
               Accept Order
             </a>
          </div>
        </div>

        {/* Order Card 4 */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <div className="bg-slate-700 p-3 flex justify-between items-center">
            <span className="text-gray-300">Order Type</span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Onsite</span>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Table No:</span>
              <span className="bg-gray-700 text-white px-2 py-1 rounded-md text-sm">3</span>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-base text-white block">Customer Name:</label>
              <p className="text-gray-400">Rajubhai</p>
            </div>
            <div className="flex justify-between items-center">
              <label className="text-base text-white block">Item Quantity:</label>
              <p className="bg-gray-700 text-blue-400 px-2 py-1 rounded-md text-sm">2</p>
            </div>
            <div>
              <label className="text-base text-white block mb-1">Item Name:</label>
              <div className="flex gap-1">
                <span className="bg-slate-700  text-gray-400 px-2 py-1 rounded-xl text-sm flex items-center">
                   Burger (01)
                </span>
                <span className="bg-slate-700  text-gray-400 px-2 py-1 rounded-xl text-sm flex items-center">
                     Pizza (01)
                </span>
              </div>
            </div>
            <div>
              <label className="text-sm text-white block">Cooking Request:</label>
              <p className="text-sm text-gray-400">Make it a little spicy & creamy.</p>
            </div>
            <div>
              <label className="text-sm text-white block">Customization:</label>
              <p className="text-sm text-gray-400">(1) 100% Wheat Crust, (2) Small, (3) Jalapeno</p>
            </div>
            <a 
               href="/deliver" 
               className="w-full bg-amber-500 hover:bg-amber-600 text-black py-2 rounded-md mt-2 text-center block"
             >
               Accept Order
             </a>
          </div>
        </div>
      </div>
    </div>
  )
}  