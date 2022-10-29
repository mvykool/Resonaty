/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  if (isFetching) return <Loader title="Loading top songs" />;

  if (error) return <Error />;

  const songs = data?.tracks?.hits?.map((song) => song.track);

  return (
    <div
      className="flex flex-col"
    >
      <h2
        className="font-bold text-3xl text-white text-left mt-4 mb-10"
      >Results for: <span className="font-white">{searchTerm}</span>
      </h2>

      <div className="flex flex-wrap ml-3 justify-center gap-8">
        {songs?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
	  ))}
      </div>
    </div>
  );
};

export default Search;
