import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPlay, 
    faAngleLeft, 
    faAngleRight ,
    faPause
} from '@fortawesome/free-solid-svg-icons'

const Player = ({ audioRef, currentSong, isPlaying, setIsPlaying }) => {
    //States
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0
    })

    //Playsong handler
    const playSongHandler = () => {
        isPlaying 
        ? audioRef.current.pause()
        : audioRef.current.play()

        setIsPlaying(!isPlaying)
    }

    //Time update handler
    const timeUpdateHandler = e => {
        const currentTime = e.target.currentTime
        const duration = e.target.duration
        setSongInfo({ currentTime, duration })
    }

    //Drag handler
    const dragHandler = e => {
        audioRef.current.currentTime = e.target.value
        setSongInfo({...songInfo, currentTime: e.target.value})
    }

    //Conver time to MM:SS
    const formatTime = (time) => {
        return Math.floor(time/ 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    }

    return ( 
        <div className='player'>
            <div className='time-control'>
                <p>{formatTime(songInfo.currentTime)}</p>
                <input 
                    type='range'
                    min={0} 
                    max={songInfo.duration || 0}
                    value={songInfo.currentTime}
                    onChange={dragHandler}
                />
                <p>{formatTime(songInfo.duration || 0)}</p>
            </div>

            <div className='play-control'>
                <FontAwesomeIcon className='skip-back' size='2x' icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className='play' size='2x' icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon className='skip-forward' size='2x' icon={faAngleRight} />
            </div>
            <audio 
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef} 
                src={currentSong.audio} />
        </div>
     );
}
 
export default Player;