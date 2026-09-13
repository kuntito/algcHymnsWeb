import { createBrowserRouter } from "react-router-dom";
import HymnListScreen from "./components/screens/hymn_list/HymnListScreen";
import AppFrame from "./components/util/AppFrame";
import AddHymnScreen from "./components/screens/AddHymnScreen";
import HymnViewScreen from "./components/screens/hymn_view/HymnViewScreen";

const appScreenRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppFrame />,
        children: [
            { index: true, element: <HymnListScreen />},
            { path: "/add", element: <AddHymnScreen />},
            { path: "/view/:hymnId", element: <HymnViewScreen />}
        ]
    }
]);

export default appScreenRouter;