import Card from "../card/card.component";
import "./card-list.styles.css";

const CardList = ({ monsters }) => {
  return (
    <div className="card-list">
      {monsters.map((monster, i) => {
        return <Card monster={monster} id={i} key={i} />;
      })}
    </div>
  );
};

export default CardList;