import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { SearchIcon } from "@heroicons/react/solid";

const SearchPage = () => {
  const [searchAPI, setSearchAPI] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /* Logic to get results from provided searchAPI */

  const url = `http://hn.algolia.com/api/v1/search?query=${search}`;

  const handleSearch = (search) => {
    setSearch(search);
  };
  console.log(search);

  /* useEffect hook to fetch API data as the page loads, object destructured for convenience */

  useEffect(() => {
    axios.get(url).then((response) => {
      setSearchAPI(
        response.data.hits.map((hit) => {
          return {
            id: hit.objectID,
            title: hit.title,
            url: hit.url,
            points: hit.points,
            author: hit.author,
            createDate: hit.created_at,
            comments: hit.num_comments,
          };
        })
      );
    });
  }, [search, url]);
  console.log(searchAPI);

  return (
    <div className="w-full h-full">
      {/* Search bar */}
      <div className="flex items-center justify-center space-x-2 mr-3 p-4 px-6 w-full h-[72px] bg-gradient-to-bl from-[#f3a8f9] via-[#9cdec1] to-[#90CAFF] -inset-1  ">
        <h1 className="font-bold text-2xl tracking-wide pl-4 text-white absolute left-4">
          Hacker News Search
        </h1>
        <div className="flex items-center">
          <SearchIcon className="h-5 w-5 absolute z-10 ml-2 text-gray-400" />
          {/* <input
            placeholder="Search.."
            onChange={(e) => handleSearch(e.target.value)}
            className="lg:w-[400px] xl:w-[600px] rounded-lg p-2 shadow-sm bg-slate-50 focus:outline-0 pl-8"
          /> */}
          <form>
            <input
              id="search"
              type="search"
              onChange={(e) => handleSearch(e.target.value)}
              className="lg:w-[400px] xl:w-[600px] rounded-lg p-2 shadow-sm bg-slate-50 focus:outline-0 pl-8"
              placeholder="Search..."
            />
          </form>
        </div>
      </div>
      {/* Search results */}
      <div className="w-full h-full px-4 rounded-lg space-y-2 my-4">
        {searchAPI.map((result) => {
          return (
            <Link
              href={{
                pathname: `/postdetails`,
                query: { id: result.id },
              }}
              key={result.id}
            >
              <div
                key={result.id}
                className="px-2 py-4 bg-white hover:border-l-4  border-b-2 border-gray-200 ease-in-out duration-150 cursor-pointer m-2 rounded-md"
              >
                <div className="flex flex-col justify-center items-start w-full">
                  {result.title ? (
                    <h2 className="font-semibold text-[#60aff9] hover:text-[#1151d3]  tracking-wide text-xl hover:underline-offset-1">
                      {result.title}
                    </h2>
                  ) : (
                    <h2 className="font-semibold text-[#60aff9] hover:text-[#1151d3]  tracking-wide text-xl hover:underline-offset-1">
                      Untitled
                    </h2>
                  )}
                  <p className="text-gray-400">
                    (
                    <a href={result.url} className="underline cursor-pointer">
                      {result.url}
                    </a>
                    )
                  </p>
                </div>
                <div className="flex space-x-4 items-center text-gray-500 cursor-default">
                  <p>{result.points} points</p>
                  <p>{result.author}</p>
                  <p>{new Date(result.createDate).toLocaleDateString()}</p>
                  <p>{result.comments} comments</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default SearchPage;
