import {Provider} from "react-redux";
import {render} from "@testing-library/react";
import store from "./store";

export function renderWithProviders(
    ui, {...renderOptions} = {}
) {
    function Wrapper({ children }) {
        return <Provider store={store}>
                {children}
        </Provider>
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

