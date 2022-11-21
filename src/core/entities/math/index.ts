/**
 * core/entities/math
 * ----------------------------------------------------------------------
 * Core math entities.
 *
 * @author      Fabio Y. Goto <lab@yuiti.dev>
 * @since       0.0.1
 */

/**
 * Represents a plane in 2D space.
 */
export interface IPlane {
  /**
   * Plane width, in pixels.
   */
  width: number;

  /**
   * Plane height, in pixels.
   */
  height: number;

  /**
   * Plane area, in pixels squared.
   */
  area: number;
}

/**
 * Simple plane entity.
 */
export class Plane implements IPlane {
  public width: number;

  public height: number;

  /**
   * Plane constructor.
   *
   * @param width
   *     Plane width, in pixels
   * @param height
   *     Plane height, in pixels
   */
  constructor(width: number = 0, height: number = 0) {
    this.width = width;
    this.height = height;
  }

  get area(): number {
    return this.width * this.height;
  }
}

/**
 * Represents a point in 2D space.
 */
export interface IPoint {
  /**
   * X coordinate.
   */
  x: number;

  /**
   * Y coordinate.
   */
  y: number;
}

/**
 * Simple point entity.
 */
export class Point implements IPoint {
  public x: number;
  public y: number;

  /**
   * Point constructor.
   *
   * @param x
   *     Initial X coordinate
   * @param y
   *     Initial Y coordinate
   */
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }
}

/**
 * Represents a point in 3D space.
 */
export interface IPoint3D extends IPoint {
  /**
   * Z coordinate.
   */
  z: number;
}

/**
 * Simple point entity, for 3D space.
 */
export class Point3D extends Point implements IPoint3D {
  public z: number;

  /**
   *
   * @param x
   *     Initial X coordinate
   * @param y
   *     Initial Y coordinate
   * @param z
   *     Initial Z coordinate
   */
  constructor(x: number = 0, y: number = 0, z: number = 0) {
    super(x, y);

    this.z = z;
  }
}
