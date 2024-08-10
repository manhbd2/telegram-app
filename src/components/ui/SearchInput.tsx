import React from 'react';

import { Icons } from '../icons/icons';

type ISearchInputProps = {
  query: string;
  onChange: (inputValue: string) => void;
};

function SearchInput(props: ISearchInputProps) {
  const { query, onChange } = props;

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <form className="mx-3 w-full">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-2">
          <Icons.Search size={19} className="text-[#C4C4C4]" />
        </div>
        <input
          type="search"
          value={query}
          ref={inputRef}
          id="default-search"
          autoComplete="off"
          onChange={handleChange}
          className="block w-full rounded-sm bg-[#424242] p-1 px-[2px] pr-2 ps-9 text-[13px] text-[#C4C4C4] focus:outline-none"
          placeholder="Search shows, movies..."
        />
      </div>
    </form>
  );
}

export default React.memo(SearchInput);
