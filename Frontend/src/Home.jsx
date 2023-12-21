import './Home.css';

function Navbar() {
  return (
    <div className='container'>
        
        <nav>
            <a href="#" id='brand'>Gestor De Hoteles</a>
            <ul className='navbar-menu'>
            <li><a href="#">Home</a></li>
            <li><a href="#">page a</a></li>
            <li><a href="#">page b</a></li>
            <li><a href="#">page c</a></li>
            <li><a href="#">page d</a></li>
            </ul>
        </nav>
    </div>
  );
}
export default Navbar;

