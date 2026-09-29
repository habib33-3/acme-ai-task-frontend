import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useQueryState } from "nuqs";

import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Priority } from "@/types";

const priorities = [
  { label: "All tasks", value: null },
  { label: "High", value: Priority.HIGH },
  { label: "Medium", value: Priority.MEDIUM },
  { label: "Low", value: Priority.LOW },
];

const SearchAndFilter = () => {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
  });

  const [searchInput, setSearchInput] = useState(search);
  const [, setPriority] = useQueryState("priority", {
    defaultValue: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput || null);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, setSearch]);

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-full max-w-sm">
        <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />

        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search tasks..."
          className="pl-9"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" />}>Filter</DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {priorities.map((item) => (
            <DropdownMenuItem
              key={item.label}
              onClick={() => setPriority(item.value)}>
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchAndFilter;
