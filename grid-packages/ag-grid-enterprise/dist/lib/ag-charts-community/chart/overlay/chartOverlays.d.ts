import { Overlay } from './overlay';
export declare class ChartOverlays {
    constructor(parent: HTMLElement);
    noData: Overlay;
    noVisibleSeries: Overlay;
    destroy(): void;
}
