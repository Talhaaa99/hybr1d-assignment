import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import Comments from "../components/Comments";
import { ShimmerPostDetails } from "react-shimmer-effects";

const PostDetails = () => {
  const [loading, setLoading] = useState(true);
  const [currentAPI, setCurrentAPI] = useState([]);
  const { query } = useRouter();

  const url = `https://hn.algolia.com/api/v1/items/${query.id}`;

  useEffect(() => {
    axios.get(url).then((res) => {
      setLoading(true);
      try {
        setCurrentAPI({
          id: res.data.id,
          title: res.data.title,
          author: res.data.author,
          url: res.data.url,
          date: res.data.created_at,
          children: res.data?.children,
          points: res.data.points,
          comments: res.data.num_comments,
        });
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    });
  }, [url]);

  console.log(currentAPI);

  return !loading ? (
    <div className="bg-white">
      {/* Clicked Post */}
      <div className="w-full h-full px-4 rounded-lg py-2 my-4 m-4">
        <div className="px-4 py-4 border-l-4 border-b-2 border-gray-200 rounded-md ease-in-out duration-150 cursor-pointer m-2">
          <div className="flex justify-start items-center space-x-4 gap-y-2 w-full">
            {currentAPI.title ? (
              <h2 className="font-semibold text-[#1151d3]  tracking-wide text-xl hover:underline-offset-1">
                {currentAPI.title}
              </h2>
            ) : (
              <h2 className="font-semibold text-[#1151d3]  tracking-wide text-xl hover:underline-offset-1">
                Untitled
              </h2>
            )}
            <p className="text-gray-400">
              (
              <a href={currentAPI.url} className="underline cursor-pointer">
                {currentAPI.url}
              </a>
              )
            </p>
          </div>
          <div className="flex space-x-4 items-center text-gray-500 cursor-default">
            <p>{currentAPI.points} points</p>
            <p>{currentAPI.author}</p>
            <p>{new Date(currentAPI.date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      {/* Comments recursion */}
      {currentAPI.children?.map((child) => {
        return (
          <div key={child?.id}>
            <Comments child={child} />;
          </div>
        );
      })}
    </div>
  ) : (
    <ShimmerPostDetails card cta variant="SIMPLE" />
  );
};
export default PostDetails;
