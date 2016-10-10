import Renderer from './Renderer';
import Camera from './Camera';
import Scene from './Scene';

/**
 * App class
 */
class App {

  /**
   * begin method
   */
  static begin(parentElement) {

    // Renderer
    const renderer = new Renderer();
    parentElement.appendChild(renderer.domElement);

    // Camera
    const camera = new Camera(parentElement, 75, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.z = 5;

    // Scene
    const scene = new Scene(renderer, camera);
  }
}

export default App;
