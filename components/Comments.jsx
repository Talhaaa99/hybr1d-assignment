import { MinusIcon, PlusIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { htmlToText } from "html-to-text";

const Comments = ({ child }) => {
  const [expand, setExpand] = useState(true);

  return (
    <div className="w-full h-full ml-4">
      {/* Comments recursion */}
      <div className="font-lg border-l-4 border-b-2 border-gray-200 ml-8 pl-4 ">
        <div className="flex space-x-3 items-center justify-start pt-2">
          {child.author ? (
            <h5 className="font-semibold">{child.author}</h5>
          ) : (
            <h5>unknown</h5>
          )}
          <h5 className="text-gray-400 text-sm">
            {new Date(child.created_at).toLocaleDateString()}
          </h5>
          {expand ? (
            <MinusIcon
              className="h-5 w-5 cursor-pointer"
              onClick={() => setExpand(!expand)}
            />
          ) : (
            <PlusIcon
              className="h-5 w-5 cursor-pointer"
              onClick={() => setExpand(!expand)}
            />
          )}
        </div>
        <p className="my-2 pb-1 text-gray-500">{htmlToText(child.text)}</p>
        <div>
          {expand === true
            ? child.children?.map((item) => {
                return (
                  <div key={item.id}>
                    <Comments child={item} />;
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};
export default Comments;
