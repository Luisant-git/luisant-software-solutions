/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Services from "../components/Services";
import Products from "../components/Products";
import Stats from "../components/Stats";

export default function OurServices() {
  return (
    <>
      <div className="pt-20">
        <Services />
        <Products />
        <Stats />
      </div>
    </>
  );
}
