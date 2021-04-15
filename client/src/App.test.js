import { render, screen, cleanup, fireEvent, hasInputValue} from '@testing-library/react'; 

import Report from '../src/components/Report/Report'; 
//wimport "jest-dom/extend-expect"
import News from "./pages/NewsFeed"  
import Map from "./pages/Map"  
import Stats from "./pages/Stats"   
import UserReports from "./pages/ReportsFeed" 
import Home from "./pages/Home"  
import Login from "./pages/Login"


//import axiosMock from "axios"

afterEach(cleanup)   

test('renders News Feed Page', () => {
  render(<News />); 
  const linkElement = screen.getByText(/News Feed/i);
  expect(linkElement).toBeInTheDocument();
}); 

test('renders Crime Statistics Page', () => {
  render(<Stats />); 
  const linkElement = screen.getByText(/Crime Statistics/i);
  expect(linkElement).toBeInTheDocument();
});  

test('renders User Reports Page', () => {
  render(<UserReports />); 
  const linkElement = screen.getByText(/Crime Reports by Users/i);
  expect(linkElement).toBeInTheDocument();
});  

test('renders Home Page', () => {
  render(<Home />); 
  const linkElement = screen.getByText(/Welcome to ResidenTT/i);
  expect(linkElement).toBeInTheDocument();
});  

test('renders Map Page', () => {
  render(<Map />); 
  screen.debug()
  const linkElement = screen.getByText(/Crime Map/i);
  expect(linkElement).toBeInTheDocument();
});   

test("renders Report Page", () => {
  render(<Report />); 
  screen.debug()
  const linkElement = screen.getByText(/Report Crime/i);
  expect(linkElement).toBeInTheDocument();
    
  // userEvent.click(buttonEl) 
  // expect(buttonEl).toBeInTheDocument();

}); 

test("renders Login Page", () => {
  render(<Login />); 
  screen.debug()
  const linkElement = screen.getByText(/Log In/i);
  expect(linkElement).toBeInTheDocument();
    
  // userEvent.click(buttonEl) 
  // expect(buttonEl).toBeInTheDocument();

}); 


test('renders Login form correctly', () => {
    const { getByText, getByLabelText } = render(<Login />);
    const userLabel = getByText(/Username/i);
    const passLabel = getByText(/Password/i);
    expect(userLabel).toBeInTheDocument();
    expect(passLabel).toBeInTheDocument(); 
    // const input = getByLabelText(/Age:/i);
    // expect(input).toHaveAttribute('type', 'number')
  });
//   const input = screen.getByLabelText("userName")

//   // fireEvent.change(input, { target: { value: '123' } })
//   // expect(hasInputValue(input, "123")).toBe(true)
// }); 

// test('submit button should be disabled when Name is empty', () => {
//   const { getByLabelText, getByRole } = render(<Login />);
//   const input = getByLabelText('Username');
//   fireEvent.change(input, { 'target': { 'value': '' } });
//   const submitBtn = getByRole('button', { name: 'Submit' });
//   expect(submitBtn).toHaveAttribute('disabled');
// })