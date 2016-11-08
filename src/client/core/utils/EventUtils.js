export class EventUtils {

  static getOffset(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    return EventUtils.getOffsetOf(e, target);
  }

  static getOffsetOf(e, elem) {
    e = e || window.event;
    var target = elem,
      style = target.currentStyle || window.getComputedStyle(target, null),
      borderLeftWidth = parseInt(style[`borderLeftWidth`], 10),
      borderTopWidth = parseInt(style[`borderTopWidth`], 10),
      rect = target.getBoundingClientRect(),
      offsetX = e.clientX - borderLeftWidth - rect.left,
      offsetY = e.clientY - borderTopWidth - rect.top;
    return {
      x: offsetX,
      y: offsetY
    };
  }

}
