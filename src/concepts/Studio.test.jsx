import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Studio from './Studio';
const mockSceneSelect=jest.fn();
const mockDispose=jest.fn();
jest.mock('./studioScene',()=>({createStudio:jest.fn(async (host,callbacks)=>{callbacks.onReady();return {select:mockSceneSelect,setReduced:jest.fn(),rotate:jest.fn(),dispose:mockDispose};})}));

test('3D project controls expose factual details and return to the overview', async()=>{
  const {unmount}=render(<Studio/>);
  await waitFor(()=>expect(screen.queryByRole('status')).toBeNull());
  fireEvent.click(screen.getByRole('button',{name:'Explore Word Detective'}));
  expect(await screen.findByRole('heading',{name:'Word Detective'})).toBeTruthy();
  expect(document.activeElement).toBe(screen.getByRole('heading',{name:'Word Detective'}));
  expect(screen.getByRole('link',{name:'Get it on Google Play'}).getAttribute('href')).toContain('com.mdsahal.worddetective');
  await waitFor(()=>expect(mockSceneSelect).toHaveBeenCalledWith('word'));
  fireEvent.click(screen.getByRole('button',{name:'Back to the room'}));
  expect(screen.queryByRole('heading',{name:'Word Detective'})).toBeNull();
  fireEvent.click(screen.getByRole('button',{name:'Explore Accelera GP'}));
  expect(screen.getByText(/Website-builder controls, rich-text formatting/)).toBeTruthy();
  unmount();expect(mockDispose).toHaveBeenCalled();
});


test('the project stories remain usable when WebGL cannot initialize', async()=>{
  const {createStudio}=require('./studioScene');
  createStudio.mockRejectedValueOnce(new Error('WebGL unavailable'));
  render(<Studio/>);
  expect(await screen.findByText('3D isn’t available here. Explore the projects below.')).toBeTruthy();
  fireEvent.click(screen.getByRole('button',{name:'Explore My Butterfly'}));
  expect(screen.getByRole('link',{name:'View on the App Store'}).getAttribute('href')).toContain('id6800672279');
  fireEvent.click(screen.getByRole('button',{name:'Explore Accelera GP'}));
  expect(screen.queryByRole('img')).toBeNull();
});
