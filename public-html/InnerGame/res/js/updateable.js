'use strict'

class Updateable {
  constructor() {}
  /**Called immediately after instantiation
   * @returns null
   */
  init() {}
  /**Called every frame before render()
   * @returns null
   */
  update() {}
  /**Used to draw, called every frame after update()
   * @returns null
   */
  render() {}
}
