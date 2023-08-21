import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { WinamaxCalc } from "./components/WinamaxCalc";

const AppRoutes = [
  {
    index: true,
    element: <WinamaxCalc />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  }
];

export default AppRoutes;
