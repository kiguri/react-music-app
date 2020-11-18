import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

const Nav = ({ libraryStatus, setLibraryStatus}) => {
    return ( 
        <nav className='top-nav'>
            <h1>Kiguri</h1>
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                Library
                <FontAwesomeIcon icon={faMusic} />
            </button>
        </nav>
     );
}
 
export default Nav;