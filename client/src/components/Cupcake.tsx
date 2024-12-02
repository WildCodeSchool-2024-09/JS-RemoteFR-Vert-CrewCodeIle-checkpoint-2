import { NavLink } from "react-router-dom";
import type { CupcakeType } from "../lib/definition";
import "./Cupcake.css";

function Cupcake({ data }: { data: CupcakeType }) {
  return (
    <NavLink to={`/cupcakes/${data.id}`} className="cupcake-container">
      <div className="cupcake">
        <div className={`accessory ${data.accessory}`} />
        <div className="cream">
          <div
            className="cream-1"
            style={{
              backgroundColor: data.color1,
            }}
          />
          <div
            className="cream-2"
            style={{
              backgroundColor: data.color2,
            }}
          />
          <div
            className="cream-3"
            style={{
              backgroundColor: data.color3,
            }}
          />
        </div>
        <div className="bottom">
          <div className="bottom-in">
            <div className="face">
              <div className="eyes">
                <div className="left-eye" />
                <div className="right-eye" />
              </div>
              <div className="mouth" />
            </div>
          </div>
        </div>
      </div>

      <div className="cupcake-name">{data.name}</div>
    </NavLink>
  );
}

export default Cupcake;
