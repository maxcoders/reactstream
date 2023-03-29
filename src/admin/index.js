import React from "react";
import { Link } from "react-router-dom";
export default function adminpanel() {
  return (
    <div className="f g">
      <div className="fr bg1">
        <Link className="tc" to="/admin/games">
          Games
        </Link>
        <Link className="tc" to="/admin/game/add">
          Games Add
        </Link>
        <Link className="tc" to="/admin/game/edit:id">
          Games edit
        </Link>
        <Link className="tc" to="/admin/game/delete:id">
          Games delete
        </Link>
        <Link className="tc" to="/admin/users">
          users
        </Link>
        <Link className="tc" to="/admin/user/add">
          user add
        </Link>
        <Link className="tc" to="/admin/user/edit:id">
          user edit
        </Link>
        <Link className="tc" to="/admin/user/delete:id">
          user delete
        </Link>
        <Link className="tc" to="/admin/settings">
          settings
        </Link>
      </div>
      <div className="center">center</div>
    </div>
  );
}
