import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import Button from './Button'

let getByTestId

beforeEach(() => {
    const component = render(<Button />)
    getByTestId = component.getByTestId
})

test('hover button should change background color', () => {
    const buttonEl = getByTestId('button-element')
    userEvent.hover(buttonEl)
    // expect(buttonEl).toHaveStyle('background-color: ButtonFace') --> why is this working ?
    expect(buttonEl).toHaveStyle('background-color: #1C86A8')
})