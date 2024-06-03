import "./searchNav.css";
import { BsSearch } from "react-icons/bs";
import { useSearch } from "../../../context/search";
import { useNavigate } from "react-router-dom";
import CategoryMenu from "../../categoryMenu/CategoryMenu";

const SearchNav = ({ categories, subcategories }) => {
  // hooks
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const queryParams = {};
      if (values.keyword) {
        queryParams.keyword = values.keyword;
      }
      if (values.category && values.category !== "null") {
        queryParams.category = values.category;
      }

      const queryString = new URLSearchParams(queryParams).toString();

      navigate(`/search?${queryString}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bgThemeSecondaryDark pt-20 text-white">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-end align-items-end position-relative">
              <CategoryMenu categories={categories} subcategories={subcategories} />

              <div className="searchBox mb-20">
                <form onSubmit={handleSearch}>
                  <div className="input-group flex-nowrap">
                    <div>
                      <select
                        style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                        className="form-select ps-3 fw-medium border-0 shadow-none border-end border-secondary h-100"
                        onChange={(e) =>
                          setValues({
                            ...values,
                            category: e.target.value === "null" ? "" : e.target.value,
                          })
                        }
                        value={values.category || ""}
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                          <option value={category?._id} key={category?._id}>
                            {category?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      // style={{ width: "30rem", maxWidth: "30rem" }}
                      type="search"
                      className="searchInput form-control border-0 border-start border-secondary shadow-none ps-4"
                      placeholder="Search..."
                      onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                      value={values.keyword || ""}
                    />
                    <button
                      type="submit"
                      className="btn btnPrimary input-group-text fs-14 px-4 py-3"
                    >
                      <BsSearch size={18} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchNav;
