import React from "react";
import ShowDetails from "../../showDetails/ShowDetails";

const TMDB_ASSET_BASEURL = import.meta.env.VITE_TMDB_ASSET_BASEURL;

const SlideItem = ({ showType, data }) => {
  return (
    <>
      {data && (
        <div
          key={data?.id}
          className={`slide `}
          style={{
            background: `url(${TMDB_ASSET_BASEURL}${data?.backdrop_path})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="container">
            <div className="wrapper">
              <ShowDetails
                showType={showType}
                tmdbID={data.id}
                allowLinkTitle={false}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SlideItem;
