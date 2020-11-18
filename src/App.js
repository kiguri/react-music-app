
//import styles
import './styles/app.scss'

//import components
import Player from './components/Player'
import Song from './components/Song'

//import data
import data from './data'

function App() {
    return (
        <div>
            <Song />
            <Player />
        </div>
    )
}

export default App;
