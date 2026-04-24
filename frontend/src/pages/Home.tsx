/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from "../components/Hero";
import Carousel from "../components/Carousel";
import PromoBar from "../components/PromoBar";
import Services from "../components/Services";
import Products from "../components/Products";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import Expertise from "../components/Expertise";
import Clients from "../components/Clients";

export default function Home() {
  return (
    <>
      <Carousel />
      <PromoBar />
      <Products />
      <Services />
      <Stats />
      <Testimonials />
      <Expertise />
      <Clients />
    </>
  );
}
