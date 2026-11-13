import { render, screen, fireEvent } from '@testing-library/react';
import { Cinema, Editorial, Workshop } from './Concepts';

test('cinematic chapters show the right work and cycle back', () => {
  render(<Cinema />);
  expect(screen.getByRole('heading', {name:'Word Detective'})).toBeTruthy();
  fireEvent.click(screen.getByRole('button', {name:'Next scene'}));
  expect(screen.getByRole('heading', {name:'My Butterfly'})).toBeTruthy();
  fireEvent.click(screen.getByRole('button', {name:'Next scene'}));
  expect(screen.getByRole('heading', {name:'Accelera GP — Noshinow'})).toBeTruthy();
  fireEvent.click(screen.getByRole('button', {name:'Next scene'}));
  expect(screen.getByRole('heading', {name:'Word Detective'})).toBeTruthy();
});

test('editorial notes open and close with explicit expanded state', () => {
  render(<Editorial />);
  const control=screen.getByRole('button', {name:'Open my working notes'});
  expect(control.getAttribute('aria-expanded')).toBe('false');
  fireEvent.click(control);
  expect(screen.getByRole('button', {name:'Close my working notes'}).getAttribute('aria-expanded')).toBe('true');
  expect(document.activeElement).toBe(screen.getByRole('heading', {name:'Three kinds of making.'}));
  expect(screen.getByText('Headers, rich text, and the space between editing and publishing.')).toBeTruthy();
  fireEvent.click(screen.getByRole('button', {name:'Close my working notes'}));
  expect(screen.getByRole('button', {name:'Open my working notes'}).getAttribute('aria-expanded')).toBe('false');
});

test('word workshop supports mistakes, reset, solve, and skipping the puzzle', () => {
  render(<Workshop />);
  for (const letter of ['D','L','I','U','B']) fireEvent.click(screen.getByRole('button',{name:`Choose ${letter}`}));
  expect(screen.getByRole('status').textContent).toContain('Try another order');
  fireEvent.click(screen.getByRole('button',{name:'Start again'}));
  for (const letter of ['B','U','I','L','D']) fireEvent.click(screen.getByRole('button',{name:`Choose ${letter}`}));
  expect(screen.getByRole('status').textContent).toContain('Exactly. Let’s build.');
  expect(document.activeElement).toBe(screen.getByRole('heading', {name:'From a word to a world.'}));
  expect(screen.getByRole('link',{name:'Get Word Detective on Google Play'}).getAttribute('href')).toContain('com.mdsahal.worddetective');
  fireEvent.click(screen.getByRole('button',{name:'Start again'}));
  fireEvent.click(screen.getByRole('button',{name:'Skip to the story'}));
  expect(document.activeElement).toBe(screen.getByRole('heading',{name:'From a word to a world.'}));
});
