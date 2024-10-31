"use client";

import { AnimationProps, TargetAndTransition, motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { Button } from "@repo/ui/components/button";
import MaxWidthWrapper from "../_components/MaxWidthWrapper";

const Start: React.FC = () => {
  const animation: AnimationProps = {
    initial: { opacity: 0, y: -35 },
    animate: {
      opacity: 1,
      y: 0,
    },
    transition: {
      duration: 0.5,
    },
  };

  return (
    <section className="flex h-full justify-center bg-gradient-to-b from-[#ae9c5280] to-transparent py-16 *:items-center">
      <MaxWidthWrapper className="flex flex-col items-center justify-center gap-8 px-4 md:gap-16 xl:flex-row">
        <div className="flex flex-col items-center text-center font-['Abhaya_Libre'] text-red-800 md:text-left">
          <motion.h1 {...animation} className="text-4xl font-semibold sm:text-5xl md:text-8xl">
            EL PAPÁ DE LAS
          </motion.h1>
          <motion.h1 {...animation} className="text-4xl font-extrabold sm:text-5xl md:text-8xl">
            PALETAS
          </motion.h1>
          <Button className="mt-3 bg-red-800 text-lg hover:bg-red-900" size={"lg"}>
            Compra ahora
          </Button>
        </div>
        <Image
          src="/Popsicle-Main.png"
          alt="start-image"
          width={500}
          height={500}
          className="h-auto w-[256px] md:w-[400px]"
        />
      </MaxWidthWrapper>
    </section>
  );
};

export default Start;
