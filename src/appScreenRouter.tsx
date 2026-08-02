import { createBrowserRouter } from "react-router-dom";
import HymnListScreen from "./components/screens/hymn_list/HymnListScreen";
import AppFrame from "./components/util/AppFrame";
import AddHymnScreen from "./components/screens/AddHymnScreen";

const appScreenRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppFrame />,
        children: [
            { index: true, element: <HymnListScreen />},
            { path: "/add-hymn", element: <AddHymnScreen />}
        ]
    }
]);

export default appScreenRouter;