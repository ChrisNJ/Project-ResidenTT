import { render, screen, cleanup } from '@testing-library/react';
//import App from './App'; 
//wimport "jest-dom/extend-expect"
import News from "./pages/NewsFeed"  
import Map from "./pages/Map"  
import Stats from "./pages/Stats"   
import UserReports from "./pages/ReportsFeed" 
import Home from "./pages/Home" 



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