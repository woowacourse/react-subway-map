import '@testing-library/jest-dom';

jest.spyOn(window, 'alert').mockImplementation((message) => console.log(message));
jest.spyOn(window, 'confirm').mockImplementation(() => true);
