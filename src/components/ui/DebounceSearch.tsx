import React from 'react';

import { Icons } from '../icons/icons';

type IDebounceSearchProps = {
  query: string;
  onChange: (inputValue: string) => void;
};

function DebounceSearch(props: IDebounceSearchProps) {
  const { query, onChange } = props;

  const [inputValue, setInputValue] = React.useState(query);

  React.useEffect(() => {
    // Debounce function
    let timer: NodeJS.Timeout;
    const debounce = (func: Function, delay: number) => {
      return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
      };
    };

    // Function to handle input change with debounce
    const handleInputChange = debounce((value: string) => {
      onChange(value); // You can perform your desired action here
    }, 500); // Adjust the debounce delay as needed

    handleInputChange(inputValue);

    // Cleanup function
    return () => clearTimeout(timer);
  }, [inputValue, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form className="mx-3 w-full">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-2">
          <Icons.Search size={19} className="text-[#C4C4C4]" />
        </div>
        <input
          type="search"
          value={inputValue}
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

export default DebounceSearch;
