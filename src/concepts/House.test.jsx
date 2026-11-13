import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import House from './House';

const mockApi = { goTo: jest.fn(), focus: jest.fn(), setNight: jest.fn(), setReduced: jest.fn(), dispose: jest.fn() };
jest.mock('./houseScene', () => ({ createHouse: jest.fn() }));

// CRA resets mock implementations between tests, so the scene stub is installed per test.
beforeEach(() => {
  Object.values(mockApi).forEach((fn) => fn.mockClear());
  require('./houseScene').createHouse.mockImplementation(async (host, callbacks) => { callbacks.onReady(); return mockApi; });
  window.history.replaceState(null, '', '/__concepts/house#hall');
});

test('walking from the hall to the workshop moves the camera and shows the workshop', async () => {
  const { unmount } = render(<House />);
  await waitFor(() => expect(screen.queryByText('Building the house…')).toBeNull());
  expect(screen.getByRole('heading', { name: /Come in/ })).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: /Walk through to the workshop/ }));
  expect(await screen.findByRole('heading', { name: /Where things/ })).toBeTruthy();
  expect(document.activeElement).toBe(screen.getByRole('heading', { name: /Where things/ }));
  await waitFor(() => expect(mockApi.goTo).toHaveBeenCalledWith('workshop'));
  expect(window.location.hash).toBe('#workshop');
  fireEvent.click(screen.getByRole('button', { name: 'Previous room' }));
  expect(await screen.findByRole('heading', { name: /Come in/ })).toBeTruthy();
  unmount();
  expect(mockApi.dispose).toHaveBeenCalled();
});

test('arrow keys and the floor plan navigate all rooms', async () => {
  render(<House />);
  await waitFor(() => expect(screen.queryByText('Building the house…')).toBeNull());
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  expect(await screen.findByRole('heading', { name: /Where things/ })).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Go to the study' }).disabled).toBe(false);
  fireEvent.click(screen.getByRole('button', { name: 'Go to the hall' }));
  expect(await screen.findByRole('heading', { name: /Come in/ })).toBeTruthy();
});

test('workshop exhibits expose factual details, links and the tools pegboard', async () => {
  render(<House />);
  await waitFor(() => expect(screen.queryByText('Building the house…')).toBeNull());
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  fireEvent.click(await screen.findByRole('button', { name: 'Explore Word Detective' }));
  expect(await screen.findByRole('heading', { name: 'Word Detective' })).toBeTruthy();
  expect(screen.getByRole('link', { name: /Get it on Google Play/ }).getAttribute('href')).toContain('com.mdsahal.worddetective');
  await waitFor(() => expect(mockApi.focus).toHaveBeenCalledWith('word'));
  fireEvent.click(screen.getByRole('button', { name: 'Back to the workshop' }));
  fireEvent.click(screen.getByRole('button', { name: 'Explore The pegboard' }));
  expect(await screen.findByRole('heading', { name: 'The pegboard' })).toBeTruthy();
  expect(screen.getByText(/Spring Batch/)).toBeTruthy();
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(await screen.findByRole('heading', { name: /Where things/ })).toBeTruthy();
});

test('the light switch toggles night mode in the scene', async () => {
  render(<House />);
  await waitFor(() => expect(screen.queryByText('Building the house…')).toBeNull());
  fireEvent.click(screen.getByRole('button', { name: 'Turn the lights off' }));
  await waitFor(() => expect(mockApi.setNight).toHaveBeenCalledWith(true));
  expect(screen.getByRole('button', { name: 'Turn the lights on' })).toBeTruthy();
});

test('rooms stay usable when WebGL cannot initialize', async () => {
  const { createHouse } = require('./houseScene');
  createHouse.mockRejectedValueOnce(new Error('WebGL unavailable'));
  render(<House />);
  expect(await screen.findByText(/3D isn’t available here/)).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: /Walk through to the workshop/ }));
  fireEvent.click(await screen.findByRole('button', { name: 'Explore My Butterfly' }));
  expect(screen.getByRole('link', { name: /View on the App Store/ }).getAttribute('href')).toContain('id6800672279');
});

test('a visitor can enter from the nameplate and download the resume without touring', async () => {
  window.history.replaceState(null, '', '/__concepts/house');
  render(<House />);
  await waitFor(() => expect(screen.queryByText('Building the house…')).toBeNull());
  expect(screen.getByRole('link', { name: /Download résumé/ }).getAttribute('href')).toBe('/resume-2026.pdf');
  expect(screen.getByRole('link', { name: /Download résumé/ }).hasAttribute('download')).toBe(true);
  fireEvent.click(screen.getByRole('button', { name: /Enter the house/ }));
  expect(await screen.findByRole('heading', { name: /Come in/ })).toBeTruthy();
});

test('every room has real content and can be reached directly', async () => {
  render(<House />);
  await waitFor(() => expect(screen.queryByText('Building the house…')).toBeNull());
  for (const [room, content] of [['study', 'Brain Station 23'], ['lounge', 'Jahangirnagar University'], ['studio', 'Camera Specification – HDR'], ['porch', 'Your name']]) {
    fireEvent.click(screen.getByRole('button', { name: `Go to the ${room}` }));
    expect(await screen.findByText(content, { exact: true })).toBeTruthy();
  }
});

test('contact prepares a draft for review rather than sending a message', async () => {
  window.history.replaceState(null, '', '/__concepts/house#porch');
  render(<House />);
  await waitFor(() => expect(screen.queryByText('Building the house…')).toBeNull());
  fireEvent.change(screen.getByLabelText('Your name'), { target: { value: 'Demo visitor' } });
  fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'demo@example.com' } });
  fireEvent.change(screen.getByLabelText('What would you like to build?'), { target: { value: 'A new customer portal' } });
  fireEvent.click(screen.getByRole('button', { name: 'Prepare email draft' }));
  expect(await screen.findByRole('link', { name: 'Open draft in email app' })).toBeTruthy();
  expect(screen.getByRole('link', { name: 'Open draft in email app' }).getAttribute('href')).toContain('A%20new%20customer%20portal');
});

test('a directly opened room survives a reload and exposes both media archives', async () => {
  window.history.replaceState(null, '', '/__concepts/house#studio');
  render(<House />);
  await waitFor(() => expect(screen.queryByText('Building the house…')).toBeNull());
  expect(screen.getByRole('heading', { name: /Curiosity/ })).toBeTruthy();
  expect(screen.getByRole('link', { name: 'Camera Specification – HDR' })).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'Videos · 10' }));
  expect(screen.getByRole('link', { name: /First-Ever Private Spacewalk/ }).getAttribute('href')).toContain('7lbgZPalIaE');
  fireEvent.keyDown(screen.getByRole('button', { name: 'Videos · 10' }), { key: 'ArrowRight' });
  expect(window.location.hash).toBe('#studio');
});
