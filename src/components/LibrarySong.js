const LibrarySong = ({ song, songs, setCurrentSong, setSongs, audioRef, isPlaying }) => {
    const songSelectHandler = () => {
        setCurrentSong(song)

        const newSongs = songs.map(songToActive => {
            if (songToActive.id === song.id) {
                return {
                    ...songToActive,
                    active: true
                }
            } else {
                return {
                    ...songToActive,
                    active: false
                }
            }
        })

        setSongs(newSongs)
    
        if (isPlaying) {
            const playPromise = audioRef.current.play()
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    audioRef.current.play()
                })
            }
        }
    }

    return ( 
        <div 
            onClick={songSelectHandler} 
            className={`library-song ${song.active ? 'selected' : ''}`}
        >
            <img src={song.cover} alt={song.name} />
            <div className='song-description'>
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
     );
}
 
export default LibrarySong; 