/**
 * core/entities/math
 * ----------------------------------------------------------------------
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */

export interface IPlane {
  /**
   * Width in pixels.
   */
  width: number;

  /**
   * Height in pixels.
   */
  height: number;

  /**
   * Plane area in pixels.
   */
  area: number;
}

export class Plane implements IPlane {
  public width: number;
  public height: number;

  /**
   * @param width
   *     Plane width in pixels
   * @param height
   *     Plane height in pixels
   */
  constructor(width: number = 0, height: number = 0) {
    this.width = width;
    this.height = height;
  }

  /**
   * Computed property.
   */
  get area(): number {
    return this.width * this.height;
  }
}
