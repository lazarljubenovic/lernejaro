export namespace CanvasUtil {

    export function Rectangle(ctx: CanvasRenderingContext2D,
                              x: number,
                              y: number,
                              w: number,
                              h: number) {
        ctx.moveTo(x, y)
        ctx.lineTo(x, y + h)
        ctx.lineTo(x + w, y + h)
        ctx.lineTo(x + w, y)
        ctx.lineTo(x, y)
    }

}
