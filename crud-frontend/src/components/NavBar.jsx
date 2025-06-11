export default function NavBar({ onOpen, onSearch }) {

  const handleSearch = (e) => {
    onSearch(e.target.value);
  }

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm p-4">
        {/* logo/text */}
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">CRUD</a>
        </div>
        {/* search bar */}
        <div className="navbar-center">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-48 md:w-auto"
              onChange={handleSearch}
            />
          </div>
        </div>
        {/* add button */}
        <div className="navbar-end">
          <button className="btn btn-primary" onClick={onOpen}>
            Add Client
          </button>
        </div>
      </div>
    </>
  );
}
