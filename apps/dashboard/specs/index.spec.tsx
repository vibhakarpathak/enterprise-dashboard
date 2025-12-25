// specs/index.spec.tsx
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../src/app/store'; // Adjust path to your store
import Page from '../src/app/page';

describe('Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        <Page />
      </Provider>,
    );
    expect(baseElement).toBeTruthy();
  });
});
