import LibrarySong from './LibrarySong'

const Library = ({ songs, currentSong, libraryStatus, setCurrentSong }) => {
    return ( 
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>

            {songs.map(song => (
                <LibrarySong
                    key={song.id}
                    song={song}
                    setCurrentSong={setCurrentSong}
                    currentSong={currentSong}
                />
            ))}
        </div>
     );
}
 
export default Library;