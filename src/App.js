import { useState, useRef } from 'react'
//import styles
import './styles/app.scss'

//import components
import Player from './components/Player'
import Song from './components/Song'
import Library from './components/Library'
import Nav from './components/Nav'

//import data
import { data } from './data'

function App() {
    //Ref
    const audioRef = useRef(null)
    //States
    const [songs, setSongs] = useState(data)
    const [currentSong, setCurrentSong] = useState(songs[0])
    const [isPlaying, setIsPlaying] = useState(false)
    const [libraryStatus, setLibraryStatus] = useState(false)

    return (
        <div>
            <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
            <Song currentSong={currentSong} />
            <Player 
                audioRef={audioRef}
                isPlaying={isPlaying} 
                setIsPlaying={setIsPlaying}
                currentSong={currentSong}
            />
            <Library 
                audioRef={audioRef}
                songs={songs}
                setSongs={setSongs}
                isPlaying={isPlaying}
                setCurrentSong={setCurrentSong}
                libraryStatus={libraryStatus}
            />
        </div>
    )
}

export default App;
