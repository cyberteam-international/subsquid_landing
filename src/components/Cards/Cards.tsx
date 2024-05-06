"use client";

import "./Cards.scss";
import { FadeInUp } from "@/components/Animation";

export default function Cards() {
  const items = [
    { title: "100+", text: "networks supported" },
    { title: "50K+", text: "indexers deployed" },
    { title: "40+ billion", text: "data lake requests" },
    { title: "5K+ ", text: "dApps powered" },
  ];

  return (
    <FadeInUp delay={600}>
      <div className={"cards"}>
        <h2 className={"cards__title"}>
          Every chain has data.
          <br /> No one makes it easy to get
        </h2>
        <button className={"cards__button"}>
          View Vision Paper <img src="/arrowRight.svg" alt="" />
        </button>
      </div>
    </FadeInUp>
  );
}
