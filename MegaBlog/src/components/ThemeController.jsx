import { useEffect } from "react";
import { useSelector } from "react-redux";

function ThemeController() {
    const mode = useSelector((state) => state.theme.mode);

    useEffect(() => {
        if (mode === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [mode]);

    return null;
}

export default ThemeController;