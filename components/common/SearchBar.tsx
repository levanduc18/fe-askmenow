'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type="text"
        placeholder="Search question..."
        className="pl-10 w-80 h-10 bg-slate-100"
      />
    </div>
  );
};

export default SearchBar;
