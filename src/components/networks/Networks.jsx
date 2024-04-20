import React, { useEffect } from "react";
import networks from "../../service/networks";
import { useFetchApi } from "../../hooks/useFetchApi";
import { getNetworkDetails } from "../../service/tmdb/requests";
import "./Networks.css";

// const TMDB_ASSET_BASEURL = import.meta.env.VITE_TMDB_ASSET_BASEURL;

const Networks = ({ currentNetwork, setNetwork }) => {
  return (
    <section className="networks">
      {Object.entries(networks).map(([network, value]) => (
        <NetworkItem
          key={network}
          id={value}
          currentNetwork={currentNetwork}
          setNetwork={setNetwork}
        />
      ))}
    </section>
  );
};

const NetworkItem = ({ id, currentNetwork, setNetwork }) => {
  const {
    isLoading,
    hasError,
    apiData: networkDetails,
  } = useFetchApi(getNetworkDetails(id));

  return (
    <div
      className={`network-item ${
        networkDetails?.name === currentNetwork && "active"
      }`}
      onClick={() => setNetwork(networkDetails?.name)}
    >
      {/* <img
        src={TMDB_ASSET_BASEURL + networkDetails?.logo_path}
        alt={networkDetails?.name + "logo"}
      /> */}

      <h3>{networkDetails?.name}</h3>
    </div>
  );
};

export default Networks;
