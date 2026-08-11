import './styles.css';
import Popover from './popover';

// Create popover instance
const popover = new Popover({
  title: 'Popover title',
  text: 'And here\'s some amazing content. It\'s very engaging. Right?',
});

// Initialize popover on button click
const button = document.getElementById('popoverButton');
if (button) {
  popover.init(button);
}

// Export for testing
export { popover };