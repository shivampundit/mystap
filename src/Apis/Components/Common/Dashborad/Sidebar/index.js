import React from "react";
import lock from "../../../../Assets/Dashboard/lock.svg";
import caution from "../../../../Assets/Dashboard/caution.svg";
import { SIDE_MENU } from "../../../../Constants";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { isPricesAdded } = useSelector((state) => state.auth);

  return (
    <section className={styles.sidebar}>
      <div className={styles.sidebarLead}>
        <ul>
          {SIDE_MENU.map((item, i) => (
            <li
              key={i}
              className={pathname === item.to ? styles.activeMenu : ""}
            >
              <div className={styles.ulBoth}>
                {item?.target ? (
                  <a href={item.to} target="_blank" rel="noreferrer">
                    <img src={item.icon} alt="menu" />
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <Link to={!isPricesAdded ? "" : item.to}>
                    <img src={item.icon} alt="menu" />
                    <span>{item.label}</span>
                  </Link>
                )}
              </div>
              {!isPricesAdded && <img src={lock} alt="lock" />}
            </li>
          ))}
        </ul>
        {!isPricesAdded && (
          <div className={styles.completeProfile}>
            <h5>
              Complete profile to
              <br />
              Unlock all features.
            </h5>
            <img src={caution} alt="error" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Sidebar;
