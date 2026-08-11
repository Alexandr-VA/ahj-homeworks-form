export default class Popover {
  constructor(options = {}) {
    this.title = options.title || 'Popover title';
    this.text = options.text || 'And here\'s some amazing content. It\'s very engaging. Right?';
    this.element = null;
    this.popoverElement = null;
    this.isVisible = false;
  }

  init(triggerElement) {
    this.element = triggerElement;
    
    // Create popover element if it doesn't exist
    if (!this.popoverElement) {
      this.createPopoverElement();
    }

    // Add event listener
    this.element.addEventListener('click', this.toggle.bind(this));

    // Close popover when clicking outside
    document.addEventListener('click', this.handleOutsideClick.bind(this));
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
    body.appendChild(textParagraph);
    
    popover.appendChild(header);
    popover.appendChild(body);
    
    // Append to the button wrapper
    const wrapper = this.element.closest('.button-wrapper');
    if (wrapper) {
      wrapper.appendChild(popover);
    } else {
      // If no wrapper, append to parent
      this.element.parentNode.appendChild(popover);
    }
    
    this.popoverElement = popover;
  }

  toggle(event) {
    event.stopPropagation();
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
    if (this.isVisible) {
      this.popoverElement.classList.add('show');
    } else {
      this.popoverElement.classList.remove('show');
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
      this.element.removeEventListener('click', this.toggle.bind(this));
    }
    document.removeEventListener('click', this.handleOutsideClick.bind(this));
    if (this.popoverElement && this.popoverElement.parentNode) {
      this.popoverElement.parentNode.removeChild(this.popoverElement);
    }
    this.popoverElement = null;
    this.element = null;
    this.isVisible = false;
  }
}