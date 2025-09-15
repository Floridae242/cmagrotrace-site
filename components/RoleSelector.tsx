import { Role } from '../lib/types';

interface RoleSelectorProps {
  value: Role;
  onChange: (role: Role) => void;
}

export default function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        className={`px-4 py-2 rounded-lg ${
          value === 'FARMER' 
            ? 'bg-green-600 text-white' 
            : 'bg-white border border-green-600 text-green-600'
        }`}
        onClick={() => onChange('FARMER')}
      >
        Farmer
      </button>
      <button
        className={`px-4 py-2 rounded-lg ${
          value === 'TRANSPORT'
            ? 'bg-blue-600 text-white'
            : 'bg-white border border-blue-600 text-blue-600'
        }`}
        onClick={() => onChange('TRANSPORT')}
      >
        Transport
      </button>
      <button
        className={`px-4 py-2 rounded-lg ${
          value === 'PACKHOUSE'
            ? 'bg-yellow-600 text-white'
            : 'bg-white border border-yellow-600 text-yellow-600'
        }`}
        onClick={() => onChange('PACKHOUSE')}
      >
        Packhouse
      </button>
      <button
        className={`px-4 py-2 rounded-lg ${
          value === 'AUDITOR'
            ? 'bg-purple-600 text-white'
            : 'bg-white border border-purple-600 text-purple-600'
        }`}
        onClick={() => onChange('AUDITOR')}
      >
        Auditor
      </button>
      <button
        className={`px-4 py-2 rounded-lg ${
          value === 'BUYER'
            ? 'bg-red-600 text-white'
            : 'bg-white border border-red-600 text-red-600'
        }`}
        onClick={() => onChange('BUYER')}
      >
        Buyer
      </button>
    </div>
  );
}