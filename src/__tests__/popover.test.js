/**
 * @jest-environment jsdom
 */

import Popover from '../popover';

describe('Popover', () => {
  let button;
  let wrapper;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="button-wrapper">
        <button 
          id="popoverButton" 
          class="btn btn-primary"
          data-title="Test Title"
          data-content="Test Content"
        >
          Toggle popover
        </button>
      </div>
    `;

    button = document.getElementById('popoverButton');
    wrapper = document.querySelector('.button-wrapper');
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should create popover element with correct structure from data attributes', () => {
    const popover = new Popover(button);
    
    const popoverElement = wrapper.querySelector('.popover');
    expect(popoverElement).toBeTruthy();
    expect(popoverElement.className).toContain('popover');
    
    const header = popoverElement.querySelector('.popover-header');
    expect(header).toBeTruthy();
    expect(header.textContent).toBe('Test Title');
    
    const body = popoverElement.querySelector('.popover-body');
    expect(body).toBeTruthy();
    expect(body.textContent).toBe('Test Content');
    
    popover.destroy();
  });

  test('should use default values if data attributes are missing', () => {
    document.body.innerHTML = `
      <div class="button-wrapper">
        <button id="defaultButton" class="btn btn-primary">
          Toggle popover
        </button>
      </div>
    `;
    
    const defaultButton = document.getElementById('defaultButton');
    const popover = new Popover(defaultButton);
    
    const popoverElement = defaultButton.closest('.button-wrapper').querySelector('.popover');
    const header = popoverElement.querySelector('.popover-header');
    const body = popoverElement.querySelector('.popover-body');
    
    expect(header.textContent).toBe('Popover title');
    expect(body.textContent).toBe('And here\'s some amazing content. It\'s very engaging. Right?');
    
    popover.destroy();
  });

  test('should show popover on button click', () => {
    const popover = new Popover(button);
    
    const popoverElement = wrapper.querySelector('.popover');
    expect(popoverElement.classList.contains('show')).toBe(false);
    
    button.click();
    expect(popoverElement.classList.contains('show')).toBe(true);
    
    popover.destroy();
  });

  test('should hide popover on second button click', () => {
    const popover = new Popover(button);
    
    const popoverElement = wrapper.querySelector('.popover');
    
    button.click();
    expect(popoverElement.classList.contains('show')).toBe(true);
    
    button.click();
    expect(popoverElement.classList.contains('show')).toBe(false);
    
    popover.destroy();
  });

  test('should hide popover when clicking outside', () => {
    const popover = new Popover(button);
    
    const popoverElement = wrapper.querySelector('.popover');
    button.click();
    expect(popoverElement.classList.contains('show')).toBe(true);
    
    document.body.click();
    expect(popoverElement.classList.contains('show')).toBe(false);
    
    popover.destroy();
  });

  test('should toggle visibility using show/hide methods', () => {
    const popover = new Popover(button);
    
    const popoverElement = wrapper.querySelector('.popover');
    
    popover.show();
    expect(popoverElement.classList.contains('show')).toBe(true);
    
    popover.hide();
    expect(popoverElement.classList.contains('show')).toBe(false);
    
    popover.destroy();
  });

  test('should clean up DOM on destroy', () => {
    const popover = new Popover(button);
    
    let popoverElement = wrapper.querySelector('.popover');
    expect(popoverElement).toBeTruthy();
    
    popover.destroy();
    popoverElement = wrapper.querySelector('.popover');
    expect(popoverElement).toBeFalsy();
  });

  test('should handle click outside when popover is hidden', () => {
    const popover = new Popover(button);
    
    const popoverElement = wrapper.querySelector('.popover');
    expect(popoverElement.classList.contains('show')).toBe(false);
    
    document.body.click();
    expect(popoverElement.classList.contains('show')).toBe(false);
    
    popover.destroy();
  });

  test('should work without button-wrapper container', () => {
    document.body.innerHTML = `
      <button id="standaloneButton" class="btn btn-primary" data-title="Standalone" data-content="Test">
        Toggle popover
      </button>
    `;
    
    const standaloneButton = document.getElementById('standaloneButton');
    const popover = new Popover(standaloneButton);
    
    const popoverElement = standaloneButton.parentNode.querySelector('.popover');
    expect(popoverElement).toBeTruthy();
    
    standaloneButton.click();
    expect(popoverElement.classList.contains('show')).toBe(true);
    
    popover.destroy();
  });

  test('should handle destroy when already destroyed', () => {
    const popover = new Popover(button);
    
    popover.destroy();
    popover.destroy();
  });

  test('should handle click with event parameter in toggle method', () => {
    const popover = new Popover(button);
    const popoverElement = wrapper.querySelector('.popover');
    
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    
    popover.toggle(clickEvent);
    expect(popoverElement.classList.contains('show')).toBe(true);
    
    popover.toggle(clickEvent);
    expect(popoverElement.classList.contains('show')).toBe(false);
    
    popover.destroy();
  });

  test('should not throw error when destroy called with null elements', () => {
    const popover = new Popover(button);
    
    button.remove();
    
    popover.destroy();
  });

  test('should handle outside click when popover element is null', () => {
    const popover = new Popover(button);
    
    const popoverElement = wrapper.querySelector('.popover');
    popoverElement.remove();
    
    document.body.click();
    
    popover.destroy();
  });

  test('should handle toggle when popoverElement is null', () => {
    const popover = new Popover(button);
    
    const popoverElement = wrapper.querySelector('.popover');
    popoverElement.remove();
    popover.popoverElement = null;
    
    popover.toggle();
    
    popover.destroy();
  });

  test('should handle show/hide when popoverElement is null', () => {
    const popover = new Popover(button);
    
    const popoverElement = wrapper.querySelector('.popover');
    popoverElement.remove();
    popover.popoverElement = null;
    
    popover.show();
    popover.hide();
    
    popover.destroy();
  });

  test('should handle destroy when popoverElement exists but parentNode is null', () => {
    const popover = new Popover(button);
    
    const popoverElement = wrapper.querySelector('.popover');
    popoverElement.remove();
    
    popover.destroy();
    
    expect(popover.popoverElement).toBeNull();
    expect(popover.element).toBeNull();
    expect(popover.isVisible).toBe(false);
  });

  test('should call remove on popoverElement in destroy when parentNode exists', () => {
    const popover = new Popover(button);
    
    const popoverElement = wrapper.querySelector('.popover');
    expect(popoverElement).toBeTruthy();
    expect(popoverElement.parentNode).toBeTruthy();
    
    const removeSpy = jest.spyOn(popoverElement, 'remove');
    
    popover.destroy();
    
    expect(removeSpy).toHaveBeenCalled();
    expect(wrapper.querySelector('.popover')).toBeFalsy();
    expect(popover.popoverElement).toBeNull();
    
    removeSpy.mockRestore();
  });

  test('should handle destroy when popoverElement exists but parentNode is null (explicit false branch)', () => {
    const popover = new Popover(button);
    
    const popoverElement = wrapper.querySelector('.popover');
    
    // Удаляем элемент из DOM, но сохраняем ссылку в popover
    popoverElement.remove();
    
    // Создаем spy на метод remove
    const removeSpy = jest.spyOn(popoverElement, 'remove');
    
    popover.destroy();
    
    // Проверяем, что remove НЕ был вызван (потому что parentNode === null)
    expect(removeSpy).not.toHaveBeenCalled();
    
    expect(popover.popoverElement).toBeNull();
    expect(popover.element).toBeNull();
    expect(popover.isVisible).toBe(false);
    
    removeSpy.mockRestore();
  });

  test('should handle destroy when popoverElement is null and element is null', () => {
    const popover = new Popover(button);
    
    // Очищаем все
    popover.popoverElement = null;
    popover.element = null;
    
    // Вызываем destroy - не должно быть ошибок
    popover.destroy();
    
    expect(popover.popoverElement).toBeNull();
    expect(popover.element).toBeNull();
    expect(popover.isVisible).toBe(false);
  });

  test('should handle removeEventListener when element exists', () => {
    const popover = new Popover(button);
    
    // Создаем spy на метод removeEventListener
    const removeEventListenerSpy = jest.spyOn(button, 'removeEventListener');
    
    popover.destroy();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', popover.toggle);
    
    removeEventListenerSpy.mockRestore();
  });

  test('should handle removeEventListener when element is null', () => {
    const popover = new Popover(button);
    
    // Удаляем элемент
    button.remove();
    popover.element = null;
    
    // Вызываем destroy - не должно быть ошибок
    popover.destroy();
    
    expect(popover.popoverElement).toBeNull();
    expect(popover.element).toBeNull();
    expect(popover.isVisible).toBe(false);
  });
});