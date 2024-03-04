import { useMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface NavItemProps {
  to: string;
  children: ReactNode;
  icon: string;
  activeIcon: string;
}

const NavItem = ({ to, children, icon, activeIcon }: NavItemProps) => {
  const match = useMatch(to);
  return (
    <li className={`navPcList__item ${match ? "active" : ""}`}>
      <Link to={to}>
        <div className="navPcList__link">
          <img
            alt=""
            className="navPcList__icon"
            src={match ? activeIcon : icon}
          />
          {children}
        </div>
      </Link>
    </li>
  );
};

export default NavItem;
