import LibrarySong from './LibrarySong'

const Library = ({ songs, setCurrentSong, setSongs, audioRef, isPlaying, libraryStatus }) => {
    return ( 
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>

            {songs.map(song => (
                <LibrarySong
                    key={song.id}
                    song={song}
                    songs={songs}
                    setSongs={setSongs}
                    setCurrentSong={setCurrentSong}
                    audioRef={audioRef}
                    isPlaying={isPlaying}
                />
            ))}
        </div>
     );
}
 
export default Library;