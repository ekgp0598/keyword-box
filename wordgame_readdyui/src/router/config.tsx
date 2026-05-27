import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import GameSetup from "../pages/game-setup/page";
import GamePlay from "../pages/game-play/page";
import Result from "../pages/result/page";
import MyPage from "../pages/mypage/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/game-setup/:gameId",
    element: <GameSetup />,
  },
  {
    path: "/game-play/:gameId",
    element: <GamePlay />,
  },
  {
    path: "/result",
    element: <Result />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;