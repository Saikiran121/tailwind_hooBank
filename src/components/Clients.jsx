import React from "react";
import styles, { layout } from "../styles";
import { clients } from "../constants";
const Clients = () => {
  return (
    <section className={`${styles.flexCenter} my-4`}>
      <div className={`${styles.flexCenter} flex-wrap w-full`}>
        {clients.map((client, index) => (
          <div key={client.id} className="sm:w-[192px] w-[100px] m-5">
            <img src={client.logo} alt="client" className="object-contain" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clients;
