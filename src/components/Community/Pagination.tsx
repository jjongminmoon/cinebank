import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Pagination({
  postsPerPage,
  totalPosts,
  page,
  setPage,
  blockNum,
  setBlockNum,
}: number | any) {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const totalPage: number = Math.ceil(totalPosts / postsPerPage);
  const prevPage = () => {
    if (page <= 1) {
      return;
    }
    if (page - 1 <= postsPerPage * blockNum) {
      setBlockNum((n: number) => n - 1);
    }
    setPage((n: number) => n - 1);
  };
  console.log(page);

  const nextPage = () => {
    if (page >= totalPage) {
      return;
    }
    if (postsPerPage * Number(blockNum + 1) < Number(page + 1)) {
      setBlockNum((n: number) => n + 1);
    }
    setPage((n: number) => n + 1);
  };

  return (
    <div className="flex mt-3 w-full justify-center">
      <button
        className="nav-btn rounded hover:bg-gray-600"
        onClick={() => {
          prevPage();
        }}
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </button>
      <ul className="flex items-center gap-2 text-lg pb-0.5">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className="items-center justify-center nav-btn rounded hover:bg-gray-600 w-7"
          >
            <span onClick={() => setPage(number)}>{number}</span>
          </li>
        ))}
      </ul>
      <button
        className="nav-btn rounded hover:bg-gray-600"
        onClick={() => {
          nextPage();
        }}
      >
        <ChevronRightIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
