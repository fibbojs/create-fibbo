import { FController as FControllerCore } from '@fibbojs/3d'
import type { FControllerOptions } from '@fibbojs/3d'

/**
 * @description A custom controller for a component.
 */
export class CustomController extends FControllerCore {
  constructor(options: FControllerOptions) {
    super(options)
  }

  frame(delta: number): void {
    // Rotate the component by 1 degree every frame
    this.component.transform.rotationDegreeX += 30 * delta
  }
}
