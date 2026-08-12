export default class Popover {
  constructor(triggerElement) {
    this.element = triggerElement;
    this.popoverElement = null;
    this.isVisible = false;
    this.title = this.element.dataset.title || 'Popover title';
    this.text = this.element.dataset.content || 'And here\'s some amazing content. It\'s very engaging. Right?';
    
    this.createPopoverElement();
    this.bindEvents();
  }

  createPopoverElement() {
    const popover = document.createElement('div');
    popover.className = 'popover';
    popover.setAttribute('role', 'tooltip');
    
    const header = document.createElement('div');
    header.className = 'popover-header';
    header.textContent = this.title;
    
    const body = document.createElement('div');
    body.className = 'popover-body';
    const textParagraph = document.createElement('p');
    textParagraph.textContent = this.text;
    body.append(textParagraph);
    
    popover.append(header, body);
    
    const wrapper = this.element.closest('.button-wrapper');
    if (wrapper) {
      wrapper.append(popover);
    } else {
      this.element.parentNode.append(popover);
    }
    
    this.popoverElement = popover;
  }

  bindEvents() {
    this.toggle = this.toggle.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    
    this.element.addEventListener('click', this.toggle);
    document.addEventListener('click', this.handleOutsideClick);
  }

  toggle(event) {
    if (event) {
      event.stopPropagation();
    }
    this.isVisible = !this.isVisible;
    this.updateVisibility();
  }

  show() {
    this.isVisible = true;
    this.updateVisibility();
  }

  hide() {
    this.isVisible = false;
    this.updateVisibility();
  }

  updateVisibility() {
    if (this.popoverElement) {
      if (this.isVisible) {
        this.popoverElement.classList.add('show');
      } else {
        this.popoverElement.classList.remove('show');
      }
    }
  }

  handleOutsideClick(event) {
    if (!this.element || !this.popoverElement) return;
    
    const isClickInside = this.element.contains(event.target) || 
                         this.popoverElement.contains(event.target);
    
    if (!isClickInside && this.isVisible) {
      this.hide();
    }
  }

  destroy() {
    if (this.element) {
      this.element.removeEventListener('click', this.toggle);
    }
    document.removeEventListener('click', this.handleOutsideClick);
    
    if (this.popoverElement && this.popoverElement.parentNode) {
      this.popoverElement.remove();
    }
    
    this.popoverElement = null;
    this.element = null;
    this.isVisible = false;
  }
}