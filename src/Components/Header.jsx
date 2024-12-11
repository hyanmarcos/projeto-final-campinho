import "../styles/Header.css";

const Header = () => {
  return (
    <header className="menu">
      <div className="logo">
        <img 
          src="src/img/logo.png" 
          alt="Logo Campinho Movies" 
          className="logo-img" 
        />
      </div>
      <h1 className="site-title">Campinho Movies</h1>
      <div className="spacer" aria-hidden="true"></div>
    </header>
  );
};

export default Header;
