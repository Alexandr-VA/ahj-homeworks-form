/**
 * @jest-environment jsdom
 */

import Popover from '../popover';

describe('Popover', () => {
  let popover;
  let button;
  let wrapper;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="button-wrapper">
        <button id="popoverButton" class="btn btn-primary">Toggle popover</button>
      </div>
    `;

    button = document.getElementById('popoverButton');
    wrapper = document.querySelector('.button-wrapper');

    popover = new Popover({
      title: 'Test Title',
      text: 'Test Content',
    });
  });

  afterEach(() => {
    if (popover) {
      popover.destroy();
    }
    document.body.innerHTML = '';
  });

  test('should create popover element with correct structure', () => {
    popover.init(button);

    const popoverElement = wrapper.querySelector('.popover');
    expect(popoverElement).toBeTruthy();
    expect(popoverElement.className).toContain('popover');
    
    const header = popoverElement.querySelector('.popover-header');
    expect(header).toBeTruthy();
    expect(header.textContent).toBe('Test Title');
    
    const body = popoverElement.querySelector('.popover-body');
    expect(body).toBeTruthy();
    expect(body.textContent).toBe('Test Content');
  });

  test('should show popover on button click', () => {
    popover.init(button);
    
    const popoverElement = wrapper.querySelector('.popover');
    expect(popoverElement.classList.contains('show')).toBe(false);
    
    button.click();
    expect(popoverElement.classList.contains('show')).toBe(true);
  });

  test('should hide popover on second button click', () => {
    popover.init(button);
    
    const popoverElement = wrapper.querySelector('.popover');
    
    button.click();
    expect(popoverElement.classList.contains('show')).toBe(true);
    
    button.click();
    expect(popoverElement.classList.contains('show')).toBe(false);
  });

  test('should hide popover when clicking outside', () => {
    popover.init(button);
    
    const popoverElement = wrapper.querySelector('.popover');
    button.click();
    expect(popoverElement.classList.contains('show')).toBe(true);
    
    // Simulate click outside
    document.body.click();
    expect(popoverElement.classList.contains('show')).toBe(false);
  });

  test('should show popover with custom content', () => {
    const customPopover = new Popover({
      title: 'Custom Title',
      text: 'Custom Content',
    });
    
    customPopover.init(button);
    
    const popoverElement = wrapper.querySelector('.popover');
    const header = popoverElement.querySelector('.popover-header');
    const body = popoverElement.querySelector('.popover-body');
    
    expect(header.textContent).toBe('Custom Title');
    expect(body.textContent).toBe('Custom Content');
    
    customPopover.destroy();
  });

  test('should toggle visibility using show/hide methods', () => {
    popover.init(button);
    
    const popoverElement = wrapper.querySelector('.popover');
    
    popover.show();
    expect(popoverElement.classList.contains('show')).toBe(true);
    
    popover.hide();
    expect(popoverElement.classList.contains('show')).toBe(false);
  });

  test('should clean up DOM on destroy', () => {
    popover.init(button);
    
    let popoverElement = wrapper.querySelector('.popover');
    expect(popoverElement).toBeTruthy();
    
    popover.destroy();
    popoverElement = wrapper.querySelector('.popover');
    expect(popoverElement).toBeFalsy();
  });
});