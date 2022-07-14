import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

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
  }, [search]);
  console.log(searchAPI);

  return (
    <div className="w-full h-full">
      {/* Search bar */}
      <div className="flex items-center justify-between mr-3 p-4 px-8 w-full h-[72px] bg-gradient-to-bl from-[#F47BFF] via-[#8ddbb9] to-[#90CAFF] -inset-1  ">
        <h1 className="font-bold text-2xl tracking-wide pl-4 text-white">
          Hacker News Search
        </h1>
        <input
          placeholder="Search.."
          onChange={(e) => handleSearch(e.target.value)}
          className="lg:w-[1000px] xl:w-[1100px] rounded-xl p-2 shadow-sm bg-slate-50 focus:outline-0 pl-2"
        />
      </div>
      {/* Search results */}
      <div className="w-full h-full px-4 rounded-xl shadow-xl space-y-2 my-4">
        {searchAPI.map((result) => {
          return (
            <Link
              href={{
                pathname: `/postdetails`,
                query: { id: result.id },
              }}
            >
              <div
                key={result.id}
                className="px-2 py-4 bg-white hover:border-l-4 border-[#90CAFF] ease-in-out duration-150 cursor-pointer m-2 rounded-md shadow-lg"
              >
                <div className="flex justify-start items-center space-x-4 gap-y-2 w-full">
                  {result.title ? (
                    <h2 className="font-semibold text-[#60aff9]  tracking-wide text-xl hover:underline-offset-1">
                      {result.title}
                    </h2>
                  ) : (
                    <h2 className="font-semibold text-[#60aff9]  tracking-wide text-xl hover:underline-offset-1">
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
