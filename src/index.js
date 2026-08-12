import './styles.css';
import Popover from './popover';

// Initialize popover on button click
const button = document.getElementById('popoverButton');
if (button) {
  const popover = new Popover(button);
}

export default Popover;