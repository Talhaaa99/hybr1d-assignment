import { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [searchAPI, setSearchAPI] = useState([]);
  const [search, setSearch] = useState("");

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
    <div className="w-full h-screen">
      {/* Search bar */}
      <div className="w-full h-[72px] bg-slate-200">
        <div className="flex items-center justify-between mt-3 mr-3 p-3">
          <h1 className="font-bold tracking-wider pl-3">Hacker News Search</h1>
          <input
            placeholder="Search.."
            onChange={(e) => handleSearch(e.target.value)}
            className="lg:w-[1000px] xl:w-[1100px] rounded-xl p-2 shadow-xl bg-slate-50"
          />
        </div>
      </div>
      {/* Search results */}
      <div className="w-full h-screen p-4 rounded-xl shadow-xl">
        {searchAPI.map((result) => {
          return (
            <div>
              <div className="flex justify-start items-center space-x-5 w-full">
                <h2 className="font-bold tracking-wide text-xl">
                  {result.title}
                </h2>
                <p className="text-gray-400">({result.url})</p>
              </div>
              <div className="flex space-x-4 items-center text-gray-500">
                <p>{result.points} points</p>
                <p>{result.author}</p>
                <p>{new Date(result.createDate).toLocaleDateString()}</p>
                <p>{result.comments} comments</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Search;
