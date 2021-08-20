import { render } from "@testing-library/react";

import LandingPage from "./LandingPage";

import userEvent from '@testing-library/user-event'

let getByTestId

beforeEach(() => {
    const component = render(<LandingPage/>)
    getByTestId = component.getByTestId
})

test('hovering authenticate button will darken its background color', () => {
    const authenticateBtn = getByTestId("authenticate-btn")
    userEvent.hover(authenticateBtn)
    expect(authenticateBtn).toHaveStyle(`background-color: #1C86A8`)
})

