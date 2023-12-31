import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavDropdown from "./nav/NavDropdown";
import NavItem from "./nav/NavItem";

const PopulatedNavBar = () => {
  return (
    <NavBar>
      <NavItem>SPEED</NavItem>
      <NavItem route="/" end>
        Home
      </NavItem>
      <NavItem dropdown>
        Articles <IoMdArrowDropdown />
        <NavDropdown>
          <NavItem route="/articles/new">Submit new</NavItem>
          <NavItem route="/articles/analyst">Analyst</NavItem>
        </NavDropdown>
      </NavItem>
    </NavBar>
  );
};

export default PopulatedNavBar;
