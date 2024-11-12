import React, { useState } from 'react';
import { Coffee, UtensilsCrossed, Bell, Camera, ChevronDown, Search, User } from 'lucide-react';

// Simplified component replacements
const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded ${className}`} {...props}>{children}</button>
);

const Card = ({ children, className, ...props }) => (
  <div className={`bg-slate-900 rounded-lg shadow-lg ${className}`} {...props}>{children}</div>
);

const Input = ({ className, ...props }) => (
  <input className={`px-3 py-2 rounded bg-slate-800 text-white ${className}`} {...props} />
);

const Select = ({ children, className, ...props }) => (
  <select className={`px-3 py-2 rounded bg-slate-800 text-white ${className}`} {...props}>{children}</select>
);

 function CreateQRCode() {
  const [url, setUrl] = useState('');
  const [additionalColor, setAdditionalColor] = useState('#FF7FFF');
  const [frameBackground, setFrameBackground] = useState('#FF7FFF');
  const [qrBackground, setQrBackground] = useState('#FF7FFF');

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">QR Codes | Table</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
              <Input
                className="w-80 pl-10"
                placeholder="Search items here Your Delicious Food..."
              />
            </div>
            <Button className="text-white">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Card className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Create QR Code</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Save</span>
              <span className="text-sm text-slate-400">Preview</span>
            </div>
          </div>

          {/* URL Input */}
          <div className="mb-6">
            <label className="mb-2 block text-sm text-slate-400">Put Your Link Here</label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.yourrestaurant.com/menu/..."
            />
          </div>

          {/* Color Selectors */}
          <div className="mb-6 grid grid-cols-3 gap-4">
            <div>
              <label className="mb-2 block text-sm text-slate-400">Additional Color</label>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  value={additionalColor}
                  onChange={(e) => setAdditionalColor(e.target.value)}
                  className="h-10 w-20"
                />
                <Input
                  value={additionalColor}
                  onChange={(e) => setAdditionalColor(e.target.value)}
                />
              </div>
            </div>
            {/* Repeat for Frame Background and QR Code Background */}
          </div>

          {/* Theme Selection */}
          <div className="mb-6">
            <h3 className="mb-4 text-lg font-semibold text-white">Thematic</h3>
            <div className="grid grid-cols-6 gap-4">
              <Button className="aspect-square p-4">
                <Camera className="h-6 w-6 text-purple-400" />
              </Button>
              <Button className="aspect-square p-4">
                <Coffee className="h-6 w-6 text-amber-400" />
              </Button>
              <Button className="aspect-square p-4">
                <Bell className="h-6 w-6 text-white" />
              </Button>
              <Button className="aspect-square p-4">
                <UtensilsCrossed className="h-6 w-6 text-slate-400" />
              </Button>
            </div>
          </div>

          {/* Frame Selection */}
          <div className="mb-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Frame Style</h3>
              <Select defaultValue="food">
                <option value="food">Food & Drink</option>
                <option value="basic">Basic</option>
                <option value="modern">Modern</option>
              </Select>
            </div>
            <div className="grid grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Button key={i} className="aspect-square p-4">
                  <div className="h-full w-full rounded border-2 border-dashed border-slate-600" />
                </Button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="flex justify-center">
            <div className="relative aspect-square w-48">
              <div className="absolute inset-0 rounded-full bg-purple-600/20" />
              <div className="absolute inset-4 rounded-full bg-slate-800" />
              <div className="absolute inset-0 flex items-center justify-center">
                <UtensilsCrossed className="h-12 w-12 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-6 flex justify-center">
            <Button className="bg-amber-500 px-8 text-white hover:bg-amber-600">
              Download QR
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}

export default  CreateQRCode;
