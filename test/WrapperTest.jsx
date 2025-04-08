import { MemoryRouter } from 'react-router';

export const WrapperTest = ({ children }) => {
 return <MemoryRouter>{children}</MemoryRouter>;
};
